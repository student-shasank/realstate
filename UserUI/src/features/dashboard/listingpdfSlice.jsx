// src/redux/pdfSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendListingPdfAPI } from "../../Constant/constant.js";

// ----------------------
// Async Thunk
// --------------------
export const sendListingPdf = createAsyncThunk( 
  "pdf/sendListingPdf",
  async ({ listingId, email }, thunkAPI) => {
    try {
      const response = await axios.post(sendListingPdfAPI, {
        listingId,
        email,
      });

      return response.data;
     
    } catch (error) {
      console.error("SEND PDF ERROR:", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to send PDF"
      );
    }
  }
);

// ----------------------
// Slice
// ----------------------
const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetPdfState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ----------------------
      // Pending
      // ----------------------
      .addCase(sendListingPdf.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // ----------------------
      // Fulfilled
      // ----------------------
      .addCase(sendListingPdf.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      // ----------------------
      // Rejected
      // ----------------------
      .addCase(sendListingPdf.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to send PDF";
      });
  },
});

export const { resetPdfState } = pdfSlice.actions;
export default pdfSlice.reducer;
