import express from 'express';
import { listCategories } from '../controllers/categoryController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, listCategories);

export default router;
