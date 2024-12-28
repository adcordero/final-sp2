import express from 'express';
import { acknowledgeBill, createBill, getAllElectOwner, getAllTenantElectricity, getAllTenantWater, getAllWaterOwner, getOneBill, updateBillTenant } from '../controllers/bill_controller.js';

const router = express.Router();

router.post('/create-bill', createBill);
router.get('/find-bill/:id', getOneBill);
router.post('/update-bill-tenant/:id', updateBillTenant);

router.post('/acknowledge-bill/:id', acknowledgeBill);

router.get('/get-all-water', getAllWaterOwner);
router.get('/get-all-tenant-water/:id', getAllTenantWater);

router.get('/get-all-electricity', getAllElectOwner);
router.get('/get-all-tenant-electricity/:id', getAllTenantElectricity);


export default router;