import Rent from "../models/rent_model.js";

export const getAllRents = async (req, res, next) => {
    try {
        const rent = await Rent.find({ tenant_id: req.params.id });
        res.status(200).json(rent);
    } catch (error) {
        next(error);
    }
};

export const getOneRent = async (req, res, next) => {
    try {
        const rent = await Rent.findById(req.params.id);
        res.status(200).json(rent);
    } catch (error) {
        next(error);
    }
};
