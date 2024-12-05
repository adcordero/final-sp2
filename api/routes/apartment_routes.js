import express from "express";
import { createApt, createUnit, deleteApt, deleteOneUnit, findOneApt, findOneUnit, findUnits, getVacantUnits, updateApt, updateUnit } from "../controllers/apartment_controller.js";

const router = express.Router();

// apartment routes
router.get("/find-apartment/:id", findOneApt);

router.post("/create-apartment", createApt);
router.post("/update-apartment/:id", updateApt);

router.delete("/delete-apartment/:id", deleteApt);

// unit routes
router.get("/find-apt-units/:id", findUnits);
router.get("/find-unit/:id", findOneUnit);
router.get("/get-vacant-units", getVacantUnits);

router.post("/create-unit", createUnit);
router.post("/update-unit/:id", updateUnit);

router.delete("/delete-unit/:id", deleteOneUnit);

export default router;