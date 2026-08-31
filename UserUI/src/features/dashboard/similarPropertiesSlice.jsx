import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Similar_Listings_Api } from "../../Constant/constant.js";

// Async thunk that GETs similar listings from the backend,
// filtered by the current property's location.
export const fetchSimilarListings = createAsyncThunk(
  "similarListings/fetchSimilarListings",
  async ({ community, city, excludeId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Similar_Listings_Api}`, {
        params: {
          community,
          city,
          excludeId,
          limit: 10,
        },
      });
      return response.data;
    } catch (error) {
      // Normalize error shape so the component can read a clean message
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while fetching similar listings.";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  listings: [],
};

const similarListingsSlice = createSlice({
  name: "similarListings",
  initialState,
  reducers: {
    resetSimilarListingsState: (state) => {
      state.status = "idle";
      state.error = null;
      state.listings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarListings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSimilarListings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listings =
          action.payload?.listings || action.payload?.data || action.payload || [];
      })
      .addCase(fetchSimilarListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch similar listings.";
        state.listings = [];
      });
  },
});

export const { resetSimilarListingsState } = similarListingsSlice.actions;
export default similarListingsSlice.reducer;