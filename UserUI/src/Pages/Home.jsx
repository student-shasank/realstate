import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import FeaturesSection from '../Components/HomePageComponents/FeaturesSection';
import { useNavigate } from 'react-router-dom';
import {
  setCompletion,
  setPropertyType,
  setLocation,
  setBeds,
  setBaths,
  toggleBedBath,
  togglePrice,
  setMinPrice,
  setMaxPrice,
  closeDropdowns,
  fetchProjects
} from '../features/dashboard/searchSlice';
import ListingCard from '../Components/Card/ListingCard';
import { Link } from 'react-router-dom';
import backgroundVideo from '../assets/Untitled design (14).mp4';
import Services from '../Components/HomePageComponents/Service';
import CommunitiesBrief from '../Components/HomePageComponents/CommunitiesBrief';
import UpcomingProjects from '../Components/HomePageComponents/UpcomingProjects';
import FeaturedBlogs from "../Components/HomePageComponents/BlogSection"
import DeveloperSlider from '../Components/HomePageComponents/Developerslider/DeveloperSlider';
import ChooseYourStrategy from '../Components/HomePageComponents/ChooseYourStrategy';
import DubaiMarketActivity from '../Components/HomePageComponents/DubaiMarketActivity';
import Preconstruction from "../assets/preconstruction.svg"
import DeveloperDropdown from "../Components/HomePageComponents/Developerslider/Devloperdropdown"
import AwardsSection from '../Components/HomePageComponents/AwardsSection';
import PropertyFlipbookSection from "../Components/HomePageComponents/Propertyflipbooksection.jsx"

// ---------------------------------------------------------------------------
// SHARED FONT PRINCIPLE
// Every filter control (the closed "trigger" button AND the options inside
// its open dropdown) reads from these two constants instead of declaring
// its own font classes, so the whole search bar is one consistent type
// system:
//   - Font family : Archivo
//   - Trigger label : text-sm (14px) font-medium, color #67739E
//   - Dropdown option : text-[14px] font-medium, color #67739E
// ---------------------------------------------------------------------------
const DROPDOWN_TRIGGER_TEXT_CLASS = "text-sm font-medium font-['Archivo'] text-[#67739E]";
const DROPDOWN_OPTION_TEXT_CLASS = "text-[14px] font-medium font-['Archivo'] text-[#67739E]";

