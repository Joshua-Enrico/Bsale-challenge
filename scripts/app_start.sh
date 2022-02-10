#!/bin/bash

sudo chmod -R 777 /home/api/
cd /home/api/api/
cd src
node index.js > app.out.log 2> app.err.log < /dev/null &