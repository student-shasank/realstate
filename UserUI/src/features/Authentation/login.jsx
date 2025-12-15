import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_URL } from "../../Constant/constant.js"

// Async thunk for login
export const loginAsync = createAsyncThunk(
  "login/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save token & user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    //   const navigate = useNavigate()
    //   navigate ("/")
      

      return response.data; // includes {message, token, user}
    } catch (error) {
        console.log(error)
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
        state.user = action.payload.user; // ✅ correct
        state.token = action.payload.token; // ✅ correct
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
