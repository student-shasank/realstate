import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN_CONTACTS_URL } from "../Constant/constant.js";

// FETCH ALL CONTACTS / ENQUIRIES
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(ADMIN_CONTACTS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch contacts"
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
    // Holds the array of all contacts/enquiries returned by the API
    contacts: [],
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.contacts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contacts = action.payload?.data || action.payload || [];
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;