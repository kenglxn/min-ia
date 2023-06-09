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

COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

COPY --chown=nextjs:nodejs start.sh start.sh

RUN chmod +x start.sh

USER nextjs
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
