import express from 'express';
import { createCasting, deleteCasting, updateCasting } from '../controllers/casting.controller.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();


router.post('/create', verifyToken, createCasting);
router.delete('/delete/:id', verifyToken, deleteCasting);
router.post('/update/:id', verifyToken, updateCasting);

export default router;