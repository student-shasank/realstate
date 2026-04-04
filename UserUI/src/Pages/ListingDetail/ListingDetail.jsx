import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  fetchListingDetail,
  resetListingDetailState,
} from "../../features/dashboard/listingDetailSlice";
import {
  addFavoriteLocal,
  removeFavoriteLocal,
  toggleFavorite,
} from "../../features/dashboard/favoriteligting/favoriteSlice";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { VITE_MAPBOX_TOKEN } from "../../Constant/constant";

import {
  MapPin, Bed, Bath, Square, Calendar, CheckCircle,
  ChevronDown, ChevronUp, Star, Phone, Mail, Heart,
  Share2, Maximize, Download, Dumbbell, Car, ShieldCheck,
  Dog, Flame, Users, Waves, Banknote, BanknoteArrowDown,
  X, Image as ImageIcon, Building2, Layers, TrendingUp,
  Percent, BadgeCheck,
} from "lucide-react";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function fmt(num) {
  return Number(num)?.toLocaleString() ?? "—";
}

function capitalize(str) {
  if (!str) return "—";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function AmenityIcon({ label }) {
  const lower = (label || "").toLowerCase();
  const cls = "text-[#67739E]";
  if (lower.includes("pool") || lower.includes("swim")) return <Waves size={20} className={cls} />;
  if (lower.includes("gym") || lower.includes("fitness")) return <Dumbbell size={20} className={cls} />;
  if (lower.includes("pet")) return <Dog size={20} className={cls} />;
  if (lower.includes("security") || lower.includes("camera")) return <ShieldCheck size={20} className={cls} />;
  if (lower.includes("bbq") || lower.includes("barbecue")) return <Flame size={20} className={cls} />;
  if (lower.includes("kids") || lower.includes("children")) return <Users size={20} className={cls} />;
  if (lower.includes("parking") || lower.includes("garage")) return <Car size={20} className={cls} />;
  if (lower.includes("balcony")) return <Building2 size={20} className={cls} />;
  return <CheckCircle size={20} className={cls} />;
}

const WAIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.571l5.9-1.548A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.939 0-3.756-.523-5.318-1.432l-.381-.226-3.499.918.934-3.408-.249-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

// ─────────────────────────────────────────────
// Gallery Modal
// ─────────────────────────────────────────────

function GalleryModal({ images, onClose, agent }) {
  const [activeTab, setActiveTab] = useState("photos");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[1100px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center border-b border-[#D9E1F2] px-6 relative">
          {[
            { key: "photos", label: `Photos (${images?.length || 0})`, icon: <ImageIcon size={18} /> },
            { key: "map", label: "Map", icon: <MapPin size={18} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-4 text-[17px] font-semibold border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-[#01155E] text-[#01155E]"
                  : "border-transparent text-[#67739E] hover:text-[#01155E]"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          <button onClick={onClose}
            className="absolute right-4 top-3 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#67739E]">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "photos" ? (
            <div className="p-4 grid grid-cols-2 gap-3">
              {images?.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-[10px] h-[260px]">
                  <img src={src} alt={`Property ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[500px] bg-[#F5F8FF] flex items-center justify-center text-[#67739E]">
              Map renders here
            </div>
          )}
        </div>

        <div className="border-t border-[#D9E1F2] px-6 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            {agent?.profileImage ? (
              <img src={agent.profileImage} alt="Agent" className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#01155E] flex items-center justify-center text-white font-bold text-lg">
                {agent?.name?.[0] || "A"}
              </div>
            )}
            <div>
              <p className="text-[13px] text-[#67739E]">Listing by</p>
              <p className="text-[#01155E] font-semibold text-[15px]">{agent?.name}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href={`mailto:${agent?.email}`}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#D9E1F2] rounded-lg text-[#01155E] font-semibold text-[15px] hover:bg-gray-50">
              <Mail size={16} /> Email
            </a>
            <a href={`tel:${agent?.phone}`}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#D9E1F2] rounded-lg text-[#01155E] font-semibold text-[15px] hover:bg-gray-50">
              <Phone size={16} /> Call
            </a>
            <a href={`https://wa.me/${agent?.whatsapp}`} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-green-200 rounded-lg text-green-600 font-semibold text-[15px] hover:bg-green-50">
              <WAIcon /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Reusable: Info Grid
// ─────────────────────────────────────────────

function InfoGrid({ items }) {
  return (
    <div className="grid grid-cols-4 gap-y-6 p-6">
      {items.map((item, i) => (
        <div key={i}>
          <p className="text-[#67739E] text-[15px] mb-1">{item.label}</p>
          <p className="text-[#01155E] font-semibold text-[16px]">{item.value ?? "—"}</p>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ children, className = "" }) {
  return <h2 className={`text-[26px] font-bold text-[#01155E] mb-5 ${className}`}>{children}</h2>;
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

const ListingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { listing, loading, error } = useSelector((state) => state.listingDetail);
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const isFavorite = favorites.includes(listing?._id);

  const [showGallery, setShowGallery] = useState(false);
  const [openFloorPlans, setOpenFloorPlans] = useState({ 0: true });
  const [showFullDesc, setShowFullDesc] = useState(false);

  // ── Mapbox ──
  useEffect(() => {
    if (!listing?.location?.coordinates?.coordinates) return;
    const [lng, lat] = listing.location.coordinates.coordinates;
    mapboxgl.accessToken = VITE_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: "listing-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 14,
    });
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    return () => map.remove();
  }, [listing]);

  useEffect(() => {
    dispatch(fetchListingDetail(id));
    return () => dispatch(resetListingDetailState());
  }, [dispatch, id]);

  const handleFavorite = () => {
    if (!listing?._id) return;
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    isFavorite
      ? dispatch(removeFavoriteLocal(listing._id))
      : dispatch(addFavoriteLocal(listing._id));
    dispatch(toggleFavorite(listing._id));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#F5F8FF]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#01155E] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#67739E] text-[18px] font-medium">Loading Listing...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-[#F5F8FF]">
        <div className="bg-white border border-red-200 rounded-xl p-8 text-center max-w-md">
          <p className="text-red-500 text-[18px] font-semibold">{error}</p>
        </div>
      </div>
    );

  if (!listing) return null;

  // ── Destructure all API fields ──
  const {
    title, referenceNo, price, currency, serviceCharges,
    type, purpose, completionStatus, listingStatus, furnishing,
    isFeatured, availability,
    bedrooms, bathrooms, garage, rooms, builtUpArea, totalBuildingArea, plotArea,
    developer, ownership, yearBuilt, handoverDate, listingDate, addedOn,
    description, features = [], images = [], youtubeVideoId, brochureUrl,
    agent = {}, internal = {}, validatedInfo = {}, projectInfo = {},
    location: loc = {}, buildingInfo = {}, unitTypes = [], floorPlans = [],
    paymentPlan = {}, investmentInsights = {},
  } = listing;

  const FALLBACK_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800";
  const descLimit = 300;
  const descText = description || "";

  return (
    <div className="bg-white min-h-screen mt-20">
      {showGallery && (
        <GalleryModal images={images} onClose={() => setShowGallery(false)} agent={agent} />
      )}

      <div className="max-w-[1290px] mx-auto pt-10 pb-20 px-4">

        {/* ── Breadcrumb ── */}
        <nav className="text-[#67739E] text-[14px] mb-6 flex items-center gap-1 flex-wrap">
          {["Home", loc.country, loc.city, loc.community, loc.subCommunity].filter(Boolean).map((crumb, i, arr) => (
            <React.Fragment key={i}>
              <span className={i === arr.length - 1 ? "text-[#01155E] font-medium" : "hover:text-[#01155E] cursor-pointer"}>
                {crumb}
              </span>
              {i < arr.length - 1 && <span className="mx-1">›</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-8 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {completionStatus && (
                <span className="bg-[#01155E] text-white text-[13px] font-medium px-3 py-1.5 rounded-md capitalize">
                  {completionStatus}
                </span>
              )}
              {listingStatus && (
                <span className="bg-[#EEF2FF] text-[#01155E] text-[13px] font-medium px-3 py-1.5 rounded-md capitalize border border-[#D9E1F2]">
                  {listingStatus}
                </span>
              )}
              {isFeatured && (
                <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-[13px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> Featured
                </span>
              )}
              {referenceNo && (
                <span className="text-[#67739E] text-[13px] border border-[#D9E1F2] px-2.5 py-1.5 rounded-md">
                  Ref: {referenceNo}
                </span>
              )}
            </div>

            <h1 className="text-[38px] font-bold text-[#01155E] leading-tight mb-4">{title}</h1>

            <div className="flex items-center gap-5 text-[#67739E] text-[16px] flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#01155E]" />
                <span>{[loc.subCommunity, loc.community, loc.city, loc.country].filter(Boolean).join(", ")}</span>
              </div>
              {developer && (
                <>
                  <div className="border-l border-[#D9E1F2] h-5" />
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-600 to-yellow-400" />
                    <span>{developer}</span>
                  </div>
                </>
              )}
              {builtUpArea && (
                <>
                  <div className="border-l border-[#D9E1F2] h-5" />
                  <div className="flex items-center gap-2">
                    <Maximize size={16} className="text-[#01155E]" />
                    <span>{fmt(builtUpArea)} Sq Ft</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end flex-shrink-0">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[16px] font-medium text-[#67739E]">Starting at</span>
              <span className="text-[30px] font-bold text-[#01155E]">{currency} {fmt(price)}</span>
            </div>
            {serviceCharges && (
              <p className="text-[#67739E] text-[13px] mb-3">
                Service Charges: {currency} {fmt(serviceCharges)}/yr
              </p>
            )}
            <div className="flex gap-3">
              <button onClick={handleFavorite}
                className={`w-[50px] h-[50px] flex items-center justify-center rounded-full transition-all ${
                  isFavorite ? "bg-red-50 text-red-500 border border-red-200" : "bg-[#F0F4F8] text-[#01155E] hover:bg-gray-200"
                }`}>
                <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button className="w-[50px] h-[50px] flex items-center justify-center bg-[#F0F4F8] text-[#01155E] rounded-full hover:bg-gray-200 transition-all">
                <Share2 size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Image Gallery ── */}
        <div className="grid grid-cols-12 gap-[10px] h-[500px] mb-12">
          <div className="col-span-7 relative h-full">
            <img src={images[0] || FALLBACK_IMG} className="w-full h-full object-cover rounded-[8px]" alt="Main" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-[#01155E]/90 text-white text-[12px] font-semibold px-3 py-1.5 rounded-md">✓ TruCheck™</span>
              {completionStatus && (
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[12px] font-semibold px-3 py-1.5 rounded-md capitalize">
                  {completionStatus}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-5 grid grid-cols-2 gap-[10px] h-full">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-[8px] cursor-pointer"
                style={{ height: "245px" }}
                onClick={idx === 4 ? () => setShowGallery(true) : undefined}
              >
                <img
                  src={images[idx] || FALLBACK_IMG}
                  className="w-full h-full object-cover"
                  alt={`Side ${idx}`}
                />
                {idx === 4 && (
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/55 transition-colors flex items-center justify-center">
                    <div className="flex flex-col items-center text-white">
                      <div className="flex items-center gap-1.5">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                        <span className="text-[22px] font-bold">{images.length}</span>
                      </div>
                      <span className="text-[13px] font-medium opacity-90">View All Photos</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex gap-[30px]">

          {/* ═════ LEFT COLUMN ═════ */}
          <div className="flex-1 min-w-0">

            {/* Overview Header */}
            <div className="flex justify-between items-center mb-5">
              <SectionTitle className="mb-0">Overview</SectionTitle>
              {brochureUrl && (
                <a href={brochureUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-[#01155E] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold">
                  <Download size={16} /> Download Brochure
                </a>
              )}
            </div>

            <div className="bg-white border border-[#D9E1F2] rounded-[12px] p-8 mb-8">

              {/* Quick Stats Row */}
              <div className="flex justify-between items-center pb-6 border-b border-[#D9E1F2] mb-8 flex-wrap gap-4">
                {[
                  { icon: <Bed size={24} className="text-[#67739E]" />, val: bedrooms, label: "Bedrooms" },
                  { icon: <Bath size={24} className="text-[#67739E]" />, val: bathrooms, label: "Bathrooms" },
                  { icon: <Car size={24} className="text-[#67739E]" />, val: garage, label: "Garage" },
                  { icon: <Layers size={24} className="text-[#67739E]" />, val: rooms, label: "Rooms" },
                  { icon: <Calendar size={24} className="text-[#67739E]" />, val: yearBuilt, label: "Year Built" },
                  { icon: <Square size={24} className="text-[#67739E]" />, val: `${fmt(builtUpArea)} sqft`, label: "Built-up Area" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-[22px] font-bold text-[#01155E]">{item.val ?? "—"}</span>
                    </div>
                    <span className="text-[#67739E] text-[14px]">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Property Information Table */}
              <h3 className="text-[22px] font-bold text-[#01155E] mb-6">Property Information</h3>
              <div className="border border-[#D9E1F2] rounded-[10px] mb-6 divide-y divide-[#D9E1F2]">
                <InfoGrid items={[
                  { label: "Type", value: capitalize(type) },
                  { label: "Purpose", value: capitalize(purpose) },
                  { label: "Furnishing", value: capitalize(furnishing) },
                  { label: "Availability", value: capitalize(availability) },
                ]} />
                <InfoGrid items={[
                  { label: "Ownership", value: capitalize(ownership) },
                  { label: "Developer", value: developer },
                  { label: "Listing Status", value: capitalize(listingStatus) },
                  { label: "Completion Status", value: capitalize(completionStatus) },
                ]} />
                <InfoGrid items={[
                  { label: "Built-up Area", value: `${fmt(builtUpArea)} Sq Ft` },
                  { label: "Total Building Area", value: totalBuildingArea ? `${fmt(totalBuildingArea)} Sq Ft` : "—" },
                  { label: "Plot Area", value: plotArea ? `${fmt(plotArea)} Sq Ft` : "—" },
                  { label: "Service Charges", value: serviceCharges ? `${currency} ${fmt(serviceCharges)}/yr` : "—" },
                ]} />
                <InfoGrid items={[
                  { label: "Handover Date", value: handoverDate ? new Date(handoverDate).toLocaleDateString() : "—" },
                  { label: "Listing Date", value: listingDate ? new Date(listingDate).toLocaleDateString() : "—" },
                  { label: "Added On", value: addedOn ? new Date(addedOn).toLocaleDateString() : "—" },
                  { label: "Reference No", value: referenceNo },
                ]} />
              </div>

              {/* Description */}
              {descText && (
                <div className="border border-[#D9E1F2] rounded-[10px] p-6">
                  <p className="text-[#67739E] text-[16px] leading-relaxed">
                    {showFullDesc ? descText : descText.slice(0, descLimit)}
                    {descText.length > descLimit && (
                      <button onClick={() => setShowFullDesc(!showFullDesc)}
                        className="text-[#01155E] font-semibold ml-1 hover:underline">
                        {showFullDesc ? " Show Less" : "...Read More"}
                      </button>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* ── Project Information ── */}
            {projectInfo?.name && (
              <>
                <SectionTitle>Project Information</SectionTitle>
                <div className="bg-white border border-[#D9E1F2] rounded-[12px] mb-8 divide-y divide-[#D9E1F2]">
                  <InfoGrid items={[
                    { label: "Project Name", value: projectInfo.name },
                    { label: "Status", value: capitalize(projectInfo.status) },
                    { label: "Completion", value: projectInfo.completion },
                    { label: "Developer", value: projectInfo.developer },
                  ]} />
                  <InfoGrid items={[
                    { label: "Handover Date", value: projectInfo.handoverDate ? new Date(projectInfo.handoverDate).toLocaleDateString() : "—" },
                    { label: "Last Inspected", value: projectInfo.lastInspected ? new Date(projectInfo.lastInspected).toLocaleDateString() : "—" },
                  ]} />
                </div>
              </>
            )}

            {/* ── Validated Information ── */}
            {validatedInfo?.ownership && (
              <>
                <SectionTitle>Validated Information</SectionTitle>
                <div className="bg-white border border-[#D9E1F2] rounded-[12px] mb-8 divide-y divide-[#D9E1F2]">
                  <InfoGrid items={[
                    { label: "Ownership", value: capitalize(validatedInfo.ownership) },
                    { label: "Usage", value: capitalize(validatedInfo.usage) },
                    { label: "Developer", value: validatedInfo.developer },
                    { label: "Built-up Area", value: validatedInfo.builtUpArea ? `${fmt(validatedInfo.builtUpArea)} Sq Ft` : "—" },
                  ]} />
                </div>
              </>
            )}

            {/* ── Internal Details ── */}
            {internal?.internalListingId && (
              <>
                <SectionTitle>Internal Listing Details</SectionTitle>
                <div className="bg-white border border-[#D9E1F2] rounded-[12px] mb-8 divide-y divide-[#D9E1F2]">
                  <InfoGrid items={[
                    { label: "Internal ID", value: internal.internalListingId },
                    { label: "Source Brokerage", value: internal.sourceBrokerageName },
                    { label: "Listing Agent", value: internal.listingAgentName },
                    { label: "Agent Phone", value: internal.listingAgentPhone },
                  ]} />
                  <InfoGrid items={[
                    { label: "Agent Email", value: internal.listingAgentEmail },
                    { label: "Source Type", value: capitalize(internal.listingSourceType) },
                    { label: "Valid Until", value: internal.listingValidUntil ? new Date(internal.listingValidUntil).toLocaleDateString() : "—" },
                  ]} />
                </div>
              </>
            )}

            {/* ── Building Information ── */}
            {buildingInfo?.buildingName && (
              <>
                <SectionTitle>Building Information</SectionTitle>
                <div className="border border-[#D9E1F2] rounded-[12px] mb-8 divide-y divide-[#D9E1F2]">
                  <InfoGrid items={[
                    { label: "Building Name", value: buildingInfo.buildingName },
                    { label: "Year of Completion", value: buildingInfo.yearOfCompletion },
                    { label: "Total Floors", value: buildingInfo.totalFloors },
                    { label: "Swimming Pools", value: capitalize(String(buildingInfo.swimmingPools)) },
                  ]} />
                  <InfoGrid items={[
                    { label: "Total Parking Spaces", value: buildingInfo.totalParkingSpaces },
                    { label: "Total Building Area", value: buildingInfo.totalBuildingArea ? `${fmt(buildingInfo.totalBuildingArea)} Sq Ft` : "—" },
                    { label: "Elevators", value: capitalize(String(buildingInfo.elevators)) },
                  ]} />
                </div>
              </>
            )}

            {/* ── Amenities ── */}
            {features.length > 0 && (
              <>
                <SectionTitle>Amenities</SectionTitle>
                <div className="bg-white border border-[#D9E1F2] rounded-[12px] p-8 mb-8">
                  <div className="grid grid-cols-3 gap-5">
                    {features.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <AmenityIcon label={item} />
                        <span className="text-[#01155E] font-medium text-[16px] capitalize">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── Payment Plan ── */}
            {paymentPlan?.planName && (
              <>
                <SectionTitle>Payment Plan</SectionTitle>
                <div className="bg-[#F5F8FF] border border-[#D9E1F2] rounded-[12px] p-8 mb-8">
                  <div className="flex justify-between items-center border border-[#D9E1F2] rounded-lg px-4 py-3 mb-6 bg-white">
                    <div className="flex items-center gap-2">
                      <BanknoteArrowDown size={20} className="text-[#01155E]" />
                      <span className="text-[18px] font-bold text-[#01155E]">{paymentPlan.planName}</span>
                    </div>
                  </div>

                  {/* Steps Progress Bar */}
                  {paymentPlan.steps?.length > 0 && (
                    <>
                      <div className="flex h-2 rounded-full overflow-hidden mb-3 gap-0.5">
                        {paymentPlan.steps.map((s, i) => {
                          const colors = ["bg-[#4A6CF7]", "bg-[#1A2E82]", "bg-[#B8C8E8]", "bg-[#6B8DD6]"];
                          return (
                            <div key={i}
                              className={`${colors[i % colors.length]} ${i === 0 ? "rounded-l-full" : ""} ${i === paymentPlan.steps.length - 1 ? "rounded-r-full" : ""}`}
                              style={{ width: `${s.percent}%` }} />
                          );
                        })}
                      </div>
                      <div className="flex text-[16px] font-medium text-[#01155E] mb-6">
                        {paymentPlan.steps.map((s, i) => (
                          <span key={i} style={{ width: `${s.percent}%` }}>{s.percent}%</span>
                        ))}
                      </div>
                      <div className="space-y-0">
                        {paymentPlan.steps.map((s, i) => (
                          <div key={i} className="flex justify-between items-center py-4 border-b border-[#D9E1F2] last:border-0">
                            <span className="text-[#01155E] font-semibold text-[17px]">{s.label}</span>
                            <span className="text-[#67739E] text-[17px]">{s.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Installment Schedule */}
                  {paymentPlan.installmentPlan?.length > 0 && (
                    <div className="mt-6 border-t border-[#D9E1F2] pt-5">
                      <p className="text-[#01155E] font-bold text-[17px] mb-4">Installment Schedule</p>
                      <div className="grid grid-cols-4 gap-3">
                        {paymentPlan.installmentPlan.map((inst, i) => (
                          <div key={i} className="bg-white border border-[#D9E1F2] rounded-lg p-3 text-center">
                            <p className="text-[#67739E] text-[14px] mb-1">{inst.month}</p>
                            <p className="text-[#01155E] font-bold text-[18px]">{inst.percent}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Down Payment */}
                  {paymentPlan.downPayment && (
                    <div className="mt-4 bg-white border border-[#D9E1F2] rounded-lg p-4 flex justify-between items-center">
                      <span className="text-[#01155E] font-semibold text-[16px]">Down Payment</span>
                      <span className="text-[#67739E] text-[18px] font-bold">{paymentPlan.downPayment}%</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ── Unit Types ── */}
            {unitTypes.length > 0 && (
              <>
                <SectionTitle>Unit Types</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {unitTypes.map((unit, i) => (
                    <div key={i} className="bg-[#F5F8FF] border border-[#D9E1F2] rounded-[15px] p-8 flex flex-col gap-4">
                      <h3 className="text-[#01155E] font-bold text-[22px]">{unit.bedrooms}</h3>
                      <div className="flex flex-wrap gap-5 text-[#67739E] text-[15px]">
                        <span className="flex items-center gap-2">
                          <Maximize size={18} className="text-[#01155E]" />
                          {fmt(unit.sqFt)} Sq Ft
                        </span>
                        <span className="flex items-center gap-2">
                          <Banknote size={18} className="text-[#01155E]" />
                          Starting at {currency} {fmt(unit.startingPrice)}
                        </span>
                        <span className="flex items-center gap-2">
                          <BadgeCheck size={18} className="text-[#01155E]" />
                          {capitalize(unit.availability)}
                        </span>
                      </div>
                      <button className="w-fit border border-[#01155E] bg-transparent text-[#01155E] font-semibold px-8 py-3 rounded-xl text-[16px] hover:bg-[#01155E] hover:text-white transition-all">
                        Check Availability
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── Floor Plans ── */}
            {floorPlans.length > 0 && (
              <>
                <SectionTitle>Floor Plans</SectionTitle>
                <div className="mb-8 space-y-3">
                  {floorPlans.map((plan, i) => (
                    <div key={i} className="border border-[#D9E1F2] rounded-[10px] overflow-hidden">
                      <div
                        className="bg-[#EEF2FF] p-5 flex justify-between items-center cursor-pointer"
                        onClick={() => setOpenFloorPlans((prev) => ({ ...prev, [i]: !prev[i] }))}
                      >
                        <div className="flex items-center gap-3">
                          {openFloorPlans[i]
                            ? <ChevronUp size={20} className="text-[#01155E]" />
                            : <ChevronDown size={20} className="text-[#01155E]" />}
                          <span className="text-[#67739E] font-semibold text-[18px]">{plan.bedrooms}</span>
                        </div>
                        <div className="flex gap-6 text-[#67739E] text-[15px]">
                          <span className="flex items-center gap-1.5">
                            <Maximize size={16} className="text-[#01155E]" /> {fmt(plan.sqFt)} Sq Ft
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Banknote size={16} className="text-[#01155E]" />
                            {currency} {fmt(plan.startingPrice)}
                          </span>
                        </div>
                      </div>
                      {openFloorPlans[i] && (
                        <div className="bg-white p-8">
                          <div className="flex justify-center mb-6 h-[300px] bg-[#F5F8FF] rounded-lg overflow-hidden items-center">
                            {plan.planImage ? (
                              <img src={plan.planImage} alt="Floor Plan" className="max-h-[280px] object-contain grayscale" />
                            ) : (
                              <span className="text-[#67739E]">Floor Plan Image</span>
                            )}
                          </div>
                          {plan.description && (
                            <p className="text-[#67739E] text-[16px] leading-relaxed">{plan.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── Investment Insights ── */}
            {investmentInsights?.rentalYield && (
              <>
                <SectionTitle>Investment Insights</SectionTitle>
                <div className="border border-[#01155E33] rounded-[12px] overflow-hidden mb-8">
                  <div className="flex justify-between items-center px-6 py-4 border-b border-[#01155E33]">
                    <h3 className="text-[20px] font-bold text-[#01155E]">Market Overview</h3>
                    <button className="bg-[#01155E] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-semibold">
                      Unlock Full Insights
                    </button>
                  </div>
                  <div className="grid grid-cols-3 px-6 py-5 gap-4">
                    <div>
                      <p className="text-[#67739E] text-[15px] mb-1 flex items-center gap-1">
                        <Percent size={14} /> Rental Yield
                      </p>
                      <p className="text-[#01155E] font-bold text-[18px] capitalize">{investmentInsights.rentalYield}</p>
                    </div>
                    <div>
                      <p className="text-[#67739E] text-[15px] mb-1 flex items-center gap-1">
                        <TrendingUp size={14} /> Price Trend
                      </p>
                      <p className="text-[#01155E] font-bold text-[18px] capitalize">{investmentInsights.priceTrend}</p>
                    </div>
                    <div>
                      <p className="text-[#67739E] text-[15px] mb-1 flex items-center gap-1">
                        <Banknote size={14} /> Price per Sq Ft
                      </p>
                      <p className="text-[#01155E] font-bold text-[18px]">
                        {currency} {fmt(investmentInsights.pricePerSqFt)} / Sq Ft
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── Community ── */}
            {loc.communityImage && (
              <>
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <SectionTitle className="mb-0">Community</SectionTitle>
                    <p className="text-[#67739E] font-semibold text-[20px]">{loc.community}</p>
                  </div>
                  <button className="bg-[#01155E] text-white px-6 py-2.5 rounded-lg text-[16px] font-semibold">
                    Explore Community
                  </button>
                </div>
                <div className="rounded-[10px] overflow-hidden border border-[#D9E1F2] h-[380px] mb-8">
                  <img src={loc.communityImage} className="w-full h-full object-cover" alt="Community" />
                </div>
              </>
            )}

            {/* ── Map Location ── */}
            <div className="flex justify-between items-center mb-5">
              <SectionTitle className="mb-0">Map Location</SectionTitle>
              <button className="bg-[#01155E] text-white px-6 py-2.5 rounded-lg text-[16px] font-semibold">
                Open Map
              </button>
            </div>
            <div id="listing-map" className="rounded-[10px] overflow-hidden border border-[#D9E1F2] h-[380px] mb-8" />

            {/* ── Project Video ── */}
            {youtubeVideoId && (
              <>
                <SectionTitle>Project Video</SectionTitle>
                <div className="rounded-[10px] overflow-hidden mb-10 h-[380px]">
                  <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title="Property Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="w-full h-full"
                  />
                </div>
              </>
            )}
          </div>

          {/* ═════ RIGHT SIDEBAR ═════ */}
          <div className="w-[400px] flex-shrink-0">
            <div className="sticky top-8 space-y-6">

              {/* Contact Card */}
              <div className="bg-white border border-[#D9E1F2] rounded-[12px] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={16} fill="#01155E" className="text-[#01155E]" />
                  <span className="text-[#01155E] font-bold text-[17px] line-clamp-2">{title}</span>
                </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {completionStatus && (
                    <span className="bg-[#01155E] text-white text-[12px] px-2.5 py-1.5 rounded-[4px] font-medium capitalize">
                      {completionStatus}
                    </span>
                  )}
                  {listingStatus && (
                    <span className="border border-[#D9E1F2] text-[#67739E] text-[12px] px-2.5 py-1.5 rounded-[4px] capitalize">
                      {listingStatus}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[#67739E] text-[14px] mb-3">
                  <MapPin size={13} /> {[loc.subCommunity, loc.community, loc.city].filter(Boolean).join(", ")}
                </div>

                {developer && (
                  <div className="flex items-center gap-2 text-[#67739E] text-[14px] mb-3">
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 flex-shrink-0" />
                    {developer}
                  </div>
                )}

                <div className="flex items-center gap-2 text-[#67739E] text-[14px] mb-4">
                  <Maximize size={13} /> {fmt(builtUpArea)} Sq Ft
                </div>

                <hr className="border-[#D9E1F2] mb-4" />

                <div className="mb-4">
                  <span className="text-[14px] text-[#67739E] block mb-1">Starting at</span>
                  <span className="text-[28px] font-bold text-[#01155E]">{currency} {fmt(price)}</span>
                  {serviceCharges && (
                    <p className="text-[#67739E] text-[13px] mt-1">
                      + {currency} {fmt(serviceCharges)}/yr service charges
                    </p>
                  )}
                </div>

                <hr className="border-[#D9E1F2] mb-4" />

                <h4 className="text-[#01155E] font-bold text-[18px] mb-4">Contact Agent</h4>

                <div className="rounded-xl bg-[#F5F8FF] p-4">
                  <div className="flex items-center gap-3 mb-4">
                    {agent.profileImage ? (
                      <img src={agent.profileImage} className="w-[54px] h-[54px] rounded-full object-cover" alt="Agent" />
                    ) : (
                      <div className="w-[54px] h-[54px] rounded-full bg-[#01155E] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {agent.name?.[0] || "A"}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-[#01155E] text-[16px]">{agent.name || "Agent"}</div>
                      <div className="text-[#67739E] text-[13px]">{agent.agency}</div>
                      {agent.isResponsiveBroker && (
                        <span className="inline-flex items-center gap-1 text-green-600 text-[12px] font-medium mt-0.5">
                          <BadgeCheck size={12} /> Responsive Broker
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a href={`tel:${agent.phone}`}
                      className="w-[42px] h-[42px] flex items-center justify-center border border-[#01155E] rounded-[10px] hover:bg-[#01155E] hover:text-white text-[#01155E] transition-colors">
                      <Phone size={17} />
                    </a>
                    <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" rel="noreferrer"
                      className="w-[42px] h-[42px] flex items-center justify-center border border-[#D9E1F2] rounded-[10px] bg-white hover:bg-green-50 transition-colors">
                      <WAIcon />
                    </a>
                    <a href={`mailto:${agent.email}`}
                      className="w-[42px] h-[42px] flex items-center justify-center border border-[#D9E1F2] rounded-[10px] bg-white hover:bg-blue-50 text-[#01155E] transition-colors">
                      <Mail size={17} />
                    </a>
                    <button className="flex-1 h-[42px] border border-[#01155E] text-[#01155E] rounded-[10px] font-semibold text-[15px] hover:bg-[#01155E] hover:text-white transition-all">
                      Request Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Promo Card */}
              <div className="relative rounded-[12px] overflow-hidden bg-gradient-to-b from-[#01155E] to-[#1e3a8a] p-8 text-center text-white">
                <h2 className="text-[22px] font-bold mb-2">Find Your Dream Property</h2>
                <p className="text-blue-200 text-[14px] leading-relaxed mb-5">
                  Explore more listings with our premium real estate platform.
                </p>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold text-[16px] shadow-lg transition-colors">
                  Browse More
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;