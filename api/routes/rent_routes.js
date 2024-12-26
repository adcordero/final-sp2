import express from 'express';
import { getAllRents, getOneRent, getPendingRents, getUnpaidRents, updateRentImage } from '../controllers/rent_controller.js';

const router = express.Router();

router.get('/get-all-rents/:id', getAllRents);
router.get('/get-one-rent/:id', getOneRent);
router.get('/get-pending-rents', getPendingRents);
router.get('/get-unpaid-rents', getUnpaidRents);

router.post('/update-rent-image/:id', updateRentImage);

export default router;