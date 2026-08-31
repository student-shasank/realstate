import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UPDATE_USER_API } from "../../Constant/constant.js"; // apna constant add kar
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log("Stored user:", storedUser); // dekho kya aata hai
const token = storedUser?.token; // iske baad sahi key use karo
// Async thunk — PUT /api/users/update/:id
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const response = await axios.put(
        `${UPDATE_USER_API}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // protect2 middleware ke liye
          },
        }
      );
      console.log("UPDATE USER RESPONSE:", response.data);
      return response.data; // updated user object aayega
    } catch (error) {
      console.log("UPDATE USER ERROR:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUpdateUser: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpdateUser } = updateUserSlice.actions;
export default updateUserSlice.reducer;