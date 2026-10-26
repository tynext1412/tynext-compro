#!/bin/bash
set -euo pipefail

# Deploy TYNEXT company profile (Next.js standalone dalam Docker) ke server lewat SSH.
# Pemakaian: ./deploy-compro-manual.sh [prod|dev]   (default: prod)
# Pengaturan di deploy.<env>.env (gitignored; salin dari deploy.env.example). Nilai di file menimpa nilai bawaan.
# Auth: SSH key, atau SERVER_PASSWORD via sshpass. Butuh Docker lokal.
# Container hanya mendengarkan 127.0.0.1:$PORT di server; Nginx yang meneruskan domain ke port itu.

cd "$(dirname "$0")"

ENV_NAME="${1:-prod}"
case "$ENV_NAME" in
    prod | dev) ;;
    *) echo "Pemakaian: $0 [prod|dev]"; exit 1 ;;
esac

DEPLOY_ENV_FILE="${DEPLOY_ENV_FILE:-deploy.$ENV_NAME.env}"
if [ -f "$DEPLOY_ENV_FILE" ]; then
    set -a; . "./$DEPLOY_ENV_FILE"; set +a
fi
SERVER_USER="${SERVER_USER:?isi SERVER_USER di $DEPLOY_ENV_FILE}"
SERVER_HOST="${SERVER_HOST:?isi SERVER_HOST di $DEPLOY_ENV_FILE}"
SERVER_PORT="${SERVER_PORT:-22}"
SERVER_DIR="${SERVER_DIR:-/home/$SERVER_USER/tynext-compro-$ENV_NAME}"
IMAGE_NAME="${IMAGE_NAME:-tynext-compro-$ENV_NAME}"
PORT="${PORT:-3010}"   # port host, terikat ke 127.0.0.1 (Nginx proxy ke sini)
APP_PORT=3000          # port di dalam container (lihat Dockerfile)
CONTAINER_NAME="$IMAGE_NAME"
IMAGE_TAR="${IMAGE_NAME}.tar.gz"
SSH_OPTS=(-o StrictHostKeyChecking=accept-new)
if [ -n "${SERVER_PASSWORD:-}" ]; then
    command -v sshpass >/dev/null || { echo "SERVER_PASSWORD diisi tetapi sshpass belum terpasang."; exit 1; }
    export SSHPASS="$SERVER_PASSWORD"   # sshpass -e menjaga password tidak muncul di daftar proses
    SSH_OPTS+=(-o PreferredAuthentications=password -o PubkeyAuthentication=no)   # lewati key agent (MaxAuthTries)
    SSH=(sshpass -e ssh -p "$SERVER_PORT" "${SSH_OPTS[@]}" "$SERVER_USER@$SERVER_HOST")
    SCP=(sshpass -e scp -P "$SERVER_PORT" "${SSH_OPTS[@]}")
else
    SSH=(ssh -p "$SERVER_PORT" "${SSH_OPTS[@]}" "$SERVER_USER@$SERVER_HOST")
    SCP=(scp -P "$SERVER_PORT" "${SSH_OPTS[@]}")
fi

# ---- pemeriksaan sebelum build
command -v docker >/dev/null || { echo "Docker belum terpasang di komputer ini."; exit 1; }
grep -q 'output: "standalone"' next.config.ts || { echo 'next.config.ts harus berisi output: "standalone".'; exit 1; }
GIT_REV="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    echo "Peringatan: ada perubahan yang belum di-commit; perubahan itu ikut ter-deploy."
fi

trap 'rm -f "$IMAGE_TAR"' EXIT

# Tarik base image lewat daemon dulu: lookup registry milik BuildKit gagal di jaringan IPv6 yang bermasalah.
BASE_IMAGE="$(awk 'toupper($1)=="FROM"{print $2; exit}' Dockerfile)"
docker image inspect "$BASE_IMAGE" >/dev/null 2>&1 || docker pull --platform linux/amd64 "$BASE_IMAGE"

echo "Membangun image $IMAGE_NAME ($GIT_REV)..."
docker build -t "$IMAGE_NAME" --platform linux/amd64 --label "org.opencontainers.image.revision=$GIT_REV" .

echo "Menyimpan image ke $IMAGE_TAR..."
docker save "$IMAGE_NAME:latest" | gzip > "$IMAGE_TAR"

echo "Menyiapkan direktori di server..."
"${SSH[@]}" "mkdir -p '$SERVER_DIR'"

echo "Mengirim image ke server..."
"${SCP[@]}" "$IMAGE_TAR" "$SERVER_USER@$SERVER_HOST:$SERVER_DIR/"
rm -f "$IMAGE_TAR"

echo "Deploy di server..."
"${SSH[@]}" bash -s <<REMOTE
    set -euo pipefail
    cd "$SERVER_DIR"
    trap 'rm -f "$SERVER_DIR/$IMAGE_TAR"' EXIT   # hapus tar walau ada langkah yang gagal

    run_container() {
        docker run --name="$CONTAINER_NAME" -d \
            -p "127.0.0.1:$PORT:$APP_PORT" \
            --restart=always "\$1" >/dev/null
    }
    healthy() {
        for _ in \$(seq 1 30); do
            curl -fsS -o /dev/null "http://127.0.0.1:$PORT/" && return 0
            sleep 1
        done
        return 1
    }

    # Simpan versi yang sedang jalan sebagai :previous untuk rollback.
    HAS_PREVIOUS=false
    if docker image inspect "$IMAGE_NAME:latest" >/dev/null 2>&1; then
        docker tag "$IMAGE_NAME:latest" "$IMAGE_NAME:previous"
        HAS_PREVIOUS=true
    fi

    echo "Memuat image baru..."
    docker load -i "$IMAGE_TAR"
    rm -f "$IMAGE_TAR"

    if [ "\$(docker ps -aq -f name=^${CONTAINER_NAME}\$)" ]; then
        echo "Menghentikan container lama..."
        docker rm -f "$CONTAINER_NAME" >/dev/null
    fi

    echo "Menjalankan container baru..."
    run_container "$IMAGE_NAME:latest"

    if healthy; then
        echo "Health check OK di 127.0.0.1:$PORT"
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
