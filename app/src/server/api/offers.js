import { Router } from 'express';

import { getOffers } from './helper';

const router = Router();

/*
 { offerId: 0,
   tokenId: 0,
   from: 'jens',
   price: '40.0000 EOS',
   subscriber: 'Cancer study',
   projectName: 'cancer',
   duration: 3 }
 */

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  console.log('Get offers for', name);

  try {
    const data = await getOffers(name);

    res.json({
      data,
    });
  } catch(err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
