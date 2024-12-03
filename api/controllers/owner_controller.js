import Apartment from "../models/apartment_model.js";
import Tenant from "../models/tenant_model.js";
import Unit from "../models/unit_model.js";
import { errorHandler } from "../utilities/error.js";

// gets owner's apartments
export const getUserApts = async (req, res, next) => {
  try {
    const apt = await Apartment.find({ owner_id: req.params.id });
    res.status(200).json(apt);
  } catch (error) {
    next(error);
  }
};

// gets owner's units
export const getUserUnits = async (req, res, next) => {
  try {
    const aptUnits = await Unit.find({ owner_id: req.params.id });
    res.status(200).json(aptUnits);
  } catch (error) {
    next(error);
  }
};

// gets all tenants
export const getAllTenants = async (req, res, next) => {
  try {
    const tenants = await Tenant.find();
    return res.status(200).json(tenants);
  } catch (error) {
    next(error);
  }
};

// gets tenant by id
export const getTenantById = async (req, res, next) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    return res.status(200).json(tenant);
  } catch (error) {
    next(error);
  }
};

//   links tenant to unit and update's unit status to occupied
export const updateTenant = async (req, res, next) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          apt_id: req.body.apt_id,
          apt_name: req.body.apt_name,
        },
      },
      { new: true }
    );

    const updateUnit = await Unit.findByIdAndUpdate(
      req.body.apt_id,
      {
        $set: {
          tenant_id: req.params.id,
          status: "Occupied",
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedTenant);
  } catch (error) {
    next(error);
  }
};
