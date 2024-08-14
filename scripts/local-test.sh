#!/bin/bash
cd ../

# Build nodejs server
docker build -t josephck1997/my-pokemon-server -f ./Docker/Dockerfiles/my-pokemon-server.Dockerfile .

# Startup docker compose
docker-compose -f ./Docker/Docker-Compose/local-test.yml up -d