import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { COMMUNITIES_URL } from '../../Constant/constant';

// Base URL (User Backend ka port)


// 1. Navigation List Fetch (Dropdown ke liye)
export const fetchNavList = createAsyncThunk('community/fetchNavList', async () => {
  const response = await axios.get(`${COMMUNITIES_URL}/navigation`);
  return response.data.data; // Postman mein humne dekha data.data mein array hai
});  

// 2. Profile Details Fetch (Slug se)
export const fetchCommunityProfile = createAsyncThunk('community/fetchProfile', async (slug) => {
  const response = await axios.get(`${COMMUNITIES_URL}/profile/${slug}`);
  return response.data.data;
});

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    navList: [],
    currentProfile: null,
    loading: false,
    error: null
  },
  reducers: {
    clearProfile: (state) => {
      state.currentProfile = null; // Taaki naye page par purana data na dikhe
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchNavList.pending, (state) => {
      state.loading = true; // Data aane tak loading true rakho
    })
    .addCase(fetchNavList.fulfilled, (state, action) => {
      state.loading = false; // Data aa gaya, loading band
      state.navList = action.payload;
    })
    .addCase(fetchNavList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
      // Navigation List
      // Profile Data
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
  }
});

export const { clearProfile } = communitySlice.actions;
export default communitySlice.reducer;
