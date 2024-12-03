import express from "express";
import { createApt, createUnit, findOneApt, findOneUnit, findUnits, updateApt, updateUnit } from "../controllers/apartment_controller.js";

const router = express.Router();

// apartment routes
router.post("/create-apartment", createApt);
router.get("/find-apartment/:id", findOneApt);
router.post("/update-apartment/:id", updateApt);

// unit routes
router.post("/create-unit", createUnit);
router.get("/find-units/:id", findUnits);
router.get("/find-unit/:id", findOneUnit);
router.post("/update-unit/:id", updateUnit);

export default router;