#!/bin/bash
cd ../kube

kubectl delete deployment my-pokemon-server
kubectl delete configMap app-env

kubectl create configmap app-env --from-env-file=../environment/local-all.env

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml