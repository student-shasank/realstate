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
import favoriteReducer from "../features/dashboard/favoriteligting/favoriteSlice"
import communityReducer from  "../features/communities/communitySlice"
import enquiryReducer from "../features/Enquiery/enquirySlice.js";
import developerReducer from "../features/dashboard/developerSlice.jsx";
import sellerLeadReducer from "../features/dashboard/sellerLeadSlice.jsx";
import updateUserReducer from "../features/Authentation/updateUserSlice.js";
import listingByIdReducer from "../features/dashboard/fetchListingById.jsx";
import blogReducer from "../features/dashboard/Blogslice.jsx"

export const store = configureStore({
  reducer: {
    // existing counter slice
    registerAuth: registerReducer, // registration slice
    loginAuth: loginReducer,
     listings: listingReducer,
       pdf: pdfReducer,
        search: searchReducer,
        listingDetail: listingDetailReducer,
          favorites: favoriteReducer,
          community: communityReducer,
              enquiry: enquiryReducer,
              developer: developerReducer,
                 sellerLead: sellerLeadReducer,
                 updateUser: updateUserReducer,
                 listingById: listingByIdReducer, 
                 blogs: blogReducer,

    //  dashboard: dashboardReducer,
    //    listing: listingReducer,
  },
});

// Optional TypeScript types (if using TS)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
