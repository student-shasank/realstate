import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN_Communities } from "../Constant/constant.js"

// Thunk to handle the multipart form-data submission
export const saveCommunity = createAsyncThunk(
  "community/save",
  async ({ payload, heroImages, overviewImage, marketImage }, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(payload));

      // Append Hero Images (1-3)
      heroImages.forEach((file, idx) => {
        if (file) fd.append(`heroImage_${idx}`, file);
      });

      // Append Overview Image (4)
      if (overviewImage) fd.append("overviewImage", overviewImage);

      // Append Market Image (5)
      if (marketImage) fd.append("marketImage", marketImage);

      const res = await axios.post(ADMIN_Communities, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetCommunityStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCommunity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCommunity.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(saveCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCommunityStatus } = communitySlice.actions;
export default communitySlice.reducer;