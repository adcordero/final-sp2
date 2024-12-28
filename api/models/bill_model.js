import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
    {
        owner_id: {
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
        amount: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Unpaid', 'Pending', 'Paid'],
            default: 'Unpaid'
        },
        bill_type: {
            type: String,
            enum: ['Water', 'Electricity'],
            required: true,
            default: null
        },
        payment_proof: {
            type: String,
            default: null
        },
        bill_proof: {
            type: String,
            required: null
        }
    },
    {
        timestamps: true,
    }
);

const Bill = mongoose.model("Bill", billSchema);
export default Bill;