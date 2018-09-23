import { Router } from 'express';

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
  console.log('Get listings');
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

export default router;
