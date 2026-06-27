FROM node:20-alpine AS base
RUN npm install -g pnpm@10.34.4

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--no-deprecation
ARG PAYLOAD_SECRET=ci-build-secret-not-real
ARG DATABASE_URI=postgresql://postgres:postgres@localhost:5432/zun_cms
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV DATABASE_URI=${DATABASE_URI}
RUN pnpm run build

# Tools image — used at runtime by `migrate` + `seed` services.
# Has full node_modules + source so it can run `payload migrate` and `tsx seed/index.ts`.
# Real secrets are injected at runtime via env_file (compose), not baked in.
FROM base AS tools
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_OPTIONS=--no-deprecation
CMD ["sh", "-c", "echo y | node_modules/.bin/payload migrate"]

# Runner image — production app server (Next.js standalone).
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--no-deprecation

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

RUN mkdir -p public/media
COPY --from=builder /app/public ./public
RUN chown -R nextjs:nodejs public/
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
