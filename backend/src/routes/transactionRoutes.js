import express from 'express';
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transactionController.js';
import { verifyToken } from '../middleware/auth.js'; // Assuming auth middleware exists

const router = express.Router();

router.use(verifyToken); // Protect all transaction routes

router.post('/', createTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
