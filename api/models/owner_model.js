import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    mid_name: {
        type: String,
        required: false,
    },
    last_name: {
        type: String,
        required: true
    },
    contact_num: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        default: 'Owner'
    },
    status : {
        type: String,
        enum: ['Pending', 'Active', 'Inactive'],
        default: 'Pending'
    },
    confirm_code: { 
        type: String, 
        unique: true
    },
},
{
    timestamps: true,
})

const Owner = mongoose.model("Owner", ownerSchema)

export default Owner;