#!/usr/bin/env sh

cd server
exec yarn start &
cd ..
exec yarn start
