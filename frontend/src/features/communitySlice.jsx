import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN_Communities } from "../Constant/constant.js";

// =======================
// CREATE COMMUNITY
// =======================
export const saveCommunity = createAsyncThunk(
  "community/save",
  async ({ payload, heroImages, overviewImage, marketImage }, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(payload));

      // ✅ Same field name "heroImages" 3 baar append — multer isse array collect karta hai
      heroImages.forEach((file) => {
        if (file) fd.append("heroImages", file);
      });

      if (overviewImage) fd.append("overviewImage", overviewImage);
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

// =======================
// FETCH COMMUNITIES
// =======================
export const fetchCommunities = createAsyncThunk(
  "community/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(ADMIN_Communities);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch communities");
    }
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState: {
    loading: false,
    success: false,
    error: null,
    communities: [],   // 👈 important
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

      // ================= SAVE =================
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
      })

      // ================= FETCH =================
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload.data || action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCommunityStatus } = communitySlice.actions;
export default communitySlice.reducer;