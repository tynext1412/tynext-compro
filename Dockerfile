FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# public/ bisa kosong (tidak ikut di git), tetapi tahap berikutnya menyalinnya.
# Varian sharp untuk glibc dan wasm32 tidak pernah dipakai di Alpine (musl); dibuang agar kiriman deploy kecil.
RUN mkdir -p public && npm run build \
    && rm -rf .next/standalone/node_modules/@img/sharp-libvips-linux-x64 \
        .next/standalone/node_modules/@img/sharp-linux-x64 \
        .next/standalone/node_modules/@img/sharp-wasm32

# Aplikasi siap jalan (server.js, aset, dependensi yang dipakai saja). Script deploy mengekspor tahap ini
# ke folder lokal (docker build --target app --output ...) lalu mengirimnya ke server dengan rsync.
FROM scratch AS app
COPY --from=builder /app/.next/standalone /
COPY --from=builder /app/.next/static /.next/static
COPY --from=builder /app/public /public

# Image lengkap bila dibangun langsung (docker build .). Di server, Dockerfile.runtime membungkus folder app dengan cara yang sama.
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=app --chown=nextjs:nodejs / ./
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
