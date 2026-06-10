import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchDashboard,
  updateListingStatus,
  updateListingAvailability,
  updateListingFeatured,
} from "../features/dashboard/dashboardSlice";

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS = {
  ALL: "All",
  PENDING: "Pending",
  ACTIVE: "active",
  REJECTED: "rejected",
};

const AVAILABILITY = {
  AVAILABLE: "available",
  NOT_AVAILABLE: "unavailable",
};

// ─── Small reusable badge ─────────────────────────────────────────────────────

const Badge = ({ label, color }) => {
  const colors = {
    green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    red: "bg-red-50 text-red-600 border border-red-200",
    yellow: "bg-amber-50 text-amber-700 border border-amber-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    purple: "bg-violet-50 text-violet-700 border border-violet-200",
    gray: "bg-gray-100 text-gray-500 border border-gray-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${colors[color] || colors.gray}`}>
      {label}
    </span>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, icon, accent }) => (
  <div className="bg-white rounded-2xl border border-[#D9E1F2] p-5 flex items-center gap-4 shadow-sm">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0"
      style={{ background: accent }}
    >
      {icon}
    </div>
    <div>
      <p className="text-[#67739E] text-[13px] font-medium">{label}</p>
      <p className="text-[#01155E] text-[26px] font-bold leading-tight">{value}</p>
    </div>
  </div>
);

// ─── Inline Select + Save ─────────────────────────────────────────────────────

const InlineSelect = ({ options, value, onChange, onSave, onCancel, accent }) => (
  <div className="flex gap-2 items-center mt-2">
    <select
      className="border border-[#D9E1F2] text-[#01155E] text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01155E]/20"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    <button
      onClick={onSave}
      className="px-3 py-1.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
      style={{ background: accent }}
    >
      Save
    </button>
    <button
      onClick={onCancel}
      className="px-3 py-1.5 rounded-lg text-[#67739E] text-sm border border-[#D9E1F2] hover:bg-gray-50"
    >
      Cancel
    </button>
  </div>
);

// ─── Listing Row Card ─────────────────────────────────────────────────────────

