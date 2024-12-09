import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
    {
        tenant_id: {
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
            enum: ['Pending', 'Paid'],
            default: 'Pending'
        }
    },
    {
        timestamps: true,
    }
);

const Rent = mongoose.model("Rent", rentSchema);

export default Rent;