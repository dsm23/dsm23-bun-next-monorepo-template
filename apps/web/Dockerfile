# syntax=docker.io/docker/dockerfile:1@sha256:4c68376a702446fc3c79af22de146a148bc3367e73c25a5803d453b6b3f722fb

FROM oven/bun:1.2.11-alpine@sha256:6b14922b0885c3890cdb0b396090af1da486ba941df5ee94391eef64f7113c61 AS base

FROM base AS builder
WORKDIR /app

# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
# https://github.com/vercel/turborepo/discussions/7456#discussioncomment-12585058
# TODO: move away from canary
RUN bun i -g turbo@^2.4.5-canary.7
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

ENV HUSKY=0

# for the sake of the prepare script
COPY .husky/ ./.husky/

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
