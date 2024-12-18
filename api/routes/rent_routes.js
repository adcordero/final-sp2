import express from 'express';
import { getAllRents, getOneRent, updateRentImage } from '../controllers/rent_controller.js';

const router = express.Router();

router.get('/get-all-rents/:id', getAllRents);
router.get('/get-one-rent/:id', getOneRent);

router.post('/update-rent-image/:id', updateRentImage);

export default router;