import { Router } from 'express';

import health from './health';

const router = Router();

router.get('/metrics/health', health);

router.use((error, req, res, next) => {
  res.status(500).json({
    error,
  });
});

export default router;
