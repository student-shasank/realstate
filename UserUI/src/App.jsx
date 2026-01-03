import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; // ✅ ADD THIS
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import React, { useEffect } from "react";
import Register from "./Pages/Register";
import Listings from "./Pages/Listings";
import ListingDetail from "./Pages/ListingDetail/ListingDetail";
// import Dashboard from "./Pages/Dashboard";
// import ListingCreation from "./Pages/ListingCreation";
import { setFavorites } from "./features/dashboard/favoriteligting/favoriteSlice";
import Footer from "./Components/Footer";

function App() {
 const dispatch = useDispatch(); //  ADD THIS
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.favorites) {
    dispatch(setFavorites(user.favorites));
  }
}, [dispatch]);

  return (
    <>
      <Navbar onOpenLogin={() => setShowLogin(true)} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
         <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register />}/>
            {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          {/* <Route path="/listingcreation" element={<ListingCreation/>}/> */}
           <Route path="/listings" element={<Listings />}/>
             <Route path="/listing/:id" element={<ListingDetail/>} />

      </Routes>
   
  <Footer />



      {/* SHOW LOGIN MODAL */}
    
    </>
  );
}

export default App;
