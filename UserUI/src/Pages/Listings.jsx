import React, { useEffect, useRef, useState, useCallback } from "react";
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
  setProjects,
} from "../features/dashboard/searchSlice";
import {
  fetchSortedProjects, // NEW: fully separate sort slice/endpoint
  setSortBy,
} from "../features/dashboard/sortSlice";
import ListingCard from "../Components/Card/ListingCard";
import { ChevronDown } from 'lucide-react';
import Breadcrumbs from "../Components/Card/Breadcrumbs";
import MapCard from "../Components/Card/MapCard"

// Normalize a completion value for robust, case/format-insensitive
// comparisons. This way "off-plan", "Off Plan", "OFF_PLAN", "offplan"
// (and similarly "ready" / "Ready" / "READY") are all treated the same,
// no matter exactly how the nav links or URL params spell them.
const normalizeCompletion = (value) =>
  (value || "").toString().toLowerCase().replace(/[-_\s]+/g, "");

const Listings = () => {
  const MAPBOX_TOKEN = VITE_MAPBOX_TOKEN;
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
  const saleStatusRef = useRef(null);
  const resultsRef = useRef(null); // used to scroll results into view on page change

  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const [propertyTab, setPropertyTab] = useState("Residential");
  const [viewMode, setViewMode] = useState("list");

  // FILTER STATE VARIABLES (moved here to fix dependency ordering before callbacks)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmirates, setSelectedEmirates] = useState([]);
  const [isHandoverOpen, setIsHandoverOpen] = useState(false);
  const [selectedHandoverYears, setSelectedHandoverYears] = useState([]);
  const [isSaleStatusOpen, setIsSaleStatusOpen] = useState(false);
  const [selectedSaleStatus, setSelectedSaleStatus] = useState([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [hoveredListingId, setHoveredListingId] = useState(null);



  const sortRef = useRef(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("most_popular");

  const sortOptions = [
    { label: "Most popular", value: "most_popular" },
    { label: "Featured", value: "featured" },
    { label: "Newest", value: "newest" },
    { label: "Price (low to high)", value: "price_asc" },
    { label: "Price (high to low)", value: "price_desc" },
    { label: "Beds (least)", value: "beds_asc" },
    { label: "Beds (most)", value: "beds_desc" },
  ];
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
    projects: searchProjects,
    loading: searchLoading,
    error: searchError,
    success: searchSuccess,
    totalPages: searchTotalPages,
    currentPage: searchCurrentPage,
  } = useSelector((state) => state.search);

  // NEW: separate sort slice — completely independent state/reducer
  const {
    projects: sortedProjects,
    loading: sortLoading,
    error: sortError,
    success: sortSuccess,
    totalPages: sortTotalPages,
    currentPage: sortCurrentPage,
  } = useSelector((state) => state.sort);

  // Whether the page is currently showing sorted results (from sortSlice)
  // or normal filtered results (from searchSlice). True whenever a
  // non-default sort is active.
  const isSortActive = selectedSort && selectedSort !== "most_popular";

  // Unified view — picks from whichever slice is currently "in control"
  const projects = isSortActive ? sortedProjects : searchProjects;
  const loading = isSortActive ? sortLoading : searchLoading;
  const error = isSortActive ? sortError : searchError;
  const success = isSortActive ? sortSuccess : searchSuccess;
  const totalPages = isSortActive ? sortTotalPages : searchTotalPages;
  const currentPage = isSortActive ? sortCurrentPage : searchCurrentPage;

  // Normalized completion value used for all status comparisons below.
  const normalizedCompletionValue = normalizeCompletion(completion);

  // Whether "Ready" properties are selected — Handover Year and Payment
  // Plan don't apply to ready (already-completed) properties, so both
  // filters are disabled whenever this is true.
  // NOTE: uses a normalized comparison so this keeps working regardless
  // of exactly how "ready" is cased/formatted in the URL or nav links.
  const isReadyCompletion = normalizedCompletionValue === "ready";

  // Whether "Off-plan" properties are selected.
  const isOffPlanCompletion = normalizedCompletionValue === "offplan";

  // Dynamic page heading — reflects whichever completion status (Ready /
  // Off-plan) is currently driving the results, per client requirement
  // that the page respond to `completion` instead of always showing the
  // same generic title.
  const getHeadingText = () => {
    if (isReadyCompletion) return "Ready Properties for sale in UAE";
    if (isOffPlanCompletion) return "Off-Plan Properties for sale in UAE";
    return "Properties for sale in UAE";
  };

  // Clear any stale Handover Year selection, close its dropdown, and
  // strip it from the URL as soon as "Ready" is selected, so a disabled
  // filter can't silently stay applied to the query.
  useEffect(() => {
    if (isReadyCompletion) {
      setSelectedHandoverYears([]);
      setIsHandoverOpen(false);
      updateParams("handoverYear", "");
    }
    // Sale Status option set differs between Ready and Off-Plan, so clear
    // any stale selection and strip it from the URL whenever completion
    // changes (prevents e.g. a leftover "announced" selection from
    // silently persisting after switching to Ready).
    setSelectedSaleStatus([]);
    setIsSaleStatusOpen(false);
    updateParams("saleStatus", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadyCompletion]);

  // FETCH A SPECIFIC PAGE (replaces results — used by pagination controls)
  // Now includes sortBy so paging through results keeps the active sort,
  // and routes through the dedicated sort endpoint when a non-default
  // sort is active (falls back to the normal search endpoint otherwise).
  const goToPage = useCallback(
    (pageNumber) => {
      if (
        pageNumber < 1 ||
        (totalPages && pageNumber > totalPages) ||
        pageNumber === currentPage
      ) {
        return;
      }

      const payload = {
        location: location || "",
        completion: completion || "",
        propertyType: propertyType || "",
        beds: beds || "",
        baths: baths || "",
        minPrice: minPrice || "",
        maxPrice: maxPrice || "",
        developer: selectedDevelopers,
        emirates: selectedEmirates,
        handoverYear: isReadyCompletion ? [] : selectedHandoverYears,
        saleStatus: selectedSaleStatus,
        sortBy: selectedSort,
        page: pageNumber,
        limit: 20,
      };

      // Paginate whichever slice is currently active
      dispatch(isSortActive ? fetchSortedProjects(payload) : fetchProjects(payload));

      // Scroll results back into view so the user sees page 1 of the new page
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [
      dispatch,
      location,
      completion,
      propertyType,
      beds,
      baths,
      minPrice,
      maxPrice,
      selectedDevelopers,
      selectedEmirates,
      selectedHandoverYears,
      selectedSaleStatus,
      selectedSort,
      isSortActive,
      isReadyCompletion,
      totalPages,
      currentPage,
    ]
  );

  useEffect(() => {
    const urlLocation = searchParams.get("location") || "";
    const urlCompletion = searchParams.get("completion") || "";
    const urlPropertyType = searchParams.get("propertyType") || "";
    const urlBeds = searchParams.get("beds") || "";
    const urlBaths = searchParams.get("baths") || "";
    const urlMinPrice = searchParams.get("minPrice") || "";
    const urlMaxPrice = searchParams.get("maxPrice") || "";
    const urlDeveloper = searchParams.get("developer") || "";
    const urlSortBy = searchParams.get("sortBy") || "most_popular"; // NEW

    const urlEmirates = searchParams.get("emirates") || "";
    const emiratesArray = urlEmirates
      ? urlEmirates.split(",").map((item) => item.toLowerCase()).filter(Boolean)
      : [];
    setSelectedEmirates(emiratesArray);

    const urlIsReady = normalizeCompletion(urlCompletion) === "ready";

    const urlHandoverYear = urlIsReady ? "" : (searchParams.get("handoverYear") || "");
    const handoverYearArray = urlHandoverYear
      ? urlHandoverYear.split(",").map((item) => item.toLowerCase()).filter(Boolean)
      : [];

    const urlSaleStatus = searchParams.get("saleStatus") || "";
    const saleStatusArray = urlSaleStatus
      ? urlSaleStatus.split(",").map((item) => item.toLowerCase()).filter(Boolean)
      : [];
    setSelectedSaleStatus(saleStatusArray);

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
    setSelectedHandoverYears(handoverYearArray);
    setSelectedSort(urlSortBy); // keep local dropdown label in sync on load/refresh

    const payload = {
      location: urlLocation,
      completion: urlCompletion,
      propertyType: urlPropertyType,
      beds: urlBeds,
      baths: urlBaths,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      developer: developerArray,
      emirates: emiratesArray,
      handoverYear: handoverYearArray,
      saleStatus: saleStatusArray,
      sortBy: urlSortBy,
      page: 1,          // IMPORTANT: Page 1
      limit: 20,         // IMPORTANT: 20 per page
    };

    // If the URL already carries a non-default sort (e.g. shared/bookmarked
    // link), load via the SEPARATE sort slice/endpoint so behavior matches
    // what the user last selected. Otherwise use the normal search slice.
    if (urlSortBy && urlSortBy !== "most_popular") {
      dispatch(setSortBy(urlSortBy));
      dispatch(fetchSortedProjects(payload));
    } else {
      dispatch(fetchProjects(payload));
    }
  }, [dispatch, searchParams]);

  // Sort dropdown change handler — ALWAYS hits the separate sort
  // slice/endpoint (fetchSortedProjects), never touches searchSlice.
  const handleSortChange = (value) => {
    setSelectedSort(value);
    dispatch(setSortBy(value));
    setIsSortOpen(false);
    updateParams("sortBy", value);

    const payload = {
      location: location || "",
      completion: completion || "",
      propertyType: propertyType || "",
      beds: beds || "",
      baths: baths || "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      developer: selectedDevelopers,
      emirates: selectedEmirates,
      handoverYear: isReadyCompletion ? [] : selectedHandoverYears,
      saleStatus: selectedSaleStatus,
      sortBy: value,
      page: 1,
      limit: 20,
    };

    if (value === "most_popular") {
      // "Most popular" is the search slice's natural default — fall back
      // to the normal search endpoint instead of the sort endpoint.
      dispatch(fetchProjects(payload));
    } else {
      dispatch(fetchSortedProjects(payload));
    }
  };

  const closeAllDropdowns = () => {
    dispatch(closeDropdowns());
    setPropertyTypeOpen(false);
    setIsHandoverOpen(false);
    setIsSaleStatusOpen(false);
    setIsOpen(false);
    setIsSortOpen(false);
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

      const isOutsideSaleStatus =
        saleStatusRef.current && !saleStatusRef.current.contains(event.target);

      // FIX: this was referenced but never defined before — caused a
      // ReferenceError every time this handler ran.
      const isOutsideSort =
        sortRef.current && !sortRef.current.contains(event.target);

      if (
        isOutsideBedBath &&
        isOutsidePrice &&
        isOutsidePropertyType &&
        isOutsideHandover &&
        isOutsideEmirates &&
        isOutsideSaleStatus &&
        isOutsideSort
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
    setSelectedSaleStatus([]);
    setIsSaleStatusOpen(false);
    setIsOpen(false);
    dispatch(setDeveloper(""));
    setSelectedDevelopers([]);
    setSelectedEmirates([]);
    // NOTE: sort intentionally left as-is — clearing filters shouldn't
    // reset a user's chosen sort order. Remove the comment/lines below
    // if you'd rather reset sort too:
    // setSelectedSort("most_popular");
    // dispatch(setSortBy("most_popular"));
    // updateParams("sortBy", "");
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
    if (isReadyCompletion) return;

    const updatedYears = selectedHandoverYears.includes(value)
      ? selectedHandoverYears.filter((item) => item !== value)
      : [...selectedHandoverYears, value];

    setSelectedHandoverYears(updatedYears);
    updateParams("handoverYear", updatedYears.join(","));
  };

  const handleSaleStatusChange = (value) => {
    const updatedStatus = selectedSaleStatus.includes(value)
      ? selectedSaleStatus.filter((item) => item !== value)
      : [...selectedSaleStatus, value];

    setSelectedSaleStatus(updatedStatus);
    updateParams("saleStatus", updatedStatus.join(","));
  };

  const emirates = [
    "Dubai", "Umm AL Quwain",
    "Abu Dhabi", "Ajman",
    "Ras Al Khaimah", "Fujairah",
    "Sharjah",
  ];

  const handoverYears = [
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
    { label: "Post 2030", value: "post 2030" },
  ];

  // Sale status options differ by completion type:
  // - Off-Plan: Announced, Presale/EOI, Start of Sales, On Sale, Out of Stock
  // - Ready: On Sale, Exclusive Inventory, Out of Stock
  const offPlanSaleStatusOptions = [
    { label: "Announced", value: "announced" },
    { label: "Presale/EOI", value: "presale_eoi" },
    { label: "Start of Sales", value: "start_of_sales" },
    { label: "On Sale", value: "on_sale" },
    { label: "Out of Stock", value: "out_of_stock" },
  ];

  const readySaleStatusOptions = [
    { label: "On Sale", value: "on_sale" },
    { label: "Exclusive Inventory", value: "exclusive_inventory" },
    { label: "Out of Stock", value: "out_of_stock" },
  ];

  const saleStatusOptions = isReadyCompletion
    ? readySaleStatusOptions
    : offPlanSaleStatusOptions;

  const developerOptions = [
    "Zara Builders",
    "DAMAC",
    "Sobha",
    "Nakheel",
    "Azizi",
  ];

  // ---- PAGINATION BAR (Prev / 1 2 3 ... / Next) ----
  const PaginationBar = () => {
    if (!totalPages || totalPages <= 1) return null;

    const pageNumbers = [];
    const maxButtons = 5; // how many numbered buttons to show at once

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) pageNumbers.push(i);

    const baseBtn =
      "min-w-[40px] h-[40px] px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center";

    return (
      <div className="flex items-center justify-center gap-2 py-8 flex-wrap">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`${baseBtn} ${
            currentPage <= 1
              ? "text-gray-300 cursor-not-allowed border border-gray-200"
              : "text-[#01155E] border border-[#D1D5DB] hover:bg-[#01155E] hover:text-white"
          }`}
        >
          Prev
        </button>

        {start > 1 && (
          <>
            <button
              type="button"
              onClick={() => goToPage(1)}
              className={`${baseBtn} text-[#01155E] border border-[#D1D5DB] hover:bg-[#01155E] hover:text-white`}
            >
              1
            </button>
            {start > 2 && <span className="px-1 text-[#67739E]">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => goToPage(page)}
            className={`${baseBtn} ${
              page === currentPage
                ? "bg-[#01155E] text-white border border-[#01155E]"
                : "text-[#01155E] border border-[#D1D5DB] hover:bg-[#01155E] hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-1 text-[#67739E]">...</span>}
            <button
              type="button"
              onClick={() => goToPage(totalPages)}
              className={`${baseBtn} text-[#01155E] border border-[#D1D5DB] hover:bg-[#01155E] hover:text-white`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`${baseBtn} ${
            currentPage >= totalPages
              ? "text-gray-300 cursor-not-allowed border border-gray-200"
              : "text-[#01155E] border border-[#D1D5DB] hover:bg-[#01155E] hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    );
  };

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
              {getHeadingText()}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => {
                  const wasOpen = isSortOpen;
                  closeAllDropdowns();
                  setIsSortOpen(!wasOpen);
                }}
                className={`h-[44px] min-w-[150px] px-4 flex items-center justify-between gap-3 bg-white border text-[15px] font-semibold text-[#01155E] transition-colors ${
                  isSortOpen
                    ? "border-[#01155E] rounded-t-[12px]"
                    : "border-[#D1D5DB] rounded-[12px]"
                }`}
              >
                <span className="truncate">
                  {sortOptions.find((opt) => opt.value === selectedSort)?.label || "Most popular"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSortOpen && (
                <div className="absolute top-[44px] left-0 z-50 w-[260px] bg-white border border-[#01155E] rounded-b-[12px] shadow-[0_10px_20px_rgba(1,21,94,0.1)] overflow-hidden">
                  <div className="px-4 pt-3 pb-2">
                    <span className="text-[#01155E] text-[14px] font-bold">Sort by</span>
                  </div>

                  {sortOptions.map((option, index) => {
                    const isSelected = option.value === selectedSort;
                    return (
                      <div
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`flex items-center gap-3 px-4 h-[40px] cursor-pointer transition-colors ${
                          isSelected ? "bg-[#F4F6FF]" : "hover:bg-[#F8FAFF]"
                        } ${index !== sortOptions.length - 1 ? "border-b border-[#EEF2F7]" : ""}`}
                      >
                        <div className="w-[15px] h-[15px] rounded-full border border-[#67739E] flex items-center justify-center shrink-0">
                          {isSelected && <div className="w-[7px] h-[7px] bg-[#01155E] rounded-full" />}
                        </div>
                        <span
                          className={`text-[13.5px] truncate ${
                            isSelected ? "text-[#01155E] font-semibold" : "text-[#4B5563]"
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center bg-white rounded-2xl border border-[#E2E5EC] p-1 gap-1">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[16px] transition-all ${
                  viewMode === "list"
                    ? "bg-[#EEF2F9] text-[#01155E]"
                    : "text-[#01155E]/70 hover:text-[#01155E]"
                }`}
              >
                <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
                  <path
                    d="M7 3H19M7 9H19M7 15H19M1 3H3M1 9H3M1 15H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>List</span>
              </button>

              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[16px] transition-all ${
                  viewMode === "map"
                    ? "bg-[#EEF2F9] text-[#01155E]"
                    : "text-[#01155E]/70 hover:text-[#01155E]"
                }`}
              >
                <svg width="16" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* FILTERS SECTION */}
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
                onClick={() => {
                  const payload = {
                    location,
                    completion,
                    propertyType,
                    beds,
                    baths,
                    minPrice,
                    maxPrice,
                    developer: selectedDevelopers,
                    emirates: selectedEmirates,
                    handoverYear: isReadyCompletion ? [] : selectedHandoverYears,
                    saleStatus: selectedSaleStatus,
                    sortBy: selectedSort,
                    page: 1,
                    limit: 20,
                  };
                  // Re-run search with current filters, on whichever
                  // slice (search vs sort) is currently active
                  dispatch(isSortActive ? fetchSortedProjects(payload) : fetchProjects(payload));
                }}
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
                    className={`h-4 w-4 text-[#67739E] transition-transform ${propertyTypeOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {propertyTypeOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[345px] bg-white rounded-[12px] shadow-lg z-50 overflow-hidden border border-[#E5EAF4]">
                    <div className="flex items-center justify-between px-4 h-[42px] border-b border-[#EEF2F7]">
                      <span className="text-[14px] font-medium text-[#67739E]">
                        {propertyTab}
                      </span>
                      <ChevronDown className="h-4 w-4 text-[#67739E] rotate-180" />
                    </div>

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
                              className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center flex-shrink-0 ${isActive ? "border-white" : "border-black"}`}
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

              {/* Sale Status — option list changes depending on whether
                  Off-Plan or Ready is selected (see saleStatusOptions
                  above). Always enabled. */}
              <div className="relative w-full font-['General_Sans']" ref={saleStatusRef}>
                <button
                  type="button"
                  onClick={() => {
                    const wasOpen = isSaleStatusOpen;
                    closeAllDropdowns();
                    setIsSaleStatusOpen(!wasOpen);
                  }}
                  className="w-full h-[48px] px-[12px] flex items-center justify-between bg-white border border-[#D1D5DB] text-[16px] text-[#67739E] transition-all"
                  style={{ borderRadius: isSaleStatusOpen ? "16px 16px 0 0" : "16px" }}
                >
                  <span className="truncate">
                    {selectedSaleStatus.length > 0
                      ? `${selectedSaleStatus.length} Status${selectedSaleStatus.length > 1 ? "es" : ""} Selected`
                      : "Sale status"}
                  </span>

                  <svg
                    className={`w-5 h-5 text-[#01155E] transition-transform duration-200 ${isSaleStatusOpen ? "rotate-180" : ""}`}
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
                  <div className="absolute top-full left-0 z-50 mt-0 w-full bg-white rounded-b-[16px]">
                    <div className="p-0">
                      {saleStatusOptions.map((status, index) => (
                        <button
                          key={status.value}
                          type="button"
                          onClick={() => handleSaleStatusChange(status.value)}
                          className={`w-full h-[48px] px-[12px] flex items-center gap-[40px] bg-white border-b border-[#D9E1F2] text-[#67739E] text-[16px] hover:bg-[#F8FAFF] transition-colors ${index === saleStatusOptions.length - 1 ? "rounded-b-[16px] border-b-0" : ""}`}
                        >
                          <div className="w-[24px] flex justify-center flex-shrink-0">
                            <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center">
                              {selectedSaleStatus.includes(status.value) && (
                                <div className="w-[8px] h-[8px] rounded-full bg-[#01155E]" />
                              )}
                            </div>
                          </div>

                          <span className="truncate">{status.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Handover Year — disabled whenever "Ready" completion is
                  selected, since handover year only applies to off-plan
                  projects. */}
              <div className="relative w-full font-['General_Sans']" ref={handoverRef}>
                <button
                  type="button"
                  disabled={isReadyCompletion}
                  onClick={() => {
                    if (isReadyCompletion) return;
                    const wasOpen = isHandoverOpen;
                    closeAllDropdowns();
                    setIsHandoverOpen(!wasOpen);
                  }}
                  title={isReadyCompletion ? "Not applicable for Ready properties" : undefined}
                  className={`w-full h-[48px] px-[12px] flex items-center justify-between border text-[16px] transition-all ${
                    isReadyCompletion
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70"
                      : "bg-white border-[#D1D5DB] text-[#67739E]"
                  }`}
                  style={{ borderRadius: isHandoverOpen && !isReadyCompletion ? "16px 16px 0 0" : "16px" }}
                >
                  <span className="truncate">
                    {selectedHandoverYears.length > 0
                      ? `${selectedHandoverYears.length} Year${selectedHandoverYears.length > 1 ? "s" : ""} Selected`
                      : "Handover year"}
                  </span>

                  <svg
                    className={`w-5 h-5 ${isReadyCompletion ? "text-gray-400" : "text-[#01155E]"} transition-transform duration-200 ${isHandoverOpen ? "rotate-180" : ""}`}
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

                {!isReadyCompletion && isHandoverOpen && (
                  <div className="absolute top-full left-0 z-50 mt-0 w-full bg-white rounded-b-[16px]">
                    <div className="p-0">
                      {handoverYears.map((year, index) => (
                        <button
                          key={year.value}
                          type="button"
                          onClick={() => handleHandoverYearChange(year.value)}
                          className={`w-full h-[48px] px-[12px] flex items-center gap-[40px] bg-white border-b border-[#D9E1F2] text-[#67739E] text-[16px] hover:bg-[#F8FAFF] transition-colors ${index === handoverYears.length - 1 ? "rounded-b-[16px] border-b-0" : ""}`}
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

              {/* Payment Plan — disabled whenever "Ready" completion is
                  selected, since payment plans only apply to off-plan
                  projects. */}
              <select
                disabled={isReadyCompletion}
                title={isReadyCompletion ? "Not applicable for Ready properties" : undefined}
                className={`h-[48px] border rounded-[16px] px-4 text-[16px] outline-none appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271210.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat ${
                  isReadyCompletion
                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70"
                    : "bg-white border-[#D1D5DB] text-[#6B7280] cursor-pointer"
                }`}
              >
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
                  <div className="absolute top-full left-0 mt-0 z-50 w-full rounded-b-[16px] p-[12px] grid grid-cols-2 gap-[2px]">
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

        <div ref={resultsRef} />

        {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading listings...</p>}
        {!loading && error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}
        {!loading && success && projects?.length === 0 && (
          <p style={{ textAlign: 'center' }}>No listings found.</p>
        )}

        {!loading && projects?.length > 0 && (
          viewMode === "list" ? (
            <div>
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

              {/* PAGINATION for list view */}
              <PaginationBar />
            </div>
          ) : (
            <div className="w-full max-w-[1440px] mx-auto mt-6 flex border border-[#E5E7EB] rounded-xl overflow-hidden bg-white h-[calc(100vh-160px)] min-h-[600px] shadow-sm">
              {/* LEFT SIDE: Scrollable Sidebar */}
              <div className="w-[450px] lg:w-[500px] flex flex-col border-r border-[#E5E7EB] bg-[#F8F9FB]">

                {/* Sidebar Header */}
                <div className="sticky top-0 z-20 bg-white px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-[16px] font-bold text-[#01155E]">Properties in UAE</h2>
                    <span className="text-[12px] text-gray-500 font-medium">{projects.length} +  Available Listings</span>
                  </div>
                </div>

                {/* Scrollable Results Area */}
                <div
                  className="flex-1 overflow-y-auto p-4 custom-scrollbar"
                >
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

                  {/* PAGINATION for map sidebar */}
                  <PaginationBar />
                </div>
              </div>

              {/* RIGHT SIDE: Mapbox Interface */}
              <div className="flex-1 relative bg-[#E8EEF4]">
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
                    if (!item?.lat_long) return null;

                    const [lat, lng] = item.lat_long.split(",").map(Number);
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


        <div className="max-w-[1290px] mx-auto mt-12 mb-8 px-4">
          <div className="border-t border-gray-200 pt-6">
            <p className="text-[#67739E] font-normal text-[16px] leading-relaxed ">
              Property information, pricing, availability, specifications, and
              project details presented on this page are provided for general
              informational purposes only. Such information may change without
              notice and should be independently verified with the relevant
              developer or licensed brokerage before making any property-related
              decision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;