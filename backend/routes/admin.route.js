import express from 'express'
import { signup, login, logout, getMe } from '../controllers/admin.controller.js';
import adminMiddleware from '../middlewares/admin.mid.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', adminMiddleware, getMe);

export default router;