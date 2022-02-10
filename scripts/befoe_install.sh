#!/bin/bash

#create our working directory if it doesnt exist
DIR="/home/api/"
if [ -d "$DIR" ]; then
  sudo echo "${DIR} exists"
else
  sudo echo "Creating ${DIR} directory"
  sudo mkdir ${DIR}
fi