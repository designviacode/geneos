import Eos from 'eosjs';

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
      return Promise.reject(e);
    }
}

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


// todo
export const getOffers = async (name) => {
  const eos = Eos();
  try {
    const { rows } = await eos.getTableRows({
      "json": true,
      "code": "marketplace",   // contract who owns the table
      "scope": "marketplace",  // scope of the table
      "table": "offers",
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