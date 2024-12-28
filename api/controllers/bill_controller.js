import Bill from "../models/bill_model.js";
import Owner from "../models/owner_model.js";
import Tenant from "../models/tenant_model.js";
import { sendOwnerProofReceived, sendRentBillCreation, sendTenantProofSent } from "../utilities/nodemailer_config.js";

export const createBill = async (req, res, next) => {
  try {
    const newBill = await Bill.create(req.body);

    const tenant = await Tenant.findById(req.body.tenant_id);

    const tenantUpdate = await Tenant.findByIdAndUpdate(
      req.body.tenant_id,
      {
        $set: {
          balance: parseInt(tenant.balance, 10) + parseInt(req.body.amount, 10),
        },
      },
      { new: true }
    );

    sendRentBillCreation(tenant.first_name, tenant.last_name, tenant.email, req.body.bill_type);

    return res.status(201).json(newBill);
  } catch (error) {
    next(error);
  }
};

export const updateBillTenant = async (req, res, next) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          payment_proof: req.body.image,
          status: "Pending",
        },
      },
      { new: true }
    );

    const owner = await Owner.findById(updatedBill.owner_id);

    sendTenantProofSent(owner.email, updatedBill.bill_type);

    return res.status(200).json(updatedBill);
  } catch (error) {
    next(error);
  }
};

export const acknowledgeBill = async (req, res, next) => {
  try {

    const bill = await Bill.findById(req.params.id);

    const tenant = await Tenant.findById(bill.tenant_id);

    const updatedTenant = await Tenant.findByIdAndUpdate(
      bill.tenant_id,
      {
        $set: {
          balance: parseInt(tenant.balance, 10) - parseInt(bill.amount, 10),
        },
      },
      { new: true }
    );

    const updated = await Bill.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "Paid",
        },
      },
      { new: true }
    );

    sendOwnerProofReceived(tenant.email, bill.bill_type);

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const getAllWaterOwner = async (req, res, next) => {
  try {
    const bills = await Bill.find({
      bill_type: "Water",
    }).exec();

    return res.status(200).json(bills);
  } catch (error) {
    next(error);
  }
};

export const getAllElectOwner = async (req, res, next) => {
  try {
    const bills = await Bill.find({
      bill_type: "Electricity",
    }).exec();

    return res.status(200).json(bills);
  } catch (error) {
    next(error);
  }
};

export const getOneBill = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id);
    return res.status(200).json(bill);
  } catch (error) {
    next(error);
  }
};


export const getAllTenantWater = async (req, res, next) => {
  try {
    const water = await Bill.find({
      tenant_id: req.params.id,
      bill_type: "Water",
    });
    return res.status(200).json(water);
  } catch (error) {
    next(error);
  }
};

export const getAllTenantElectricity = async (req, res, next) => {
  try {
    const electricity = await Bill.find({
      tenant_id: req.params.id,
      bill_type: "Electricity",
    });
    return res.status(200).json(electricity);
  } catch (error) {
    next(error);
  }
};
