#!/bin/bash
cd ../kube

docker pull josephck1997/my-pokemon-server:latest

kubectl create configmap app-env --from-env-file=../environment/local-dev.env

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml