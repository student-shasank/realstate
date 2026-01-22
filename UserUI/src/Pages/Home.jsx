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

  const [handoverOpen, setHandoverOpen] = React.useState(false);
  const [handoverYear, setHandoverYear] = React.useState('');
  const handoverRef = useRef(null);

  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [paymentPlan, setPaymentPlan] = React.useState('');
  const paymentRef = useRef(null);

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
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideBedBath = bedBathRef.current && !bedBathRef.current.contains(event.target);
      const isOutsidePrice = priceRef.current && !priceRef.current.contains(event.target);
      const isOutsideHandover = handoverRef.current && !handoverRef.current.contains(event.target);
      const isOutsidePayment = paymentRef.current && !paymentRef.current.contains(event.target);

      if (isOutsideBedBath && isOutsidePrice && isOutsideHandover && isOutsidePayment) {
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
              <button key={tab} className="transition-all flex items-center justify-center" style={{ width: '280px', height: '46px', borderRadius: '8px', fontWeight: '700', fontSize: '18px', border: 'none', cursor: 'pointer', backgroundColor: tab === 'Properties' ? '#01155E' : '#FFFFFF', color: tab === 'Properties' ? '#FFFFFF' : '#5d6a92', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)' }}>
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-[25px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              <div className="bg-white rounded-lg px-8 py-2.5 font-bold text-[#01155E] flex items-center justify-center shadow-sm min-w-[120px]">Buy</div>
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-[#01155E]" />
                </div>
                <input type="text" placeholder="Enter Location" className="w-full pl-12 pr-4 py-2.5 bg-white rounded-lg outline-none text-[#01155E] font-medium shadow-sm" value={location} onChange={(e) => dispatch(setLocation(e.target.value))} />
              </div>
              <button onClick={handleSearch} className="bg-[#01155E] text-white px-10 py-2.5 rounded-lg font-bold text-lg shadow-md min-w-[160px]">Search</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              <div className="flex bg-white/40 p-1 rounded-xl border border-white/30 shadow-inner">
                {['All', 'Ready', 'Off-Plan'].map((status) => (
                  <button key={status} onClick={() => dispatch(setCompletion(status))} className={`flex-1 py-1.5 px-3 text-sm font-bold rounded-lg transition-all ${completion === status ? 'bg-[#2B3964] text-white shadow-md' : 'text-[#2B3964]'}`}>
                    {status}
                  </button>
                ))}
              </div>

              <div className="relative">
                <select value={propertyType} onChange={(e) => dispatch(setPropertyType(e.target.value))} className="w-full appearance-none bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 outline-none shadow-sm cursor-pointer">
                  <option value="Apartment">Residential</option>
                  <option value="Villa">Villa</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative" ref={bedBathRef}>
                <button type="button" onClick={() => { 
                  const nextState = !isBedBathOpen;
                  closeAll(); 
                  if (nextState) dispatch(toggleBedBath()); 
                }} className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 shadow-sm">
                  <span className="truncate">{beds} Beds / {baths} Baths</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isBedBathOpen ? 'rotate-180' : ''}`} />
                </button>
                {isBedBathOpen && (
                  <div className="absolute top-full -right-5 mt-0 w-full md:w-[320px] bg-white border border-gray-200 rounded-3xl shadow-xl z-50 p-6">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center"></div><h3 className="text-[#5B6B91] font-medium text-lg">Beds</h3></div>
                      <div className="flex flex-wrap gap-2">
                        {['Studio', '1', '2', '3', '4', '5', '6', '7', '8+'].map((opt) => (
                          <button key={opt} type="button" onClick={() => dispatch(setBeds(opt))} className={`px-4 py-1.5 min-w-[55px] flex items-center justify-center rounded-full border transition-all text-sm ${beds === opt ? 'bg-[#01155E] text-white border-[#01155E]' : 'bg-white text-[#5B6B91] border-gray-300'}`}>{opt}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center"></div><h3 className="text-[#5B6B91] font-medium text-lg">Baths</h3></div>
                      <div className="flex flex-wrap gap-2">
                        {['1', '2', '3', '4', '5', '6+'].map((opt) => (
                          <button key={opt} type="button" onClick={() => dispatch(setBaths(opt))} className={`px-4 py-1.5 min-w-[55px] flex items-center justify-center rounded-full border transition-all text-sm ${baths === opt ? 'bg-[#01155E] text-white border-[#01155E]' : 'bg-white text-[#5B6B91] border-gray-300'}`}>{opt}</button>
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
                }} className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 shadow-sm">
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
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="relative">
                <select className="w-full appearance-none bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 outline-none shadow-sm cursor-pointer"><option>Emirate</option></select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 outline-none shadow-sm cursor-pointer"><option>Sale Status</option></select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative" ref={handoverRef}>
                <button type="button" onClick={() => {
                  const nextState = !handoverOpen;
                  closeAll();
                  setHandoverOpen(nextState);
                }} className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 shadow-sm">
                  <span>{handoverYear || 'Handover Year'}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${handoverOpen ? 'rotate-180' : ''}`} />
                </button>
                {handoverOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full z-50 flex flex-col gap-0.5">
                    {['2026', '2027', '2028', '2029', 'Post 2030'].map((year) => (
                      <label key={year} className="flex items-center gap-4 px-4 py-3 bg-white rounded-2xl shadow-sm cursor-pointer hover:bg-gray-50 transition-colors border border-transparent active:border-gray-200">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="handoverYear" value={year} checked={handoverYear === year} onChange={() => { setHandoverYear(year); setHandoverOpen(false); }} className="peer appearance-none w-5 h-5 border-2 border-black rounded-full checked:border-black cursor-pointer" />
                          <div className="absolute w-2.5 h-2.5 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className="text-[16px] font-medium text-[#6b728e]">{year}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={paymentRef}>
                <button type="button" onClick={() => {
                  const nextState = !paymentOpen;
                  closeAll();
                  setPaymentOpen(nextState);
                }} className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm font-bold text-gray-500 shadow-sm">
                  <span>{paymentPlan || 'Payment Plan'}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${paymentOpen ? 'rotate-180' : ''}`} />
                </button>
                {paymentOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-3xl shadow-2xl z-50 p-3 flex flex-col gap-2">
                    {['Completion', 'Post Handover'].map((plan) => (
                      <label key={plan} className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 border border-gray-100 rounded-2xl transition-all">
                        <div className="relative flex items-center justify-center">
                          <input type="radio" name="paymentPlan" value={plan} checked={paymentPlan === plan} onChange={() => { setPaymentPlan(plan); setPaymentOpen(false); }} className="peer appearance-none w-6 h-6 border-2 border-black rounded-full checked:border-black cursor-pointer" />
                          <div className="absolute w-3 h-3 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className="text-base font-medium text-[#6b728e]">{plan}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FeaturesSection />
        <Services />
        <CommunitiesBrief />
        <UpcomingProjects />
        <BlogSection />
      </div>
    </>
  );
};

export default Home;