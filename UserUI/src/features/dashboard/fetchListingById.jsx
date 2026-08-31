import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchListingById } from "../../Constant/constant.js";

// =======================
// THUNK
// =======================
export const fetchListingByIdThunk = createAsyncThunk(
  "listing/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
       `${fetchListingById}/${id}`
      );

      const data = response.data?.data;

      console.log("LISTING BY ID:", data);

      if (!data || Object.keys(data).length === 0) {
        return thunkAPI.rejectWithValue("No listing found");
      }

      return {
        ...data,
        id: data?.id || id,
      };
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch listing"
      );
    }
  }
);

// =======================
// SLICE
// =======================
const listingByIdSlice = createSlice({
  name: "listingById",
  initialState: {
    listing: null,
    loading: false,
    error: null,
  },

  reducers: {
    resetListingById: (state) => {
      state.listing = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchListingByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.listing = action.payload;
      })
      .addCase(fetchListingByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetListingById } = listingByIdSlice.actions;
export default listingByIdSlice.reducer;