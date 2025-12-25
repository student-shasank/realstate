import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "user" },
    ipAddress: String,

    //  Favirot THIS
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
