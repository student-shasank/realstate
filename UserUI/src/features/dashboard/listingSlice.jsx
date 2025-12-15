// src/redux/listingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchListingsAPI } from "../../Constant/constant.js";

// ----------------------
// Async Thunk
// ----------------------
export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (page = 1, thunkAPI) => {
    try {
      const response = await axios.get(
        `${fetchListingsAPI}?page=${page}`
      );

      return response.data;
    } catch (error) {
      console.error("FETCH LISTINGS ERROR:", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch listings"
      );
    }
  }
);

// ----------------------
// Slice
// ----------------------
const listingSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 0,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetListingsState: (state) => {
      state.listings = [];
      state.page = 1;
      state.perPage = 20;
      state.total = 0;
      state.totalPages = 0;
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
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // ----------------------
      // Fulfilled
      // ----------------------
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const payload = action.payload || {};

        state.listings = payload.listings ?? [];
        state.page = payload.page ?? 1;
        state.perPage = payload.perPage ?? 20;
        state.total = payload.total ?? 0;
        state.totalPages = payload.totalPages ?? 0;
      })

      // ----------------------
      // Rejected
      // ----------------------
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch listings";
      });
  },
});

export const { resetListingsState } = listingSlice.actions;
export default listingSlice.reducer;
