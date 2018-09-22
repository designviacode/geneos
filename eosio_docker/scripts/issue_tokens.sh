#!/bin/bash
set -o errexit

echo "=== start deploy data ==="

# set PATH
PATH="$PATH:/opt/eosio/bin"

# change to script directory
cd "$(dirname "$0")"

echo "=== start issuing EOS tokens in blockchain ==="

cleos push action eosio.token create '[ "eosio", "1000000000.0000 EOS"]' -p eosio.token@active
cleos push action data.nft create '[ "data.nft", "NFT"]' -p data.nft@active

# download jq for json reader, we use jq here for reading the json file ( accounts.json )
mkdir -p ~/bin && curl -sSL -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x ~/bin/jq && export PATH=$PATH:~/bin


cleos wallet create -n nftuserswal --to-console

# loop through array to issue EOS/NFT to each of these users
jq -c '.[]' accounts.json | while read i; do
  name=$(jq -r '.name' <<< "$i")
  priv=$(jq -r '.privateKey' <<< "$i")
  metadata=$(jq -r '.metadata|tojson|tojson' <<< "$i")
  uri=$(jq -r '.uri' <<< "$i")
  if [[ $metadata = '"null"' ]]
  then
    cleos push action eosio.token issue '['"${name}"', "50000.0000 EOS", "memo" ]' -p eosio@active
  else
    cleos wallet import -n nftuserswal --private-key $priv
    cleos push action data.nft issue '['"${name}"',"1 NFT",['"${uri}"'],"Health Data",'"${metadata}"',"issuance"]' -p data.nft@active
    id=$(cleos get table data.nft data.nft token --index 2 --key-type name -L $name | jq '.rows|.[0]|.id')
    cleos push action data.nft approve '['"${name}"',"marketplace",'${id}']' -p ${name}@active
    cleos push action marketplace list '['"${name}"','${id}','"${metadata}"']' -p ${name}@active
  fi
done
