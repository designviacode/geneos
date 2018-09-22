import { Router } from 'express';
import uuid from 'uuid';

import { messageClient } from '../sockets';
import { DATA_REQUEST } from '../../constants/socket-events';
import { getListings } from './helper';

const router = Router();

/*
 { id: 81,
    ethnicity: 'European',
    age: 62,
    location: 'Kossview',
    weight: 209,
    sleep: 7,
    activity: 7.7,
    rate: '39.0000 EOS' }
 */

router.get('/', async (req, res) => {
  console.log('Get subscriptions');
  try {
    const data = await getListings();

    res.json({
      data,
    });
  } catch(err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post('/', (req, res) => {
  console.log('Post subscriptions');
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
