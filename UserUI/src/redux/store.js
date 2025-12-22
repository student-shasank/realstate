// store.js
import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../features/Authentation/RegisterSlice"
import loginReducer from "../features/Authentation/login";
import listingReducer from "../features/dashboard/listingSlice";
//  import dashboardReducer from "../features/dashboard/dashboardSlice"
// import listingReducer from "../features/dashboard/listingSlice"
import pdfReducer from "../features/dashboard/listingpdfSlice"
import searchReducer from "../features/dashboard/searchSlice"
import listingDetailReducer from "../features/dashboard/listingDetailSlice"

export const store = configureStore({
  reducer: {
    // existing counter slice
    registerAuth: registerReducer, // registration slice
    loginAuth: loginReducer,
     listings: listingReducer,
       pdf: pdfReducer,
        search: searchReducer,
        listingDetail: listingDetailReducer,

    //  dashboard: dashboardReducer,
    //    listing: listingReducer,
  },
});

// Optional TypeScript types (if using TS)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
