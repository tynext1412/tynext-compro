#!/bin/bash
set -euo pipefail

# Deploy TYNEXT company profile (Next.js standalone dalam Docker) ke server lewat SSH.
# Pemakaian: ./deploy-compro-manual.sh [prod|dev]   (default: prod)
# Pengaturan di deploy.<env>.env (gitignored; salin dari deploy.env.example). Nilai di file menimpa nilai bawaan.
# Auth: SSH key, atau SERVER_PASSWORD via sshpass. Butuh Docker dan rsync di lokal, Docker, rsync, dan curl di server.
#
# Alur: aplikasi dibangun di dalam Docker lokal dan diekspor sebagai folder (server.js + aset + dependensi yang
# dipakai saja), dikirim dengan rsync (hanya file yang berubah), lalu di server dibungkus Dockerfile.runtime
# menjadi image tipis di atas node:22-alpine. Container hanya mendengarkan 127.0.0.1:$PORT; Nginx yang meneruskan domain.

cd "$(dirname "$0")"

ENV_NAME="${1:-prod}"
case "$ENV_NAME" in
    prod | dev) ;;
    *) echo "Pemakaian: $0 [prod|dev]"; exit 1 ;;
esac

DEPLOY_ENV_FILE="${DEPLOY_ENV_FILE:-deploy.$ENV_NAME.env}"
case "$DEPLOY_ENV_FILE" in /*) ;; *) DEPLOY_ENV_FILE="./$DEPLOY_ENV_FILE" ;; esac
if [ -f "$DEPLOY_ENV_FILE" ]; then
    set -a; . "$DEPLOY_ENV_FILE"; set +a
fi
SERVER_USER="${SERVER_USER:?isi SERVER_USER di $DEPLOY_ENV_FILE}"
SERVER_HOST="${SERVER_HOST:?isi SERVER_HOST di $DEPLOY_ENV_FILE}"
SERVER_PORT="${SERVER_PORT:-22}"
SERVER_DIR="${SERVER_DIR:-/home/$SERVER_USER/tynext-compro-$ENV_NAME}"
IMAGE_NAME="${IMAGE_NAME:-tynext-compro-$ENV_NAME}"
PORT="${PORT:-3010}"   # port host, terikat ke 127.0.0.1 (Nginx proxy ke sini)
APP_PORT=3000          # port di dalam container (lihat Dockerfile.runtime)
CONTAINER_NAME="$IMAGE_NAME"
BUILD_DIR=".deploy/$ENV_NAME"

SSH_OPTS=(-p "$SERVER_PORT" -o StrictHostKeyChecking=accept-new)
# Opsi ssh tambahan dipisah spasi, mis. SSH_EXTRA_OPTS="-i ~/.ssh/id_deploy".
read -r -a EXTRA <<< "${SSH_EXTRA_OPTS:-}"
SSH_OPTS+=("${EXTRA[@]}")
if [ -n "${SERVER_PASSWORD:-}" ]; then
    command -v sshpass >/dev/null || { echo "SERVER_PASSWORD diisi tetapi sshpass belum terpasang."; exit 1; }
    export SSHPASS="$SERVER_PASSWORD"   # sshpass -e menjaga password tidak muncul di daftar proses
    SSH_OPTS+=(-o PreferredAuthentications=password -o PubkeyAuthentication=no)   # lewati key agent (MaxAuthTries)
    SSH_CMD=(sshpass -e ssh "${SSH_OPTS[@]}")
else
    SSH_CMD=(ssh "${SSH_OPTS[@]}")
fi
SSH=("${SSH_CMD[@]}" "$SERVER_USER@$SERVER_HOST")

# ---- pemeriksaan sebelum build
command -v docker >/dev/null || { echo "Docker belum terpasang di komputer ini."; exit 1; }
command -v rsync >/dev/null || { echo "rsync belum terpasang di komputer ini."; exit 1; }
grep -q 'output: "standalone"' next.config.ts || { echo 'next.config.ts harus berisi output: "standalone".'; exit 1; }
GIT_REV="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    echo "Peringatan: ada perubahan yang belum di-commit; perubahan itu ikut ter-deploy."
fi
"${SSH[@]}" "command -v docker >/dev/null && command -v rsync >/dev/null && command -v curl >/dev/null" ||
    { echo "Server harus punya docker, rsync, dan curl."; exit 1; }

# Tarik base image lewat daemon dulu: lookup registry milik BuildKit gagal di jaringan IPv6 yang bermasalah.
BASE_IMAGE="$(awk 'toupper($1)=="FROM"{print $2; exit}' Dockerfile)"
docker image inspect "$BASE_IMAGE" >/dev/null 2>&1 || docker pull --platform linux/amd64 "$BASE_IMAGE"

echo "Membangun aplikasi ($GIT_REV)..."
rm -rf "$BUILD_DIR"
docker build --target app --platform linux/amd64 --output "type=local,dest=$BUILD_DIR" .
[ -f "$BUILD_DIR/server.js" ] || { echo "Build tidak menghasilkan server.js."; exit 1; }
cp Dockerfile.runtime "$BUILD_DIR/Dockerfile"
echo "$GIT_REV" > "$BUILD_DIR/REVISION"

echo "Mengirim perubahan ke $SERVER_HOST..."
"${SSH[@]}" "mkdir -p '$SERVER_DIR/app'"
rsync -az --delete --info=stats1 -e "${SSH_CMD[*]}" "$BUILD_DIR/" "$SERVER_USER@$SERVER_HOST:$SERVER_DIR/app/"

echo "Deploy di server..."
"${SSH[@]}" bash -s <<REMOTE
    set -euo pipefail
    cd "$SERVER_DIR"

    run_container() {
        docker run --name="$CONTAINER_NAME" -d \
            -p "127.0.0.1:$PORT:$APP_PORT" \
            --restart=always "\$1" >/dev/null
    }
    healthy() {
        for _ in \$(seq 1 30); do
            curl -fsS -o /dev/null "http://127.0.0.1:$PORT/id" && return 0   # "/" dialihkan proxy ke /id atau /en
            sleep 1
        done
        return 1
    }

    BASE="\$(awk 'toupper(\$1)=="FROM"{print \$2; exit}' app/Dockerfile)"
    docker image inspect "\$BASE" >/dev/null 2>&1 || docker pull "\$BASE"

    echo "Membangun image $IMAGE_NAME..."
    docker build -q -t "$IMAGE_NAME:new" --label "org.opencontainers.image.revision=$GIT_REV" app >/dev/null

    # Simpan versi yang sedang jalan sebagai :previous untuk rollback.
    HAS_PREVIOUS=false
    if docker image inspect "$IMAGE_NAME:latest" >/dev/null 2>&1; then
        docker tag "$IMAGE_NAME:latest" "$IMAGE_NAME:previous"
        HAS_PREVIOUS=true
    fi
    docker tag "$IMAGE_NAME:new" "$IMAGE_NAME:latest"
    docker rmi "$IMAGE_NAME:new" >/dev/null

    if [ "\$(docker ps -aq -f name=^${CONTAINER_NAME}\$)" ]; then
        echo "Menghentikan container lama..."
        docker rm -f "$CONTAINER_NAME" >/dev/null
    fi

    echo "Menjalankan container baru..."
    run_container "$IMAGE_NAME:latest"

    if healthy; then
        echo "Health check OK di 127.0.0.1:$PORT/id"
        docker image prune -f >/dev/null
    else
        echo "Health check gagal. Log terakhir:"
        docker logs --tail 30 "$CONTAINER_NAME" || true
        docker rm -f "$CONTAINER_NAME" >/dev/null
        if [ "\$HAS_PREVIOUS" = true ]; then
            echo "Mengembalikan versi sebelumnya..."
            docker tag "$IMAGE_NAME:previous" "$IMAGE_NAME:latest"
            run_container "$IMAGE_NAME:latest"
            healthy && echo "Versi sebelumnya kembali berjalan." || echo "Versi sebelumnya juga gagal; periksa server."
        fi
        exit 1
    fi
REMOTE

echo "Deploy selesai ($GIT_REV) di $SERVER_HOST, 127.0.0.1:$PORT."
