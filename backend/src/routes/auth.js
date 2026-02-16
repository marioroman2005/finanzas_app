import express from 'express';
import { register, login, profile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Esta es la ruta para registrar un usuario
// La URL completa será: http://localhost:4000/api/auth/register
router.post('/register', register);

router.post('/login', login);

router.get('/profile', verifyToken, profile);

export default router;
