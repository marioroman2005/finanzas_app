import express from 'express';
import {
  createAccount,
  listAccounts,
  deleteAccount,
} from '../controllers/accountController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createAccount);
router.get('/', verifyToken, listAccounts);
router.delete('/:id', verifyToken, deleteAccount);

export default router;
