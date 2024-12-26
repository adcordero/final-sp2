import express from 'express';
import { createFeedback, getAllFeedback } from '../controllers/feedback_controller.js';

const router = express.Router();

router.post('/create-feedback', createFeedback);

router.get('/get-all-feedback/:tenant_id', getAllFeedback);

export default router;