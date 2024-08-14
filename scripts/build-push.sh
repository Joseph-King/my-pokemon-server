#!/bin/bash
cd ../

# Build nodejs server
sudo docker build -t josephck1997/my-pokemon-server -f ./Docker/Dockerfiles/my-pokemon-server.Dockerfile .

# Push to docker hub
sudo docker push josephck1997/my-pokemon-server:latest