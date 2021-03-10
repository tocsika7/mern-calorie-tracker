#!/usr/bin/env bash

CONTAINER_NAME=mongo_test
HOST_PORT=27018
MONGODB_PORT=27017


docker run \
  --detach \
  --name $CONTAINER_NAME \
  --publish $HOST_PORT:$MONGODB_PORT \
  mongo