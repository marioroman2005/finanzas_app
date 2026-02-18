import express from 'express';
import {
  listCategories,
  createCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, listCategories);
router.post('/', verifyToken, createCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;
