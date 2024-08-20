#!/bin/bash
cd ../

docker rmi josephck1997/my-pokemon-server
kubectl delete deployment my-pokemon-server-prod
kubectl delete configMap app-env

kubectl create configmap app-properties --from-env-file=../environment/local-dev.env

# Build nodejs server
docker build -t josephck1997/my-pokemon-server -f ./Docker/Dockerfiles/my-pokemon-server.Dockerfile .

# Push to docker hub
docker push josephck1997/my-pokemon-server:latest

# Stand up deployment
cd kube
kubectl apply -f deployment.yaml
kubectl apply -f service.yml