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
    const aptUnit = await Unit.find({ apt_id: req.params.id });
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
          rent: req.body.rent,
          deposit: req.body.deposit,
          advance: req.body.advance,
          apt_id: req.body.apt_id,
          apt_name: req.body.apt_name,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedUnit);
  } catch (error) {
    next(error);
  }
};

// deletes an apartment unit
export const deleteOneUnit = async (req, res, next) => {
  try {
    const toDelUnit = await Unit.findByIdAndDelete(req.params.id);
    return res.status(200).json("Unit has been deleted...");
  } catch (error) {
    next(error);
  }
};

// deletes an apartment and its units
export const deleteApt = async (req, res, next) => {
  try {
    const toDelApt = await Apartment.findByIdAndDelete(req.params.id);
    const toDelUnits = await Unit.deleteMany({ apt_id: req.params.id });
    return res.status(200).json("Apartment and its units have been deleted...");
  } catch (error) {
    next(error);
  }
};

// gets all vacant units
export const getVacantUnits = async (req, res, next) => {
  try {
    const vacantUnits = await Unit.find({ status: "Vacant" });
    return res.status(200).json(vacantUnits);
  } catch (error) {
    next(error);
  }
};
