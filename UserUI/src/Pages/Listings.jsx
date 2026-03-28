import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import imageurl from "../assets/underline.png";
import DeveloperDropdown from "../Components/HomePageComponents/Developerslider/Devloperdropdown";
import Map, { Marker, NavigationControl } from 'react-map-gl';

import { VITE_MAPBOX_TOKEN } from "../Constant/constant";
import MapMarker from "../Components/Card/MapMarker"





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
  setDeveloper,
  setPurpose
} from "../features/dashboard/searchSlice";
import ListingCard from "../Components/Card/listingCard";
import { ChevronDown } from 'lucide-react';
import Breadcrumbs from "../Components/Card/Breadcrumbs";
import MapCard from "../Components/Card/MapCard"


const Listings = () => {
  const MAPBOX_TOKEN = VITE_MAPBOX_TOKEN ;
const [viewport, setViewport] = useState({
  latitude: 25.2048, // Dubai Default
  longitude: 55.2708,
  zoom: 11
});


  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const bedBathRef = useRef(null);
  const priceRef = useRef(null);

  const propertyTypeRef = useRef(null);
  const handoverRef = useRef(null);
  const emiratesRef = useRef(null);
  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const [propertyTab, setPropertyTab] = useState("Residential");

  const [viewMode, setViewMode] = useState("list");

  const residentialOptions = [
    "Apartment",
    "Penthouse",
    "Townhouse",
    "Hotel Apartment",
    "Land",
    "Floor",
    "Building",
    "Villa",
    "Villa Compound",
  ];

  const commercialOptions = [
    "Office",
    "Shop",
    "Warehouse",
    "Labour Camp",
    "Commercial Villa",
    "Showroom",
    "Commercial Floor",
    "Factory",
  ];

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
    purpose,
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
    const urlDeveloper = searchParams.get("developer") || "";
    const urlPurpose = searchParams.get("purpose") || "";
    const urlEmirates = searchParams.get("emirates") || "";
    const emiratesArray = urlEmirates
      ? urlEmirates.split(",").map((item) => item.toLowerCase()).filter(Boolean)
      : [];
    setSelectedEmirates(emiratesArray);

    const urlHandoverYear = searchParams.get("handoverYear") || "";
    const handoverYearArray = urlHandoverYear
      ? urlHandoverYear.split(",").map((item) => item.toLowerCase()).filter(Boolean)
      : [];

    const developerArray = urlDeveloper
      ? urlDeveloper.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    dispatch(setLocation(urlLocation));
    dispatch(setCompletion(urlCompletion));
    dispatch(setPropertyType(urlPropertyType));
    dispatch(setBeds(urlBeds));
    dispatch(setBaths(urlBaths));
    dispatch(setMinPrice(urlMinPrice));
    dispatch(setMaxPrice(urlMaxPrice));


    dispatch(setDeveloper(urlDeveloper));
    setSelectedDevelopers(developerArray);
    dispatch(setPurpose(urlPurpose));
    setSelectedHandoverYears(handoverYearArray);

    dispatch(
      fetchProjects({
        location: urlLocation,
        completion: urlCompletion,
        propertyType: urlPropertyType,
        beds: urlBeds,
        baths: urlBaths,
        minPrice: urlMinPrice,
        maxPrice: urlMaxPrice,
        developer: developerArray,
        purpose: urlPurpose,
        emirates: emiratesArray,
        handoverYear: handoverYearArray,
      })
    );
  }, [dispatch, searchParams]);

  const closeAllDropdowns = () => {
    dispatch(closeDropdowns());
    setPropertyTypeOpen(false);
    setIsHandoverOpen(false);
    setIsOpen(false);
  };

  // Handle Outside Click for Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideBedBath =
        bedBathRef.current && !bedBathRef.current.contains(event.target);

      const isOutsidePrice =
        priceRef.current && !priceRef.current.contains(event.target);

      const isOutsidePropertyType =
        propertyTypeRef.current && !propertyTypeRef.current.contains(event.target);

      const isOutsideHandover =
        handoverRef.current && !handoverRef.current.contains(event.target);

      const isOutsideEmirates =
        emiratesRef.current && !emiratesRef.current.contains(event.target);

      if (
        isOutsideBedBath &&
        isOutsidePrice &&
        isOutsidePropertyType &&
        isOutsideHandover &&
        isOutsideEmirates
      ) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    setSelectedHandoverYears([]);
    setIsHandoverOpen(false);
    setSearchParams({});
    dispatch(setPurpose(""));
    dispatch(setDeveloper(""));
    setSelectedDevelopers([]);
    setSelectedEmirates([]);
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
    padding: "10px 0",
    overflow: "visible",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmirates, setSelectedEmirates] = useState([]);

  const handleEmiratesChange = (emirate) => {
    const emirateValue = emirate.toLowerCase();
    const updatedEmirates = selectedEmirates.includes(emirateValue)
      ? selectedEmirates.filter((item) => item !== emirateValue)
      : [...selectedEmirates, emirateValue];

    setSelectedEmirates(updatedEmirates);
    updateParams(
      "emirates",
      updatedEmirates.map((item) => item.toLowerCase()).join(",")
    );
  };

  const handleHandoverYearChange = (value) => {
    const updatedYears = selectedHandoverYears.includes(value)
      ? selectedHandoverYears.filter((item) => item !== value)
      : [...selectedHandoverYears, value];

    setSelectedHandoverYears(updatedYears);
    updateParams("handoverYear", updatedYears.join(","));
  };

  const emirates = [
    "Dubai", "Umm AL Quwain",
    "Abu Dhabi", "Ajman",
    "Ras Al Khaimah", "Fujairah",
    "Sharjah", "Al Ain"
  ];

  const [isHandoverOpen, setIsHandoverOpen] = useState(false);
  const [selectedHandoverYears, setSelectedHandoverYears] = useState([]);

  const handoverYears = [
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
    { label: "Post 2030", value: "post 2030" },
  ];

  const [selectedDevelopers, setSelectedDevelopers] = useState([]);

  const developerOptions = [
    "Zara Builders",
    "DAMAC",
    "Sobha",
    "Nakheel",
    "Azizi",
  ];
  const [hoveredListingId, setHoveredListingId] = useState(null);

  return (
    <div className="pt-5 bg-white min-h-screen mt-20">
      <Breadcrumbs />
      <div style={{ padding: "40px 20px", maxWidth: "1340px", margin: "0 auto" }}>
        {/* NEW HEADER SECTION START */}
        <div className="w-[1290px] mx-auto flex items-end justify-between mb-8 font-['Archivo']">
          <div className="relative">
            <h1
              className="inline-block pb-3 mb-2 text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#001A54]"
              style={{
                fontFamily: "Archivo, sans-serif",
                backgroundImage: `url(${imageurl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left 95%",
                backgroundSize: "600px 6px",
              }}
            >
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
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-xl transition-all ${viewMode === "list"
                    ? "border border-[#01155E] bg-white shadow-sm"
                    : "opacity-40 hover:opacity-100"
                  }`}
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                  <path d="M7 3H19M7 9H19M7 15H19M1 3H3M1 9H3M1 15H3" stroke="#01155E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Grid View Inactive */}
              <button
                onClick={() => setViewMode("map")}
                className={`p-2.5 rounded-xl transition-all ${viewMode === "map"
                    ? "border border-[#01155E] bg-white shadow-sm opacity-100"
                    : "opacity-40 hover:opacity-100"
                  }`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#01155E" strokeWidth="2" />
                  <rect x="12" y="2" width="6" height="6" rx="1.5" stroke="#01155E" strokeWidth="2" />
                  <rect x="2" y="12" width="6" height="6" rx="1.5" stroke="#01155E" strokeWidth="2" />
                  <rect x="12" y="12" width="6" height="6" rx="1.5" stroke="#01155E" strokeWidth="2" />
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
                onClick={() =>
                  dispatch(
                    fetchProjects({
                      location,
                      completion,
                      propertyType,
                      beds,
                      baths,
                      minPrice,
                      maxPrice,
                      developer: selectedDevelopers,
                      purpose,
                      emirates: selectedEmirates,
                      handoverYear: selectedHandoverYears,
                    })
                  )
                }
                className="w-[180px] h-[48px] bg-[#01155E] text-white rounded-[8px] font-bold text-[18px] flex items-center justify-center hover:bg-opacity-90 transition-all active:scale-95"
              >
                Search
              </button>
            </div>

            <div className="grid grid-cols-4 gap-x-[30px] gap-y-[16px] w-full">
              <DeveloperDropdown
                selectedDevelopers={selectedDevelopers}
                setSelectedDevelopers={(developers) => {
                  setSelectedDevelopers(developers);

                  const joined = developers.join(",");
                  dispatch(setDeveloper(joined));
                  updateParams("developer", joined);
                }}
              />

              {/* BEDS & BATHS DROPDOWN START */}
              <div className="relative" ref={bedBathRef}>
                <button
                  type="button"
                  onClick={() => {
                    const wasOpen = isBedBathOpen;
                    closeAllDropdowns();
                    if (!wasOpen) dispatch(toggleBedBath());
                  }}
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
                  onClick={() => {
                    const wasOpen = isPriceOpen;
                    closeAllDropdowns();
                    if (!wasOpen) dispatch(togglePrice());
                  }}
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

              <div className="relative w-full" ref={propertyTypeRef}>
                <button
                  type="button"
                  onClick={() => {
                    const wasOpen = propertyTypeOpen;
                    closeAllDropdowns();
                    setPropertyTypeOpen(!wasOpen);
                  }}
                  className="w-full h-[48px] px-4 flex items-center justify-between bg-white border border-[#D1D5DB] rounded-[16px] text-[#67739E] text-[16px]"
                >
                  <span className="truncate">{propertyType || "Residential"}</span>

                  <ChevronDown
                    className={`h-4 w-4 text-[#67739E] transition-transform ${propertyTypeOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {propertyTypeOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[345px] bg-white rounded-[12px] shadow-lg z-50 overflow-hidden border border-[#E5EAF4]">

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-4 h-[42px] border-b border-[#EEF2F7]">
                      <span className="text-[14px] font-medium text-[#67739E]">
                        {propertyTab}
                      </span>
                      <ChevronDown className="h-4 w-4 text-[#67739E] rotate-180" />
                    </div>

                    {/* TABS */}
                    <div className="grid grid-cols-2 px-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setPropertyTab("Residential")}
                        className={`text-left text-[15px] h-[32px] border-b-2 ${propertyTab === "Residential"
                            ? "text-[#67739E] border-[#01155E]"
                            : "text-[#8B95B7] border-transparent"
                          }`}
                      >
                        Residential
                      </button>

                      <button
                        type="button"
                        onClick={() => setPropertyTab("Commercial")}
                        className={`text-left text-[15px] h-[32px] pl-3 border-b-2 ${propertyTab === "Commercial"
                            ? "text-[#67739E] border-[#01155E]"
                            : "text-[#8B95B7] border-transparent"
                          }`}
                      >
                        Commercial
                      </button>
                    </div>

                    {/* OPTIONS */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-2 p-3 pt-2">
                      {(propertyTab === "Residential"
                        ? residentialOptions
                        : commercialOptions
                      ).map((option) => {
                        const isActive = propertyType === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              dispatch(setPropertyType(option));
                              updateParams("propertyType", option);
                              setPropertyTypeOpen(false);
                            }}
                            className={`h-[30px] rounded-full border px-3 flex items-center gap-2 text-left transition-all ${isActive
                                ? "bg-[#01155E] border-[#01155E] text-white"
                                : "bg-white border-[#D9E1F2] text-[#67739E]"
                              }`}
                          >
                            <div
                              className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center flex-shrink-0 ${isActive ? "border-white" : "border-black"
                                }`}
                            >
                              {isActive && (
                                <div className="w-[7px] h-[7px] rounded-full bg-white" />
                              )}
                            </div>

                            <span className="text-[13px] leading-none truncate">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <select className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Sale status</option>
              </select>

              <div className="relative w-full font-['General_Sans']" ref={handoverRef}>
                <button
                  type="button"
                  onClick={() => {
                    const wasOpen = isHandoverOpen;
                    closeAllDropdowns();
                    setIsHandoverOpen(!wasOpen);
                  }}
                  className="w-full h-[48px] px-[12px] flex items-center justify-between bg-white border border-[#D1D5DB] text-[16px] text-[#67739E] transition-all"
                  style={{ borderRadius: isHandoverOpen ? "16px 16px 0 0" : "16px" }}
                >
                  <span className="truncate">
                    {selectedHandoverYears.length > 0
                      ? `${selectedHandoverYears.length} Year${selectedHandoverYears.length > 1 ? "s" : ""} Selected`
                      : "Handover year"}
                  </span>

                  <svg
                    className={`w-5 h-5 text-[#01155E] transition-transform duration-200 ${isHandoverOpen ? "rotate-180" : ""
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
                  <div className="absolute top-full left-0 z-50 mt-0 w-full bg-white rounded-b-[16px]">
                    <div className="p-0">
                      {handoverYears.map((year, index) => (
                        <button
                          key={year.value}
                          type="button"
                          onClick={() => handleHandoverYearChange(year.value)}
                          className={`w-full h-[48px] px-[12px] flex items-center gap-[40px] bg-white border-b border-[#D9E1F2] text-[#67739E] text-[16px] hover:bg-[#F8FAFF] transition-colors ${index === handoverYears.length - 1 ? "rounded-b-[16px] border-b-0" : ""
                            }`}
                        >
                          <div className="w-[24px] flex justify-center flex-shrink-0">
                            <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center">
                              {selectedHandoverYears.includes(year.value) && (
                                <div className="w-[8px] h-[8px] rounded-full bg-[#01155E]" />
                              )}
                            </div>
                          </div>

                          <span className="truncate">{year.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <select className="h-[48px] bg-white border border-[#D1D5DB] rounded-[16px] px-4 text-[#6B7280] text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat cursor-pointer">
                <option value="">Payment Plan</option>
              </select>

              <div className="relative w-full font-['General_Sans']" ref={emiratesRef}>
                <button
                  type="button"
                  onClick={() => {
                    const wasOpen = isOpen;
                    closeAllDropdowns();
                    setIsOpen(!wasOpen);
                  }}
                  className="w-full h-[48px] px-4 flex items-center justify-between bg-white border border-[#D9E1F2] text-[16px] transition-all"
                  style={{ borderRadius: isOpen ? '16px 16px 0 0' : '16px' }}
                >
                  <span className="text-[#67739E] text-[16px] truncate">
                    {selectedEmirates.length > 0
                      ? `${selectedEmirates.length} Emirate${selectedEmirates.length > 1 ? "s" : ""} Selected`
                      : "Emirates"}
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
                  <div className="absolute top-full left-0 mt-0 z-50 w-full  rounded-b-[16px] p-[12px] grid grid-cols-2 gap-[2px] ">
                    {emirates.map((emirate) => (
                      <div
                        key={emirate}
                        onClick={() => handleEmiratesChange(emirate)}
                        className="flex items-center gap-2 w-full h-[36px] bg-white border border-[#D9E1F2] rounded-[16px] px-[12px] cursor-pointer hover:border-[#01155E] transition-colors"
                      >
                        <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center flex-shrink-0">
                          {selectedEmirates.includes(emirate.toLowerCase()) && (
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
          viewMode === "list" ? (
            <div style={listingsGridStyle}>
              {projects.map((item) => (
                <ListingCard
                  key={item._id}
                  listing={item}
                  onRequireLogin={() => {
                    const event = new CustomEvent("openLogin");
                    window.dispatchEvent(event);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="w-full max-w-[1440px] mx-auto mt-6 flex border border-[#E5E7EB] rounded-xl overflow-hidden bg-white h-[calc(100vh-160px)] min-h-[600px] shadow-sm">
    
    {/* LEFT SIDE: Scrollable Sidebar */}
    <div className="w-[450px] lg:w-[500px] flex flex-col border-r border-[#E5E7EB] bg-[#F8F9FB]">
      
      {/* Sidebar Header */}
      <div className="sticky top-0 z-20 bg-white px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-[16px] font-bold text-[#01155E]">Properties in UAE</h2>
          <span className="text-[12px] text-gray-500 font-medium">{projects.length} Available Listings</span>
        </div>
        <label className="flex items-center gap-2 text-[13px] font-semibold text-[#374151] cursor-pointer bg-[#F3F4F6] px-3 py-1.5 rounded-lg border border-gray-200">
          <input type="checkbox" className="w-4 h-4 accent-[#01155E]" />
          TruCheck™
        </label>
      </div>

      {/* Scrollable Results Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {projects.map((item) => {
  const itemId = item._id?.$oid || item._id;

  return (
    <div
      key={itemId}
      className="rounded-xl transition-all"
      onMouseEnter={() => setHoveredListingId(itemId)}
      onMouseLeave={() => setHoveredListingId(null)}
    >
      <MapCard item={item} isHovered={hoveredListingId === itemId} />
    </div>
  );
})}
        </div>
        {projects.length > 0 && (
          <div className="py-10 text-center border-t border-gray-100 mt-6">
            <p className="text-gray-400 text-sm font-medium">End of properties</p>
          </div>
        )}
      </div>
    </div>

    {/* RIGHT SIDE: Mapbox Interface */}
   <div className="flex-1 relative bg-[#E8EEF4]">
  {/* Floating UI: Drive Time (Top Left) */}
  <div className="absolute top-4 left-4 z-10">
    <button className="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 shadow-xl border border-gray-200 hover:scale-105 transition-transform">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#01155E" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      <span className="text-[14px] font-bold text-[#01155E]">Drive Time</span>
      <span className="text-[9px] font-black bg-[#FF385C] text-white px-1.5 py-0.5 rounded uppercase tracking-tighter">
        New
      </span>
    </button>
  </div>

  {/* Floating UI: Close/Reset (Top Right) */}
  <div className="absolute top-4 right-4 z-10">
    <button
      onClick={() => setViewMode("list")}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200 text-gray-800 hover:bg-gray-50 active:scale-90 transition-all"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  </div>

  {/* Mapbox Implementation */}
  <Map
    initialViewState={{
      longitude:
        projects?.[0]?.location?.coordinates?.coordinates?.[0] || 55.2708,
      latitude:
        projects?.[0]?.location?.coordinates?.coordinates?.[1] || 25.2048,
      zoom: 8,
    }}
    mapboxAccessToken={MAPBOX_TOKEN}
    style={{ width: "100%", height: "100%" }}
    mapStyle="mapbox://styles/mapbox/streets-v12"
  >
    <NavigationControl position="bottom-right" />

    {projects.map((item) => {
  const coords = item?.location?.coordinates?.coordinates;
  if (!coords || coords.length < 2) return null;

  const [lng, lat] = coords;
  const itemId = item._id?.$oid || item._id;

  return (
    <Marker
      key={itemId}
      longitude={lng}
      latitude={lat}
      anchor="bottom"
    >
      <MapMarker
        item={item}
        isActive={hoveredListingId === itemId}
      />
    </Marker>
  );
})}
  </Map>
</div>
  </div>
          )
        )}
      </div>
    </div>
  );
};

export default Listings;