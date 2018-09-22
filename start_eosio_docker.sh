#!/usr/bin/env bash
set -o errexit

if [ $1 = "reset" ]
then
  # force remove the previous container if any
  # create a clean data folder in eosio_docker to preserve block data
  echo "=== reset data for eosio_docker ==="
  docker stop eosio_geneos_container || true && docker rm --force eosio_geneos_container || true
  rm -rf "./eosio_docker/data"
  mkdir -p "./eosio_docker/data"
fi

# change to script's directory
cd "$(dirname "$0")/eosio_docker"

if [ -e "data/initialized" ]
then
    script="./scripts/continue_blockchain.sh"
else
    script="./scripts/init_blockchain.sh"
fi

echo "=== run docker container from the eosio/eos-dev image ==="
docker run --rm --name eosio_geneos_container -d \
-p 8888:8888 -p 9876:9876 \
--mount type=bind,src="$(pwd)"/contracts,dst=/opt/eosio/bin/contracts \
--mount type=bind,src="$(pwd)"/scripts,dst=/opt/eosio/bin/scripts \
--mount type=bind,src="$(pwd)"/data,dst=/mnt/dev/data \
-w "/opt/eosio/bin/" eosio/eos-dev:v1.2.5 /bin/bash -c "$script"

if [ "$1" != "--nolog" ]
then
    echo "=== follow eosio_geneos_container logs ==="
    docker logs eosio_geneos_container --follow
fi
