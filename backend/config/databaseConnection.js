// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected");
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";
import Listing from "../models/Listing.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // ── Safe index ensure — conflict hone par skip karo ──────────
    try {
      await Listing.collection.dropIndex("propertyStatus_1_createdAt_-1").catch(() => {});
      await Listing.collection.dropIndex("listing_status_date").catch(() => {});
      await Listing.collection.dropIndex("listing_text_search").catch(() => {});

      await Listing.collection.createIndex(
        { title: "text", city_name: "text", district_name: "text", developer_name: "text" },
        { name: "listing_text_search", background: true }
      );
      await Listing.collection.createIndex(
        { propertyStatus: 1, createdAt: -1 },
        { name: "listing_status_date", background: true }
      );

      console.log("MongoDB Indexes ensured ✅");
    } catch (indexErr) {
      // Index error pe server band mat karo — sirf log karo
      console.warn("Index setup skipped (non-fatal):", indexErr.message);
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;