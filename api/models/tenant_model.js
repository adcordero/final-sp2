import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
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
        default: 'Tenant'
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
    unit_id: {
        type: String,
        default: ''
    },
    unit_name: {
        type: String,
        default: ''
    },
    apt_name: {
        type: String,
        default: ''
    },
    balance: {
        type: String,
        default: 0
    },
    moved_in_day: {
        type: String,
        default: ''
    },
    rent: {
        type: String,
        default: '0'
    },
},
{
    timestamps: true,
})

const Tenant = mongoose.model("Tenant", tenantSchema)

export default Tenant;