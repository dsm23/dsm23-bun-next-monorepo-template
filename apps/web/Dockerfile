# syntax=docker.io/docker/dockerfile:1@sha256:4a43a54dd1fedceb30ba47e76cfcf2b47304f4161c0caeac2db1c61804ea3c91

FROM oven/bun:1.3.5-alpine@sha256:7156fcc0cee0194d390bfaf7f0eeda9a5e383e70cc90f31aad3a2440a033d7dc AS base

# renovate: datasource=npm depName=turbo
ARG TURBO_VERSION="2.8.21"

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
