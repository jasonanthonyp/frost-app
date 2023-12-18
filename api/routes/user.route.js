import express from 'express';
import { test, updateUser, getUserCasting } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.get('/castings/:id', verifyToken, getUserCasting)
export default router;