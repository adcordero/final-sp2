import express from 'express';
import { createFeedback, getAllFeedbacks, getOneFB, getOneReply, getTenantFeedbacks,  replyFeedback } from '../controllers/feedback_controller.js';

const router = express.Router();

router.post('/create-feedback', createFeedback);

router.get('/get-tenant-feedback/:tenant_id', getTenantFeedbacks);
router.get('/get-one-feedback/:id', getOneFB);

// owner side
router.post('/reply-feedback/:id', replyFeedback);
router.get('/get-one-reply/:id', getOneReply);
router.get('/get-all-feedbacks', getAllFeedbacks);


export default router;