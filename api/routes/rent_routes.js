import express from 'express';
import { getAllRents } from '../controllers/rent_controller.js';

const router = express.Router();

router.get('/get-rent/:id', getAllRents);

export default router;