import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SELLER_LEADS_API,
  APPROVE_SELLER_LEAD_API,
  REJECT_SELLER_LEAD_API,
  UPDATE_SELLER_LEAD_NOTE_API,
   DELETE_SELLER_LEAD_API,
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
export const updateLeadNote = createAsyncThunk(
  "sellerLeads/updateLeadNote",
  async ({ id, note }, thunkAPI) => {
    try {
      const response = await axios.patch(
        UPDATE_SELLER_LEAD_NOTE_API(id),
        { internalNote: note }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update note"
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

export const deleteSellerLead = createAsyncThunk(
  "sellerLeads/deleteSellerLead",
  async (id, thunkAPI) => {
    try {
      await axios.delete(DELETE_SELLER_LEAD_API(id));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Delete failed");
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
    // FETCH
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

    // APPROVE
    .addCase(approveSellerLead.pending, (state) => {
      state.actionLoading = true;
    })
    .addCase(approveSellerLead.fulfilled, (state, action) => {
      state.actionLoading = false;
      const updatedLead = action.payload?.lead;
      if (updatedLead) {
        state.leads = state.leads.map((lead) =>
          lead._id === updatedLead._id ? updatedLead : lead
        );
      }
    })
    .addCase(approveSellerLead.rejected, (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    })

    // REJECT
    .addCase(rejectSellerLead.pending, (state) => {
      state.actionLoading = true;
    })
    .addCase(rejectSellerLead.fulfilled, (state, action) => {
      state.actionLoading = false;
      const updatedLead = action.payload?.lead;
      if (updatedLead) {
        state.leads = state.leads.map((lead) =>
          lead._id === updatedLead._id ? updatedLead : lead
        );
      }
    })
    .addCase(rejectSellerLead.rejected, (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    })

    // UPDATE NOTE
    .addCase(updateLeadNote.pending, (state) => {
      state.actionLoading = true;
    })
    .addCase(updateLeadNote.fulfilled, (state, action) => {
      state.actionLoading = false;
      const updatedLead = action.payload?.lead;
      if (updatedLead) {
        state.leads = state.leads.map((lead) =>
          lead._id === updatedLead._id ? updatedLead : lead
        );
      }
    })
    .addCase(updateLeadNote.rejected, (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    })

    // DELETE
    .addCase(deleteSellerLead.pending, (state) => {
      state.actionLoading = true;
    })
    .addCase(deleteSellerLead.fulfilled, (state, action) => {
      state.actionLoading = false;
      state.leads = state.leads.filter(
        (lead) => lead._id !== action.payload
      );

      if (state.selectedLead?._id === action.payload) {
        state.selectedLead = null;
      }
    })
    .addCase(deleteSellerLead.rejected, (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    });
}
});

export const { setSelectedLead, clearSelectedLead } =
  sellerLeadsSlice.actions;

export default sellerLeadsSlice.reducer;