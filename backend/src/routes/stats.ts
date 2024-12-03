import express from 'express';
import { adminAuth } from '../middleware/auth';
import * as statsController from '../controllers/stats';

const router = express.Router();

// Routes protégées (admin uniquement)
router.get('/overall', adminAuth, statsController.getOverallStats);
router.get('/revenue', adminAuth, statsController.getRevenueStats);
router.get('/activity', adminAuth, statsController.getActivityStats);

export default router;
