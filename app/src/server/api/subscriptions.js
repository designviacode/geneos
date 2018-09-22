import { Router } from 'express';

import { messageClient } from '../sockets';
import { DATA_REQUEST } from '../../constants/socket-events';

const router = Router();

router.post('/', async (req, res) => {
  // TODO: get list of clients
  // TODO: send subscription to nodeos
  // TODO: message client sockets
  messageClient('PUBKEY', DATA_REQUEST, {
    data: 'yeay',
  });

  return res.json({
    data: {}
  });
});

export default router;
