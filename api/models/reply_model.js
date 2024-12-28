import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    feedback_id: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.model("Reply", replySchema);
export default Reply;
