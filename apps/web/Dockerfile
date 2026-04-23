# syntax=docker.io/docker/dockerfile:1@sha256:2780b5c3bab67f1f76c781860de469442999ed1a0d7992a5efdf2cffc0e3d769

FROM oven/bun:1.3.13-alpine@sha256:4de475389889577f346c636f956b42a5c31501b654664e9ae5726f94d7bb5349 AS base

# renovate: datasource=npm depName=turbo
ARG TURBO_VERSION="2.9.6"

FROM base AS builder
WORKDIR /app

RUN bun i -g "turbo@${TURBO_VERSION}"
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune web --docker

# added packages @emnapi/core, @emnapi/wasi-threads and @tybys/wasm-util because
# I was receiving errors about them during pruning. Specifically:
# Warning: Unable to calculate transitive closures: No lockfile entry found for <dependency>
# TODO: remove these packages from web package.json dependencies when turborepo is fixed

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
RUN addgroup --system --gid 1001 bunjs \
  && adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:bunjs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:bunjs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:bunjs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["bun", "run", "apps/web/server.js"]
