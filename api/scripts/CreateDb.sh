#!/bin/bash

cat ./scripts/sqlScripts/setup_mysql_dev.sql | sudo mysql -uroot
node ./fakeData/CreateData.js