#!/bin/bash

set -e # forward exit code and stop on first error
set -x # log

ls -alh
(cd /usr/envdir && ls -alh)

cp /usr/envdir/.env.kub .env

ls -alh

# source .env

./grg