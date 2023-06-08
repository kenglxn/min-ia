FROM node:18-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /var

COPY build/ build/
COPY server/ server/
COPY server/node_modules server/node_modules

WORKDIR /var/server/build

WORKDIR /var/server/build
COPY start.sh start.sh

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]

