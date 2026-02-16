import express from 'express';
import {
  createAccount,
  listAccounts,
} from '../controllers/accountController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createAccount);
router.get('/', verifyToken, listAccounts);

export default router;
