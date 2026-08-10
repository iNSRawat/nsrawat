# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install Bun for fast package installation
COPY package.json bun.lock ./
RUN npm install -g bun@1.3.14 && bun install --frozen-lockfile

# Stage 2: Build the Next.js application
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Arguments
ARG NEXT_PUBLIC_GIT_COMMIT_HASH="docker"
ARG NEXT_PUBLIC_GIT_COMMIT_TIME="docker"
ARG APP_URL="https://nsrawat.in"
ARG REGISTRY_NAMESPACE="@nsrawat"
ARG REGISTRY_NAMESPACE_URL="https://nsrawat.in/r/{name}.json"
ARG NEXT_PUBLIC_DMCA_URL=""
ARG UMAMI_WEBSITE_ID=""
ARG NEXT_PUBLIC_C15T_URL=""

# Environment variables during build
ENV NEXT_PUBLIC_GIT_COMMIT_HASH=$NEXT_PUBLIC_GIT_COMMIT_HASH \
    NEXT_PUBLIC_GIT_COMMIT_TIME=$NEXT_PUBLIC_GIT_COMMIT_TIME \
    APP_URL=$APP_URL \
    REGISTRY_NAMESPACE=$REGISTRY_NAMESPACE \
    REGISTRY_NAMESPACE_URL=$REGISTRY_NAMESPACE_URL \
    NEXT_PUBLIC_DMCA_URL=$NEXT_PUBLIC_DMCA_URL \
    UMAMI_WEBSITE_ID=$UMAMI_WEBSITE_ID \
    NEXT_PUBLIC_C15T_URL=$NEXT_PUBLIC_C15T_URL \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# Run Next.js build using Node.js for maximum stability
RUN node ./node_modules/.bin/next build

# Stage 3: Production runner
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=1360 \
    HOSTNAME="0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and standalone server build
COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 1360

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:' + (process.env.PORT || 1360)).then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]
