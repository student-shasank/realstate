import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SIGNUP_URL } from "../../Constant/constant.js"

// Async thunk for registration
export const registerAsync = createAsyncThunk(
  "register/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        SIGNUP_URL,
        userData, // sends {name, email, password, role}
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // data returned from backend
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Request failed"
      );
    }
  }
);

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    // optional: reset state
    resetRegisterState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Export actions and reducer
export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
