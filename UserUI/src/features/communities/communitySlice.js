import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COMMUNITIES_URL } from "../../Constant/constant";

// 1. Navigation List Fetch with Pagination
export const fetchNavList = createAsyncThunk(
  "community/fetchNavList",
  async (page = 1) => {
    const response = await axios.get(
      `${COMMUNITIES_URL}/navigation?page=${page}&limit=9`
    );
    return response.data;
  }
);

// 2. Profile Details Fetch
export const fetchCommunityProfile = createAsyncThunk(
  "community/fetchProfile",
  async (slug) => {
    const response = await axios.get(`${COMMUNITIES_URL}/profile/${slug}`);
    return response.data.data;
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState: {
    navList: [],
    currentProfile: null,
    loading: false,
    hasMore: true,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.currentProfile = null;
    },
    // ✅ Important: List reset karne ke liye
    resetNavList: (state) => {
      state.navList = [];
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNavList.fulfilled, (state, action) => {
        state.loading = false;

        const newData = action.payload?.data || [];

        // ✅ FIXED DUPLICATE CHECK (handles _id as string or {_id: {$oid}})
        const getId = (x) => x?._id?.$oid || x?._id;

        const filteredData = newData.filter(
          (newItem) =>
            !state.navList.some((oldItem) => getId(oldItem) === getId(newItem))
        );

        state.navList = [...state.navList, ...filteredData];
        state.hasMore = action.payload?.hasMore ?? false;
      })
      .addCase(fetchNavList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchCommunityProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommunityProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload;
      })
      .addCase(fetchCommunityProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProfile, resetNavList } = communitySlice.actions;
export default communitySlice.reducer;
