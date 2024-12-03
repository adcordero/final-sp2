import express from "express";
import { getAllTenants, getTenantById, getUserApts, getUserUnits, updateTenant } from "../controllers/owner_controller.js";

const router = express.Router();

router.get("/get-apartments/:id", getUserApts);
router.get("/get-units/:id", getUserUnits);

router.get('/get-all-tenants', getAllTenants);
router.get('/get-tenant/:id', getTenantById);

router.post('/update-tenant/:id', updateTenant);

export default router;