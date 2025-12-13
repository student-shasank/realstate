import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADMIN_DASHBOARD_URL,
  ADMIN_LISTING_STATUS_URL,
  ADMIN_LISTING_AVAILABILITY_URL,
} from "../../Constant/constant.js";

// -------------------------------------------
// Fetch Dashboard Listings
// -------------------------------------------
export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(ADMIN_DASHBOARD_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load dashboard"
      );
    }
  }
);

// -------------------------------------------
// Update Listing Status
// -------------------------------------------
export const updateListingStatus = createAsyncThunk(
  "dashboard/updateListingStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        ADMIN_LISTING_STATUS_URL(id),
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data; // Updated listing from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update listing status"
      );
    }
  }
);

// -------------------------------------------
// Update Listing Availability
// -------------------------------------------
export const updateListingAvailability = createAsyncThunk(
  "dashboard/updateListingAvailability",
  async ({ id, availability }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        ADMIN_LISTING_AVAILABILITY_URL(id),
        { availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data; // Updated listing from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update availability"
      );
    }
  }
);

// -------------------------------------------
// SLICE
// -------------------------------------------
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: [], // Holds dashboard response
    loading: false,
    error: null,
    statusUpdating: false,
    availabilityUpdating: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Listing Status
      .addCase(updateListingStatus.pending, (state) => {
        state.statusUpdating = true;
      })
      .addCase(updateListingStatus.fulfilled, (state, action) => {
        state.statusUpdating = false;
        const updated = action.payload;
        state.data.listings = state.data.listings.map((listing) =>
          listing._id === updated._id ? updated : listing
        );
      })
      .addCase(updateListingStatus.rejected, (state, action) => {
        state.statusUpdating = false;
        state.error = action.payload;
      })

      // Update Listing Availability
      .addCase(updateListingAvailability.pending, (state) => {
        state.availabilityUpdating = true;
      })
      .addCase(updateListingAvailability.fulfilled, (state, action) => {
        state.availabilityUpdating = false;
        const updated = action.payload;
        state.data.listings = state.data.listings.map((listing) =>
          listing._id === updated._id ? updated : listing
        );
      })
      .addCase(updateListingAvailability.rejected, (state, action) => {
        state.availabilityUpdating = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
