import Feedback from "../models/feedback_model.js";
import Reply from "../models/reply_model.js";

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

export const replyFeedback = async (req, res, next) => {
  try {
    const rep = await Reply.create(req.body);
    // console.log(rep._id)

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "Resolved",
          reply_id: rep._id,
        },
      },
      { new: true }
    );

    return res.status(201).json(rep);
  } catch (error) {
    next(error);
  }
};
export const getOneReply = async (req, res, next) => {
  try {
    const rep = await Reply.findById(req.params.id);
    return res.status(200).json(rep);
  } catch (error) {
    next(error);
  }
};
