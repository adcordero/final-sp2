import mongoose from "mongoose";
import cron from "node-cron";
import Tenant from "../models/tenant_model.js";
import Rent from "../models/rent_model.js";
import { sendRentBillCreation } from "./nodemailer_config.js";

// runs every 1st of the month
export default async function rentAutomation() {
  console.log("Rent automation started");

//   "*/1 * * * *" => every minute
// "0 0 1 * *" => every 1st of the month
  cron.schedule("0 0 1 * *", async () => {
    // console.log("Cron job is running every minute...");
    // status: "Active" => gets all active tenants

    try {
      const getTenants = await Tenant.find({ _id: "67702e58280dbe9ee10db594", unit_id: { $ne: null } });

    //   console.log(getTenants);

      // Get the current month and year
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth(); // 0-indexed

      // map through all tenants and create rent instances
      getTenants.forEach(async (tenant) => {
        const deadlineDate = new Date(year, month, tenant.moved_in_day);

        const rent = await Rent.create({
          tenant_id: tenant._id,
          tenant_name: tenant.first_name + " " + tenant.last_name,
          unit_id: tenant.unit_id,
          amount: tenant.rent,
          due_date: deadlineDate.toDateString(),
        });

        const updatedBalance = parseInt(tenant.balance, 10) + parseInt(tenant.rent, 10);

        const updatedTenant = await Tenant.updateOne({ _id: tenant._id }, { balance: updatedBalance.toString() });

        sendRentBillCreation(tenant.first_name, tenant.last_name, tenant.email, "Rent");
      })

    //   const rent = await Rent.create({
    //     tenant_id: "674f3db6bef00a3b9173fea8",
    //     unit_id: "675076bcd840bcd9cec29a38",
    //     amount: "1000",
    //     due_date: "2021-06-01",
    //   });
      console.log("Rent automation ran successfully");
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const getTenants = await Tenant.find();

    //   // Get the current month and year
    //   const currentDate = new Date();
    //   const year = currentDate.getFullYear();
    //   const month = currentDate.getMonth(); // 0-indexed

    //   const instances = allTenants.map(async (tenant) => {
    //     const deadlineDate = new Date(year, month, tenant.moved_in_day);

    //     const rent = await Rent.create({
    //         tenant_id: tenant._id,
    //         unit_id: tenant.unit_id,
    //         amount: tenant.rent,
    //         due_date: deadlineDate,
    //     })
    //   });

    // //   await Rent.insertMany(instances);
    //   console.log("Rent automation ran successfully");
    // } catch (error) {
    //   console.log(error);
    // }
    // Your cron job logic goes here
  });

  // cron.schedule("")

  //   cron.schedule("0 0 1 * *", async () => {
  //     console.log('Cron automation started');
  //     console.log('Cron job executed at:', new Date().toLocaleString());
  //     try {
  //       const allTenants = await Tenant.find();

  //       // Get the current month and year
  //       const currentDate = new Date();
  //       const year = currentDate.getFullYear();
  //       const month = currentDate.getMonth(); // 0-indexed

  //       const instances = allTenants.map((tenant) => {
  //         const deadlineDate = new Date(year, month, tenant.moved_in_day);

  //         return {
  //           tenant_id: tenant._id,
  //           unit_id: tenant.unit_id,
  //           amount: tenant.monthly_rent,
  //           due_date: deadlineDate,
  //         };
  //       });

  //       await Rent.insertMany(instances);
  //       console.log("Rent automation ran successfully");
  //     } catch (error) {
  //       next(error);
  //     }
  //   });
}
