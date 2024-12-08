import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import apartmentRouter from "./routes/apartment_routes.js";
import userRouter from "./routes/user_routes.js";
import ownerRouter from "./routes/owner_routes.js";
import rentRouter from "./routes/rent_routes.js";
import rentAutomation from "./utilities/rent_automation.js";

dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection error: " + err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is listening at port 3000!!");
});

app.use("/api/user", userRouter);
app.use("/api/apartment", apartmentRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/rent", rentRouter);

rentAutomation();

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
