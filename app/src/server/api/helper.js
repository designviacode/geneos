import Eos from 'eosjs';

const eos = Eos();

export const getListings = async () => {

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
