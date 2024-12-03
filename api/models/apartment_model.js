import mongoose from "mongoose";

const aptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true,
    },
    // description: {
    //   type: String,
    //   required: true,
    // },
    owner_id: {
      type: String,
      required: true
      // sparse:true
    },
    status: {
      type: String,
      enum: ['With Vacancy', 'Fully Occupied'],
      default: 'With Vacancy'
    }
  },
  {
    timestamps: true,
  }
);

const Apartment = mongoose.model("Apartment", aptSchema);

export default Apartment;
