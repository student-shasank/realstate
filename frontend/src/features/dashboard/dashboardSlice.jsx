import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADMIN_DASHBOARD_URL,
  ADMIN_LISTING_STATUS_URL,
  ADMIN_LISTING_AVAILABILITY_URL,
  ADMIN_LISTING_FEATURED_URL,
} from "../../Constant/constant.js";

// ── Fetch Dashboard (paginated + search) ──────────────────────
export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async ({ page = 1, limit = 20, search = "", status = "All" } = {}, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({ page, limit, search, status });

      const response = await axios.get(`${ADMIN_DASHBOARD_URL}?${params}`, {
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

// ── Update Status ─────────────────────────────────────────────
export const updateListingStatus = createAsyncThunk(
  "dashboard/updateListingStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        ADMIN_LISTING_STATUS_URL(id), 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

// ── Update Availability ───────────────────────────────────────
export const updateListingAvailability = createAsyncThunk(
  "dashboard/updateListingAvailability",
  async ({ id, availability }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        ADMIN_LISTING_AVAILABILITY_URL(id), 
        { availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

// ── Update Featured ───────────────────────────────────────────
export const updateListingFeatured = createAsyncThunk(
  "dashboard/updateListingFeatured",
  async ({ id, isFeatured }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        ADMIN_LISTING_FEATURED_URL(id), 
        { isFeatured },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    listings: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    statusUpdating: false,
    availabilityUpdating: false,
    featuredUpdating: false,
  },
  reducers: {
    // Optimistic update
    patchListing(state, action) {
      const updated = action.payload;
      state.listings = state.listings.map((l) =>
        l._id === updated._id ? { ...l, ...updated } : l
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Dashboard
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading     = false;
        state.data        = action.payload;
        state.currentPage = action.payload.currentPage;
        state.totalPages  = action.payload.totalPages;
        state.totalCount  = action.payload.totalCount;

        // ✅ ALWAYS REPLACE - NOT APPEND (pagination ke liye)
        // Ab har page mein sirf 20 listings hongi, pehle ke listings remove honge
        state.listings = action.payload.listings;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })

      // ✅ Update Status
      .addCase(updateListingStatus.pending, (state) => {
        state.statusUpdating = true;
      })
      .addCase(updateListingStatus.fulfilled, (state, action) => {
        state.statusUpdating = false;
        const updated = action.payload?.listing || action.payload;
        if (updated?._id) {
          state.listings = state.listings.map((l) =>
            l._id === updated._id ? { ...l, ...updated } : l
          );
        }
      })
      .addCase(updateListingStatus.rejected, (state, action) => {
        state.statusUpdating = false;
        state.error = action.payload;
      })

      // ✅ Update Availability
      .addCase(updateListingAvailability.pending, (state) => {
        state.availabilityUpdating = true;
      })
      .addCase(updateListingAvailability.fulfilled, (state, action) => {
        state.availabilityUpdating = false;
        const updated = action.payload?.listing || action.payload;
        if (updated?._id) {
          state.listings = state.listings.map((l) =>
            l._id === updated._id ? { ...l, ...updated } : l
          );
        }
      })
      .addCase(updateListingAvailability.rejected, (state, action) => {
        state.availabilityUpdating = false;
        state.error = action.payload;
      })

      // ✅ Update Featured
      .addCase(updateListingFeatured.pending, (state) => {
        state.featuredUpdating = true;
      })
      .addCase(updateListingFeatured.fulfilled, (state, action) => {
        state.featuredUpdating = false;
        const updated = action.payload?.listing || action.payload;
        if (updated?._id) {
          state.listings = state.listings.map((l) =>
            l._id === updated._id ? { ...l, ...updated } : l
          );
        }
      })
      .addCase(updateListingFeatured.rejected, (state, action) => {
        state.featuredUpdating = false;
        state.error = action.payload;
      });
  },
});

export const { patchListing } = dashboardSlice.actions;
export default dashboardSlice.reducer;