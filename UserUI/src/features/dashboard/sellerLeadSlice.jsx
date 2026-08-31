import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  SELLER_LEAD_API,
  SELLER_LEAD_UPDATE_API,
} from "../../Constant/constant.js";

// STEP 1 SAVE
export const createSellerLead = createAsyncThunk(
  "sellerLead/createSellerLead",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(SELLER_LEAD_API, formData);
      console.log("SELLER LEAD CREATE RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.log(
        "SELLER LEAD CREATE ERROR:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to save seller lead"
      );
    }
  }
);

// STEP 2 FINAL UPDATE / SUBMIT
export const updateSellerLead = createAsyncThunk(
  "sellerLead/updateSellerLead",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${SELLER_LEAD_UPDATE_API}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("SELLER LEAD UPDATE RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.log(
        "SELLER LEAD UPDATE ERROR:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update seller lead"
      );
    }
  }
);

const initialFormData = {
  ownerName: "",
  countryCode: "+971",
  contactNumber: "",
  whatsappSame: true,
  whatsappNumber: "",
  email: "",
  propertyLocation: "",

  propertyType: "",
  bedrooms: "",
  completionStatus: "",
  community: "",
  projectName: "",
  unitNumber: "",
  size: "",
  askingPrice: "",
  ownershipType: "",

  sellTimeline: "",
  negotiable: "",
  reasonForSelling: "",
  reasonForSellingOther: "",
  hasAgent: "",

  images: [],
  videos: [],
  additionalNotes: "",
  consent: false,
};

const sellerLeadSlice = createSlice({
  name: "sellerLead",
  initialState: {
    formData: initialFormData,
    leadId: null,
    loading: false,
    submitLoading: false,
    error: null,
    success: false,
    currentStep: 1,
  },
  reducers: {
    setSellerFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },

    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    resetSellerLeadForm: (state) => {
      state.formData = initialFormData;
      state.leadId = null;
      state.loading = false;
      state.submitLoading = false;
      state.error = null;
      state.success = false;
      state.currentStep = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // STEP 1 CREATE
      .addCase(createSellerLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSellerLead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.leadId = action.payload?.lead?._id || action.payload?.leadId || null;
      })
      .addCase(createSellerLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // STEP 2 UPDATE
      .addCase(updateSellerLead.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
      })
      .addCase(updateSellerLead.fulfilled, (state) => {
        state.submitLoading = false;
        state.success = true;
      })
      .addCase(updateSellerLead.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  setSellerFormData,
  setCurrentStep,
  resetSellerLeadForm,
} = sellerLeadSlice.actions;


export default sellerLeadSlice.reducer;