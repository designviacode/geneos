import { Router } from 'express';

// import { messageClient } from '../sockets';
// import { DATA_REQUEST } from '../../constants/socket-events';
import { acceptOffer, makeBatchOffers } from './helper';
import { getFilteredListings } from './filter';

const router = Router();

router.post('/', async (req, res) => {
  console.log('Post subscriptions');

  const { user, formData } = req.body;

  // get listings
  const listings = await getFilteredListings(formData);

  const txs = listings.map(listing => ({
    id: listing.id,
    price: listing.rate,
  }));

  try {
    await makeBatchOffers(user.privateKey, user.name, txs, JSON.stringify(formData));
  } catch (error) {
    console.error('Error sending offers:', error);
    return res.status(500).json({
      error,
    });
  }

  // const result = await listings.reduce((next, listing) => {
  //   return next
  //     .then(res => {
  //       return makeOffer(user.privateKey, user.name, listing.id, listing.rate, JSON.stringify(formData))
  //         .then(() => res)
  //         .catch(error => {
  //           console.error('Error sending offer to listing', listing.id, error);
  //           res.errors.push(error);
  //         });
  //     });
  //
  // }, Promise.resolve({
  //   errors: []
  // }));

  return res.json({
    data: {
      user,
      formData,
      offers: txs,
    },
  });
});

router.post('/:name/reject', (req, res) => {
  const { name } = req.params;
  const { user, request } = req.body;

  console.log('Reject request:', user.name);

  if (name !== user.name) {
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

router.post('/:name/accept', async (req, res) => {
  const { name } = req.params;
  const { user, request } = req.body;

  console.log('Accept request:', user.name);

  if (name !== user.name) {
    return res.status(404).json({
      error: {
        message: 'Invalid request',
      },
    });
  }

  try {
    await acceptOffer(user.privateKey, user.name, request.offerId);

    return res.json({
      data: request,
    });
  } catch (error) {
    console.error('Error accepting request:', error);
    return res.status(500).json({
      error,
    });
  }
});

export default router;
