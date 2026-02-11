import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleFavorite = createAsyncThunk(
  "favorites/toggle",
  async (listingId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:5000/api/user/listing/favorites",
        { listingId },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      return data; // { success, favorites }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle favorite"
      );
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = (action.payload || []).map((fav) =>
        typeof fav === "string"
          ? fav
          : fav?._id?.toString?.() || fav?.toString?.()
      );
    },

    // ✅ ADD: instant UI update (optimistic)
    addFavoriteLocal: (state, action) => {
      const id = action.payload;
      if (!state.favorites.includes(id)) {
        state.favorites.push(id);
      }
    },

    // ✅ ADD: instant remove
    removeFavoriteLocal: (state, action) => {
      state.favorites = state.favorites.filter(
        (id) => id !== action.payload
      );
    },

    clearFavorites: (state) => {
      state.favorites = [];
      state.error = null;
    },

    clearFavoriteError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = (action.payload.favorites || []).map((fav) =>
          typeof fav === "string"
            ? fav
            : fav?._id?.toString?.() || fav?.toString?.()
        );
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFavorites,
  clearFavorites,
  clearFavoriteError,
  // ✅ export new ones
  addFavoriteLocal,
  removeFavoriteLocal,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
