import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PROJECTS_SORT_API } from "../../Constant/constant.js";

// ─────────────────────────────────────────────
// STANDALONE SORT SLICE
// Poori tarah alag — searchSlice se koi lena dena nahi.
// Apna endpoint (/api/projects/sort), apna state, apna reducer.
// ─────────────────────────────────────────────

// ----------------------
// Status Mapping (same mapping as search, kept local so this file
// has zero dependency on searchSlice.js)
// ----------------------
const statusMap = {
  All: "",
  Ready: "ready",
  "Off-Plan": "offplan",
  Preconstruction: "preconstruction",
  "Pre-Construction": "preconstruction",
};

// ----------------------
// Async Thunk — hits ONLY the dedicated sort endpoint
// ----------------------
export const fetchSortedProjects = createAsyncThunk(
  "sort/fetchSortedProjects",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(PROJECTS_SORT_API, {
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

          sortBy: params.sortBy || "most_popular",

          page: params.page || 1,
          limit: params.limit || 20,
        },
      });

      console.log("SORTED PROJECTS RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.error("FETCH SORTED PROJECTS ERROR:", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch sorted projects"
      );
    }
  }
);

// ----------------------
// Initial State — separate from searchSlice's state entirely
// ----------------------
const initialState = {
  sortBy: "most_popular",
  projects: [],
  loading: false,
  success: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  total: 0,
};

// ----------------------
// Slice
// ----------------------
const sortSlice = createSlice({
  name: "sort",
  initialState,

  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetSortState: (state) => {
      state.sortBy = "most_popular";
      state.projects = [];
      state.loading = false;
      state.success = false;
      state.error = null;
      state.totalPages = 1;
      state.currentPage = 1;
      state.total = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSortedProjects.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchSortedProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projects = action.payload?.data || [];
        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.page || 1;
        state.total = action.payload?.total || 0;
        state.sortBy = action.payload?.sortBy || state.sortBy;
      })
      .addCase(fetchSortedProjects.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch sorted projects";
      });
  },
});

export const { setSortBy, resetSortState } = sortSlice.actions;

export default sortSlice.reducer;