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

// Shared style constant so every dropdown "value" row uses the exact
// same font style/size as the Payment Plan dropdown.
const DROPDOWN_OPTION_TEXT_CLASS = "text-[14px] font-medium text-[#6b728e]";

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
    if (selectedHandoverYears.length > 0) {
      params.set('handoverYear', selectedHandoverYears.join(','));
    }
    if (selectedSaleStatus.length > 0) {
      params.set('saleStatus', selectedSaleStatus.join(','));
    }
    if (paymentPlan) params.set('paymentPlan', paymentPlan);
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

  const saleStatusOptions = [
    { label: "Announced", value: "announced" },
    { label: "Presale/EOI", value: "presale_eoi" },
    { label: "Start of Sales", value: "start_of_sales" },
    { label: "On Sale", value: "on_sale" },
    { label: "Out of Stock", value: "out_of_stock" },
  ];

  const emirates = [
    "Dubai", "Umm AL Quwain",
    "Abu Dhabi", "Ajman",
    "Ras Al Khaimah", "Fujairah",
    "Sharjah",
  ];

  const emirateRef = useRef(null);

  return (
    <>
      <div className="mx-auto w-full h-[960px] flex flex-col items-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-transparent" />
        </div>

        <div className="w-full max-w-[1248px] px-4 md:px-6 pt-[110px] md:pt-[180px]">
          <h1 className="text-white text-[48px] font-bold text-center drop-shadow-2xl" style={{ fontFamily: '"General Sans", sans-serif', fontWeight: '700', lineHeight: '100%', letterSpacing: '0%' }}>
            Dubai Real Estate Investments
          </h1>
          <h3 className="text-white text-[24px] font-bold text-center mb-5 mt-5 drop-shadow-2xl" style={{ fontFamily: '"General Sans", sans-serif', fontWeight: '500', letterSpacing: '0%' }}>
            Pre-construction and Ready properties tailored to your investment goals
          </h3>

          <div className="flex flex-row items-center bg-transparent mx-auto" style={{ display: 'inline-flex', width: '1192px', height: '70px', padding: '12px', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            {['Properties', 'New Project', 'Transaction', 'Agents'].map((tab) => (
              <button key={tab} className="transition-all flex items-center justify-center" style={{ width: '280px', height: '46px', borderRadius: '8px', fontWeight: '600', fontSize: '20px', border: 'none', cursor: 'pointer', backgroundColor: tab === 'Properties' ? '#01155E' : '#FFFFFF', color: tab === 'Properties' ? '#FFFFFF' : '#5d6a92', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)' }}>
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[25px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-[#01155E]" />
                </div>
                <input type="text" placeholder="Enter Location" className="w-full pl-12 pr-4 py-2.5 bg-white rounded-lg outline-none text-[#01155E] font-medium shadow-sm" value={location} onChange={(e) => dispatch(setLocation(e.target.value))} />
              </div>
              <button onClick={handleSearch} className="bg-[#01155E] text-white px-10 py-2.5 rounded-lg font-['Archivo'] text-lg shadow-md min-w-[160px]">Search</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 ">
              <div className="flex bg-white/40 py-1 px-2 rounded-full border border-white/30 shadow-inner w-fit -mt-1">
                {['Off-Plan', 'Ready', ].map((status) => {
                  const isActive = completion === status;

                  return (
                    <button
                      key={status}
                      onClick={() => dispatch(setCompletion(status))}
                      className={`px-10 py-2 text-sm font-semibold font-['Archivo'] transition-all  rounded-full ${isActive
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
                }} className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-['Archivo'] text-[#67739E] shadow-sm">
                  <span className="truncate">{beds} Beds / {baths} Baths</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isBedBathOpen ? 'rotate-180' : ''}`} />
                </button>
                {isBedBathOpen && (
                  <div className="absolute top-full -right-5 mt-0 w-full md:w-[320px] bg-white border border-gray-200 rounded-3xl shadow-xl z-50 p-6">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center"></div><h3 className="text-[#5B6B91] font-['Archivo'] text-lg">Beds</h3></div>
                      <div className="flex flex-wrap gap-2">
                        {['Studio', '1', '2', '3', '4', '5', '6', '7', '8+'].map((opt) => (
                          <button key={opt} type="button" onClick={() => dispatch(setBeds(opt))} className={`px-4 py-1.5 min-w-[55px] flex items-center justify-center rounded-full border transition-all ${DROPDOWN_OPTION_TEXT_CLASS} ${beds === opt ? 'bg-[#01155E] text-white border-[#01155E]' : 'bg-white border-gray-300'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center"></div><h3 className="text-[#5B6B91] font-medium text-lg">Baths</h3></div>
                      <div className="flex flex-wrap gap-2">
                        {['1', '2', '3', '4', '5', '6+'].map((opt) => (
                          <button key={opt} type="button" onClick={() => dispatch(setBaths(opt))} className={`px-4 py-1.5 min-w-[55px] flex items-center justify-center rounded-full border transition-all ${DROPDOWN_OPTION_TEXT_CLASS} ${baths === opt ? 'bg-[#01155E] text-white border-[#01155E]' : 'bg-white border-gray-300'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => { dispatch(setBeds('Studio')); dispatch(setBaths('1')); }} className="flex-1 py-3 border border-black text-[#5B6B91] text-lg rounded-3xl hover:bg-gray-50 transition-colors">Reset</button>
                      <button type="button" onClick={() => closeAll()} className="flex-1 py-3 bg-[#000E47] text-white text-lg rounded-3xl hover:bg-blue-900 transition-colors">Done</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={priceRef}>
                <button type="button" onClick={() => {
                  const nextState = !isPriceOpen;
                  closeAll();
                  if (nextState) dispatch(togglePrice());
                }} className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-['Archivo'] text-[#67739E] shadow-sm">
                  <span className="truncate">{getPriceLabel()}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPriceOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full md:w-[300px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-5">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div><label className="text-gray-400 text-xs mb-1 block font-medium">Minimum</label><input type="number" placeholder="0" value={minPrice} onChange={(e) => dispatch(setMinPrice(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none text-black" /></div>
                      <div><label className="text-gray-400 text-xs mb-1 block font-medium">Maximum</label><input type="number" placeholder="Any" value={maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))} className="w-full border rounded-lg px-3 py-2 text-sm outline-none text-black" /></div>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => { dispatch(setMinPrice('')); dispatch(setMaxPrice('')); }} className="flex-1 py-2 border border-[#01155E] text-[#01155E] font-bold rounded-lg">Reset</button>
                      <button type="button" onClick={() => closeAll()} className="flex-1 py-2 bg-[#01155E] text-white font-bold rounded-lg">Done</button>
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
                  className="w-full flex items-center justify-between bg-white rounded-xl px-4 h-[41px] text-[15px] font-medium text-[#67739E] shadow-sm"
                >
                  <span className="truncate">{propertyType || "Residential"}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#67739E] transition-transform ${propertyTypeOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {propertyTypeOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[345px] bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-[#E5EAF4]">
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

            </div>



            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 w-full">

              <div className="relative" ref={saleStatusRef}>
                <button
                  type="button"
                  onClick={() => {
                    const nextState = !saleStatusOpen;
                    closeAll();
                    setSaleStatusOpen(nextState);
                  }}
                  className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-['Archivo'] text-[#67739E] shadow-sm"
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

              <div className="relative" ref={handoverRef}>
                <button
                  type="button"
                  onClick={() => {
                    const nextState = !handoverOpen;
                    closeAll();
                    setHandoverOpen(nextState);
                  }}
                  className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-['Archivo'] text-[#67739E] shadow-sm"
                >
                  <span className="truncate">
                    {selectedHandoverYears.length > 0
                      ? `${selectedHandoverYears.length} Year${selectedHandoverYears.length > 1 ? 's' : ''} Selected`
                      : 'Handover Year'}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${handoverOpen ? 'rotate-180' : ''}`} />
                </button>

                {handoverOpen && (
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

              <div className="relative" ref={paymentRef}>
                <button type="button" onClick={() => {
                  const nextState = !paymentOpen;
                  closeAll();
                  setPaymentOpen(nextState);
                }} className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-['Archivo'] text-[#67739E] shadow-sm">
                  <span>{paymentPlan || 'Payment Plan'}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${paymentOpen ? 'rotate-180' : ''}`} />
                </button>
                {paymentOpen && (
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
                  className="w-full h-[41px] px-4 flex items-center justify-between bg-white rounded-xl text-sm text-[#67739E] shadow-sm"
                  style={{ borderRadius: isEmirateOpen ? "16px 16px 0 0" : "16px" }}
                >
                  <span className="truncate">
                    {selectedEmirates.length > 0
                      ? `${selectedEmirates.length} Emirate${selectedEmirates.length > 1 ? 's' : ''} Selected`
                      : "Emirates"}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${isEmirateOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isEmirateOpen && (
                  <div className="absolute top-full left-0 z-50 w-full  rounded-xl  grid grid-cols-2 ">
                    {emirates.map((emirate) => (
                      <div
                        key={emirate}
                        onClick={() => {
                          setSelectedEmirates((prev) =>
                            prev.includes(emirate)
                              ? prev.filter((item) => item !== emirate)
                              : [...prev, emirate]
                          );
                        }}
                        className="flex items-center gap-[8px] w-full h-[36px] bg-white border border-[#D9E1F2] rounded-xl px-[12px] cursor-pointer hover:border-[#01155E] transition-colors"
                      >
                        <div className="w-[16px] h-[16px] rounded-full border border-[#67739E] flex items-center justify-center">
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
      <div>
        <DeveloperSlider />
        <ChooseYourStrategy />
        <DubaiMarketActivity />
        {/* <AwardsSection/> */}
        <FeaturesSection />
        <Services />
        <CommunitiesBrief />
        <UpcomingProjects />
        <FeaturedBlogs />
        <PropertyFlipbookSection/>
      </div>
    </>
  );
};
export default Home;