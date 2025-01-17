import Rent from "../models/rent_model.js";
import Tenant from "../models/tenant_model.js";
import Unit from "../models/unit_model.js";
import Owner from "../models/owner_model.js";
import { sendOwnerProofReceived, sendTenantProofSent } from "../utilities/nodemailer_config.js";

export const getAllRents = async (req, res, next) => {
  try {
    const rent = await Rent.find({ tenant_id: req.params.id });
    return res.status(200).json(rent);
  } catch (error) {
    next(error);
  }
};

export const getAllRentsOwner = async (req, res, next) => {
  try {
    const rent = await Rent.find();
    return res.status(200).json(rent);
  } catch (error) {
    next(error);
  }
};

export const getOneRent = async (req, res, next) => {
  try {
    const rent = await Rent.findById(req.params.id);
    return res.status(200).json(rent);
  } catch (error) {
    next(error);
  }
};

export const updateRentImage = async (req, res, next) => {
  try {
    const rent = await Rent.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          payment_proof: req.body.image,
          status: "Pending",
        },
      },
      { new: true }
    );

    const unit = await Unit.findById(rent.unit_id);

    const owner = await Owner.findById(unit.owner_id);

    sendTenantProofSent(owner.email, "Rent")

    return res.status(200).json(rent);
  } catch (error) {
    next(error);
  }
};

export const getPendingRents = async (req, res, next) => {
  try {
    const rent = await Rent.find({ status: "Pending" });
    return res.status(200).json(rent);
  } catch (error) {
    next(error);
    
  }
};

export const getPaidRents = async (req, res, next) => {
  try {
    const rent = await Rent.find({ status: "Paid" });
    return res.status(200).json(rent);
  } catch (error) {
    next(error);
    
  }
};

export const getUnpaidRents = async (req, res, next) => {
  try {
    const rent = await Rent.find({ status: "Unpaid" });
    return res.status(200).json(rent);
  } catch (error) {
    next(error);
    
  }
};

export const updateRentStatus = async (req, res, next) => {
  try {
    const rent = await Rent.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          invoice: req.body.image,
          status: "Paid",
        },
      },
      { new: true }
    );

    // console.log(rent.tenant_id);

    const tenantBal = await Tenant.findById(rent.tenant_id);

    const tenant = await Tenant.findByIdAndUpdate(
      rent.tenant_id,
      {
        $set: {
          balance: parseInt(tenantBal.balance, 10) - parseInt(rent.amount, 10),
        },
      },
      { new: true }
    );

    sendOwnerProofReceived(tenant.email, "Rent")

    return res.status(200).json(rent);
  } catch (error) {
    next(error);
  }
};
