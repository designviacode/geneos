#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

set -m

# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos -e -p eosio -d /mnt/dev/data \
  --max-transaction-time=1000 \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::history_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::history_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --contracts-console \
  --verbose-http-errors &
sleep 1s
  until curl localhost:8888/v1/chain/get_info
do
  sleep 1s
done

# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: eosiotokenwal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n eosiotokenwal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiotoken_wallet_password.txt

cleos wallet import -n eosiotokenwal --private-key 5JWiLSzSrvikubhiSjM3UyJhWqya47v26TUA68fG2KXuJii2ZMx

# create account for eosio.nft with above wallet's public keys
cleos create account eosio eosio.token EOS4z2zYVHvY11qSaEjjdF19STccZQFATjWmquqKm456ATS4thnEB EOS4z2zYVHvY11qSaEjjdF19STccZQFATjWmquqKm456ATS4thnEB

echo "=== setup wallet: marketplacewal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n marketplacewal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > marketplace_wallet_password.txt
# Owner key for marketplacewal wallet
cleos wallet import -n marketplacewal --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for marketplacewal wallet
cleos wallet import -n marketplacewal --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N


# create account for marketplace with above wallet's public keys
cleos create account eosio marketplace EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9

echo "=== setup wallet: data.nftwal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n data.nftwal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > data_nft_wal_password.txt
# Owner key for data.nftwal wallet
cleos wallet import -n data.nftwal --private-key 5K1142TZKKCcRGke5Hd5iTEFEcPjQQbYgewothzuxhG8Nmvn4HK


# create account for data.nft with above wallet's public keys
cleos create account eosio data.nft EOS7eKPuMkR8tPLwqgokK2T7qwPM1RmyigyqqH89LkoyMXspZSr7Y EOS7eKPuMkR8tPLwqgokK2T7qwPM1RmyigyqqH89LkoyMXspZSr7Y


echo "=== deploy smart contract ==="
# eosio.token cannot be used with eosiocpp so deploying manually
cleos set contract eosio.token contracts/eosio.token -p eosio.token@active
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
deploy_contract.sh data.nft data.nft data.nftwal $(cat data_nft_wal_password.txt)
deploy_contract.sh marketplace marketplace marketplacewal $(cat marketplace_wallet_password.txt)

echo "=== create user accounts ==="
# script for create data into blockchain
create_accounts.sh

echo "=== issue tokens ==="
issue_tokens.sh



echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"

# put the background nodeos job to foreground for docker run
fg %1
