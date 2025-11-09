import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
    res.status(200).json({ message: "Welcome to the dashboard", user: req.user });
});

export default router;