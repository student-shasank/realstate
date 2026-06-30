import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ENQUIRY_API } from "../../Constant/constant.js";

export const sendListingEnquiry = createAsyncThunk(
  "enquiry/sendListingEnquiry",
  async ({ listingId, name, email, phone, requestType }, { rejectWithValue }) => {
    // DEBUG LOGS — yeh dikhayega ki thunk ko kya data mila
    console.log("🔍 sendListingEnquiry called with:", {
      listingId,
      name,
      email,
      phone,
      requestType,
    });
    console.log("🔍 ENQUIRY_API URL:", ENQUIRY_API);

    if (!name || !email || !phone) {
      console.warn("⚠️ Missing fields BEFORE sending to backend:", {
        nameMissing: !name,
        emailMissing: !email,
        phoneMissing: !phone,
      });
    }

    try {
      const { data } = await axios.post(
        ENQUIRY_API,
        { listingId, name, email, phone, requestType },
        { withCredentials: true }
      );
      console.log("✅ Enquiry success response:", data);
      return data;
    } catch (err) {
      console.error("❌ Enquiry failed:", err?.response?.data || err.message);
      return rejectWithValue(err?.response?.data?.message || "Enquiry failed");
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetEnquiryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendListingEnquiry.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendListingEnquiry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendListingEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Enquiry failed";
      });
  },
});

export const { resetEnquiryState } = enquirySlice.actions;
export default enquirySlice.reducer;