import Eos from 'eosjs';

const asyncForEach = async (array, fn) => {
  if (!Array.isArray(array)) return null;

  for (let index = 0; index < array.length; index++) {
    await fn(array[ index ], index, array);
  }
};

const givePermission = async (name, privateKey) => {
  try {
    const eos = Eos({
      keyProvider: privateKey
    });
  
    const account = await eos.getAccount(name);
    const perms = JSON.parse(JSON.stringify(account.permissions));
  
    console.log("New permissions =>", JSON.stringify(perms));
  
    const updateAuthResult = await eos.transaction(tr => {
      const perm = perms.find(perm => perm.perm_name === "active");
  
      if (
        perm.required_auth.accounts.length === 0 ||
        !perm.required_auth.accounts.find(
          account => account.permission.actor === "marketplace"
        )
      ) {
        console.log(`permission does not exist!`);
        perm.required_auth.accounts.push({
          permission: { actor: "marketplace", permission: "eosio.code" },
          weight: 1
        });
      } else {
        console.log(`permission already exists!`);
      }
  
      tr.updateauth(
        {
          account: name,
          permission: perm.perm_name,
          parent: perm.parent,
          auth: perm.required_auth,
          accounts: perm.accounts
        },
        { authorization: `${name}@owner` }
      );
    });
  
    console.log(updateAuthResult);
    return updateAuthResult;
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * @async @function
 * @param {String} name (optional) - name of the user who you want to query, if blank then returns all offers
 * 
 * @returns {Promise} resolves to:
 * @example [ { offerId: 0,
 *            tokenId: 0,
 *            from: 'jens',
 *            price: '40.0000 EOS',
 *            subscriber: 'Cancer study',
 *            projectName: 'cancer',
 *            duration: 3 } ]
 */
export const getOffers = async (name = `all`) => {
  const eos = Eos();
  try {
    const tokens = (await eos.getTableRows({
      json: true,
      code: "data.nft", // contract who owns the table
      scope: "data.nft", // scope of the table
      table: "token",
      limit: 1000
    })).rows.filter(({ owner }) => owner === name);
    const { rows } = await eos.getTableRows({
      json: true,
      code: "marketplace", // contract who owns the table
      scope: "marketplace", // scope of the table
      table: "offers",
      limit: 1000
    });

    const result = rows
      .map(row => {
        const metadata = JSON.parse(row.metadata) || ``;
        return {
          offerId: row.id,
          tokenId: row.reftokenid,
          from: row.from,
          price: row.price,
          ...metadata
        };
      });

    if (name === `all`) return result;
    
    return result.filter(offer => tokens.find(token => token.id === offer.tokenId));

  } catch (e) {
    return Promise.reject(e);
  }
};

export const getListings = async () => {

  const eos = Eos();

  try {
    const { rows } = await eos.getTableRows({
      "json": true,
      "code": "marketplace",   // contract who owns the table
      "scope": "marketplace",  // scope of the table
      "table": "listings",
      "limit": 1000
    });

    const result = rows.map(row => {
      const metadata = JSON.parse(row.metadata) || ``;
      return {
        id: row.tokenid,
        ...metadata
      };

    });

    return result;

  } catch (e) {
    return Promise.reject(e);
  }

}

/**
 * 
 * @param {String} name - of the user's sold transactions
 * @returns {Promise} resolves to
 * @example [ { txId: 0,
 *   tokenId: 9,
 *   seller: 'tyrique',
 *   subscriber: 'athena',
 *   price: '36.0000 EOS' }]
 */
export const getTxs = async (name = `all`) => {
  const eos = Eos();
  try {
    const { rows } = await eos.getTableRows({
      json: true,
      code: "marketplace", // contract who owns the table
      scope: "marketplace", // scope of the table
      table: "txs",
      limit: 1000
    });


    const result = rows
      .map(row => ({
          txId: row.id,
          tokenId: row.reftokenid,
          seller: row.seller,
          subscriber: row.subscriber,
          price: row.price,
        }));

    if (name === `all`) return result;

    return result.filter(tx => tx.seller === name);

  } catch (e) {
    return Promise.reject(e);
  }
};


/**
 * @async @function
 * 
 * @param {String} privateKey 
 * @param {String} from - account_name of offerer
 * @param {Number} id - id of the listing
 * @param {String} price - EOS offer price in string form with 4 decimals and unit, like "4.0000 EOS"
 * @param {String} metadata - Offer metadata in stringified JSON
 *
 * @example makeOffer(`5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx`,`jens`, 0, "40.0000 EOS", "{\"subscriber\":\"Cancer study\",\"projectName\":\"cancer\",\"duration\":3}")
 * 
 * @returns {Promise} resolves to EOS transaction Object
 * 
 */
export const makeOffer = async (privateKey, from, id, price, metadata) => {
  try {

    const eos = Eos({ keyProvider: privateKey });

    await givePermission(from, privateKey); // give permissions to marketplace contract


    return await eos.transaction({
      actions: [
        {
          account: 'marketplace',
          name: 'makeoffer',
          authorization: [
            {
              actor: from,
              permission: 'active'
            }
          ],
          data: {
            from,
            id,
            price,
            metadata
          }
        }
      ]
    });

    } catch (e) {
      return Promise.reject(  e);
    }
}

/**
 * 
 * @param {*} privateKey 
 * @param {*} from 
 * @param {Array of Objects} txs = [{id, price}]
 * @param {*} metadata 
 */
export const makeBatchOffers = async (privateKey, from, txs = [], metadata) => {
  try {
    await givePermission(from, privateKey); // give permissions to marketplace contract
    const eos = Eos({ keyProvider: privateKey });

    asyncForEach(txs, tx => {
      await eos.transaction({
        actions: [
          {
            account: 'marketplace',
            name: 'makeoffer',
            authorization: [
              {
                actor: from,
                permission: 'active'
              }
            ],
            data: {
              from,
              id: tx.id,
              price: tx.price,
              metadata
            }
          }
        ]
      });
    });

    

    } catch (e) {
      return Promise.reject(e);
    }
}

/**
 * 
 * @param {String} privateKey - the private key of the user accepting the offer
 * @param {String} accepter - the account_name of the user accepting the offer
 * @param {Number} offerId - the offer id (not the token id)
 */
export const acceptOffer = async (privateKey, accepter, offerId) => {
  try {

    const eos = Eos({ keyProvider: privateKey });

    return await eos.transaction({
      actions: [
        {
          account: 'marketplace',
          name: 'acceptoffer',
          authorization: [
            {
              actor: accepter,
              permission: 'active'
            }
          ],
          data: {
            seller: accepter,
            offerid: offerId
          }
        }
      ]
    });

    } catch (e) {
      return Promise.reject(e);
    }
}
