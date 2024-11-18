import { Router } from 'express';

const router = Router();

// Example API route
router.get('/api/status', (req, res) => {
    res.json({ status: 'Server is running' });
});

export default router;
