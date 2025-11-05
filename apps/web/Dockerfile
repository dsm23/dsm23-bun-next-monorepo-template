# syntax=docker.io/docker/dockerfile:1@sha256:b6afd42430b15f2d2a4c5a02b919e98a525b785b1aaff16747d2f623364e39b6

FROM oven/bun:1.3.1-alpine@sha256:514fe15804f8ad3772ba323c2298daf121bb4b42386e2522998de5e87f16a94c AS base

# renovate: datasource=npm depName=turbo
ARG TURBO_VERSION="2.6.0"

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
