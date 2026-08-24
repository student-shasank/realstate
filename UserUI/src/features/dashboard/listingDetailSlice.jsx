import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchListingById } from "../../Constant/constant.js";

// ----------------------
// Async Thunk — MongoDB se _id ke basis par listing detail fetch karta hai
// Route: GET {BASE_URL}/listing/detail/:id
// ----------------------
export const fetchListingDetail = createAsyncThunk(
  "listingDetail/fetchListingDetail",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${fetchListingById}/${id}`);

      const data = response.data?.data || response.data;

      return {
        ...data,
        id: data?.id || id, // fallback ensure
        _id: data?._id || id, // fallback ensure
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
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
      // Pending
      .addCase(fetchListingDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // Fulfilled
      .addCase(fetchListingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.listing = action.payload;
      })

      // Rejected
      .addCase(fetchListingDetail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch listing detail";
      });
  },
});

export const { resetListingDetailState } = listingDetailSlice.actions;

// ✅ Fix: .reducer (pehle .reduce likha tha jo galat hai)
export default listingDetailSlice.reducer;