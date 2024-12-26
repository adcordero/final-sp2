import Feedback from "../models/feedback_model.js";

// create new feedback
export const createFeedback = async (req, res, next) => {
    try {
        const fb = await Feedback.create(req.body);
        return res.status(201).json(fb);
    } catch (error) {
        next(error);
    }
};

export const getAllFeedback = async (req, res, next) => {
    try {
        const fb = await Feedback.find({ tenant_id: req.params.tenant_id });
        return res.status(200).json(fb);
    } catch (error) {
        next(error);
        
    }
};