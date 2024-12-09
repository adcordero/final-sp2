import Apartment from "../models/apartment_model.js";
import Tenant from "../models/tenant_model.js";
import Unit from "../models/unit_model.js";
import cron from "node-cron";
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

// gets all active tenants with units
export const getAllActiveTenants = async (req, res, next) => {
  try {
    const tenants = await Tenant.find({
      status: "Active",
      unit_id: { $ne: null },
    }).exec();
    return res.status(200).json(tenants);
  } catch (error) {
    next(error);
  }
};

// get all active tenants with no units
export const getAllNoUnitTenants = async (req, res, next) => {
  try {
    const tenants = await Tenant.find({ status: "Active", unit_id: "" }).exec();

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
    // const unit = await Unit.findById(req.body.unit_id);
    const deadlines = [];

    if (req.body.unit_id) {
      const updateUnit = await Unit.findByIdAndUpdate(
        req.body.unit_id,
        {
          $set: {
            tenant_id: req.params.id,
            status: "Occupied",
          },
        },
        { new: true }
      );

      const updatedTenant = await Tenant.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            email: req.body.email,
            contact_num: req.body.contact_num,
            unit_id: req.body.unit_id,
            unit_name: req.body.unit_name,
            apt_name: updateUnit.apt_name,
            moved_in_day: req.body.moved_in_day,
            rent: req.body.rent,
          },
        },
        { new: true }
      );

      cron.schedule("0 0 1 * *", async () => {
        try {
          // Get the current month and year
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth(); // 0-indexed
          
          while (month < 12) {
            // const deadlineDay = new Date(year, month + 1, 1);
            // deadlines.push(deadlineDay);
            // month++;

            const deadlineDate = new Date(year, month, req.body.moved_in_day);
            deadlineDate.push()

          }

        } catch (error) {
          next(error);
        }
      });

      return res.status(200).json(updatedTenant);
      // else if ();
    }

    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          contact_num: req.body.contact_num,
          unit_id: req.body.unit_id,
          unit_name: req.body.unit_name,
          // apt_name: unit.apt_name,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedTenant);
  } catch (error) {
    next(error);
  }
};
