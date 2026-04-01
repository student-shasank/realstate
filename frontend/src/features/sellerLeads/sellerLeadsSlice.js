import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SELLER_LEADS_API,
  APPROVE_SELLER_LEAD_API,
  REJECT_SELLER_LEAD_API,
} from "../../Constant/constant.js";

export const fetchSellerLeads = createAsyncThunk(
  "sellerLeads/fetchSellerLeads",
  async (params = {}, thunkAPI) => {
    try {
      const response = await axios.get(SELLER_LEADS_API, { params });
      return response.data?.leads || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller leads"
      );
    }
  }
);

export const approveSellerLead = createAsyncThunk(
  "sellerLeads/approveSellerLead",
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(APPROVE_SELLER_LEAD_API(id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to approve seller lead"
      );
    }
  }
);

export const rejectSellerLead = createAsyncThunk(
  "sellerLeads/rejectSellerLead",
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(REJECT_SELLER_LEAD_API(id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reject seller lead"
      );
    }
  }
);

const sellerLeadsSlice = createSlice({
  name: "sellerLeads",
  initialState: {
    leads: [],
    loading: false,
    actionLoading: false,
    error: null,
    selectedLead: null,
  },
  reducers: {
    setSelectedLead: (state, action) => {
      state.selectedLead = action.payload;
    },
    clearSelectedLead: (state) => {
      state.selectedLead = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchSellerLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(approveSellerLead.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(approveSellerLead.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedLead = action.payload?.lead;
        if (updatedLead) {
          state.leads = state.leads.map((lead) =>
            lead._id === updatedLead._id ? updatedLead : lead
          );
          if (state.selectedLead?._id === updatedLead._id) {
            state.selectedLead = updatedLead;
          }
        }
      })
      .addCase(approveSellerLead.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(rejectSellerLead.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(rejectSellerLead.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedLead = action.payload?.lead;
        if (updatedLead) {
          state.leads = state.leads.map((lead) =>
            lead._id === updatedLead._id ? updatedLead : lead
          );
          if (state.selectedLead?._id === updatedLead._id) {
            state.selectedLead = updatedLead;
          }
        }
      })
      .addCase(rejectSellerLead.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setSelectedLead, clearSelectedLead } = sellerLeadsSlice.actions;
export default sellerLeadsSlice.reducer;