import express from 'express';
import { createFeedback, getAllFeedback, getOneFB } from '../controllers/feedback_controller.js';

const router = express.Router();

router.post('/create-feedback', createFeedback);

router.get('/get-all-feedback/:tenant_id', getAllFeedback);
router.get('/get-one-feedback/:id', getOneFB);

export default router;