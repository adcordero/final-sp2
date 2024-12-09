import express from "express";
import { getAllActiveTenants, getAllNoUnitTenants, getTenantById, getUserApts, getUserUnits, updateTenant } from "../controllers/owner_controller.js";

const router = express.Router();

router.get("/get-apartments/:id", getUserApts);
router.get("/get-units/:id", getUserUnits);

router.get('/get-all-tenants', getAllActiveTenants);
router.get('/get-tenancy-request', getAllNoUnitTenants);
router.get('/get-tenant/:id', getTenantById);

router.post('/update-tenant/:id', updateTenant);

export default router;