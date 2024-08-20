#!/bin/bash
cd ../kube

kubectl create configmap app-properties --from-env-file=../environment/local-dev.env

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml