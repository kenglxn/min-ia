FROM node:18-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /var

COPY .next/ .next/
COPY start.sh start.sh
COPY server/ server/
COPY server/node_modules server/node_modules

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]

