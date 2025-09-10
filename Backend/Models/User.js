import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    refreshToken: { type: String, default: "" }, // store current refresh token (single device)
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
