import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchListingDetailAPI } from "../../Constant/constant.js";

// ----------------------
// Async Thunk
// ----------------------
export const fetchListingDetail = createAsyncThunk(
  "listingDetail/fetchListingDetail",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${fetchListingDetailAPI}/${id}`
      );

      return response.data.data;
    } catch (error) {
      console.error("FETCH LISTING DETAIL ERROR:", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch listing detail"
      );
    }
  }
);

// ----------------------
// Slice
// ----------------------
const listingDetailSlice = createSlice({
  name: "listingDetail",
  initialState: {
    listing: null,
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetListingDetailState: (state) => {
      state.listing = null;
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
      .addCase(fetchListingDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // ----------------------
      // Fulfilled
      // ----------------------
      .addCase(fetchListingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.listing = action.payload;
      })

      // ----------------------
      // Rejected
      // ----------------------
      .addCase(fetchListingDetail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch listing detail";
      });
  },
});

export const { resetListingDetailState } =
  listingDetailSlice.actions;

export default listingDetailSlice.reducer;
