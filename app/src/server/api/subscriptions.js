import { Router } from 'express';
import uuid from 'uuid';

import { messageClient } from '../sockets';
import { DATA_REQUEST } from '../../constants/socket-events';
import { getListings } from './helper';

const router = Router();

router.get('/', async (req, res) => {
  const data = await getListings();

  res.json({
    data,
  });
});

router.post('/', (req, res) => {
  // TODO: get list of clients
  // TODO: send subscription to nodeos
  // TODO: message client sockets
  const { user, formData } = req.body;

  const id = uuid();

  messageClient('EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58', DATA_REQUEST, {
    id,
    user,
    formData,
  });

  return res.json({
    data: {}
  });
});

router.post('/:requestId/reject', (req, res) => {
  const { requestId } = req.params;
  const { user, request } = req.body;

  console.log('Reject request:', user.name);

  if (requestId !== request.id) {
    return res.status(404).json({
      error: {
        message: 'Invalid request',
      },
    });
  }

  return res.json({
    data: request,
  });
});

router.post('/:requestId/accept', (req, res) => {
  const { requestId } = req.params;
  const { user, request } = req.body;

  console.log('Accept request:', user.name);

  if (requestId !== request.id) {
    return res.status(404).json({
      error: {
        message: 'Invalid request',
      },
    });
  }

  return res.json({
    data: request,
  });
});

export default router;
