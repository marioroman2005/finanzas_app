import express from 'express';
import {
  getBalance,
  getExpensesByCategory,
} from '../controllers/dashboardController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/balance', verifyToken, getBalance);
router.get('/expenses-by-category', verifyToken, getExpensesByCategory);

export default router;
