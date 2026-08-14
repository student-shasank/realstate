import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COMMUNITIES_URL } from "../../Constant/constant";

// ✅ Navbar dropdown — small, fixed list, kabhi search/pagination se affect nahi hoga
export const fetchNavList = createAsyncThunk(
  "community/fetchNavList",
  async () => {
    const response = await axios.get(
      `${COMMUNITIES_URL}/navigation?page=1&limit=20`
    );
    return response.data;
  }
);

// ✅ AllCommunities page — Blog.jsx jaisa: page + search dono ek call mein
export const fetchCommunitiesPage = createAsyncThunk(
  "community/fetchCommunitiesPage",
  async ({ page = 1, perPage = 9, search = "" } = {}) => {
    const response = await axios.get(
      `${COMMUNITIES_URL}/navigation?page=${page}&limit=${perPage}&search=${encodeURIComponent(
        search
      )}`
    );
    return response.data;
  }
);

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
    // Navbar dropdown
    navList: [],

    // AllCommunities page (Blog.jsx pattern)
    items: [],
    currentPage: 1,
    totalPages: 1,
    searchTerm: "",

    currentProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.currentProfile = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // ✅ naya search => page 1 se start
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- Navbar dropdown ----
      .addCase(fetchNavList.fulfilled, (state, action) => {
        state.navList = action.payload?.data || [];
      })

      // ---- AllCommunities page ----
      .addCase(fetchCommunitiesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunitiesPage.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.data || [];
        state.totalPages = action.payload?.totalPages ?? 1;
      })
      .addCase(fetchCommunitiesPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ---- Profile ----
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

export const { clearProfile, setCurrentPage, setSearchTerm } =
  communitySlice.actions;
export default communitySlice.reducer;