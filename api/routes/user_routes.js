import express from "express";
import { emailVerified, ownerSignUp, signIn, signOut, tenantSignUp } from "../controllers/user_controller.js";

const router = express.Router();

router.post("/tenant-sign-up", tenantSignUp);
router.post("/owner-sign-up", ownerSignUp);
router.get("/confirm-email/:confirm_code", emailVerified);

router.post("/sign-in", signIn);
router.get("/sign-out/:id", signOut);

export default router;