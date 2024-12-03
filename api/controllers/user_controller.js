import bcryptjs from "bcryptjs";
import { errorHandler } from "../utilities/error.js";
import jwt from "jsonwebtoken";
import { sendEmailConfirmation } from "../utilities/nodemailer_config.js";
import Apartment from "../models/apartment_model.js";
import Unit from "../models/unit_model.js";
import Tenant from "../models/tenant_model.js";
import Owner from "../models/owner_model.js";

// tenant sign up
export const tenantSignUp = async (req, res, next) => {
  const {
    first_name,
    mid_name,
    last_name,
    contact_num,
    email,
    password,
    apt_id,
  } = req.body;

  const hashedPass = bcryptjs.hashSync(password, 10);
  const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN);

  const newTenant = new Tenant({
    first_name,
    mid_name,
    last_name,
    contact_num,
    email,
    password: hashedPass,
    confirm_code: token,
    apt_id: "",
  });

  try {
    await newTenant.save();

    sendEmailConfirmation(first_name, last_name, email, token);

    res.status(201).json("Please confirm email!");
  } catch (error) {
    next(error);
  }
};

// owner sign up
export const ownerSignUp = async (req, res, next) => {
  const { first_name, mid_name, last_name, contact_num, email, password } =
    req.body;
  const hashedPass = bcryptjs.hashSync(password, 10);
  const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN);

  const newOwner = new Owner({
    first_name,
    mid_name,
    last_name,
    contact_num,
    email,
    password: hashedPass,
    confirm_code: token,
  });
  try {
    await newOwner.save();

    sendEmailConfirmation(first_name, last_name, email, token);

    res.status(201).json("Please confirm email!");
  } catch (error) {
    next(error);
  }
};

// email verification
export const emailVerified = async (req, res, next) => {
  try {
    // console.log(req.params.confirm_code)

    const validTenant = await Tenant.findOne({
      confirm_code: req.params.confirm_code,
    });
    // console.log(req.params.confirm_code);

    if (validTenant) {
      validTenant.status = "Active";
      validTenant.save();
    }

    const validOwner = await Owner.findOne({
      confirm_code: req.params.confirm_code,
    });

    if (!validOwner) return next(errorHandler(404, "User not found."));

    validOwner.status = "Active";
    validOwner.save();

    // User.updateOne
  } catch (error) {
    next(error);
  }
};

// sign in
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validOwner = await Owner.findOne({ email });

    if (validOwner) {
      if (validOwner.status != "Active")
        return next(errorHandler(401, "Please Verify Your Email!"));

      const isValid = bcryptjs.compareSync(password, validOwner.password);

      if (!isValid) return next(errorHandler(400, "Invalid credentials."));

      const token = jwt.sign({ id: validOwner._id }, process.env.JWT_TOKEN);
      const { password: pass, ...rest } = validOwner._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }

    const validTenant = await Tenant.findOne({ email });
    if (!validTenant) return next(errorHandler(404, "User not found."));

    if (validTenant.status != "Active") {
      return next(errorHandler(401, "Please Verify Your Email!"));
    }

    const isValid = bcryptjs.compareSync(password, validTenant.password);

    if (!isValid) return next(errorHandler(400, "Invalid credentials."));

    const token = jwt.sign({ id: validTenant._id }, process.env.JWT_TOKEN);
    const { password: pass, ...rest } = validTenant._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

    // res.cookie('access_token', {httpOnly: true}).status(200).json(rest)
  } catch (error) {
    next(error);
  }
};

// sign out
export const signOut = (req, res, next) => {
  // console.log(req.params.id);

  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

// get owner's apartments
export const getUserApts = async (req, res, next) => {
  try {
    const apt = await Apartment.find({ owner_id: req.params.id });
    res.status(200).json(apt);
  } catch (error) {
    next(error);
  }
};

// get owner's units
export const getUserUnits = async (req, res, next) => {
  try {
    const aptUnits = await Unit.find({ owner_id: req.params.id });
    res.status(200).json(aptUnits);
  } catch (error) {
    next(error);
  }
};
