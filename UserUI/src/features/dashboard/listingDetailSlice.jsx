import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchListingDetailAPI, Token } from "../../Constant/constant.js";

// ----------------------
// Async Thunk
// ----------------------
export const fetchListingDetail = createAsyncThunk(
  "listingDetail/fetchListingDetail",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        fetchListingDetailAPI,
        {},
        {
          params: {
            fk_project_id: id,
          },
          headers: {
            Authorization: `Bearer ${"c137153e7594e1388278ce6fb5ed80b88b86bb09f8fdf8ee2e834dea59383dd1"}`,
          },
        }
      );

      const data = response.data?.data;
      console.log(data)

     return {
  ...data,
  id: data?.id || id,     // 👈 ensure id always ho
  _id: data?._id || id,   // 👈 fallback (important)
};
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
)
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
