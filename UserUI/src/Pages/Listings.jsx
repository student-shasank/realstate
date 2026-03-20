import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import imageurl from "../assets/underline.png";
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
  togglePrice,
  closeDropdowns,
  setSaleStatus ,
  setDeveloper
} from "../features/dashboard/searchSlice";
import ListingCard from "../Components/Card/listingCard";
import { ChevronDown } from 'lucide-react';

const Listings = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const bedBathRef = useRef(null);
  const priceRef = useRef(null);

  const {
    completion,
    propertyType,
    location,
    beds,
    baths,
    isBedBathOpen,
    isPriceOpen,
    minPrice,
    maxPrice,
    developer,
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
    const urlSaleStatus = searchParams.get("saleStatus") || "";
    const urlDeveloper = searchParams.get("developer") || "";

    dispatch(setLocation(urlLocation));
    dispatch(setCompletion(urlCompletion));
    dispatch(setPropertyType(urlPropertyType));
    dispatch(setBeds(urlBeds));
    dispatch(setBaths(urlBaths));
    dispatch(setMinPrice(urlMinPrice));
    dispatch(setMaxPrice(urlMaxPrice));
    dispatch(setSaleStatus(urlSaleStatus));
setSelectedSaleStatus(urlSaleStatus);
dispatch(setDeveloper(urlDeveloper));
setSelectedDeveloper(urlDeveloper);
    

    dispatch(
      fetchProjects({
        location: urlLocation,
        completion: urlCompletion,
        propertyType: urlPropertyType,
        beds: urlBeds,
        baths: urlBaths,
        minPrice: urlMinPrice,
        maxPrice: urlMaxPrice,
         saleStatus: urlSaleStatus,
         developer: urlDeveloper,
      })
    );
  }, [dispatch, searchParams]);

  // Handle Outside Click for Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (bedBathRef.current && !bedBathRef.current.contains(event.target)) &&
        (priceRef.current && !priceRef.current.contains(event.target))
      ) {
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
    setSelectedHandover("");
    setSelectedSaleStatus("");
    dispatch(setSaleStatus(""));
updateParams("saleStatus", "");
setIsSaleStatusOpen(false);
    setIsHandoverOpen(false);
    setSearchParams({});
  };

  const getPriceLabel = () => {
    if (!minPrice && !maxPrice) return "Price";

    const formatPrice = (value) => {
      const num = Number(value);
      if (!num) return "";
      if (num >= 1000000) return `${(num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`;
      return num.toString();
    };

    if (minPrice && maxPrice) return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    if (minPrice) return `From ${formatPrice(minPrice)}`;
    if (maxPrice) return `Up to ${formatPrice(maxPrice)}`;
    return "Price";
  };

  const listingsGridStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    marginTop: "30px",
    width: "100%",
      padding: "10px 0",          // 👈 ADD THIS
  overflow: "visible",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const emirates = [
    "Dubai", "Umm AL Quwain",
    "Abu Dhabi", "Ajman",
    "Ras Al Khaimah", "Fijairah",
    "Sharjah", "Al Ain"
  ];

  const [isHandoverOpen, setIsHandoverOpen] = useState(false);
const [selectedHandover, setSelectedHandover] = useState("");

const handoverYears = ["2026", "2027", "2028", "2029", "Post 2030"];

const [isSaleStatusOpen, setIsSaleStatusOpen] = useState(false);
const [selectedSaleStatus, setSelectedSaleStatus] = useState("");

const saleStatusOptions = ["Buy", "Sell"];

const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);
const [selectedDeveloper, setSelectedDeveloper] = useState("");