const Home = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const bedBathRef = useRef(null);
  const priceRef = useRef(null);

  const [handoverOpen, setHandoverOpen] = React.useState(false);
  const [selectedHandoverYears, setSelectedHandoverYears] = React.useState([]);
  const handoverRef = useRef(null);

  const [saleStatusOpen, setSaleStatusOpen] = React.useState(false);
  const [selectedSaleStatus, setSelectedSaleStatus] = React.useState([]);
  const saleStatusRef = useRef(null);

  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [paymentPlan, setPaymentPlan] = React.useState('');
  const paymentRef = useRef(null);
  const [propertyTypeOpen, setPropertyTypeOpen] = React.useState(false);
  const [propertyTab, setPropertyTab] = React.useState("Residential");
  const propertyTypeRef = useRef(null);
  const [selectedDevelopers, setSelectedDevelopers] = React.useState([]);
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
    isBedBathOpen,
    beds,
    baths,
    isPriceOpen,
    minPrice,
    maxPrice,
    projects,
    loading,
    error
  } = useSelector((state) => state.search);

  // Whether "Ready" properties are selected — Handover Year and Payment
  // Plan are not applicable to ready (already-completed) properties,
  // so both filters are disabled whenever this is true.
  const isReadyCompletion = completion === 'Ready';

  // Clear any stale selections and close those dropdowns as soon as
  // "Ready" is selected, so a disabled filter can't silently stay applied.
  useEffect(() => {
    if (isReadyCompletion) {
      setSelectedHandoverYears([]);
      setPaymentPlan('');
      setHandoverOpen(false);
      setPaymentOpen(false);
    }
    // Sale Status option set differs between Ready and Off-Plan, so clear
    // any selection that no longer belongs to the currently active list
    // whenever completion changes (prevents a stale "announced" selection
    // from silently persisting after switching to Ready, for example).
    setSelectedSaleStatus([]);
    setSaleStatusOpen(false);
  }, [isReadyCompletion]);

  // HELPER TO CLOSE ALL DROPDOWNS
  const closeAll = () => {
    dispatch(closeDropdowns());
    setHandoverOpen(false);
    setPaymentOpen(false);
    setIsEmirateOpen(false);
    setPropertyTypeOpen(false);
    setSaleStatusOpen(false);

  };
  useEffect(() => {
  if (!completion) {
    dispatch(setCompletion("Off-Plan"));
  }
}, [completion, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideBedBath = bedBathRef.current && !bedBathRef.current.contains(event.target);
      const isOutsidePrice = priceRef.current && !priceRef.current.contains(event.target);
      const isOutsideHandover = handoverRef.current && !handoverRef.current.contains(event.target);
      const isOutsidePayment = paymentRef.current && !paymentRef.current.contains(event.target);
      const isOutsideEmirate = emirateRef.current && !emirateRef.current.contains(event.target);
      const isOutsidePropertyType =
        propertyTypeRef.current && !propertyTypeRef.current.contains(event.target);
      const isOutsideSaleStatus =
        saleStatusRef.current && !saleStatusRef.current.contains(event.target);

      if (isOutsideBedBath && isOutsidePrice && isOutsideHandover && isOutsidePayment && isOutsideEmirate && isOutsidePropertyType && isOutsideSaleStatus) {
        closeAll();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const getPriceLabel = () => {
    if (!minPrice && !maxPrice) return 'Price (AED)';
    const min = minPrice ? `${(parseInt(minPrice) / 1000).toLocaleString()}k` : '0';
    const max = maxPrice ? `${(parseInt(maxPrice) / 1000).toLocaleString()}k` : 'Any';
    return `${min} - ${max}`;
  };


  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location) params.set('location', location);
    if (selectedEmirates.length > 0) {
      params.set('emirates', selectedEmirates.join(','));
    }
    if (completion) params.set('completion', completion);
    if (propertyType) params.set('propertyType', propertyType);
    if (beds) params.set('beds', beds);
    if (baths) params.set('baths', baths);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    // if (purpose) params.set('purpose', purpose);
    if (!isReadyCompletion && selectedHandoverYears.length > 0) {
      params.set('handoverYear', selectedHandoverYears.join(','));
    }
    if (selectedSaleStatus.length > 0) {
      params.set('saleStatus', selectedSaleStatus.join(','));
    }
    if (!isReadyCompletion && paymentPlan) params.set('paymentPlan', paymentPlan);
    if (selectedDevelopers.length > 0) {
      const normalizedDevelopers = selectedDevelopers.map((dev) =>
        dev.toLowerCase().trim()
      );

      params.set("developer", normalizedDevelopers.join(","));
    }
    navigate(`/listings?${params.toString()}`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 380 : scrollLeft + 380;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  const [isEmirateOpen, setIsEmirateOpen] = React.useState(false);
  const [selectedEmirates, setSelectedEmirates] = React.useState([]);

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

  const emirates = [
    "Dubai", "Umm AL Quwain",
    "Abu Dhabi", "Ajman",
    "Ras Al Khaimah", "Fujairah",
    "Sharjah",
  ];

  const emirateRef = useRef(null);

  return (
    <>
      <div className="mx-auto w-full h-auto  sm:min-h-[800px] lg:h-[860px] flex flex-col items-center relative z-20 pb-8 sm:pb-10 lg:pb-0">
        <div className="absolute inset-0 -z-10">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-transparent" />
        </div>

        <div className="w-full max-w-[1248px] px-4 sm:px-5 md:px-6 pt-[70px] sm:pt-[90px] md:pt-[160px] lg:pt-[180px]">
          <h1 className="text-white text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-bold text-center drop-shadow-2xl" style={{ fontFamily: '"General Sans", sans-serif', fontWeight: '700', lineHeight: '110%', letterSpacing: '0%' }}>
            Dubai Real Estate Investments
          </h1>
          <h3 className="text-white text-[14px] sm:text-[17px] md:text-[21px] lg:text-[24px] font-bold text-center mb-4 sm:mb-5 mt-3 sm:mt-5 drop-shadow-2xl px-2" style={{ fontFamily: '"General Sans", sans-serif', fontWeight: '500', letterSpacing: '0%' }}>
            Off-plan (Pre-construction) and Ready properties tailored to your investment goals
          </h3>

          {/* <div className="flex flex-row items-center bg-transparent mx-auto" style={{ display: 'inline-flex', width: '1192px', height: '70px', padding: '12px', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            {['Properties', 'New Project', 'Transaction', 'Agents'].map((tab) => (
              <button key={tab} className="transition-all flex items-center justify-center" style={{ width: '280px', height: '46px', borderRadius: '8px', fontWeight: '600', fontSize: '20px', border: 'none', cursor: 'pointer', backgroundColor: tab === 'Properties' ? '#01155E' : '#FFFFFF', color: tab === 'Properties' ? '#FFFFFF' : '#5d6a92', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)' }}>
                {tab}
              </button>
            ))}
          </div> */}
         <div
  className="flex flex-row items-center bg-transparent mx-auto"
  style={{
    display: "inline-flex",
    width: "1192px",
    height: "70px",
    padding: "12px",
    gap: "16px",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {[
    "Off-plan Properties",
    "Ready Properties",
    "New Launches",
    "Metro Expansion",
  ].map((tab) => (
    <button
      key={tab}
      onClick={() => {
        const params = new URLSearchParams();

        if (tab === "Off-plan Properties") {
          dispatch(setCompletion("Off-Plan"));
          params.set("completion", "Off-Plan");
          navigate(`/listings?${params.toString()}`);
        } 
        else if (tab === "Ready Properties") {
          dispatch(setCompletion("Ready"));
          params.set("completion", "Ready");
          navigate(`/listings?${params.toString()}`);
        } 
        else if (tab === "New Launches") {
          dispatch(setCompletion("Off-Plan"));
          params.set("completion", "Off-Plan");

          // Show only these statuses
          params.set(
            "saleStatus",
            "announced,presale_eoi,start_of_sales"
          );

          navigate(`/listings?${params.toString()}`);
        } 
        else if (tab === "Metro Expansion") {
          window.open(
            "https://www.google.com/maps/d/u/1/edit?mid=193yuyhpEkRom7IC2tBpfgYI2LVShBvo&usp=sharing",
            "_blank",
            "noopener,noreferrer"
          );
        }
      }}
      className="transition-all flex items-center justify-center font-['Archivo']"
      style={{
        width: "280px",
        height: "46px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "20px",
        border: "none",
        cursor: "pointer",
        backgroundColor:
          tab === "Off-plan Properties" ? "#01155E" : "#FFFFFF",
        color:
          tab === "Off-plan Properties" ? "#FFFFFF" : "#5d6a92",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
      }}
    >
      {tab}
    </button>
  ))}
</div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[18px] sm:rounded-[22px] lg:rounded-[25px] p-3 sm:p-4 lg:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-[#01155E]" />
                </div>
<input
  type="text"
  placeholder="Enter Location"
  className="w-full pl-12 pr-4 py-2.5 bg-white rounded-lg outline-none text-[#01155E] font-medium font-['Archivo'] shadow-sm"
  value={location}
  onChange={(e) => dispatch(setLocation(e.target.value))}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  }}
/>
              </div>
              <button onClick={handleSearch} className="bg-[#01155E] text-white px-6 sm:px-8 md:px-10 py-2.5 rounded-lg font-['Archivo'] font-semibold text-base sm:text-lg shadow-md w-full md:w-auto md:min-w-[160px]">Search</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 sm:gap-3 mb-4 ">
              <div className="flex bg-white/40 py-1 px-2 rounded-lg border border-white/30 shadow-inner w-full md:w-fit justify-center md:justify-start -mt-1 gap-[10px]">
                {['Off-Plan', 'Ready',].map((status) => {
                  const isActive = completion === status;

                  return (
                    <button
                      key={status}
                      onClick={() => dispatch(setCompletion(status))}
                      className={`px-5 sm:px-7 md:px-10 py-2 text-sm font-semibold font-['Archivo'] transition-all  rounded-lg flex-1 md:flex-none ${isActive
                        ? 'bg-[#01155E] text-white shadow-md'
                        : 'text-[#01155E] bg-[#ffff]'
                        }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>


              <div className="relative" ref={bedBathRef}>
                <button type="button" onClick={() => {
                  const nextState = !isBedBathOpen;
                  closeAll();
                  if (nextState) dispatch(toggleBedBath());
                }} className={`w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 shadow-sm ${DROPDOWN_TRIGGER_TEXT_CLASS}`}>
                  <span className="truncate">{beds} Beds / {baths} Baths</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isBedBathOpen ? 'rotate-180' : ''}`} />
                </button>
                {isBedBathOpen && (
                  <div className="absolute top-full right-0 md:-right-5 mt-0 w-[92vw] max-w-[320px] md:w-[320px] bg-white border border-gray-200 rounded-3xl shadow-xl z-50 p-4 sm:p-6">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center"></div><h3 className="text-[#5B6B91] font-['Archivo'] text-lg">Beds</h3></div>
                      <div className="flex flex-wrap gap-2">
                        {['Studio', '1', '2', '3', '4', '5', '6', '7', '8+'].map((opt) => (
                          <button key={opt} type="button" onClick={() => dispatch(setBeds(opt))} className={`px-4 py-1.5 min-w-[55px] flex items-center justify-center rounded-full border transition-all ${DROPDOWN_OPTION_TEXT_CLASS} ${beds === opt ? 'bg-[#01155E] text-white border-[#01155E]' : 'bg-white border-gray-300'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center"></div><h3 className="text-[#5B6B91] font-['Archivo'] text-lg">Baths</h3></div>
                      <div className="flex flex-wrap gap-2">
                        {['1', '2', '3', '4', '5', '6+'].map((opt) => (
                          <button key={opt} type="button" onClick={() => dispatch(setBaths(opt))} className={`px-4 py-1.5 min-w-[55px] flex items-center justify-center rounded-full border transition-all ${DROPDOWN_OPTION_TEXT_CLASS} ${baths === opt ? 'bg-[#01155E] text-white border-[#01155E]' : 'bg-white border-gray-300'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => { dispatch(setBeds('Studio')); dispatch(setBaths('1')); }} className="flex-1 py-3 border border-black text-[#5B6B91] font-['Archivo'] text-base sm:text-lg rounded-3xl hover:bg-gray-50 transition-colors">Reset</button>
                      <button type="button" onClick={() => closeAll()} className="flex-1 py-3 bg-[#000E47] text-white font-['Archivo'] text-base sm:text-lg rounded-3xl hover:bg-blue-900 transition-colors">Done</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={priceRef}>
                <button type="button" onClick={() => {
                  const nextState = !isPriceOpen;
                  closeAll();
                  if (nextState) dispatch(togglePrice());
                }} className={`w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 shadow-sm ${DROPDOWN_TRIGGER_TEXT_CLASS}`}>
                  <span className="truncate">{getPriceLabel()}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPriceOpen && (
                  <div className="absolute top-full right-0 mt-2 w-[92vw] max-w-[300px] md:w-[300px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-4 sm:p-5">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                      <div><label className="text-gray-400 text-xs mb-1 block font-medium font-['Archivo']">Minimum</label><input type="number" placeholder="0" value={minPrice} onChange={(e) => dispatch(setMinPrice(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm font-['Archivo'] outline-none text-black" /></div>
                      <div><label className="text-gray-400 text-xs mb-1 block font-medium font-['Archivo']">Maximum</label><input type="number" placeholder="Any" value={maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm font-['Archivo'] outline-none text-black" /></div>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => { dispatch(setMinPrice('')); dispatch(setMaxPrice('')); }} className="flex-1 py-2 border border-[#01155E] text-[#01155E] font-bold font-['Archivo'] rounded-lg">Reset</button>
                      <button type="button" onClick={() => closeAll()} className="flex-1 py-2 bg-[#01155E] text-white font-bold font-['Archivo'] rounded-lg">Done</button>
                    </div>
                  </div>
                )}
              </div>


              <div className="relative" ref={propertyTypeRef}>
                <button
                  type="button"
                  onClick={() => {
                    const nextState = !propertyTypeOpen;
                    closeAll();
                    setPropertyTypeOpen(nextState);
                  }}
                  className={`w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 shadow-sm ${DROPDOWN_TRIGGER_TEXT_CLASS}`}
                >
                  <span className="truncate">{propertyType || "Residential"}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#67739E] transition-transform ${propertyTypeOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {propertyTypeOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[92vw] max-w-[345px] md:w-[345px] bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-[#E5EAF4]">
                    <div className="flex items-center justify-between px-4 h-[42px] border-b border-[#EEF2F7]">
                      <span className={DROPDOWN_OPTION_TEXT_CLASS}>
                        {propertyTab}
                      </span>
                      <ChevronDown className="h-4 w-4 text-[#67739E] rotate-180" />
                    </div>

                    <div className="grid grid-cols-2 px-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setPropertyTab("Residential")}
                        className={`text-left h-[32px] border-b-2 ${DROPDOWN_OPTION_TEXT_CLASS} ${propertyTab === "Residential"
                          ? "border-[#01155E]"
                          : "border-transparent opacity-60"
                          }`}
                      >
                        Residential
                      </button>

                      <button
                        type="button"
                        onClick={() => setPropertyTab("Commercial")}
                        className={`text-left h-[32px] pl-3 border-b-2 ${DROPDOWN_OPTION_TEXT_CLASS} ${propertyTab === "Commercial"
                          ? "border-[#01155E]"
                          : "border-transparent opacity-60"
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

                            <span className="text-[14px] font-medium font-['Archivo'] leading-none truncate">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

            </div>



            <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 sm:gap-3 w-full">

              {/* Sale Status — option list changes depending on whether
                  Off-Plan or Ready is selected (see saleStatusOptions
                  above). Always enabled. */}
              <div className="relative" ref={saleStatusRef}>
                <button
                  type="button"
                  onClick={() => {
                    const nextState = !saleStatusOpen;
                    closeAll();
                    setSaleStatusOpen(nextState);
                  }}
                  className={`w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 shadow-sm ${DROPDOWN_TRIGGER_TEXT_CLASS}`}
                >
                  <span className="truncate">
                    {selectedSaleStatus.length > 0
                      ? `${selectedSaleStatus.length} Status${selectedSaleStatus.length > 1 ? 'es' : ''} Selected`
                      : 'Sale Status'}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${saleStatusOpen ? 'rotate-180' : ''}`} />
                </button>

                {saleStatusOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full z-50 flex flex-col gap-0.5">
                    {saleStatusOptions.map((status) => (
                      <div
                        key={status.value}
                        onClick={() => {
                          setSelectedSaleStatus((prev) =>
                            prev.includes(status.value)
                              ? prev.filter((item) => item !== status.value)
                              : [...prev, status.value]
                          );
                        }}
                        className="flex items-center gap-4 px-4 py-3 bg-white rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 transition-colors border border-transparent active:border-gray-200"
                      >
                        <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center">
                          {selectedSaleStatus.includes(status.value) && (
                            <div className="w-[8px] h-[8px] bg-[#01155E] rounded-full" />
                          )}
                        </div>

                        <span className={DROPDOWN_OPTION_TEXT_CLASS}>
                          {status.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Handover Year — disabled whenever "Ready" completion is selected,
                  since handover year only applies to off-plan projects. */}
              <div className="relative" ref={handoverRef}>
                <button
                  type="button"
                  disabled={isReadyCompletion}
                  onClick={() => {
                    if (isReadyCompletion) return;
                    const nextState = !handoverOpen;
                    closeAll();
                    setHandoverOpen(nextState);
                  }}
                  title={isReadyCompletion ? 'Not applicable for Ready properties' : undefined}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 shadow-sm transition-colors ${DROPDOWN_TRIGGER_TEXT_CLASS} ${isReadyCompletion
                      ? 'bg-gray-100 !text-gray-400 cursor-not-allowed opacity-70'
                      : 'bg-white'
                    }`}
                >
                  <span className="truncate">
                    {selectedHandoverYears.length > 0
                      ? `${selectedHandoverYears.length} Year${selectedHandoverYears.length > 1 ? 's' : ''} Selected`
                      : 'Handover Year'}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isReadyCompletion ? 'text-gray-300' : 'text-gray-400'} ${handoverOpen ? 'rotate-180' : ''}`} />
                </button>

                {!isReadyCompletion && handoverOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full z-50 flex flex-col gap-0.5">
                    {handoverYears.map((year) => (
                      <div
                        key={year.value}
                        onClick={() => {
                          setSelectedHandoverYears((prev) =>
                            prev.includes(year.value)
                              ? prev.filter((item) => item !== year.value)
                              : [...prev, year.value]
                          );
                        }}
                        className="flex items-center gap-4 px-4 py-3 bg-white rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 transition-colors border border-transparent active:border-gray-200"
                      >
                        <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center">
                          {selectedHandoverYears.includes(year.value) && (
                            <div className="w-[8px] h-[8px] bg-[#01155E] rounded-full" />
                          )}
                        </div>

                        <span className={DROPDOWN_OPTION_TEXT_CLASS}>
                          {year.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <DeveloperDropdown
                selectedDevelopers={selectedDevelopers}
                setSelectedDevelopers={setSelectedDevelopers}
              />

              {/* Payment Plan — disabled whenever "Ready" completion is selected,
                  since payment plans only apply to off-plan projects. */}
              <div className="relative" ref={paymentRef}>
                <button
                  type="button"
                  disabled={isReadyCompletion}
                  onClick={() => {
                    if (isReadyCompletion) return;
                    const nextState = !paymentOpen;
                    closeAll();
                    setPaymentOpen(nextState);
                  }}
                  title={isReadyCompletion ? 'Not applicable for Ready properties' : undefined}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 shadow-sm transition-colors ${DROPDOWN_TRIGGER_TEXT_CLASS} ${isReadyCompletion
                      ? 'bg-gray-100 !text-gray-400 cursor-not-allowed opacity-70'
                      : 'bg-white'
                    }`}
                >
                  <span className="truncate">{paymentPlan || 'Payment Plan'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isReadyCompletion ? 'text-gray-300' : 'text-gray-400'} ${paymentOpen ? 'rotate-180' : ''}`} />
                </button>
                {!isReadyCompletion && paymentOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-3xl shadow-2xl z-50 p-3 flex flex-col gap-2">
                    {['During Construction', 'Post Handover'].map((plan) => (
                      <label key={plan} className="flex items-center gap-2 px-3 py-4 cursor-pointer hover:bg-gray-50 border border-gray-100 rounded-2xl transition-all">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="paymentPlan" value={plan} checked={paymentPlan === plan} onChange={() => { setPaymentPlan(plan); setPaymentOpen(false); }} className="peer appearance-none w-6 h-6 border-2 border-black rounded-full checked:border-black cursor-pointer" />
                          <div className="absolute w-3 h-3 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className={DROPDOWN_OPTION_TEXT_CLASS}>{plan}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative w-full font-['Archivo']" ref={emirateRef}>
                <button
                  type="button"
                  onClick={() => {
                    const next = !isEmirateOpen;
                    closeAll();
                    setIsEmirateOpen(next);
                  }}
                  className={`w-full h-[41px] px-4 flex items-center justify-between bg-white rounded-xl shadow-sm ${DROPDOWN_TRIGGER_TEXT_CLASS}`}
                  style={{ borderRadius: isEmirateOpen ? "16px 16px 0 0" : "16px" }}
                >
                  <span className="truncate">
                    {selectedEmirates.length > 0
                      ? `${selectedEmirates.length} Emirate${selectedEmirates.length > 1 ? 's' : ''} Selected`
                      : "Emirates"}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${isEmirateOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isEmirateOpen && (
                  <div className="absolute top-full left-0 z-50 w-full bg-white rounded-b-xl shadow-lg border border-[#D9E1F2] border-t-0 overflow-hidden">
                    {emirates.map((emirate, idx) => (
                      <div
                        key={emirate}
                        onClick={() => {
                          setSelectedEmirates((prev) =>
                            prev.includes(emirate)
                              ? prev.filter((item) => item !== emirate)
                              : [...prev, emirate]
                          );
                        }}
                        className={`flex items-center gap-[10px] w-full h-[44px] px-4 cursor-pointer hover:bg-[#F5F7FC] transition-colors ${idx !== emirates.length - 1 ? "border-b border-[#E9EDF7]" : ""
                          }`}
                      >
                        <div className="w-[16px] h-[16px] shrink-0 rounded-full border border-[#67739E] flex items-center justify-center">
                          {selectedEmirates.includes(emirate) && (
                            <div className="w-[8px] h-[8px] bg-[#01155E] rounded-full" />
                          )}
                        </div>

                        <span className={`${DROPDOWN_OPTION_TEXT_CLASS} truncate`}>
                          {emirate}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-hidden">
        <DeveloperSlider />
        <ChooseYourStrategy />
        <DubaiMarketActivity />
        {/* <AwardsSection/> */}
        <FeaturesSection />
        <Services />
        <CommunitiesBrief />
        <UpcomingProjects />
        
        <PropertyFlipbookSection />
        <FeaturedBlogs />
      </div>
    </>
  );
};
export default Home;