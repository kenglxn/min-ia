#!/usr/bin/env sh

cd /home/node/app/server
exec yarn start > server.log 2>&1 &

cd /home/node/app/client
exec yarn start