const developerOptions = [
  "Zara Builders",
  "DAMAC",
  "Sobha",
  "Nakheel",
  "Azizi",
];

  return (
    <div className="pt-[60px] bg-[#F8FAFF] min-h-screen mt-20">
      <div style={{ padding: "40px 20px", maxWidth: "1340px", margin: "0 auto" }}>
       {/* NEW HEADER SECTION START */}
  <div className="w-[1290px] mx-auto flex items-end justify-between mb-8 font-['Archivo']">
    <div className="relative">
      <h1 className="inline-block pb-3 mb-2 text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#001A54]"
       style={{
                  fontFamily: "Archivo, sans-serif",
                  backgroundImage: `url(${imageurl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left 95%",
                  backgroundSize: "600px 6px",
                }}>
        Properties for sale in UAE
      </h1>
      {/* Decorative Blue Underline */}
    
    </div>

    <div className="flex items-center gap-6">
      {/* Sort Dropdown */}
      <div className="flex items-center cursor-pointer gap-2">
        <span className="text-[#01155E] text-[18px]">Most popular</span>
        <ChevronDown className="h-5 w-5 text-[#01155E]" />
      </div>

      {/* View Switchers */}
      <div className="flex items-center gap-2">
        {/* List View Active */}
        <button className="p-2.5 border border-[#01155E] rounded-xl bg-white shadow-sm">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path d="M7 3H19M7 9H19M7 15H19M1 3H3M1 9H3M1 15H3" stroke="#01155E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Grid View Inactive */}
        <button className="p-2.5 opacity-40 hover:opacity-100 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#01155E" strokeWidth="2"/>
            <rect x="12" y="2" width="6" height="6" rx="1.5" stroke="#01155E" strokeWidth="2"/>
            <rect x="2" y="12" width="6" height="6" rx="1.5" stroke="#01155E" strokeWidth="2"/>
            <rect x="12" y="12" width="6" height="6" rx="1.5" stroke="#01155E" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
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
                onClick={() => dispatch(fetchProjects({ location, completion, propertyType, beds, baths, minPrice, maxPrice ,saleStatus: selectedSaleStatus,developer, }))}
                className="w-[180px] h-[48px] bg-[#01155E] text-white rounded-[8px] font-bold text-[18px] flex items-center justify-center hover:bg-opacity-90 transition-all active:scale-95"
              >
                Search
              </button>
            </div>

            <div className="grid grid-cols-4 gap-x-[30px] gap-y-[16px] w-full">
               <div className="relative w-full font-['General_Sans']">
  <button
    type="button"
    onClick={() => setIsDeveloperOpen(!isDeveloperOpen)}
    className="w-full h-[48px] px-[12px] flex items-center justify-between bg-white border border-[#D1D5DB] text-[16px] text-[#67739E] transition-all"
    style={{ borderRadius: isDeveloperOpen ? "16px 16px 0 0" : "16px" }}
  >
    <span className="truncate">
      {selectedDeveloper || "Developer"}
    </span>

    <svg
      className={`w-5 h-5 text-[#01155E] transition-transform ${
        isDeveloperOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {isDeveloperOpen && (
    <div className="absolute top-full left-0 z-50 w-full bg-white border-x border-b border-[#9747FF] rounded-b-[16px]">
      {developerOptions.map((dev, index) => (
        <button
          key={dev}
          type="button"
          onClick={() => {
            setSelectedDeveloper(dev);
            setIsDeveloperOpen(false);

            dispatch(setDeveloper(dev));
            updateParams("developer", dev);
          }}
          className={`w-full h-[48px] px-[12px] flex items-center gap-[40px] border-b border-[#D9E1F2] text-[#67739E] hover:bg-[#F8FAFF] ${
            index === developerOptions.length - 1 ? "rounded-b-[16px] border-b-0" : ""
          }`}
        >
          <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center">
            {selectedDeveloper === dev && (
              <div className="w-[8px] h-[8px] bg-[#01155E] rounded-full" />
            )}
          </div>

          <span>{dev}</span>
        </button>
      ))}
    </div>
  )}
</div>
             

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

              {/* PRICE DROPDOWN START */}
              <div className="relative" ref={priceRef}>
                <button
                  type="button"
                  onClick={() => dispatch(togglePrice())}
                  className="w-full h-[48px] flex items-center justify-between bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[16px] text-[#6B7280] outline-none cursor-pointer"
                >
                  <span className="truncate">{getPriceLabel()}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
                </button>

                {isPriceOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full md:w-[300px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-5">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block font-medium">Minimum</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={minPrice}
                          onChange={handleMinPriceChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm outline-none text-black"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block font-medium">Maximum</label>
                        <input
                          type="number"
                          placeholder="Any"
                          value={maxPrice}
                          onChange={handleMaxPriceChange}
                          className="w-full border rounded-lg px-3 py-2 text-sm outline-none text-black"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(setMinPrice(""));
                          dispatch(setMaxPrice(""));
                          updateParams("minPrice", "");
                          updateParams("maxPrice", "");
                        }}
                        className="flex-1 py-2 border border-[#01155E] text-[#01155E] font-bold rounded-lg"
                      >
                        Reset
                      </button>

                      <button
                        type="button"
                        onClick={() => dispatch(closeDropdowns())}
                        className="flex-1 py-2 bg-[#01155E] text-white font-bold rounded-lg"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* PRICE DROPDOWN END */}

              <select value={propertyType} onChange={handlePropertyTypeChange} className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Residential</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </select>

              <div className="relative w-full font-['General_Sans']">
  <button
    type="button"
    onClick={() => setIsSaleStatusOpen(!isSaleStatusOpen)}
    className="w-full h-[48px] px-[12px] flex items-center justify-between bg-white border border-[#D1D5DB] text-[16px] text-[#67739E] transition-all"
    style={{ borderRadius: isSaleStatusOpen ? "16px 16px 0 0" : "16px" }}
  >
    <span className="truncate">
      {selectedSaleStatus || "Sale Status"}
    </span>

    <svg
      className={`w-5 h-5 text-[#01155E] transition-transform duration-200 ${
        isSaleStatusOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {isSaleStatusOpen && (
    <div className="absolute top-full left-0 z-50 mt-0 w-full bg-white border-x border-b border-[#9747FF] rounded-b-[16px]">
      <div className="p-0">
        {saleStatusOptions.map((option, index) => (
          <button
            key={option}
            type="button"
           onClick={() => {
  setSelectedSaleStatus(option);
  setIsSaleStatusOpen(false);

  dispatch(setSaleStatus(option));      // ✅ Redux
  updateParams("saleStatus", option);   // ✅ URL
}}
            className={`w-full h-[48px] px-[12px] flex items-center gap-[40px] bg-white border-b border-[#D9E1F2] text-[#67739E] text-[16px] hover:bg-[#F8FAFF] transition-colors ${
              index === saleStatusOptions.length - 1 ? "rounded-b-[16px] border-b-0" : ""
            }`}
          >
            <div className="w-[24px] flex justify-center flex-shrink-0">
              <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center">
                {selectedSaleStatus === option && (
                  <div className="w-[8px] h-[8px] rounded-full bg-[#01155E]" />
                )}
              </div>
            </div>

            <span className="truncate">{option}</span>
          </button>
        ))}
      </div>
    </div>
  )}
</div>

             <div className="relative w-full font-['General_Sans']">
  <button
    type="button"
    onClick={() => setIsHandoverOpen(!isHandoverOpen)}
    className="w-full h-[48px] px-[12px] flex items-center justify-between bg-white border border-[#D1D5DB] text-[16px] text-[#67739E] transition-all"
    style={{ borderRadius: isHandoverOpen ? "16px 16px 0 0" : "16px" }}
  >
    <span className="truncate">
      {selectedHandover || "Handover year"}
    </span>

    <svg
      className={`w-5 h-5 text-[#01155E] transition-transform duration-200 ${
        isHandoverOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {isHandoverOpen && (
    <div className="absolute top-full left-0 z-50 mt-0 w-full bg-white  rounded-b-[16px]">
      <div className="p-0">
        {handoverYears.map((year, index) => (
          <button
            key={year}
            type="button"
            onClick={() => {
              setSelectedHandover(year);
              setIsHandoverOpen(false);
              dispatch(setCompletion(year));
              updateParams("completion", year);
            }}
            className={`w-full h-[48px] px-[12px] flex items-center gap-[40px] bg-white border-b border-[#D9E1F2] text-[#67739E] text-[16px] hover:bg-[#F8FAFF] transition-colors ${
              index === handoverYears.length - 1 ? "rounded-b-[16px] border-b-0" : ""
            }`}
          >
            <div className="w-[24px] flex justify-center flex-shrink-0">
              <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center">
                {selectedHandover === year && (
                  <div className="w-[8px] h-[8px] rounded-full bg-[#01155E]" />
                )}
              </div>
            </div>

            <span className="truncate">{year}</span>
          </button>
        ))}
      </div>
    </div>
  )}
</div>
              <select className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Payment Plan</option>
              </select>

             <div className="relative w-full font-['General_Sans']">
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="w-full h-[48px] px-4 flex items-center justify-between bg-white border border-[#D9E1F2] text-[16px] transition-all"
    style={{ borderRadius: isOpen ? '16px 16px 0 0' : '16px' }}
  >
    <span className="text-[#67739E] text-[16px] truncate">
      {selected || "Emirates"}
    </span>

  <svg 
  className={`w-5 h-5 text-[#01155E] transition-transform ${isOpen ? 'rotate-180' : ''}`} 
  fill="none" 
  stroke="currentColor" 
  viewBox="0 0 24 24"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth="2" 
    d="M19 9l-7 7-7-7" 
  />
</svg>
  </button>

  {isOpen && (
    <div className="absolute top-full left-0 mt-0 z-50 w-full bg-[#E9EEF6] border-x border-b border-[#9747FF] rounded-b-[16px] p-[12px] grid grid-cols-2 gap-[8px] shadow-lg">
      {emirates.map((emirate) => (
        <div
          key={emirate}
          onClick={() => {
            setSelected(emirate);
            setIsOpen(false);
          }}
          className="flex items-center gap-[8px] w-full h-[36px] bg-white border border-[#D9E1F2] rounded-[16px] px-[12px] cursor-pointer hover:border-[#01155E] transition-colors"
        >
          <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center flex-shrink-0">
            {selected === emirate && (
              <div className="w-[8px] h-[8px] bg-[#01155E] rounded-full" />
            )}
          </div>

          <span className="text-[#67739E] text-[14px] truncate">
            {emirate}
          </span>
        </div>
      ))}
    </div>
  )}
</div>

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
          <div style={listingsGridStyle} >
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