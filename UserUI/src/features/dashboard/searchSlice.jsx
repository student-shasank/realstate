import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PROJECTS_API } from "../../Constant/constant.js";

// ----------------------
// Async Thunk (GET + params)
// ----------------------
export const fetchProjects = createAsyncThunk(
  "search/fetchProjects",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(PROJECTS_API, {
        params: {
          // limit: params.limit || 20,
          // full_description: true,
          // job_details: true,
          // local_details: true,
          // location_details: true,
          // upgrade_details: true,
          // owner_info: true,
          // sort_field: "submitdate",
          // webapp: 1,
          // compact: true,
          // new_errors: true,
          // new_pools: true,

          // 🔽 dynamic params (optional)
          location: params.location,
          beds: params.beds,
          baths: params.baths,
          min_price: params.minPrice,
          max_price: params.maxPrice,
          property_type: params.propertyType,
          completion: params.completion,
        },
      });
 console.log(response.data)
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
  completion: "All",
  propertyType: "Apartment",
  location: "",
  beds: "2",
  baths: "3",
  minPrice: "",
  maxPrice: "",

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
      // ----------------------
      // Pending
      // ----------------------
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      // ----------------------
      // Fulfilled
      // ----------------------
    // searchSlice.js mein update karein
.addCase(fetchProjects.fulfilled, (state, action) => {
  state.loading = false;
  state.success = true;
  // action.payload pura object hai { success: true, data: [...] }
  // Humein sirf data array store karna hai
  state.projects = action.payload.data; 
})

      // ----------------------
      // Rejected
      // ----------------------
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
  toggleBedBath,
  togglePrice,
  closeDropdowns,
  resetSearchState,
} = searchSlice.actions;

export default searchSlice.reducer;
