import express from 'express'
import { allUsers, deleteUser, login, logout, purchase, signup, toggleBlockUser } from '../controllers/user.controller.js';
import userMiddleware from '../middlewares/user.mid.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/all-users', allUsers)
router.delete('/delete-user/:id', deleteUser)
router.patch('/toggle-block/:id', toggleBlockUser)
router.post('/logout', logout)
router.get('/purchases', userMiddleware, purchase)

export default router;