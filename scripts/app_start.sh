#!/bin/bash

sudo chmod -R 777 /home/api/express-app
cd /home/ec2-user/express-app
npm install
node app.js > app.out.log 2> app.err.log < /dev/null & 