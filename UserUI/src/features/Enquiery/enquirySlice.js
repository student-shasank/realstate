import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendListingEnquiry = createAsyncThunk(
  "enquiry/sendListingEnquiry",
  async ({ listingId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/enquiry/listing",
        { listingId },
        { withCredentials: true } // agar cookies/session use kar rahe ho
      );
      return data;
    } catch (err) {
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
