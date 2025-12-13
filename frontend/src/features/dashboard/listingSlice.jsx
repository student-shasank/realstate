import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN_LISTINGS_URL } from "../../Constant/constant.js";

// CREATE LISTING WITH FILES
export const createListing = createAsyncThunk(
  "listing/createListing",
  async (formData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
      ADMIN_LISTINGS_URL ,
        formData, // FormData object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
  },
  reducers: {
    resetListingState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetListingState } = listingSlice.actions;
export default listingSlice.reducer;
