import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        unit_id: {
            type: String,
            required: true,
        },
        unit_name: {
            type: String,
            required: true,
        },
        apt_name: {
            type: String,
            required: true,
        },
        tenant_id: {
            type: String,
            required: true,
        },
        tenant_name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: { 
            type: String,
            required: true,
        },
        payment_proof: {
            type: String,
            default: null
        },
        status:{
            type: String,
            enum: ['Unresolved', 'Resolved'],
            default: 'Unresolved'
        },
        reply: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
    }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;