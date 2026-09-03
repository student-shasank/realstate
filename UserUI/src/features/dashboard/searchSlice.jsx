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

          emirates: Array.isArray(params.emirates)
            ? params.emirates.map((item) => item.toLowerCase().trim()).join(",")
            : params.emirates || "",
          handoverYear: Array.isArray(params.handoverYear)
            ? params.handoverYear.map((item) => item.toLowerCase().trim()).join(",")
            : params.handoverYear?.toLowerCase().trim() || "",

          saleStatus: Array.isArray(params.saleStatus)
            ? params.saleStatus.map((item) => item.toLowerCase().trim()).join(",")
            : params.saleStatus || "",

          // FIX: paymentPlan was never forwarded to the backend, so the
          // "During Construction" / "Post Handover" dropdown had zero
          // effect on results — the API never received the value.
          paymentPlan: params.paymentPlan || "",

          page: params.page || 1,
          limit: params.limit || 20,
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
  completion: "Off-Plan",
  propertyType: "",
  location: "",
  beds: "",
  baths: "",
  minPrice: "",
  maxPrice: "",
  developer: [],
  emirates: [],
  handoverYear: [],

  isBedBathOpen: false,
  isPriceOpen: false,

  loading: false,
  success: false,
  error: null,
  projects: [],
  totalPages: 1,  // ADD THIS
  currentPage: 1, // ADD THIS
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
    // Yeh add karo setProjects ke neeche
    appendProjects: (state, action) => {
      state.projects = [...state.projects, ...action.payload.data];
      state.currentPage = action.payload.currentPage;
    },
    // ADD THIS ACTION FOR INFINITE SCROLL
    setProjects: (state, action) => {
      state.projects = action.payload;
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
        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.page || 1;

        console.log("✅ REDUX UPDATED:", {
          page: action.payload?.page,
          totalPages: action.payload?.totalPages,
          dataLength: action.payload?.data?.length,
          total: action.payload?.total,
        });
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
  setEmirates,
  setHandoverYear,
  toggleBedBath,
  togglePrice,
  closeDropdowns,
  resetSearchState,
  setProjects,
  appendProjects, // EXPORT THIS
} = searchSlice.actions;

export default searchSlice.reducer;