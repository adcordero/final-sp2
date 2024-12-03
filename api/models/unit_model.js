import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rent: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Vacant', 'Occupied'],
            default: 'Vacant'
        },
        apt_id: {
            type: String,
            required: true
        },
        owner_id: {
            type: String,
            required: true
        },
        apt_name: {
            type: String,
            required: true
        },
        tenant_id: {
            type: String
        },

    },
    {
        timestamps: true,
      }
);

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;