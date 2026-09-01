import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchListingByIdThunk  } from "../features/dashboard/fetchListingById";
import { useNavigate } from "react-router-dom";
import { mapPropertyDetailData } from '../Components/utils/Propertydetailmapper.jsx';
import { extractAllImages, getSafeImageUrl } from '../Components/utils/imageExtractor.jsx';

import {
  FaBed, FaBath, FaChartArea, FaUserTie, FaMoneyCheckAlt,
  FaTools, FaCalendarAlt, FaBuilding, FaMapMarkerAlt,
  FaSwimmingPool, FaCheckCircle, FaHome, FaShieldAlt,
  FaLayerGroup, FaCar, FaTag, FaChartLine, FaChevronDown
} from "react-icons/fa";

/* ─────────────────────────────────────────────
   Inline styles as JS object
───────────────────────────────────────────── */
const NAVY = "#01155E";
const GOLD = "#C9A84C";
const GREEN = "#1D9E75";

const Compare = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [selected, setSelected] = useState([null, null]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const openDetails = (id) => {
    navigate(`/listing/${id}`);
  };

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoriteListings([]);
      setSelected([null, null]);
      return;
    }

    const fetchFavs = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          favorites.map((id) => 
            dispatch(fetchListingByIdThunk(id))
              .unwrap()
              .then(rawListing => ({
                raw: rawListing,
                mapped: mapPropertyDetailData(rawListing)
              }))
          )
        );
        setFavoriteListings(results);
        if (results.length >= 2) setSelected([results[0], results[1]]);
        else if (results.length === 1) setSelected([results[0], results[0]]);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavs();
  }, [dispatch, favorites]);

  const handleSelect = (idx, id) => {
    const item = favoriteListings.find((p) => p.raw._id === id);
    setSelected((prev) => {
      const newSel = [...prev];
      newSel[idx] = item;
      return newSel;
    });
  };

  const getID = (item) => item?.raw?._id;

  /* ── Small reusable sub-components ── */

  const InfoRow = ({ label, value, accent }) => (
    <div className="flex justify-between items-center py-2.5 sm:py-3 border-b border-gray-100 last:border-0 gap-3">
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#67739E] shrink-0">{label}</span>
      <span
        className="text-[14px] sm:text-[16px] md:text-[18px] font-black text-right max-w-[55%] leading-snug text-[#01155E] capitalize break-words"
      >
        {value || "—"}
      </span>
    </div>
  );

  const SectionCard = ({ title, children }) => (
    <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 mt-4 md:mt-5">
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.35em] text-gray-400 mb-3 md:mb-4">{title}</p>
      {children}
    </div>
  );

  const StatBox = ({ icon, value, label }) => (
    <div className="flex-1 min-w-[70px] bg-gray-50 rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 flex flex-col items-center gap-1">
      <div style={{ color: NAVY }} className="text-base md:text-lg">{icon}</div>
      <p className="text-base sm:text-lg md:text-xl font-black text-gray-900 leading-none">{value ?? "—"}</p>
      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
    </div>
  );

  const PayBar = ({ steps = [] }) => {
    const colors = [NAVY, GOLD, GREEN, "#6366F1"];
    return (
      <div className="mt-1">
        <div className="flex h-2 rounded-full overflow-hidden gap-[2px]">
          {steps.map((s, i) => (
            <div
              key={i}
              style={{ flex: s.percent, background: colors[i % colors.length] }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: colors[i % colors.length] }} />
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-500">
                {s.label} {s.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AmenityPill = ({ label }) => (
    <div
      className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-gray-100 bg-white text-gray-600 hover:text-white transition-all duration-200 cursor-default"
      onMouseEnter={(e) => {
        e.currentTarget.style.background = NAVY;
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.borderColor = NAVY;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#fff";
        e.currentTarget.style.color = "#4B5563";
        e.currentTarget.style.borderColor = "#F3F4F6";
      }}
    >
      {label}
    </div>
  );

  /* ── Per-property card ── */
  const PropertyCard = ({ data, rawData, onViewDetails }) => {
    if (!rawData) {
      return <div className="text-center py-12 text-gray-400">No data available</div>;
    }

    /* ── Raw fields (both schema variants) ── */
    const {
      title,
      // price (normal listing schema)
      min_price,
      max_price,
      // price (off-plan project schema)
      price_start,
      price_end,
      currency = "AED",
      // beds/baths
      beds,
      baths,
      // area (normal listing schema)
      min_area,
      max_area,
      // area (off-plan project schema)
      area_start,
      area_end,
      area_size,
      // status / category
      status,
      project_status,
      purpose,
      property_category = [],
      property_types = [],
      // developer
      developer_name,
      // images
      feature_image,
      images,
      // location (normal listing schema)
      city_name,
      district_name,
      // location (off-plan project schema)
      city_data,
      district_data = [],
      // delivery date
      expected_delivery_date,
      expected_completion_date,
      // amenities (normal listing schema)
      features = [],
      // amenities (off-plan project schema)
      amenities_and_features,
      // meta
      isFeatured,
      is_featured,
      created_date,
      created_at,
      _id
    } = rawData;

    /* ── Normalized values so both schemas render correctly ── */
    const featureImage =
  feature_image ||
  images?.feature ||
  images?.interior?.[0] ||
  images?.exterior?.[0] ||
  images?.general?.[0] ||
  rawData?.all_images?.[0] ||
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800";

    const cityName = city_name || city_data?.name;
    const districtName = district_name || district_data?.[0]?.name;

    const finalMinPrice = min_price ?? price_start;
    const finalMaxPrice = max_price ?? price_end;

    const finalMinArea = min_area ?? area_start;
    const finalMaxArea = max_area ?? area_end;
    const areaUnit = area_size || "SqFt";

    const finalStatus = status || project_status;
    const finalCategory = property_category?.[0] || property_types?.[0];

    const finalExpectedDate = expected_delivery_date || expected_completion_date;

    const finalFeatures = features?.length
      ? features
      : (amenities_and_features?.features_names || []);

    const finalFeatured = isFeatured ?? is_featured;
    const finalCreatedDate = created_date || created_at;

    const bedArray = beds ? String(beds).split(",").map(b => b.trim()) : [];

    const areaRange =
      finalMinArea && finalMaxArea
        ? `${finalMinArea} - ${finalMaxArea}`
        : (finalMinArea || finalMaxArea || "—");

    const priceRange =
      finalMinPrice && finalMaxPrice
        ? `${currency} ${Number(finalMinPrice).toLocaleString()} - ${Number(finalMaxPrice).toLocaleString()}`
        : `${currency} ${Number(finalMinPrice || 0).toLocaleString()}`;

    const paySteps = [
      { label: "Min Price", percent: 50 },
      { label: "Max Price", percent: 50 }
    ];

    return (
      <div className="flex flex-col">
        {/* ── Hero Image ── */}
        <div className="relative rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl group mb-4 md:mb-5 h-[220px] sm:h-[280px] md:h-[340px]">
          <img
            src={getSafeImageUrl(featureImage)}
            alt="property"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* gradient overlay */}
          <div
            className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 md:p-6"
            style={{
              background: `linear-gradient(to top, ${NAVY}EE 0%, ${NAVY}44 50%, transparent 100%)`,
            }}
          >
            {/* Badges top */}
            <div className="flex justify-between items-start gap-2">
              <span
                className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border"
                style={{
                  background: "rgba(201,168,76,0.15)",
                  borderColor: "rgba(201,168,76,0.5)",
                  color: GOLD,
                }}
              >
                {finalCategory || "Property"}
              </span>
              <span
                className="text-[12px] sm:text-[14px] md:text-[16px] font-black uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border"
                style={{
                  background: "rgba(29,158,117,0.15)",
                  borderColor: "rgba(29,158,117,0.5)",
                  color: GREEN,
                }}
              >
                {/* {finalStatus || "On Sale"} */}
                 { "Off Plan"}
              </span>
            </div>
            {/* Price + title bottom */}
            <div>
              <p className="text-white text-[16px] sm:text-[20px] md:text-[24px] font-bold mb-1 line-clamp-1 opacity-80 capitalize">{title || "—"}</p>
              <p className="font-black leading-none mb-3 md:mb-4 text-[20px] sm:text-[24px] md:text-[28px]" style={{ color: GOLD }}>
                <span className="text-[14px] sm:text-[16px] md:text-[18px] font-bold mr-1">{currency}</span>
                {finalMinPrice ? Number(finalMinPrice).toLocaleString() : "—"}
              </p>
              <div className="flex gap-2 sm:gap-3 items-center">
                <button
                  className="text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = NAVY; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                  onClick={() => onViewDetails(_id)}
                >
                  View Details
                </button>
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <FaMoneyCheckAlt className="text-white text-xs sm:text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Stats ── */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-1">
          <StatBox icon={<FaBed />} value={bedArray?.[0] || "—"} label="Beds" />
          <StatBox icon={<FaBath />} value={baths || "—"} label="Baths" />
          <StatBox icon={<FaChartArea />} value={finalMinArea ? `${finalMinArea}` : null} label="SqFt" />
          <StatBox icon={<FaCar />} value="—" label="Garage" />
        </div>

        {/* ── Core Specifications ── */}
        <SectionCard title="Core Specifications">
          <InfoRow label="Category" value={finalCategory || "—"} />
          <InfoRow label="Purpose" value={purpose || "—"} />
          <InfoRow label="Status" value={finalStatus || "—"} />
          <InfoRow label="Developer" value={developer_name || "—"} />
          <InfoRow label="Expected Delivery" value={finalExpectedDate || "—"} accent />
        </SectionCard>

        {/* ── Area Details ── */}
        <SectionCard title="Area Details">
          <InfoRow label="Min Area" value={finalMinArea ? `${finalMinArea} ${areaUnit}` : "—"} />
          <InfoRow label="Max Area" value={finalMaxArea ? `${finalMaxArea} ${areaUnit}` : "—"} />
          <InfoRow label="Area Range" value={areaRange} />
        </SectionCard>

        {/* ── Price Details ── */}
        <SectionCard title="Price Details">
          <InfoRow label="Min Price" value={finalMinPrice ? `${currency} ${Number(finalMinPrice).toLocaleString()}` : "—"} accent />
          <InfoRow label="Max Price" value={finalMaxPrice ? `${currency} ${Number(finalMaxPrice).toLocaleString()}` : "—"} accent />
          <InfoRow label="Currency" value={currency} />
          <div className="mt-4">
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Price Range</p>
            <PayBar steps={paySteps} />
          </div>
        </SectionCard>

        {/* ── Unit Configuration ── */}
        <SectionCard title="Unit Configuration">
          <InfoRow label="Bedrooms" value={beds || "—"} />
          <InfoRow label="Bathrooms" value={baths || "—"} />
          <InfoRow label="Bed Types" value={bedArray?.length > 1 ? bedArray.join(", ") : bedArray?.[0] || "—"} accent />
        </SectionCard>

        {/* ── Location ── */}
        <SectionCard title="Location">
          <div className="flex items-start gap-3 mt-1">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: NAVY }}
            >
              <FaMapMarkerAlt className="text-white text-xs sm:text-sm" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm">{cityName || "—"}</p>
              <p className="text-xs font-bold uppercase tracking-wide mt-0.5 text-[#67739E]">
                {districtName || "—"}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── Amenities ── */}
        <SectionCard title="Amenities & Features">
          <div className="flex flex-wrap gap-2 mt-1">
            {finalFeatures?.length
              ? finalFeatures.map((f, idx) => <AmenityPill key={idx} label={f} />)
              : <p className="text-xs text-gray-400">No amenities listed</p>
            }
          </div>
        </SectionCard>

        {/* ── Additional Info ── */}
        <SectionCard title="Additional Information">
          <InfoRow label="Availability" value={finalStatus || "—"} />
          <InfoRow label="Featured" value={finalFeatured ? "Yes" : "No"} />
          <InfoRow label="Created Date" value={finalCreatedDate ? new Date(finalCreatedDate).toLocaleDateString() : "—"} />
        </SectionCard>
      </div>
    );
  };

  /* ══════════════════════════════════════
     MAIN RENDER
  ══════════════════════════════════════ */
  return (
    <div className="min-h-screen py-6 px-3 sm:py-8 sm:px-4 md:py-12 md:px-8 overflow-x-hidden" style={{ background: "#EEF0F3" }}>
      <div
        className="max-w-[1500px] mx-auto rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-4 sm:p-6 md:p-14 border-4 sm:border-8 md:border-[16px] border-white"
        style={{
          background: "#F8F9FB",
          boxShadow: "0 40px 80px -20px rgba(1,21,94,0.12)",
        }}
      >
        {/* ── Page Title ── */}
        <div className="text-center mb-8 md:mb-12 px-1">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#01155E] font-['Archivo'] font-bold tracking-tight mb-2"
          >
            Compare Properties
          </h1>
          <p className="text-xs sm:text-sm text-[#67739E] font-bold uppercase tracking-wide sm:tracking-widest">
            Select two listings from your favorites to compare side by side
          </p>
        </div>

        {/* ── Dropdown Selectors ── */}
        <div className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 mb-8 md:mb-12">
          {[0, 1].map((i) => (
            <div key={i} className="relative w-full max-w-sm mx-auto">
              <select
                className="w-full appearance-none bg-white px-5 sm:px-6 md:px-8 py-3.5 sm:py-4 md:py-5 pr-12 rounded-2xl shadow-md text-[#01155E] font-black text-sm outline-none uppercase tracking-widest cursor-pointer text-left border border-gray-100 transition-all hover:shadow-lg"
                value={getID(selected[i]) || ""}
                onChange={(e) => handleSelect(i, e.target.value)}
              >
                <option value="">Choose Property {i + 1}</option>
                {favoriteListings
                  .filter((item) => {
                    const otherIdx = i === 0 ? 1 : 0;
                    return getID(item) !== getID(selected[otherIdx]);
                  })
                  .map((item) => (
                    <option key={getID(item)} value={getID(item)}>
                      {item.raw?.title || "Listing"}
                    </option>
                  ))}
              </select>

              {/* Dropdown chevron icon */}
              <div
                className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2"
                style={{ color: NAVY }}
              >
                <FaChevronDown className="text-sm" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center py-16 md:py-20">
            <div
              className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: `${NAVY}40`, borderTopColor: NAVY }}
            />
          </div>
        )}

        {/* ── Comparison Grid ── */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
            {/* VS Divider */}
            <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 flex-col items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-xs shadow-lg"
                style={{ background: NAVY }}
              >
                VS
              </div>
              <div
                className="w-px flex-1"
                style={{
                  background: `linear-gradient(to bottom, ${NAVY}55, transparent)`,
                  minHeight: 60,
                }}
              />
            </div>

            {/* Mobile-only VS badge between stacked cards */}
            {selected[0] && selected[1] && (
              <div className="flex md:hidden justify-center -my-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-[11px] shadow-lg"
                  style={{ background: NAVY }}
                >
                  VS
                </div>
              </div>
            )}

            {[0, 1].map((i) => (
              <div key={i}>
                {selected[i] ? (
                  <PropertyCard 
                    data={selected[i].mapped}
                    rawData={selected[i].raw}
                    onViewDetails={openDetails}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border-2 border-dashed border-gray-200 h-[240px] sm:h-[360px] md:h-[600px]"
                  >
                    <p
                      className="font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.8em] text-gray-300 text-xs sm:text-sm md:text-lg -rotate-90 select-none whitespace-nowrap"
                    >
                      Choose Listing
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;