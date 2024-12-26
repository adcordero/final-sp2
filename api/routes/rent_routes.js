import express from 'express';
import { getAllRents, getOneRent, getPaidRents, getPendingRents, getUnpaidRents, updateRentImage, updateRentStatus } from '../controllers/rent_controller.js';

const router = express.Router();

router.get('/get-all-rents/:id', getAllRents);
router.get('/get-one-rent/:id', getOneRent);
router.get('/get-pending-rents', getPendingRents);
router.get('/get-unpaid-rents', getUnpaidRents);
router.get('/get-paid-rents', getPaidRents);

router.post('/update-rent-image/:id', updateRentImage);
router.post('/update-rent-status/:id', updateRentStatus);

export default router;