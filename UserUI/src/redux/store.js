// store.js
import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../features/Authentation/RegisterSlice"
import loginReducer from "../features/Authentation/login";
import listingReducer from "../features/dashboard/listingSlice";
//  import dashboardReducer from "../features/dashboard/dashboardSlice"
// import listingReducer from "../features/dashboard/listingSlice"


export const store = configureStore({
  reducer: {
    // existing counter slice
    registerAuth: registerReducer, // registration slice
    loginAuth: loginReducer,
     listings: listingReducer,

    //  dashboard: dashboardReducer,
    //    listing: listingReducer,
  },
});

// Optional TypeScript types (if using TS)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
