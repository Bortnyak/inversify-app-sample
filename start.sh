#!/bin/bash

cd /usr/src/app && npm install && npm run build && ls -la && node ./dist/App.js
printenv
