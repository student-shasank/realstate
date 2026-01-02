import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListingDetail } from "../features/dashboard/listingDetailSlice.jsx";
import { 
  FaBed, FaBath, FaChartArea, FaUserTie, FaMoneyCheckAlt, 
  FaTools, FaCalendarAlt, FaBuilding, FaMapMarkerAlt, 
  FaSwimmingPool, FaCheckCircle 
} from "react-icons/fa";

const Contact = () => {
  const dispatch = useDispatch();
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [selected, setSelected] = useState([null, null]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavs = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      const ids = userData?.favorites || [];
      if (ids.length > 0) {
        setLoading(true);
        try {
          const results = await Promise.all(ids.map(id => dispatch(fetchListingDetail(id)).unwrap()));
          setFavoriteListings(results);
          if (results.length >= 2) setSelected([results[0], results[1]]);
          else if (results.length === 1) setSelected([results[0], results[0]]);
        } catch (err) {
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchFavs();
  }, [dispatch]);

  const handleSelect = (idx, id) => {
    const item = favoriteListings.find(p => (p._id?.$oid || p._id) === id);
    setSelected(prev => {
      const newSel = [...prev];
      newSel[idx] = item;
      return newSel;
    });
  };

  const getID = (item) => item?._id?.$oid || item?._id;

  return (
    <div className="min-h-screen bg-[#EEF0F3] py-16 px-6 flex justify-center items-start">
      {/* --- 1600px Ultra Wide Frame --- */}
      <div className="max-w-[1600px] w-full bg-[#F8F9FB] rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] p-16 border-[20px] border-white relative">
        
        {/* --- EXCLUSION LOGIC DROPDOWNS --- */}
        <div className="flex justify-center gap-16 mb-20">
          {[0, 1].map(i => (
            <div key={i} className="relative w-full max-w-md group">
              <select 
                className="w-full appearance-none bg-white px-12 py-6 rounded-3xl shadow-xl text-gray-800 font-black text-base border-none focus:ring-4 focus:ring-[#01155E]/20 outline-none uppercase tracking-widest cursor-pointer text-center transition-all group-hover:shadow-2xl"
                value={getID(selected[i]) || ""}
                onChange={(e) => handleSelect(i, e.target.value)}
              >
                <option value="">CHOOSE PROPERTY {i+1}</option>
                {favoriteListings
                  .filter(item => {
                    const otherIdx = i === 0 ? 1 : 0;
                    return getID(item) !== getID(selected[otherIdx]);
                  })
                  .map(item => (
                    <option key={getID(item)} value={getID(item)}>{item.title}</option>
                  ))
                }
              </select>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-2 bg-[#01155E] rounded-full blur-[0.5px]"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 relative">
          {/* Vertical Visual Divider using #01155E */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#01155E] via-[#01155E]/20 to-transparent transform -translate-x-1/2 opacity-30"></div>

          {[0, 1].map(i => (
            <div key={i} className="flex flex-col space-y-12">
              {selected[i] ? (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  
                  {/* --- TOP IMAGE & PRICE --- */}
                  <div className="relative rounded-[4rem] overflow-hidden shadow-2xl mb-12 group">  
                    <img 
                      src="https://images.bayut.com/thumbnails/803707122-1066x800.webp"
                      className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt="hero" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#01155E] via-transparent to-transparent p-12 flex flex-col justify-end">
                      <p className="text-white text-3xl font-black mb-2 tracking-tight line-clamp-1">{selected[i].title}</p>
                      <p className="text-white font-black text-5xl mb-8 tracking-tighter opacity-90">
                        {selected[i].currency} {selected[i].price?.toLocaleString()}
                      </p>
                      <div className="flex justify-between items-center">
                        <button className="bg-white/10 backdrop-blur-2xl border border-white/20 text-white text-xs px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-[#01155E] transition-all">
                          View Details
                        </button>
                        <div className="bg-white p-5 rounded-3xl text-[#01155E] shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                          <FaMoneyCheckAlt className="text-3xl" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- VISUAL OVERVIEW (Fields: Plot & Ownership) --- */}
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 text-center">
                       <FaChartArea className="text-[#01155E] text-3xl mx-auto mb-4" />
                       <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Plot Area</p>
                       <p className="text-3xl font-black text-gray-900">{selected[i].plotArea || "—"}</p>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 text-center">
                       <FaCheckCircle className="text-[#01155E] text-3xl mx-auto mb-4" />
                       <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Ownership</p>
                       <p className="text-3xl font-black text-gray-900">{selected[i].validatedInfo?.ownership || "—"}</p>
                    </div>
                  </div>

                  {/* --- PROJECT & SPECS (Fields: Type, Purpose, Bed/Bath, Furnishing, Handover) --- */}
                  <div className="bg-white rounded-[3rem] p-12 shadow-sm space-y-8">
                    <h3 className="font-black text-gray-400 text-xs uppercase tracking-[0.4em] mb-4">Core Specifications</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                        <span className="text-gray-400 font-bold text-sm uppercase">Property Type / Purpose</span>
                        <span className="text-gray-900 font-black">{selected[i].type} | {selected[i].purpose}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                        <span className="text-gray-400 font-bold text-sm uppercase">Bedrooms / Bathrooms</span>
                        <span className="text-gray-900 font-black">{selected[i].bedrooms} Beds / {selected[i].bathrooms} Baths</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                        <span className="text-gray-400 font-bold text-sm uppercase">Built-up Area</span>
                        <span className="text-gray-900 font-black">{selected[i].builtUpArea} SqFt</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                        <span className="text-gray-400 font-bold text-sm uppercase">Furnishing</span>
                        <span className="text-gray-900 font-black">{selected[i].furnishing || "—"}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-gray-400 font-bold text-sm uppercase">Handover Date</span>
                        <span className="text-3xl font-black text-[#01155E] tracking-tighter">{selected[i].projectInfo?.handoverDate || "—"}</span>
                      </div>
                    </div>
                  </div>

                  {/* --- FINANCIALS & LOCATION (Fields: Downpayment, Installments, Address) --- */}
                  <div className="bg-white rounded-[3rem] p-12 shadow-sm mt-12">
                    <h3 className="font-black text-gray-400 text-xs uppercase tracking-[0.4em] mb-8">Financial & Location</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-400 font-bold text-xs uppercase">Down Payment</p>
                        <p className="text-4xl font-black text-gray-900">${selected[i].paymentPlan?.downPayment?.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-400 font-bold text-xs uppercase">Installment Plan</p>
                        <p className="text-xl font-black text-[#01155E]">{selected[i].paymentPlan?.installmentPlan?.length || "0"} Phases</p>
                      </div>
                      <div className="pt-6 border-t border-gray-100 flex gap-4">
                        <FaMapMarkerAlt className="text-[#01155E] mt-1" />
                        <div>
                          <p className="text-gray-900 font-black text-sm">{selected[i].location?.city}</p>
                          <p className="text-gray-400 font-bold text-xs uppercase">{selected[i].location?.community}, {selected[i].location?.subCommunity}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- LUXURY AMENITIES --- */}
                  <div className="mt-12">
                    <h3 className="font-black text-gray-400 text-xs uppercase tracking-[0.4em] mb-6 px-4">Luxury Amenities</h3>
                    <div className="flex flex-wrap gap-4 px-4">
                      {selected[i].features?.map((f, idx) => (
                        <div key={idx} className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-50 text-[11px] font-black text-gray-600 uppercase tracking-widest hover:bg-[#01155E] hover:text-white transition-all cursor-default">
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* --- AGENT CARD --- */}
                  <div className="mt-12 bg-white rounded-[3rem] p-8 flex items-center gap-8 shadow-sm">
                    <img src="https://images.bayut.com/thumbnails/764386701-800x600.webp" className="w-20 h-20 rounded-3xl object-cover shadow-lg" alt="agent" />
                    <div className="flex-1">
                      <p className="font-black text-xl text-gray-900 mb-1">{selected[i].agent?.name}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{selected[i].agent?.agency}</p>
                    </div>
                    <div className="bg-[#EEF0F3] p-5 rounded-3xl">
                      <FaUserTie className="text-2xl text-gray-400" />
                    </div>
                  </div>

                </div>
              ) : (
                <div className="h-[900px] flex items-center justify-center border-4 border-dashed border-gray-200 rounded-[5rem]">
                  <p className="text-gray-200 font-black uppercase tracking-[1em] -rotate-90 text-2xl">Choose Listing</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;