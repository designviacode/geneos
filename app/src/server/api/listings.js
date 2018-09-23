import { Router } from 'express';

import { getFilteredListings } from './filter';

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

router.post('/', async (req, res) => {
  console.log('Get filtered listings');
  const {
    formData
  } = req.body;

  try {
    const data = await getFilteredListings(formData);

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
