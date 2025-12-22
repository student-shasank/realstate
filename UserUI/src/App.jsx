import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import React from "react";
import Register from "./Pages/Register";
import Listings from "./Pages/Listings";
import ListingDetail from "./Pages/ListingDetail/ListingDetail";
// import Dashboard from "./Pages/Dashboard";
// import ListingCreation from "./Pages/ListingCreation";

function App() {


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

      {/* SHOW LOGIN MODAL */}
    
    </>
  );
}

export default App;
