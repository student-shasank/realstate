import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },

  ipAddress: String,          // 👈 add this
}, { timestamps: true });

export default mongoose.model("User", UserSchema);


