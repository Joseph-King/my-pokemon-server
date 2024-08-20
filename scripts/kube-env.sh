#!/bin/bash
cd ../environment

kubectl create configmap app-env --from-env-file=local-all.env