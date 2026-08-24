import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN_LISTINGS_URL } from "../../Constant/constant.js";

// CREATE LISTING WITH FILES
export const createListing = createAsyncThunk(
  "listing/createListing",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(ADMIN_LISTINGS_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // ⚠️ Do NOT set "Content-Type": "multipart/form-data" manually.
          // When you pass a FormData object, axios/the browser automatically
          // sets the correct Content-Type *with the boundary* it generated.
          // Overriding it here drops that boundary and can silently break
          // image uploads / body parsing on the backend.
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create listing"
      );
    }
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    loading: false,
    success: false,
    error: null,
    // Holds the listing object returned by the API right after creation
    // (status will always be "ready" / "active" since the create form
    // forces that on submit). Useful for redirecting straight to the
    // detail page or showing a confirmation summary without refetching.
    createdListing: null,
  },
  reducers: {
    resetListingState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.createdListing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdListing = action.payload?.data || action.payload || null;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetListingState } = listingSlice.actions;
export default listingSlice.reducer;