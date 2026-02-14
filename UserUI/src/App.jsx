import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // ✅ useSelector add
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import React, { useEffect } from "react";
import Register from "./Pages/Register";
import Listings from "./Pages/Listings";
import ListingDetail from "./Pages/ListingDetail/ListingDetail";
import { setFavorites } from "./features/dashboard/favoriteligting/favoriteSlice";
import Footer from "./Components/Footer";
import Service from "./Pages/Service";
import MarketingandSales from "./Pages/IndividualServicePages/MarketingandSales";
import AssetStructuring from "./Pages/IndividualServicePages/AssetStructuring";
import PropertyStructuring from "./Pages/IndividualServicePages/PropertyStructuring";
import AdvisoryCoordination from "./Pages/IndividualServicePages/AdvisoryCoordination";
import HandoverSnagging from "./Pages/IndividualServicePages/HandoverSnagging";
import MortgageCoordination from "./Pages/IndividualServicePages/MortgageCoordination";
import InvestorVisaAdvisory from "./Pages/IndividualServicePages/InvestorVisaAdvisory";
import Communities from "./Pages/CommunitiesPage/Communities";
import AllCommunities from "./Pages/CommunitiesPage/AllCommunities";


function App() {
  const dispatch = useDispatch();

  // 🔹 Initial load → localStorage se Redux populate
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.favorites) {
      dispatch(setFavorites(user.favorites));
    }
  }, [dispatch]);

  // 🔹 Subscribe to Redux favorites and sync to localStorage
  const favorites = useSelector((state) => state.favorites.favorites || []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        favorites,
      })
    );
  }, [favorites]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/communities/:slug" element={<Communities/>} />
        <Route path="/communities" element={<AllCommunities/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service" element={<Service />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing/:id" element={<ListingDetail />} />

        {/* Individual Service Pages */}
        <Route path="/marketingandSales" element={<MarketingandSales />} />
        <Route path="/assetStructuring" element={<AssetStructuring />} />
        <Route path="/propertyStructuring" element={<PropertyStructuring />} />
        <Route path="/advisoryCoordination" element={<AdvisoryCoordination />} />
        <Route path="/handoverSnagging" element={<HandoverSnagging />} />
        <Route path="/mortgageCoordination" element={<MortgageCoordination />} />
        <Route path="/investorVisaAdvisory" element={<InvestorVisaAdvisory />} />
      </Routes>
   

      <Footer />
    </>
  );
}

export default App;
