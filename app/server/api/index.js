import { Router } from 'express';

const router = Router();

router.get('/metrics/health', (req, res) => res.json({ status: 'ok' }));

export default router;
