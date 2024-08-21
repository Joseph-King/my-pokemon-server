#!/bin/bash
cd ../

# Startup docker compose
docker compose -f ./Docker/Docker-Compose/local-deps.yml up -d
