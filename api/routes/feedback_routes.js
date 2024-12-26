import express from 'express';
import { createFeedback } from '../controllers/feedback_controller.js';

const router = express.Router();

router.post('create-feedback', createFeedback);

export default router;