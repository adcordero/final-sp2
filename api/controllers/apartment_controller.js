import Apartment from "../models/apartment_model.js";
import Unit from "../models/unit_model.js";

// create a new apartment
export const createApt = async (req, res, next) => {
  try {
    const apt = await Apartment.create(req.body);
    return res.status(201).json(apt);
  } catch (error) {
    next(error);
  }
};

// find one apartment by id
export const findOneApt = async (req, res, next) => {
  try {
    const apt = await Apartment.findById(req.params.id);
    return res.status(200).json(apt);
  } catch (error) {
    next(error);
  }
};

// create a new apartment unit
export const createUnit = async (req, res, next) => {
  try {
    const aptUnit = await Unit.create(req.body);
    return res.status(201).json(aptUnit);
  } catch (error) {
    next(error);
  }
};

// find all apartment units
export const findUnits = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const aptUnit = await Unit.find({ est_id: req.params.id });
    return res.status(201).json(aptUnit);
  } catch (error) {
    next(error);
  }
};

//find one apartment unit by id
export const findOneUnit = async (req, res, next) => {
  try {
    const aptUnit = await Unit.findById(req.params.id);
    return res.status(200).json(aptUnit);
  } catch (error) {
    next(error);
  }
};

// update an apartment
// owner_id: req.body.owner_id,
// status: req.body.status,
export const updateApt = async (req, res, next) => {
  try {
    const updatedApt = await Apartment.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedApt);
  } catch (error) {
    next(error);
  }
};

// update an apartment unit
export const updateUnit = async (req, res, next) => {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          monthly_rent: req.body.monthly_rent,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedUnit);
  } catch (error) {
    next(error);
  }
};
