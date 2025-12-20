import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, ChevronDown, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
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
import ListingCard from "../Components/listingCard";
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center overflow-x-hidden p-4 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')` }}>

      <div className="w-full max-w-5xl mt-20">
        {/* Tabs */}
        <div className="flex bg-white/90 backdrop-blur-md rounded-t-xl border-b overflow-hidden w-fit">
          {['Properties', 'New Projects'].map((tab) => (
            <button key={tab} className={`px-8 py-4 text-sm font-bold transition-colors ${tab === 'Properties'
              ? 'text-green-600 bg-white border-b-2 border-green-600'
              : 'text-gray-700 hover:bg-gray-50'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Main Search Container */}
        <div className="bg-white rounded-b-xl rounded-tr-xl shadow-2xl p-6 space-y-5">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-700"
                value={location}
                onChange={(e) => dispatch(setLocation(e.target.value))}
              />
            </div>

            <button onClick={handleSearch}
              className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-14 py-3.5 rounded-lg font-bold text-lg shadow-lg transition-all transform active:scale-95">
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
              {['All', 'Ready', 'Off-Plan'].map((status) => (
                <button key={status} type="button"
                  onClick={() => dispatch(setCompletion(status))}
                  className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-md transition-all ${completion === status
                    ? 'bg-[#e8f5e9] text-green-700 border border-green-200 shadow-sm'
                    : 'text-gray-400'}`}>
                  {status}
                </button>
              ))}
            </div>

            <div className="relative">
              <select value={propertyType}
                onChange={(e) => dispatch(setPropertyType(e.target.value))}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-green-500">
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Townhouse">Townhouse</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Beds & Baths Dropdown - RESTORED */}
            <div className="relative" ref={bedBathRef}>
              <button type="button"
                onClick={() => dispatch(toggleBedBath())}
                className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 outline-none hover:border-gray-400 focus:ring-2 focus:ring-green-500 transition-all">
                <span className="truncate">{beds} Beds / {baths} Baths</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isBedBathOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBedBathOpen && (
                <div className="absolute top-full left-0 mt-2 w-full md:w-[340px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 p-5">
                  <div className="mb-6">
                    <h3 className="text-gray-900 font-bold text-sm mb-4">Beds</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Studio', '1', '2', '3', '4', '5', '6', '7', '8+'].map((opt) => (
                        <button key={opt} type="button" onClick={() => dispatch(setBeds(opt))}
                          className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border text-sm font-medium transition-all ${beds === opt ? 'bg-[#006169] text-white border-[#006169]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                        >{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-gray-900 font-bold text-sm mb-4">Baths</h3>
                    <div className="flex flex-wrap gap-2">
                      {['1', '2', '3', '4', '5', '6+'].map((opt) => (
                        <button key={opt} type="button" onClick={() => dispatch(setBaths(opt))}
                          className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border text-sm font-medium transition-all ${baths === opt ? 'bg-[#006169] text-white border-[#006169]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                        >{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => { dispatch(setBeds('Studio')); dispatch(setBaths('1')); }} className="flex-1 py-2.5 border border-[#006169] text-[#006169] font-bold rounded-lg hover:bg-gray-50">Reset</button>
                    <button type="button" onClick={() => dispatch(closeDropdowns())} className="flex-1 py-2.5 bg-[#006169] text-white font-bold rounded-lg hover:bg-[#004d54]">Done</button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Dropdown - RESTORED */}
            <div className="relative" ref={priceRef}>
              <button type="button" onClick={() => dispatch(togglePrice())}
                className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 outline-none hover:border-gray-400 focus:ring-2 focus:ring-green-500 transition-all">
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
                        onChange={(e) => dispatch(setMinPrice(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-green-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block font-medium">Maximum</label>
                      <input 
                        type="number" 
                        placeholder="Any" 
                        value={maxPrice}
                        onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-green-500 outline-none" 
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => { dispatch(setMinPrice('')); dispatch(setMaxPrice('')); }} className="flex-1 py-2.5 border border-[#006169] text-[#006169] font-bold rounded-lg text-sm">Reset</button>
                    <button type="button" onClick={() => dispatch(closeDropdowns())} className="flex-1 py-2.5 bg-[#006169] text-white font-bold rounded-lg text-sm">Done</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-green-500" />
              <p className="text-[15px] text-gray-600 font-medium">Want to find out more about UAE real estate using AI?</p>
            </div>
            <button className="text-green-700 text-sm font-bold flex items-center gap-1 hover:underline">
              Try Property <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        
      
      </div>

      {/* 🔽 CORRECTED CAROUSEL: FLOATING ARROWS & 3 FULL LISTINGS 🔽 */}
      <div className="w-full max-w-6xl mt-12 px-4 pb-20 relative">
        {!loading && projects?.length > 0 && (
          <div className="flex flex-col relative">
            
            {/* Header Title */}
            <div className="mb-6 px-2">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">
                Featured Projects
              </h2>
            </div>

            {/* Carousel Wrapper for Absolute Positioning */}
            <div className="relative flex items-center group">
              <div className='mr-10'></div>
              {/* Left Floating Arrow (Exactly like image) */}
         <button 
  onClick={() => scroll('left')} 
  className="absolute left-[-15px] z-40 p-1.5 bg-white rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 transition-all active:scale-90"
>
  <ChevronLeft className="h-4 w-4 text-gray-700" />
</button>

              {/* Scroll Container: Shows exactly 3 smaller listings */}
              <div 
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2 w-full"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {projects.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex-shrink-0 w-[calc((100%/3)-11px)]" 
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-white/20 transform transition-transform duration-300 hover:scale-[1.01]">
                      <ListingCard listing={item} />
                    </div>
                  </div>
                ))}
              </div>
              <div className='ml-10'></div>

              {/* Right Floating Arrow (Exactly like image) */}
              <button 
  onClick={() => scroll('right')} 
  className="absolute right-[-15px] z-40 p-1.5 bg-white rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 transition-all active:scale-90"
>
  <ChevronRight className="h-4 w-4 text-gray-700" />
</button>
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-10">
              <Link  to={"/listings"} className="bg-[#eafafa] text-[#00695c] px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md">
                View all new projects in Dubai
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;