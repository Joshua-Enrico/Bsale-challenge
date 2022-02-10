#!/bin/bash

#create our working directory if it doesnt exist
DIR="/home/api/express-app"
if [ -d "$DIR" ]; then
  sudo echo "${DIR} exists"
else
  sudo echo "Creating ${DIR} directory"
  sudo mkdir ${DIR}
fi