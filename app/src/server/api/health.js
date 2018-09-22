import eos from 'eosjs';

const STATUS_OK = 'OK';
const STATUS_ERROR = 'ERROR';

export default async (req, res) => {
  const eosHandle = eos({});

  let status = STATUS_OK;

  let blockChain;
  try {
    blockChain = await eosHandle.getInfo({});
  } catch (err) {
    blockChain = { error: err.message };
    status = STATUS_ERROR;
  }

  return res.json({
    status,
    blockChain,
  });
};
