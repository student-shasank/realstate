import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // ✅ useSelector add
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import React, { useEffect } from "react";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TermsOfUse from "./Pages/TermsOfUse";
import Disclaimer from "./Pages/Disclamer";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import DataSources from "./Pages/DataSources";

import PropertyDetail from "../src/Pages/PropertyDetai";

import SellPropertyPage from "./Pages/SellPropertyPage";
import Profile from "./Pages/Profile";
import Compare from "./Pages/Compare";
import ScrollToTop from "./Components/Scroll/ScrollTop";
import Blog from "./Pages/Blog";
import BlogDetail from "./Pages/BlogDetail";



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
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
          <Route path="/compare" element={<Compare />} />
        <Route path="/communities/:slug" element={<Communities/>} />
        <Route path="/communities" element={<AllCommunities/>} />
        <Route path="/profile" element={<Profile/>} />
          <Route path="/sell-property" element={<SellPropertyPage/>} />
  
         <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/disclamer" element={<Disclaimer/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/datascource" element={<DataSources/>} />     
        <Route path="/service" element={<Service />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing/:id" element={< PropertyDetail/>} />
         <Route path="/propertyDetail" element ={<PropertyDetail/>} />

        {/* Individual Service Pages */}
        <Route path="/marketingandSales" element={<MarketingandSales />} />
        <Route path="/assetStructuring" element={<AssetStructuring />} />
        <Route path="/propertyStructuring" element={<PropertyStructuring />} />
        <Route path="/advisoryCoordination" element={<AdvisoryCoordination />} />
        <Route path="/handoverSnagging" element={<HandoverSnagging />} />
        <Route path="/mortgageCoordination" element={<MortgageCoordination />} />
        <Route path="/investorVisaAdvisory" element={<InvestorVisaAdvisory />} />
          <Route path="/market-insights" element={<Blog />} />
<Route path="/market-insights/:slug" element={<BlogDetail />} />
        
      </Routes>
   

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
 