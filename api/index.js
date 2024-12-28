import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import apartmentRouter from "./routes/apartment_routes.js";
import userRouter from "./routes/user_routes.js";
import ownerRouter from "./routes/owner_routes.js";
import rentRouter from "./routes/rent_routes.js";
import feedbackRouter from "./routes/feedback_routes.js";
import billRouter from "./routes/bill_routes.js";

import rentAutomation from "./utilities/rent_automation.js";


import path from "path";

dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection error: " + err);
  });

const __dirname = path.resolve();

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
app.use("/api/feedback", feedbackRouter);
app.use("/api/bill", billRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

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
