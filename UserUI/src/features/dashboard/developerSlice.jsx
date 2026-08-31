import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DEVELOPERS_API } from "../../Constant/constant.js";


export const fetchDevelopers = createAsyncThunk(
  "developer/fetchDevelopers",
  async (_, thunkAPI) => {
    try {
       const response = await axios.get(DEVELOPERS_API);
        console.log("DEVELOPERS API RESPONSE:", response.data);
      return response.data?.developers || [];
      
    } catch (error) {
          console.log("DEVELOPERS API ERROR:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch developers"
      );
    }
  }
);

const developerSlice = createSlice({
  name: "developer",
  initialState: {
    developers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevelopers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevelopers.fulfilled, (state, action) => {
        state.loading = false;
        state.developers = action.payload;
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default developerSlice.reducer;