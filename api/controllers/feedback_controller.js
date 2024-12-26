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