import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchProjects,
  setCompletion,
  setPropertyType,
  setLocation,
  setBeds,
  setBaths,
  setMinPrice,
  setMaxPrice,
  toggleBedBath,
  closeDropdowns
} from "../features/dashboard/searchSlice";
import ListingCard from "../Components/Card/listingCard";
import { ChevronDown } from 'lucide-react';

const Listings = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const bedBathRef = useRef(null);

  const {
    completion,
    propertyType,
    location,
    beds,
    baths,
    isBedBathOpen,
    minPrice,
    maxPrice,
    projects,
    loading,
    error,
    success,
  } = useSelector((state) => state.search);

  useEffect(() => {
    const urlLocation = searchParams.get("location") || "";
    const urlCompletion = searchParams.get("completion") || "";
    const urlPropertyType = searchParams.get("propertyType") || "";
    const urlBeds = searchParams.get("beds") || "";
    const urlBaths = searchParams.get("baths") || "";
    const urlMinPrice = searchParams.get("minPrice") || "";
    const urlMaxPrice = searchParams.get("maxPrice") || "";

    dispatch(setLocation(urlLocation));
    dispatch(setCompletion(urlCompletion));
    dispatch(setPropertyType(urlPropertyType));
    dispatch(setBeds(urlBeds));
    dispatch(setBaths(urlBaths));
    dispatch(setMinPrice(urlMinPrice));
    dispatch(setMaxPrice(urlMaxPrice));

    dispatch(
      fetchProjects({
        location: urlLocation,
        completion: urlCompletion,
        propertyType: urlPropertyType,
        beds: urlBeds,
        baths: urlBaths,
        minPrice: urlMinPrice,
        maxPrice: urlMaxPrice,
      })
    );
  }, [dispatch, searchParams]);

  // Handle Outside Click for Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bedBathRef.current && !bedBathRef.current.contains(event.target)) {
        dispatch(closeDropdowns());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    dispatch(setLocation(value));
    updateParams("location", value);
  };

  const handleCompletionChange = (e) => {
    const value = e.target.value;
    dispatch(setCompletion(value));
    updateParams("completion", value);
  };

  const handlePropertyTypeChange = (e) => {
    const value = e.target.value;
    dispatch(setPropertyType(value));
    updateParams("propertyType", value);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    dispatch(setMinPrice(value));
    updateParams("minPrice", value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    dispatch(setMaxPrice(value));
    updateParams("maxPrice", value);
  };

  const clearAllFilters = () => {
    dispatch(setLocation(""));
    dispatch(setCompletion(""));
    dispatch(setPropertyType(""));
    dispatch(setBeds(""));
    dispatch(setBaths(""));
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    setSearchParams({});
  };

  const listingsGridStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    marginTop: "30px",
    width: "100%",
  };

  return (
    <div className="pt-[60px] bg-[#F8FAFF] min-h-screen">
      <div style={{ padding: "40px 20px", maxWidth: "1340px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "24px", color: "#01155E", textAlign: 'center' }}>
          Available Listings
        </h2>

        <div className="w-[1290px] min-h-[236px] mx-auto bg-[#1C4DFF0A] border border-[#E5E7EB] rounded-[10px] p-[30px] flex flex-col gap-[30px] items-center font-['Archivo']">
          
          <div className="w-[1230px] flex flex-col gap-[16px]">
            
            <div className="flex gap-[24px] w-full">
              <div className="relative flex-1 max-w-[1026px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#01155E]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter Location"
                  value={location}
                  onChange={handleLocationChange}
                  className="w-full h-[48px] pl-12 pr-4 bg-white border border-[#D1D5DB] rounded-[16px] text-[16px] outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-[#01155E]"
                />
              </div>
              
              <button 
                onClick={() => dispatch(fetchProjects({ location, completion, propertyType, beds, baths, minPrice, maxPrice }))}
                className="w-[180px] h-[48px] bg-[#01155E] text-white rounded-[8px] font-bold text-[18px] flex items-center justify-center hover:bg-opacity-90 transition-all active:scale-95"
              >
                Search
              </button>
            </div>

            <div className="grid grid-cols-4 gap-x-[30px] gap-y-[16px] w-full">
              
              <select className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Developer</option>
              </select>

              {/* BEDS & BATHS DROPDOWN START */}
              <div className="relative" ref={bedBathRef}>
                <button 
                  type="button" 
                  onClick={() => dispatch(toggleBedBath())}
                  className="w-full h-[48px] flex items-center justify-between bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[16px] text-[#6B7280] outline-none cursor-pointer"
                >
                  <span className="truncate">{beds || '0'} Beds / {baths || '0'} Baths</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isBedBathOpen ? 'rotate-180' : ''}`} />
                </button>

                {isBedBathOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[320px] bg-white border border-gray-200 rounded-3xl shadow-xl z-50 p-6">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center"></div>
                        <h3 className="text-[#5B6B91] font-semibold text-lg">Beds</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['Studio', '1', '2', '3', '4', '5', '6', '7', '8+'].map((opt) => (
                          <button key={opt} type="button" onClick={() => { dispatch(setBeds(opt)); updateParams("beds", opt); }} className={`px-4 py-1.5 min-w-[55px] rounded-full border transition-all text-sm ${beds === opt ? 'bg-[#01155E] text-white border-[#01155E]' : 'bg-white text-[#5B6B91] border-gray-300'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center"></div>
                        <h3 className="text-[#5B6B91] font-semibold text-lg">Baths</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['1', '2', '3', '4', '5', '6+'].map((opt) => (
                          <button key={opt} type="button" onClick={() => { dispatch(setBaths(opt)); updateParams("baths", opt); }} className={`px-4 py-1.5 min-w-[55px] rounded-full border transition-all text-sm ${baths === opt ? 'bg-[#01155E] text-white border-[#01155E]' : 'bg-white text-[#5B6B91] border-gray-300'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => { dispatch(setBeds('')); dispatch(setBaths('')); updateParams("beds", ""); updateParams("baths", ""); }} className="flex-1 py-3 border border-black text-[#5B6B91] text-lg rounded-3xl hover:bg-gray-50 transition-colors">Reset</button>
                      <button type="button" onClick={() => dispatch(closeDropdowns())} className="flex-1 py-3 bg-[#000E47] text-white text-lg rounded-3xl hover:bg-blue-900 transition-colors">Done</button>
                    </div>
                  </div>
                )}
              </div>
              {/* BEDS & BATHS DROPDOWN END */}

              <div className="flex gap-1 h-[48px]">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="w-1/2 h-full bg-white border border-[#D1D5DB] rounded-[16px] px-3 text-[14px] outline-none"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="w-1/2 h-full bg-white border border-[#D1D5DB] rounded-[16px] px-3 text-[14px] outline-none"
                />
              </div>

              <select value={propertyType} onChange={handlePropertyTypeChange} className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Residential</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>

              <select className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Sale Status</option>
              </select>

              <select value={completion} onChange={handleCompletionChange} className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Handover year</option>
                <option value="Ready">Ready</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>

              <select className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Payment Plan</option>
              </select>

              <select className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Emirates</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
              </select>

            </div>
          </div>

          <button 
            onClick={clearAllFilters}
            className="text-[#01155E] font-semibold text-sm hover:underline transition-all"
          >
            Clear All Filters
          </button>
        </div>

        {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading listings...</p>}
        {!loading && error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}
        {!loading && success && projects?.length === 0 && (
          <p style={{ textAlign: 'center' }}>No listings found.</p>
        )}

        {!loading && projects?.length > 0 && (
          <div style={listingsGridStyle}>
            {projects.map((item) => (
              <ListingCard key={item._id} listing={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;