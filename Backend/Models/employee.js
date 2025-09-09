import mongoose, { Model } from "mongoose";

const EmployeSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    noOfLead: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", EmployeSchema);

export default Employee;
