FROM node:18-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /home/node/app

## Server side
COPY server/package.json server/package.json
COPY server/node_modules server/node_modules
COPY server/build server/build

## Client side
COPY client/package.json client/package.json
COPY client/next.config.js client/next.config.js
COPY client/next-env.d.ts client/next-env.d.ts
COPY client/tsconfig.json client/tsconfig.json
COPY client/.next client/.next

COPY start.sh start.sh

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
