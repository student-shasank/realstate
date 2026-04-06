import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PROJECTS_API } from "../../Constant/constant.js";

// ----------------------
// Status Mapping
// frontend value -> backend value
// ----------------------
const statusMap = {
  All: "",
  Ready: "ready",
  "Off-Plan": "offplan",
  Preconstruction: "preconstruction",
  "Pre-Construction": "preconstruction",
};

// ----------------------
// Async Thunk (GET + params)
// ----------------------
export const fetchProjects = createAsyncThunk(
  "search/fetchProjects",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(PROJECTS_API, {
        params: {
          location: params.location || "",
          beds: params.beds || "",
          baths: params.baths || "",
          min_price: params.minPrice || "",
          max_price: params.maxPrice || "",
          property_type: params.propertyType || "",
          propertyStatus: statusMap[params.completion] ?? params.completion ?? "",
          developer: Array.isArray(params.developer)
            ? params.developer.map((item) => item.toLowerCase().trim()).join(",")
            : params.developer || "",
          purpose: params.purpose || "",
          emirates: Array.isArray(params.emirates)
            ? params.emirates.map((item) => item.toLowerCase().trim()).join(",")
            : params.emirates || "",
          handoverYear: Array.isArray(params.handoverYear)
  ? params.handoverYear.map((item) => item.toLowerCase().trim()).join(",")
  : params.handoverYear?.toLowerCase().trim() || "",
        },
      });

      console.log("PROJECTS RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.error("FETCH PROJECTS ERROR:", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch projects"
      );
    }
  }
);

// ----------------------
// Initial State
// ----------------------
const initialState = {
  completion: "Ready",
  propertyType: "Apartment",
  location: "",
  beds: "2",
  baths: "3",
  minPrice: "",
  maxPrice: "",
  developer: [],
  purpose: "buy",
  emirates: [],
  handoverYear: [],

  isBedBathOpen: false,
  isPriceOpen: false,

  loading: false,
  success: false,
  error: null,
  projects: [],
};

// ----------------------
// Slice
// ----------------------
const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setCompletion: (state, action) => {
      state.completion = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setBeds: (state, action) => {
      state.beds = action.payload;
    },
    setBaths: (state, action) => {
      state.baths = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setDeveloper: (state, action) => {
      state.developer = action.payload;
    },
    setPurpose: (state, action) => {
      state.purpose = action.payload;
    },
    setEmirates: (state, action) => {
      state.emirates = action.payload;
    },
    setHandoverYear: (state, action) => {
      state.handoverYear = action.payload;
    },
    toggleBedBath: (state) => {
      state.isBedBathOpen = !state.isBedBathOpen;
    },
    togglePrice: (state) => {
      state.isPriceOpen = !state.isPriceOpen;
    },
    closeDropdowns: (state) => {
      state.isBedBathOpen = false;
      state.isPriceOpen = false;
    },
    resetSearchState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.projects = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projects = action.payload?.data || [];
      })

      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch projects";
      });
  },
});

export const {
  setCompletion,
  setPropertyType,
  setLocation,
  setBeds,
  setBaths,
  setMinPrice,
  setMaxPrice,
  setDeveloper,
  setPurpose,
  setEmirates,
  setHandoverYear,
  toggleBedBath,
  togglePrice,
  closeDropdowns,
  resetSearchState,
} = searchSlice.actions;

export default searchSlice.reducer;