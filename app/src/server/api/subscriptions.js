import { Router } from 'express';

import { messageClient } from '../sockets';
import { DATA_REQUEST } from '../../constants/socket-events';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    data: {
      count: 5,
    },
  });
});

router.post('/', async (req, res) => {
  // TODO: get list of clients
  // TODO: send subscription to nodeos
  // TODO: message client sockets
  messageClient('EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58', DATA_REQUEST, {
    data: 'yeay',
  });

  return res.json({
    data: {}
  });
});

export default router;
