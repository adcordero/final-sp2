import express from 'express';
import { createFeedback, getOneFB, getRepliedFeedbacks, getTenantFeedbacks, getUnrepliedFeedbacks } from '../controllers/feedback_controller.js';

const router = express.Router();

router.post('/create-feedback', createFeedback);

router.get('/get-tenant-feedback/:tenant_id', getTenantFeedbacks);
router.get('/get-one-feedback/:id', getOneFB);

// owner side
router.get('/get-unreplied-feedbacks', getUnrepliedFeedbacks);
router.get('/get-replied-feedbacks', getRepliedFeedbacks);


export default router;