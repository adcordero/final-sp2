import mongoose from "mongoose";

const waterSchema = new mongoose.Schema(
    {
        tenant_id: {
            type: String,
            required: true
        },
        tenant_name: {
            type: String,
            required: true
        },
        unit_id: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        },
        due_date: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Unpaid', 'Pending', 'Paid'],
            default: 'Unpaid'
        },
        payment_proof: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
    }
);

const Water = mongoose.model("Water", waterSchema);

export default Water;