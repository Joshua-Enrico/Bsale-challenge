#!/bin/bash

sudo chmod -R 777 /home/api/
cd /home/api/api/

npm run start > app.out.log 2> app.err.log < /dev/null &