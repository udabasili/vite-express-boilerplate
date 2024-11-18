import { Router } from 'express';

const router = Router();

// Example API route
router.get('/status', (req, res) => {
    res.json({ status: 'Hello From Express' });
});

export default router;