const ListingRowCard = ({ item, onStatusEdit, onAvailabilityEdit, onFeaturedEdit }) => {
  const statusColor =
    item.propertyStatus === "active" ? "green"
    : item.propertyStatus === "rejected" ? "red"
    : "yellow";

  const availColor = item.availability === AVAILABILITY.AVAILABLE ? "blue" : "gray";

  const getHandover = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const quarter = month <= 3 ? "Q1" : month <= 6 ? "Q2" : month <= 9 ? "Q3" : "Q4";
    return `${quarter} ${year}`;
  };

  const image = item.feature_image || (item.images?.[0]) || null;

  return (
    <div className="bg-white border border-[#D9E1F2] rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#2F6BFF] transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative h-44 bg-[#F0F4FB] flex-shrink-0 overflow-hidden">
        {image ? (
          <img src={image} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#C5CEDF]">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}

        {/* Status overlay badge */}
        <div className="absolute top-3 left-3">
          <Badge
            label={item.propertyStatus?.charAt(0).toUpperCase() + item.propertyStatus?.slice(1) || "Pending"}
            color={statusColor}
          />
        </div>

        {item.isFeatured && (
          <div className="absolute top-3 right-3 bg-[#FFC107] text-[#01155E] px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">

        {/* Title + Price */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-[#01155E] font-bold text-[16px] leading-snug line-clamp-2 flex-1">
            {item.title || "Untitled Listing"}
          </h3>
          <div className="text-right flex-shrink-0">
            <p className="text-[11px] text-[#67739E] font-medium">
              {item.propertyStatus?.toLowerCase() === "offplan" ? "Starting at" : "Price"}
            </p>
            <p className="text-[#01155E] font-bold text-[15px]">
              {item.currency?.toUpperCase() || "AED"}{" "}
              {item.min_price?.toLocaleString() || item.price?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>

        {/* Location + Developer */}
        <div className="flex flex-col gap-1">
          {(item.district_name || item.city_name) && (
            <div className="flex items-center gap-1.5 text-[#67739E] text-[13px]">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{[item.district_name, item.city_name].filter(Boolean).join(", ")}</span>
            </div>
          )}
          {item.developer_name && (
            <div className="flex items-center gap-1.5 text-[#67739E] text-[13px]">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{item.developer_name}</span>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3 text-[#67739E] text-[13px] border-t border-[#D9E1F2] pt-3">
          {(item.beds || item.bedrooms) && (
            <span className="flex items-center gap-1">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-semibold text-[#01155E]">{item.beds || item.bedrooms}</span> Beds
            </span>
          )}
          {(item.baths || item.bathrooms) && (
            <>
              <span className="text-[#D9E1F2]">|</span>
              <span className="flex items-center gap-1">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span className="font-semibold text-[#01155E]">{item.baths || item.bathrooms}</span> Baths
              </span>
            </>
          )}
          {item.max_area && (
            <>
              <span className="text-[#D9E1F2]">|</span>
              <span><span className="font-semibold text-[#01155E]">{item.max_area?.toLocaleString()}</span> sqft</span>
            </>
          )}
          {item.expected_delivery_date && (
            <>
              <span className="text-[#D9E1F2] ml-auto">|</span>
              <span className="ml-auto">🗓 {getHandover(item.expected_delivery_date)}</span>
            </>
          )}
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2">
          <Badge label={item.propertyStatus?.charAt(0).toUpperCase() + item.propertyStatus?.slice(1) || "Pending"} color={statusColor} />
          <Badge label={item.availability || AVAILABILITY.NOT_AVAILABLE} color={availColor} />
          {item.isFeatured && <Badge label="Featured" color="purple" />}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-[#D9E1F2] mt-auto">
          <button
            onClick={() => onStatusEdit(item._id, item.propertyStatus)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#01155E] text-[#01155E] text-[12px] font-semibold hover:bg-[#01155E] hover:text-white transition-colors"
          >
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Status
          </button>
          <button
            onClick={() => onAvailabilityEdit(item._id, item.availability)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-violet-400 text-violet-600 text-[12px] font-semibold hover:bg-violet-600 hover:text-white transition-colors"
          >
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Availability
          </button>
          <button
            onClick={() => onFeaturedEdit(item._id, item.isFeatured)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-400 text-amber-600 text-[12px] font-semibold hover:bg-amber-400 hover:text-white transition-colors"
          >
            ⭐ Featured
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function Dashboard() {
  const dispatch = useDispatch();

  // ── Updated: listings + pagination from slice ─────────────────
  const { data, listings, loading, loadingMore, error, currentPage, totalPages } =
    useSelector((state) => state.dashboard);

  const [editStatusId, setEditStatusId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const [editAvailabilityId, setEditAvailabilityId] = useState(null);
  const [newAvailability, setNewAvailability] = useState("");

  const [editFeaturedId, setEditFeaturedId] = useState(null);
  const [newFeatured, setNewFeatured] = useState("");

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  // ── Debounce search 500ms ─────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(searchQuery), 500);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // ── Fetch on tab / search change — always page 1 ──────────────
  useEffect(() => {
    dispatch(fetchDashboard({ page: 1, limit: 20, search: debouncedQ, status: activeTab }));
  }, [dispatch, debouncedQ, activeTab]);

  // ── Infinite scroll loader ref ────────────────────────────────
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loadingMore &&
          currentPage < totalPages
        ) {
          dispatch(fetchDashboard({
            page: currentPage + 1,
            limit: 20,
            search: debouncedQ,
            status: activeTab,
          }));
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [dispatch, loadingMore, currentPage, totalPages, debouncedQ, activeTab]);

  // ── Stats from backend ────────────────────────────────────────
  const stats = useMemo(() => ({
    total:    data?.stats?.totalListings    || 0,
    active:   data?.stats?.activeListings   || 0,
    pending:  data?.stats?.pendingListings  || 0,
    featured: data?.stats?.featuredListings || 0,
  }), [data]);

  const tabs = ["All", "active", "pending", "rejected"];

  const tabLabel = (t) =>
    t === "All" ? "All" : t.charAt(0).toUpperCase() + t.slice(1);

  // ── Tab counts from backend stats ────────────────────────────
  const tabCount = (t) => {
    if (t === "All")      return stats.total;
    if (t === "active")   return stats.active;
    if (t === "pending")  return stats.pending;
    if (t === "rejected") return data?.stats?.rejectedListings || 0;
    return 0;
  };

  // if (loading)
  //   return (
  //     <div className="min-h-screen bg-[#F5F7FC] flex items-center justify-center">
  //       <div className="flex flex-col items-center gap-3">
  //         <div className="w-10 h-10 border-4 border-[#01155E] border-t-transparent rounded-full animate-spin"></div>
  //         <p className="text-[#67739E] font-medium">Loading dashboard...</p>
  //       </div>
  //     </div>
  //   );

  if (error)
    return (
      <div className="min-h-screen bg-[#F5F7FC] flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-sm">
          <p className="text-red-600 font-semibold text-lg">Error loading data</p>
          <p className="text-red-400 text-sm mt-1">{error}</p>
        </div>
      </div>
    );

  // if (!listings || listings.length === 0 && !loading)
  //   return (
  //     <div className="min-h-screen bg-[#F5F7FC] flex items-center justify-center">
  //       <p className="text-[#67739E]">No listings found.</p>
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-[#F5F7FC] font-['General_Sans',sans-serif]">

      {/* ── Top Nav Bar ── */}
      <div className="bg-white border-b border-[#D9E1F2] sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-[#01155E] text-[22px] font-bold leading-tight">Admin Dashboard</h1>
            <p className="text-[#67739E] text-[13px]">Manage your property listings</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/seller-leads"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#01155E] text-[#01155E] text-[14px] font-semibold hover:bg-[#01155E] hover:text-white transition-colors"
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Seller Leads
            </Link>
            <Link
              to="/listingcreation"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#01155E] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Listings" value={stats.total} icon="🏠" accent="#01155E" />
          <StatCard label="Active" value={stats.active} icon="✅" accent="#10b981" />
          <StatCard label="Pending Review" value={stats.pending} icon="⏳" accent="#f59e0b" />
          <StatCard label="Featured" value={stats.featured} icon="⭐" accent="#8b5cf6" />
        </div>

        {/* ── Search + Tabs ── */}
        <div className="bg-white border border-[#D9E1F2] rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-sm">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#67739E]" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, city, developer..."
              className="w-full pl-9 pr-4 py-2 border border-[#D9E1F2] rounded-xl text-[14px] text-[#01155E] placeholder-[#A0AABF] focus:outline-none focus:ring-2 focus:ring-[#01155E]/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 flex-shrink-0 bg-[#F5F7FC] p-1 rounded-xl border border-[#D9E1F2]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-[#01155E] text-white shadow-sm"
                    : "text-[#67739E] hover:text-[#01155E]"
                }`}
              >
                {tabLabel(tab)}
                <span className={`ml-1.5 text-[11px] ${activeTab === tab ? "text-white/70" : "text-[#A0AABF]"}`}>
                  ({tabCount(tab)})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Listings Grid ── */}
       {/* ── Listings Grid ── */}
{loading ? (
  <div className="flex justify-center py-20">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-[#01155E] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#67739E] font-medium">Loading...</p>
    </div>
  </div>
) : listings.length === 0 ? (
  <div className="text-center py-20 text-[#67739E]">
    <svg className="mx-auto mb-4 text-[#C5CEDF]" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
    <p className="font-semibold text-[16px]">No listings found</p>
    <p className="text-sm mt-1">Try adjusting your search or tab filter.</p>
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    {listings.map((item) => (
              <div key={item._id} className="flex flex-col">
                <ListingRowCard
                  item={item}
                  onStatusEdit={(id, current) => { setEditStatusId(id); setNewStatus(current); setEditAvailabilityId(null); setEditFeaturedId(null); }}
                  onAvailabilityEdit={(id, current) => { setEditAvailabilityId(id); setNewAvailability(current); setEditStatusId(null); setEditFeaturedId(null); }}
                  onFeaturedEdit={(id, current) => { setEditFeaturedId(id); setNewFeatured(current ? "true" : "false"); setEditStatusId(null); setEditAvailabilityId(null); }}
                />

                {/* ── Inline edit panels (below card) ── */}
                {editStatusId === item._id && (
                  <div className="bg-white border border-[#D9E1F2] rounded-2xl p-4 mt-2 shadow-sm">
                    <p className="text-[#01155E] text-[13px] font-semibold mb-2">Update Status</p>
                    <InlineSelect
                      options={[
                        { value: "pending", label: "Pending" },
                        { value: "active", label: "Active" },
                        { value: "rejected", label: "Rejected" },
                      ]}
                      value={newStatus}
                      onChange={setNewStatus}
                      onSave={() => {
                        dispatch(updateListingStatus({ id: item._id, status: newStatus }));
                        setEditStatusId(null);
                      }}
                      onCancel={() => setEditStatusId(null)}
                      accent="#01155E"
                    />
                  </div>
                )}

                {editAvailabilityId === item._id && (
                  <div className="bg-white border border-[#D9E1F2] rounded-2xl p-4 mt-2 shadow-sm">
                    <p className="text-[#01155E] text-[13px] font-semibold mb-2">Update Availability</p>
                    <InlineSelect
                      options={[
                        { value: AVAILABILITY.AVAILABLE, label: "Available" },
                        { value: AVAILABILITY.NOT_AVAILABLE, label: "Not Available" },
                      ]}
                      value={newAvailability}
                      onChange={setNewAvailability}
                      onSave={() => {
                        dispatch(updateListingAvailability({ id: item._id, availability: newAvailability }));
                        setEditAvailabilityId(null);
                      }}
                      onCancel={() => setEditAvailabilityId(null)}
                      accent="#7c3aed"
                    />
                  </div>
                )}

                {editFeaturedId === item._id && (
                  <div className="bg-white border border-[#D9E1F2] rounded-2xl p-4 mt-2 shadow-sm">
                    <p className="text-[#01155E] text-[13px] font-semibold mb-2">Mark as Featured</p>
                    <InlineSelect
                      options={[
                        { value: "true", label: "Featured" },
                        { value: "false", label: "Not Featured" },
                      ]}
                      value={newFeatured}
                      onChange={setNewFeatured}
                      onSave={() => {
                        dispatch(updateListingFeatured({ id: item._id, isFeatured: newFeatured === "true" }));
                        setEditFeaturedId(null);
                      }}
                      onCancel={() => setEditFeaturedId(null)}
                      accent="#d97706"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Infinite Scroll Loader ── */}
        <div ref={loaderRef} className="py-8 flex justify-center">
          {loadingMore && (
            <div className="flex items-center gap-2 text-[#67739E]">
              <div className="w-5 h-5 border-2 border-[#01155E] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading more...</span>
            </div>
          )}
          {!loadingMore && currentPage >= totalPages && listings.length > 0 && (
            <p className="text-[#A0AABF] text-sm">All {stats.total} listings loaded</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;