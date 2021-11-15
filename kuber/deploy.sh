#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
ROOT="${DIR}/.."

KUBENV="${ROOT}/.env.kub"

if [ ! -f "${KUBENV}" ]; then
    echo "${KUBENV} does not exist."
    exit 1;
fi

PROJECT_NAME="grg"

_DATE="$(date +%Y%m%d_%H%M)"
_GITHASH=$(git rev-parse --short HEAD)
TAG="${_DATE}_${_GITHASH}"

SECRET_GENERATED="${PROJECT_NAME}-env"
DOCKER_URL="tomekwlod/${PROJECT_NAME}"
K_NAMESPACE=go

set -e # exit immediately if a simple command exits with a non-zero status
set -x # activate debugging

## docker image
docker build --platform linux/amd64 -f "${ROOT}/kuber/Dockerfile" -t ${DOCKER_URL} .

docker tag "${DOCKER_URL}" "${DOCKER_URL}:${TAG}"

docker push "${DOCKER_URL}:${TAG}"

## create namespace for the first time!
# kubectl create namespace go

## secrets
# kubectl create secret generic grg-env --from-env-file="${KUBENV}" -n "${K_NAMESPACE}" --dry-run -o yaml | kubectl apply -f - <<<--- not a file but values instead
kubectl create secret generic grg-env --from-file="${KUBENV}" -n "${K_NAMESPACE}" --dry-run -o yaml | kubectl apply -f -

kubectl get secrets -n "${K_NAMESPACE}"

kubectl describe secret grg-env -n "${K_NAMESPACE}"

sed -e "s/__REPLACE__IMAGEHASH__/\"tomekwlod\/grg:${TAG}\"/g" kuber/deployment.yaml > kuber/deployment_TMP.yaml
sed -i -e '/^====/d' kuber/deployment_TMP.yaml # remove the lines starting with: ====

kubectl apply -f kuber/deployment_TMP.yaml

kubectl rollout status deployment -n "${K_NAMESPACE}" "${PROJECT_NAME}" --timeout=1m
