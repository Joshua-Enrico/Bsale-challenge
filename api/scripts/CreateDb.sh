#!/bin/bash

cat ./scripts/sqlScripts/setup_mysql_dev.sql | sudo mysql -uroot
export CREATETABLES=CREATE
mocha  fakeData/CreateData.js --CREATETABLES=CREATE --exit
