# syntax=docker.io/docker/dockerfile:1@sha256:38387523653efa0039f8e1c89bb74a30504e76ee9f565e25c9a09841f9427b05

FROM oven/bun:1.2.20-alpine@sha256:5ade1ec6fc2b74f825d48d33d98d7450fb960426d5d0df9a8f27b419da832012 AS base

FROM base AS builder
WORKDIR /app

RUN bun i -g turbo@2.5.4
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

ENV LEFTHOOK=0

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .

RUN bun install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN bun run build

FROM base AS runner
WORKDIR /app

# Don't run production as root
# RUN addgroup --system --gid 1001 bun
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:bun /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:bun /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:bun /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["bun", "run", "apps/web/server.js"]
