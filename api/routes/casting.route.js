import express from 'express';
import { createCasting, deleteCasting } from '../controllers/casting.controller.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();


router.post('/create', verifyToken, createCasting);
router.delete('/delete/:id', verifyToken, deleteCasting);

export default router;