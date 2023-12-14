import express from 'express';
import { createCasting } from '../controllers/casting.controller.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();


router.post('/create', verifyToken, createCasting);

export default router;