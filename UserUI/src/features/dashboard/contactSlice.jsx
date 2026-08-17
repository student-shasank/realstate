import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import { Contact_Api } from "../../Constant/constant.js";

// Async thunk that POSTs the contact form to the backend,
// which in turn emails the admin.
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Contact_Api}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      // Normalize error shape so the component can read a clean message
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while sending your message.";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  successMessage: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.status = "idle";
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage =
          action.payload?.message || "Your message has been sent!";
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to send message.";
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;