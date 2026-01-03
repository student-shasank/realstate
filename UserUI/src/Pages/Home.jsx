import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import FeaturesSection from '../Components/HomePageComponents/FeaturesSection';
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
import ListingCard from "../Components/Card/listingCard";
import { Link } from 'react-router-dom';
import backgroundVideo from '../assets/Untitled design (14).mp4';
import Services from '../Components/HomePageComponents/Service';
import CommunitiesBrief from '../Components/HomePageComponents/CommunitiesBrief';
import UpcomingProjects from '../Components/HomePageComponents/UpcomingProjects';
import BlogSection from '../Components/HomePageComponents/BlogSection';

const Home = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const bedBathRef = useRef(null);
  const priceRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideBedBath = bedBathRef.current && !bedBathRef.current.contains(event.target);
      const isOutsidePrice = priceRef.current && !priceRef.current.contains(event.target);
      
      if (isOutsideBedBath && isOutsidePrice) {
        dispatch(closeDropdowns());
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

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      fetchProjects({
        completion,
        propertyType,
        location,
        beds,
        baths,
        minPrice: minPrice || 0,
        maxPrice: maxPrice || Infinity,
      })
    );
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 380 : scrollLeft + 380;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <>
    {/* Main Page Wrapper: Max width 1440px and centered */}
    <div className="mx-auto max-w-[1440px] min-h-screen w-full flex flex-col items-center overflow-x-hidden relative">
      
      {/* 📹 Background Video Container - Constrained to the 1440px parent */}
      <div className="absolute top-0 left-0 h-[70vh] md:h-[926px] w-full overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-transparent" />
      </div>

      {/* Hero Content Wrapper: Max width 1200px */}
      <div className="w-full max-w-[1248px] px-4 md:px-6 pt-[110px] md:pt-[180px]">
        
        {/* Headline */}
      <h1 
  className="text-white text-[48px] font-bold text-center mb-12 drop-shadow-2xl"
  style={{ 
    fontFamily: '"General Sans", sans-serif', 
    fontWeight: '700',
    lineHeight: '100%', 
    letterSpacing: '0%' 
  }}
>
  Finding Your New Home Is Simple
