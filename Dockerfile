FROM node:18-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /home/node/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

## Server side
COPY --chown=nextjs:nodejs server/package.json server/package.json
COPY --chown=nextjs:nodejs server/node_modules server/node_modules
COPY --chown=nextjs:nodejs server/build server/build

## Client side
COPY --chown=nextjs:nodejs client/package.json client/package.json
COPY --chown=nextjs:nodejs client/next.config.js client/next.config.js
COPY --chown=nextjs:nodejs client/next-env.d.ts client/next-env.d.ts
COPY --chown=nextjs:nodejs client/tsconfig.json client/tsconfig.json
COPY --chown=nextjs:nodejs client/.next client/.next

COPY --chown=nextjs:nodejs start.sh start.sh

RUN chmod +x start.sh

USER nextjs
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
