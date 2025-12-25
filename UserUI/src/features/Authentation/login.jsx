import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_URL } from "../../Constant/constant.js";
import { setFavorites } from "../dashboard/favoriteligting/favoriteSlice.jsx"; // ✅ IMPORT

export const loginAsync = createAsyncThunk(
  "login/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data;

      // ✅ Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ SET FAVORITES INTO REDUX
      thunkAPI.dispatch(setFavorites(user.favorites || []));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login request failed"
      );
    }
  }
);


// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    resetLoginState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; //  correct
        state.token = action.payload.token; //  correct
        state.success = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Export
export const { logoutUser, resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
