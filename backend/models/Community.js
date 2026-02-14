import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    // Basic Details
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, 
    },

    latitude: { 
      type: Number, 
      default: 25.0743 
    },
    longitude: { 
      type: Number, 
      default: 55.3857 
    },

    // Hero Section (3 Cards with Titles, Subtitles, and Images)
    hero: {
      cards: [
        {
          title: { type: String, trim: true },
          subtitle: { type: String, trim: true },
          image: { type: String }, // URL / path
        },
      ],
    },

    // Main Content Sections
    overview: {
      html: { type: String },
      image: { type: String }, // Overview big image

      // ✅ NEW: Location & Connectivity (rich text HTML)
      locationConnectivityHtml: { type: String },
    },

    planningNote: {
      html: { type: String },
    },

    // Sidebar Content (Worship & Read More)
    sidebar: {
      worshipHtml: { type: String },
      readMoreHtml: { type: String },
    },

    // ✅ NEW: Market Data section (description + activity note)
    marketData: {
      descriptionHtml: { type: String },

      activityNote: {
        title: { type: String },
        updatedText: { type: String }, // "Data last updated: ..."
        noteLine: { type: String }, // "Editable line for notes..."
        source: { type: String }, // "Source: ..."
      },
    },

    // Market & Supply Data
    marketSupply: {
      rows: [
        {
          label: { type: String },
          value: { type: String },
        },
      ],
      image: { type: String }, // Market Data image
    },

    // Frequently Asked Questions
    faqs: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],

    // Legal / Disclaimer
    disclosure: {
      html: { type: String },
    },

    // Page Status
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

// Slug index for performance (already indexed above, still fine)
communitySchema.index({ slug: 1 });

const Community = mongoose.model("Community", communitySchema);
export default Community;
