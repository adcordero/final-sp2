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

export const getTenantFeedbacks = async (req, res, next) => {
  try {
    const fb = await Feedback.find({ tenant_id: req.params.tenant_id });
    return res.status(200).json(fb);
  } catch (error) {
    next(error);
  }
};

export const getOneFB = async (req, res, next) => {
  try {
    const fb = await Feedback.findById(req.params.id);
    return res.status(200).json(fb);
  } catch (error) {
    next(error);
  }
};

export const getUnrepliedFeedbacks = async (req, res, next) => {
  try {
    const fb = await Feedback.find({ status: "Unresolved" });
    return res.status(200).json(fb);
  } catch (error) {
    next(error);
  }
};

export const getRepliedFeedbacks = async (req, res, next) => {
  try {
    const fb = await Feedback.find({ status: "Resolved" });
    return res.status(200).json(fb);
  } catch (error) {
    next(error);
  }
};