</h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-2">
          {['Properties', 'New Project', 'Transaction', 'Agents'].map((tab) => (
            <button key={tab} className={`px-10 py-3 rounded-md font-bold text-lg shadow-xl transition-all ${
              tab === 'Properties' ? 'bg-[#01155E] text-white scale-105' : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* 🌫️ Frosted Glass Container - This is your 1200px Filter Container */}
        <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-[25px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          
          {/* Row 1: Buy, Location, Search */}
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <div className="bg-white rounded-lg px-8 py-2.5 font-bold text-[#01155E] flex items-center justify-center shadow-sm min-w-[120px]">
              Buy
            </div>

            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-[#01155E]" />
              </div>
              <input
                type="text"
                placeholder="Enter Location"
                className="w-full pl-12 pr-4 py-2.5 bg-white rounded-lg outline-none text-[#01155E] font-medium shadow-sm"
                value={location}
                onChange={(e) => dispatch(setLocation(e.target.value))}
              />
            </div>

            <button 
              onClick={handleSearch}
              className="bg-[#01155E] text-white px-10 py-2.5 rounded-lg font-bold text-lg shadow-md min-w-[160px]"
            >
              Search
            </button>
          </div>

          {/* Row 2: Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div className="flex bg-white/40 p-1 rounded-xl border border-white/30 shadow-inner">
              {['All', 'Ready', 'Off-Plan'].map((status) => (
                <button 
                  key={status}
                  onClick={() => dispatch(setCompletion(status))}
                  className={`flex-1 py-1.5 px-3 text-sm font-bold rounded-lg transition-all ${
                    completion === status 
                    ? 'bg-[#2B3964] text-white shadow-md' 
                    : 'text-[#2B3964]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="relative">
              <select 
                value={propertyType}
                onChange={(e) => dispatch(setPropertyType(e.target.value))}
                className="w-full appearance-none bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 outline-none shadow-sm cursor-pointer"
              >
                <option value="Apartment">Residential</option>
                <option value="Villa">Villa</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* BEDS & BATHS DROPDOWN */}
            <div className="relative" ref={bedBathRef}>
              <button 
                type="button"
                onClick={() => dispatch(toggleBedBath())}
                className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 shadow-sm"
              >
                <span className="truncate">{beds} Beds / {baths} Baths</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isBedBathOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBedBathOpen && (
                <div className="absolute top-full left-0 mt-2 w-full md:w-[340px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-5">
                  <div className="mb-6">
                    <h3 className="text-gray-900 font-bold text-sm mb-4">Beds</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Studio', '1', '2', '3', '4', '5', '6', '7', '8'].map((opt) => (
                        <button key={opt} type="button" onClick={() => dispatch(setBeds(opt))}
                          className={`w-[40px] h-[40px] flex items-center justify-center rounded-full border text-sm font-medium transition-all ${beds === opt ? 'bg-[#01155E] text-white' : 'bg-white text-gray-600'}`}
                        >{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-gray-900 font-bold text-sm mb-4">Baths</h3>
                    <div className="flex flex-wrap gap-2">
                      {['1', '2', '3', '4', '5', '6'].map((opt) => (
                        <button key={opt} type="button" onClick={() => dispatch(setBaths(opt))}
                          className={`w-[40px] h-[40px] flex items-center justify-center rounded-full border text-sm font-medium transition-all ${baths === opt ? 'bg-[#01155E] text-white' : 'bg-white text-gray-600'}`}
                        >{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t">
                    <button type="button" onClick={() => { dispatch(setBeds('Studio')); dispatch(setBaths('1')); }} className="flex-1 py-2 border border-[#01155E] text-[#01155E] font-bold rounded-lg">Reset</button>
                    <button type="button" onClick={() => dispatch(closeDropdowns())} className="flex-1 py-2 bg-[#01155E] text-white font-bold rounded-lg">Done</button>
                  </div>
                </div>
              )}
            </div>

            {/* PRICE DROPDOWN */}
            <div className="relative" ref={priceRef}>
              <button 
                type="button" 
                onClick={() => dispatch(togglePrice())}
                className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 shadow-sm"
              >
                <span className="truncate">{getPriceLabel()}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
              </button>

              {isPriceOpen && (
                <div className="absolute top-full right-0 mt-2 w-full md:w-[300px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-5">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block font-medium">Minimum</label>
                      <input type="number" placeholder="0" value={minPrice} onChange={(e) => dispatch(setMinPrice(e.target.value))}
                        className="w-full border rounded-lg px-3 py-2 text-sm outline-none text-black" 
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block font-medium">Maximum</label>
                      <input type="number" placeholder="Any" value={maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                        className="w-full border rounded-lg px-3 py-2 text-sm outline-none text-black" 
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => { dispatch(setMinPrice('')); dispatch(setMaxPrice('')); }} className="flex-1 py-2 border border-[#01155E] text-[#01155E] font-bold rounded-lg">Reset</button>
                    <button type="button" onClick={() => dispatch(closeDropdowns())} className="flex-1 py-2 bg-[#01155E] text-white font-bold rounded-lg">Done</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Filters Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Emirate', 'Sale Status', 'Handover Year', 'Payment Plan'].map((filter) => (
              <div key={filter} className="relative">
                <select className="w-full appearance-none bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 outline-none shadow-sm cursor-pointer">
                  <option>{filter}</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - constrained by the 1440px parent */}
      <FeaturesSection />
    </div>

    {/* Bottom Sections: These will also follow the 1440px constraint if they are wrapped similarly */}
    <div className="mx-auto max-w-[1440px]">
      <Services/>
      <CommunitiesBrief/>
      <UpcomingProjects/>
      <BlogSection/>
    </div>
    </>
  );
};

export default Home;