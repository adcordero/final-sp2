import express from 'express';
import { getAllRents, getOneRent } from '../controllers/rent_controller.js';

const router = express.Router();

router.get('/get-all-rents/:id', getAllRents);
router.get('/get-one-rent/:id', getOneRent);

export default router;