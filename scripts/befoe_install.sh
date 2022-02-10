#!/bin/bash

#crea el directorio especificado si no existe
DIR="/home/api/"
if [ -d "$DIR" ]; then
  sudo echo "${DIR} exists"
else
  sudo echo "Creating ${DIR} directory"
  sudo mkdir ${DIR}
fi