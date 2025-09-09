import mongoose from "mongoose"


const LeadSchema = new mongoose.Schema(
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

    image: {
      type: String,
      required: true,
    },

    Tag: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    Employee: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      required: true,

    },
  },
  { timestamps: true }
);

const Leads = mongoose.model("Leads", LeadSchema);

export default Leads;
