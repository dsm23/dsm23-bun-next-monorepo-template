# syntax=docker.io/docker/dockerfile:1@sha256:2780b5c3bab67f1f76c781860de469442999ed1a0d7992a5efdf2cffc0e3d769

FROM oven/bun:1.3.14-alpine@sha256:5acc90a93e91ff07bf72aa90a7c9f0fa189765aec90b47bdbf2152d2196383c0 AS base
FROM dhi.io/bun:1.3.13-alpine3.22@sha256:6b9638f4cfc040b36fc74a7297d0830ec0e6ed8fab3f501cb2ba33571a0ce9be AS hardened

# renovate: datasource=npm depName=turbo
ARG TURBO_VERSION="2.9.12"

FROM base AS builder
WORKDIR /app

RUN bun i -g "turbo@${TURBO_VERSION}"
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

FROM hardened AS runner
WORKDIR /app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer /app/apps/web/.next/standalone ./
COPY --from=installer /app/apps/web/public ./apps/web/public

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["bun", "run", "apps/web/server.js"]
