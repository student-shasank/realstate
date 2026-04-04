import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyMap from '../Components/Card/PropertyMap.jsx';


import {
  fetchListingDetail,
  resetListingDetailState,
} from "../features/dashboard/listingDetailSlice.jsx";
import {
  MapPin, Bed, Bath, Square, Calendar, Hash, CheckCircle,Utensils,Baby,Camera,Thermometer,GlassWater,Store,Scissors,
  Shirt,

  
  
  
  Map, 
 
  
  

  ChevronDown, ChevronUp, Play, Star, Phone, Mail, Heart,
  Share2, Maximize, Download, Wifi, Dumbbell, Car,
  ShieldCheck, Dog, Flame, Users, Waves, BanknoteArrowDown, Banknote, X, Image
} from 'lucide-react';
import Appartmentimage from "../assets/Appartment.png"
import floorplan1 from "../assets/floorplan.png"
import propertycommunity from "../assets/propertydetailcommunity.jpg"
import Breadcrumbs from '../Components/Card/Breadcrumbs';

const SIMILAR = [1, 2, 3].map((i) => ({
  id: i,
  title: "High-Rise Townhouse",
  location: "Southwestern Ontario, Canada",
  price: "AED 2,500,000",
  sqft: "122,280 sqft",
  beds: 41,
  baths: 32,
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
}));
// 1. Pehle AMENITY_MAP define karein (Component ke bahar)
const AMENITY_MAP = {
  bbq: { label: "BBQ Area", icon: "bbq" },
  bbqarea: { label: "BBQ Area", icon: "bbq" },
  pool: { label: "Pool", icon: "pool" },
  swimmingpool: { label: "Pool", icon: "pool" },
  gym: { label: "Gym", icon: "gym" },
  fitnesscenter: { label: "Gym", icon: "gym" },
 pet: { label: "Pet-friendly", icon: "pet" },     // 'petfriendly' ki jagah sirf 'pet'
  kids: { label: "Kids' Area", icon: "kids" },     // 'kidsarea' ki jagah sirf 'kids'
  club: { label: "Clubhouse", icon: "club" },
  security: { label: "Security cameras", icon: "camera" },
  track: { label: "Track", icon: "track" },
  spa: { label: "Spa", icon: "spa" },
  retail: { label: "Retail", icon: "retail" },
  laundry: { label: "Laundry", icon: "laundry" },
  salon: { label: "Salon", icon: "salon" },
};
const AmenityIcon = ({ type }) => {
  switch (type) {
    case "bbq": return <Utensils size={22} className="text-slate-400" />;
    case "pool": return <Waves size={22} className="text-slate-400" />;
    case "gym": return <Dumbbell size={22} className="text-slate-400" />;
    case "camera":
    case "security": return <Camera size={22} className="text-slate-400" />;
    case "pet": return <Dog size={22} className="text-slate-400" />;
    case "kids": return <Baby size={22} className="text-slate-400" />;
    case "track": return <Map size={22} className="text-slate-400" />;
    case "spa": return <Thermometer size={22} className="text-slate-400" />;
    case "club": return <GlassWater size={22} className="text-slate-400" />;
    case "retail": return <Store size={22} className="text-slate-400" />;
    case "laundry": return <Shirt size={22} className="text-slate-400" />;
    case "salon": return <Scissors size={22} className="text-slate-400" />;
    default: return <ShieldCheck size={22} className="text-slate-400" />;
  }
};

function ReviewCard({ agentAvatar }) {
  return (
    <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-6 flex-1">
      <div className="flex items-center gap-3 mb-4">
        <img src={agentAvatar} alt="User" className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-[#01155E] text-[15px]">Rachel Dan</h4>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
            </div>
          </div>
          <p className="text-[12px] text-[#67739E] flex items-center gap-1 mt-0.5">
            <Calendar size={11} /> Today 09:36 AM
          </p>
        </div>
      </div>
      <p className="text-[#67739E] text-[14px] leading-relaxed">
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.......
      </p>
    </div>
  );
}

// ── Photo Gallery Modal ────────────────────────────────────────────────────────
function GalleryModal({ images, onClose, agentName, agentAvatar, agentPhone }) {
  const [activeTab, setActiveTab] = useState("photos");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[1100px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">

        {/* Modal Header Tabs */}
        <div className="flex items-center border-b border-[#D9E1F2] px-6 py-0 relative">
          <button
            onClick={() => setActiveTab("photos")}
            className={`flex items-center gap-2 px-6 py-4 text-[18px] font-semibold border-b-2 transition-colors ${activeTab === "photos"
                ? "border-[#01155E] text-[#01155E]"
                : "border-transparent text-[#67739E] hover:text-[#01155E]"
              }`}
          >
            <Image size={18} />
            Photos ({images?.length})
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex items-center gap-2 px-6 py-4 text-[18px] font-semibold border-b-2 transition-colors ${activeTab === "map"
                ? "border-[#01155E] text-[#01155E]"
                : "border-transparent text-[#67739E] hover:text-[#01155E]"
              }`}
          >
            <MapPin size={18} />
            Map
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-3 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#67739E] hover:text-[#01155E]"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "photos" ? (
            <div className="p-4 grid grid-cols-2 gap-3">
              {images?.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-[10px] h-[260px]">
                  <img
                    src={src}
                    alt={`Property ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[500px]">
              <iframe
                title="map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d185399.54539516793!2d-79.51888!3d43.6534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d68bf33a9b%3A0x15edd8c4de1c7581!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin"
              />
            </div>
          )}
        </div>

        {/* Modal Footer - Agent */}
        <div className="border-t border-[#D9E1F2] px-6 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <img src={agentAvatar} alt="Agent" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="text-[13px] text-[#67739E]">Listing by</p>
              <p className="text-[#01155E] font-semibold text-[15px]">{agentName}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#D9E1F2] rounded-lg text-[#01155E] font-semibold text-[15px] hover:bg-gray-50 transition-colors">
              <Mail size={16} /> Email
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#D9E1F2] rounded-lg text-[#01155E] font-semibold text-[15px] hover:bg-gray-50 transition-colors">
              <Phone size={16} /> Call
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#D9E1F2] rounded-lg text-[#25D366] font-semibold text-[15px] hover:bg-green-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.571l5.9-1.548A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.939 0-3.756-.523-5.318-1.432l-.381-.226-3.499.918.934-3.408-.249-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PropertyDetail() {
  const { id } = useParams();
  console.log("ID:", id);



  const dispatch = useDispatch();

  const { listing, loading } = useSelector(
  (state) => state.listingDetail
);

 useEffect(() => {
  if (id) {
    dispatch(fetchListingDetail(id));
  }

  return () => {
    dispatch(resetListingDetailState());
  };
}, [dispatch, id]);

  const PROPERTY = listing || {};

  const [floorPlan1Open, setFloorPlan1Open] = useState(true);
  const [floorPlan2Open, setFloorPlan2Open] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // ── Destructure all fields from API JSON ──
  const {
    title,
    referenceNo,
    price,
    currency = "AED",
    serviceCharges,
    type,
    purpose,
    completionStatus,
    propertyStatus,
    listingStatus,
    availability,
    isFeatured,
    furnishing,
    bedrooms,
    bathrooms,
    garage,
    rooms,
    builtUpArea,
    totalBuildingArea,
    developer,
    ownership,
    yearBuilt,
    handoverDate,
    listingDate,
    description,
    features = [],
    images = [],
    videos = [],
    youtubeVideoId,
    brochureUrl,
    agent = {},
    projectInfo = {},
    location = {},
    buildingInfo = {},
    unitTypes = [],
    floorPlans = [],
    paymentPlan = {},
    investmentInsights = {},
    amenities = [],
    info = [],
    overview = {},
    rating,
    reviews,
    sqft,
    builder,
    status,
    pricePerSqFt,
    regulatoryInfo = {},
  } = PROPERTY;
   console.log(PROPERTY)

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  const { 
    permitNumber = "N/A", 
    zoneName = "N/A", 
    rera = "Approved", 
    brn = "Approved", 
    registeredAgency = "RTO" 
  } = regulatoryInfo;

  // ── Helper formatters ──
  const formatPrice = (val, cur = currency) =>
    val ? `${cur} ${Number(val).toLocaleString()}` : "—";

  // Payment plan steps — support both old and new shape
  const paymentSteps =
    paymentPlan?.steps?.length > 0
      ? paymentPlan.steps.map((s) => ({ label: s.label, value: `${s.percent}%` }))
      : [
          { label: "On Booking", value: "20%" },
          { label: "During Construction", value: "40%" },
          { label: "Upon Handover", value: "40%" },
        ];

  // Property info rows — use API `info` array OR build from flat fields
  const propertyInfoRows =
  info?.length > 0
    ? info
    : [
        { label: "Built-Up Area", value: builtUpArea ? `${builtUpArea} Sq Ft` : "—" },
        { label: "Total Building Area", value: totalBuildingArea ? `${totalBuildingArea} Sq Ft` : "—" },
         { label: "ReferenceNo", value: referenceNo || "—" },
        { label: "Year Built", value: yearBuilt || "—" },
        { label: "Ownership", value: ownership || "—" },
        { label: "Rooms", value: rooms ?? "—" },
        { label: "Handover", value: handoverDate || "—" },
      {
  label: "Listing Date",
  value: listingDate
    ? new Date(listingDate).toLocaleDateString()
    : "—"
},
        { label: "Furnishing", value: furnishing || "—" },
        { label: "Property Status", value: propertyStatus || "—" },
        { label: "Service Charges", value: serviceCharges || "—" },
        { label: "Completion Status", value: completionStatus || "—" },
      ];

  // Overview stats — use API `overview` or flat fields
  const overviewStats = [
    { icon: <Bed size={24} className="text-[#67739E]" />, val: overview?.bedrooms ?? bedrooms ?? "—", label: "Bedrooms" },
    { icon: <Bath size={24} className="text-[#67739E]" />, val: overview?.bathrooms ?? bathrooms ?? "—", label: "Bathrooms" },
    { icon: <Car size={24} className="text-[#67739E]" />, val: overview?.garage ?? garage ?? "—", label: "Garage" },
    { icon: <Calendar size={24} className="text-[#67739E]" />, val: overview?.yearBuilt ?? yearBuilt ?? "—", label: "Year Built" },
    { icon: <Square size={24} className="text-[#67739E]" />, val: overview?.areaSize ?? (builtUpArea ? `${builtUpArea} Sq Ft` : "—"), label: "Area Size" },
  ];

  // Unit types — map API shape { bedrooms, sqFt, startingPrice } to display shape { type, sqft, price }
  const unitTypesList =
    unitTypes?.length > 0
      ? unitTypes.map((u) => ({
          type: u.bedrooms || u.type || "—",
          sqft: u.sqFt ? `${u.sqFt} Sq Ft` : u.sqft || "—",
          price: formatPrice(u.startingPrice || u.price),
        }))
      : [];

  // Floor plans
  const floorPlansList = floorPlans?.length > 0 ? floorPlans : [];

  // Amenities — support array of strings or array of objects
 const rawData = amenities?.length > 0 ? amenities : (features || []);

const amenitiesList = rawData.map((item) => {
  // String ko normalize karein (lowercase aur spaces hatayein)
  const key = typeof item === "string" 
    ? item.toLowerCase().replace(/\s+/g, "") 
    : "";

  // Agar mapping milti hai toh wo use karein, warna original dikhayein
  return AMENITY_MAP[key] || { 
    label: item, 
    icon: "default" 
  };
});
  // Building info rows
  const buildingInfoRow1 = [
    { label: "Building Name", value: buildingInfo?.buildingName || projectInfo?.name || "—" },
    { label: "Year of Completion", value: buildingInfo?.yearOfCompletion || projectInfo?.completion || yearBuilt || "—" },
    { label: "Total Floors", value: buildingInfo?.totalFloors ?? "—" },
    { label: "Swimming Pools", value: buildingInfo?.swimmingPools || "—" },
  ];
  const buildingInfoRow2 = [
    { label: "Total Parking Spaces", value: buildingInfo?.totalParkingSpaces ?? "—" },
    { label: "Total Building Area", value: buildingInfo?.totalBuildingArea ? `${buildingInfo.totalBuildingArea} Sq Ft` : totalBuildingArea ? `${totalBuildingArea} Sq Ft` : "—" },
    { label: "Elevators", value: buildingInfo?.elevators || "—" },
  ];

  // YouTube embed
  const youtubeEmbed = youtubeVideoId
    ? `https://www.youtube.com/embed/${youtubeVideoId}`
    : "https://www.youtube.com/embed/dQw4w9WgXcQ";

  return (
    <div className="bg-white min-h-screen mt-25">
      {showGallery && (
        <GalleryModal
          images={images}
          onClose={() => setShowGallery(false)}
          agentName={agent?.name}
          agentAvatar={agent?.profileImage}
          agentPhone={agent?.phone}
        />
      )}

      <Breadcrumbs />
      <div className="max-w-[1290px] mx-auto pt-10 pb-20">

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 pr-8">
            <h1 className="text-[48px] font-[Archivo] font-semibold text-[#01155E] leading-tight mb-3">
              {title || "—"}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              {/* Status Badge */}
              <span className="bg-[#01155E] text-white text-[13px] font-medium px-3 py-1.5 rounded-md uppercase">
  {[completionStatus, listingStatus]
    .filter(Boolean)
    .join(" | ") || "—"}
</span>

              {/* Property Type */}
              <div className="flex items-center gap-2 text-[#67739E] text-[16px] font-medium capitalize">
                <img
                  src={Appartmentimage}
                  alt="type"
                  className="w-5 h-5 object-contain capitalize"
                />
                <span>{type}</span>
              </div>
            </div>

            <div className="flex items-center gap-5 text-[#67739E] text-[18px] flex-wrap">
             <div className="flex items-center gap-2">
  <MapPin size={18} className="text-[#01155E]" />
  <span>
    {[
      location?.address,
      location?.country
    ].filter(Boolean).join(", ") || "—"}
  </span>
</div>
{ console.log(location)}

              <div className="border-l border-[#D9E1F2] h-5" />

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-yellow-400" />
                <span>{developer || builder || projectInfo?.developer || "—"}</span>
              </div>

              <div className="border-l border-[#D9E1F2] h-5" />

              <div className="flex items-center gap-2">
                <Maximize size={18} className="text-[#01155E]" />
                <span>{builtUpArea ? `${builtUpArea} Sq Ft` : sqft || "—"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-[22px] font-semibold text-[#01155E]">
                Starting at
              </span>
              <span className="text-[28px] font-semibold text-[#01155E] uppercase">
                {formatPrice(price)}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="w-[50px] h-[50px] flex items-center justify-center bg-[#F0F4F8] text-[#01155E] rounded-full hover:bg-gray-200 transition-all">
                <Heart size={22} />
              </button>
              <button className="w-[50px] h-[50px] flex items-center justify-center bg-[#F0F4F8] text-[#01155E] rounded-full hover:bg-gray-200 transition-all">
                <Share2 size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Image Gallery ── */}
        <div className="grid grid-cols-12 gap-[10px] h-[520px] mb-12">
          <div className="col-span-7 relative h-full">
  <img
    src={"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"}
    className="w-full h-full object-cover rounded-[6px]"
    alt="Main"
  />

  {/* Badge */}
  <span className="absolute top-3 left-3 bg-white text-[#01155E] text-[13px] font-medium px-3 py-1.5 rounded-md shadow-sm capitalize">
    {completionStatus}
  </span>

  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer">
      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
    </div>
  </div>
</div>
          <div className="col-span-5 grid grid-cols-2 gap-[10px] h-full">
            <img src={"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"} className="w-full h-[255px] object-cover rounded-[6px]" alt="s1" />
            <div className="relative h-[255px]">
              <img src={"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover rounded-[6px]" alt="s2" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-[170px] h-[52px] bg-[#254B86]/50 backdrop-blur-[30px] border border-white/20 rounded-[10px] text-white font-semibold text-[18px] hover:bg-[#254B86]/70 transition-all">
                  View On Map
                </button>
              </div>
            </div>
            <img src={"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"} className="w-full h-[255px] object-cover rounded-[6px]" alt="s3" />

            {/* +N button — opens gallery */}
            <div
              className="relative h-[255px] overflow-hidden rounded-[6px] cursor-pointer"
              onClick={() => setShowGallery(true)}
            >
              <img src={"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover" alt="s4" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                <div className="flex flex-col items-center gap-1 text-white">
                  <div className="flex items-center gap-1.5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <span className="text-[22px] font-semibold">{images.length}</span>
                  </div>
                  <span className="text-[13px] font-medium opacity-90">View All Photos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body: Left + Right sidebar ── */}
        <div className="flex gap-[30px]">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">

            {/* Overview */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[26px] font-semibold text-[#01155E]">Overview</h2>
              <a
                href={brochureUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#01155E] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold"
              >
                <Download size={16} /> Download Brochure
              </a>
            </div>

            <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-8 mb-8">
              <div className="flex justify-between items-center pb-6 border-b border-[#D9E1F2] mb-8">
                {overviewStats.map((item, i) => (
                  <div key={i} className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-[24px] font-semibold text-[#01155E]">{item.val}</span>
                    </div>
                    <span className="text-[#67739E] text-[15px]   ">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Property Information */}
              <h3 className="text-[28px] font-[600] text-[#01155E] mb-6">Property Information</h3>
              <div className="border border-[#D9E1F2] rounded-[10px] mb-6">
                <div className="grid grid-cols-4 gap-y-6 p-6 border-b border-[#D9E1F2]">
                  {propertyInfoRows.slice(0, 4).map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[18px] mb-1 capitalize">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[18px] capitalize ">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-y-6 p-6 border-b border-[#D9E1F2]">
                  {propertyInfoRows.slice(4, 8).map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[18px] mb-1 capitalize">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[18px] capitalize">{item.value}</p>
                    </div>
                  ))}
                </div>
                {propertyInfoRows.slice(8).length > 0 && (
                  <div className="grid grid-cols-4 gap-y-6 p-6">
                    {propertyInfoRows.slice(8).map((item, i) => (
                      <div key={i}>
                        <p className="text-[#67739E] text-[18px] mb-1 capitalize">{item.label}</p>
                        <p className="text-[#01155E] font-semibold text-[18px] capitalize">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="border border-[#D9E1F2] rounded-[10px] p-6">
                <p className="text-[#67739E] text-[18px] leading-relaxed">
                  {description || "—"}
                  <span className="text-[#01155E] font-semibold cursor-pointer ml-1">...Read More</span>
                </p>
              </div>
            </div>

            {/* Regulatory Information */}
            <div className="mb-8">
  <h3 className="text-[26px] font-[600] text-[#01155E] mb-6">Regulatory Information</h3>
  <div className="flex gap-6">
    <div className="flex-1 border border-[#D9E1F2] rounded-[10px] p-6">
      <div className="grid grid-cols-2 gap-4 pb-5 border-b border-[#D9E1F2]">
        <div>
          <p className="text-[#67739E] text-[18px] mb-1">Permit Number</p>
          <p className="text-[#01155E] font-semibold text-[18px]">{permitNumber}</p>
        </div>
        <div>
          <p className="text-[#67739E] text-[18px] mb-1">Zone Name</p>
          <p className="text-[#01155E] font-semibold text-[18px]">{zoneName}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 py-5 border-b border-[#D9E1F2]">
        <div>
          <p className="text-[#67739E] text-[18px] mb-1">RERA</p>
          <p className="text-[#01155E] font-semibold text-[18px]">{rera}</p>
        </div>
        <div>
          <p className="text-[#67739E] text-[18px] mb-1">BRN</p>
          <p className="text-[#01155E] font-semibold text-[18px]">{brn}</p>
        </div>
      </div>
      <div className="pt-5">
        <p className="text-[#67739E] text-[18px] mb-1">Registered Agency</p>
        <p className="text-[#01155E] font-semibold text-[18px]">{registeredAgency}</p>
      </div>
    </div>

    {/* QR Code Section */}
    <div className="w-[280px] border border-[#D9E1F2] rounded-[10px] flex items-center justify-center p-6">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#01155E] rounded-tl-[4px]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#01155E] rounded-tr-[4px]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#01155E] rounded-bl-[4px]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#01155E] rounded-br-[4px]" />
        
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PERMIT-${permitNumber}-ZONE-${zoneName}-RERA-${rera}&color=01155E&bgcolor=ffffff`}
          alt="QR Code"
          className="w-[180px] h-[180px]"
        />
      </div>
    </div>
  </div>
</div>

            {/* Payment Plan */}
            <h2 className="text-[26px] font-semibold text-[#01155E] mb-5">Payment Plan</h2>
            <div className="bg-[#1C4DFF0A] border border-[#D9E1F2] rounded-[10px] p-8 mb-8">
              <div className="flex justify-between items-center border border-[#D9E1F2] rounded-lg px-4 py-3 mb-6 cursor-pointer bg-white">
                <div className="flex items-center gap-2 text-[#67739E]">
                  <BanknoteArrowDown size={20} className="text-[#01155E]" />
                  <span className="text-[18px] font-['Archivo'] text-[#01155E]">
                    {paymentPlan?.planName || "Payment Plan 60/40"}
                  </span>
                </div>
                <ChevronDown size={20} className="text-[#67739E]" />
              </div>
             <div className="flex h-2 rounded-full overflow-hidden mb-3 gap-0.5">
  {paymentSteps.map((step, i) => (
    <div
      key={i}
      style={{ width: step.value }}
      className={`
        ${i === 0 ? "rounded-l-full" : ""}
        ${i === paymentSteps.length - 1 ? "rounded-r-full" : ""}
        bg-[#4A6CF7]
      `}
    />
  ))}
</div>
          <div className="flex text-[18px] font-medium text-[#01155E] mb-6">
  {paymentPlan?.steps?.map((step, i) => (
    <span key={i} style={{ width: `${step.percent}%` }}>
      {step.percent}%
    </span>
  ))}
</div>
              <div className="space-y-4">
                {paymentSteps.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-[#D9E1F2] last:border-0">
                    <span className="text-[#01155E] font-semibold text-[18px]">{item.label}</span>
                    <span className="text-[#67739E] text-[18px]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unit Types */}
            <h2 className="text-[28px] font-semibold text-[#01155E] mb-7">Unit Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {unitTypesList.map((unit, i) => (
                <div key={i} className="bg-[#F5F8FF] border border-[#D9E1F2] rounded-[15px] p-8 flex flex-col gap-6">
                  <h3 className="text-[#01155E] font-semibold text-[24px]">{unit.type}</h3>
                  <div className="flex flex-wrap gap-6 text-[#67739E] text-[18px]">
                    <span className="flex items-center gap-2">
                      <Maximize size={20} className="text-[#01155E]" />
                      {unit.sqft}
                    </span>
                    <span className="flex items-center gap-2">
                      <Banknote size={20} className="text-[#01155E]" />
                      Starting at {unit.price}
                    </span>
                  </div>
                  <button className="w-fit border border-[#01155E] bg-transparent text-[#01155E] font-semibold px-8 py-4 rounded-xl text-[18px] hover:bg-[#01155E] hover:text-white transition-all">
                    Check Availability
                  </button>
                </div>
              ))}
            </div>

            {/* Building Information */}
            <div className="mb-8">
              <h2 className="text-[28px] font-bold text-[#01155E] mb-6">Building Information</h2>
              <div className="border border-[#D9E1F2] rounded-[10px] p-6">
                <div className="grid grid-cols-4 gap-y-6 pb-6 border-b border-[#D9E1F2]">
                  {buildingInfoRow1.map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[16px] mb-2">{item.label}</p>
                      <p className="text-[#01155E] font-bold text-[18px]">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-y-6 pt-6">
                  {buildingInfoRow2.map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[16px] mb-2">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[18px]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
          <h2 className="text-[28px] font-semibold text-[#01155E] mb-5">Amenities</h2>
<div className="bg-white border border-[#D9E1F2] rounded-[10px] p-8 mb-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-5 mb-10">
    {amenitiesList.map((item, i) => (
      <div key={i} className="flex items-center gap-4 group">
        <div className="flex-shrink-0 transition-transform group-hover:scale-110">
          <AmenityIcon type={item.icon} />
        </div>
        <span className="text-[#01155E] font-medium text-[17px] leading-tight">
          {item.label}
        </span>
      </div>
    ))}
  </div>

  <div className="flex justify-center pt-4 border-t border-gray-50">
    <button className="w-full sm:w-fit border-2 border-[#01155E] bg-transparent text-[#01155E] font-bold px-10 py-3.5 rounded-xl uppercase text-[15px] tracking-wider hover:bg-[#01155E] hover:text-white transition-all duration-300">
      View All Amenities
    </button>
  </div>
</div>

            {/* Floor Plans */}
            <h2 className="text-[26px] font-semibold text-[#01155E] mb-5">Floor Plans</h2>
            <div className="mb-8">
              {floorPlansList.map((plan, index) => (
                <div key={index} className="border border-[#D9E1F2] rounded-[10px] overflow-hidden mb-3">
                  <div
                    className="bg-[#EEF2FF] p-5 flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      index === 0
                        ? setFloorPlan1Open(!floorPlan1Open)
                        : setFloorPlan2Open(!floorPlan2Open)
                    }
                  >
                    <div className="flex items-center gap-3">
                      {(index === 0 ? floorPlan1Open : floorPlan2Open) ? (
                        <ChevronUp size={20} className="text-[#01155E]" />
                      ) : (
                        <ChevronDown size={20} className="text-[#01155E]" />
                      )}
                      <span className="text-[#67739E] font-semibold text-[20px]">
                        {plan.bedrooms}
                      </span>
                    </div>
                    <div className="flex gap-6 text-[#67739E] text-[18px]">
                      <span className="flex items-center gap-1.5">
                        <Maximize size={18} className="text-[#01155E]" />
                        {plan.sqFt} Sq Ft
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Banknote size={18} className="text-[#01155E]" />
                        Starting at {currency} {Number(plan.startingPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {(index === 0 ? floorPlan1Open : floorPlan2Open) && (
                    <div className="bg-white p-8">
                      <div className="flex justify-center mb-6">
                        <img
                          src={plan.planImage || floorplan1}
                          alt="Floor Plan"
                          className="max-h-[380px] grayscale"
                        />
                      </div>
                      {plan.description && (
                        <>
                          <h4 className="font-semibold text-[#67739E] text-[18px] mb-4">Description:</h4>
                          <p className="text-[#67739E] text-[18px] leading-relaxed">{plan.description}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Community */}
            <div className="flex justify-between items-center mb-7.5">
              <div>
                <h2 className="text-[28px] font-semibold text-[#01155E]">Community</h2>
                <p className="text-[#67739E] font-semibold text-[24px]">
                  {location?.community || "—"}
                </p>
              </div>
              <button className="bg-[#01155E] text-white px-6 py-2.5 rounded-lg text-[18px] font-semibold">
                Explore Community
              </button>
            </div>

            <div className="rounded-[10px] overflow-hidden border border-[#D9E1F2] w-[850px] h-[395px] mb-8">
              <img
                src={location?.communityImage || propertycommunity}
                className="w-full h-full object-cover"
                alt="Community"
              />
            </div>

            {/* Investment Insights */}
            <div className="border border-[#01155E33] rounded-[10px] overflow-hidden mb-8">
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#01155E33]">
                <h2 className="text-[22px] font-bold text-[#01155E]">Investment Insights</h2>
                <button className="bg-[#01155E] text-white px-5 py-2.5 rounded-[8px] text-[15px] font-semibold">
                  Unlock Investment Insights
                </button>
              </div>
              <div className="grid grid-cols-3 px-6 py-5">
                <div>
                  <p className="text-[#67739E] text-[15px] mb-1">Rental Yield</p>
                  <p className="text-[#01155E] font-bold text-[17px]">{investmentInsights?.rentalYield || "—"}</p>
                </div>
                <div>
                  <p className="text-[#67739E] text-[15px] mb-1">Price Trends</p>
                  <p className="text-[#01155E] font-bold text-[17px]">{investmentInsights?.priceTrend || "—"}</p>
                </div>
                <div>
                  <p className="text-[#67739E] text-[15px] mb-1">Price per sqft</p>
                  <p className="text-[#01155E] font-bold text-[17px]">
                    {investmentInsights?.pricePerSqFt
                      ? `${investmentInsights.pricePerSqFt} AED / Sq Ft`
                      : pricePerSqFt || "—"}
                  </p>
                </div>
              </div>
            </div>

           <div className="mt-10">
      <h2 className="text-[28px] font-semibold text-[#01155E] mb-5">Location Map</h2>
      <PropertyMap 
        coordinates={location?.coordinates} 
        title={title} 
      />
    </div>


            {/* Project Video */}
            <h2 className="text-[28px] font-semibold text-[#01155E] mb-5">Project Video</h2>
            <div className="relative rounded-[10px] overflow-hidden mb-10 h-[380px]">
              <iframe
                width="100%"
                height="100%"
                src={youtubeEmbed}
                title="Property Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-[410px] flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-6">

                <div className="flex items-center gap-3 mb-4">
                  <Star size={18} fill="#0e0d0d" />
                  <span className="text-[#01155E] font-semibold text-[22px]">{title || "—"}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#01155E] text-white text-[12px] px-2.5 py-1.5 rounded-[4px] font-medium uppercase">
                    {listingStatus || status || "—"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#67739E] text-[18px] mb-4">
                  <MapPin size={14} />
                  <span>
    {[
      location?.address,
      location?.country
    ].filter(Boolean).join(", ") || "—"}
  </span>
                </div>

                <hr className="border-[#D9E1F2] mb-4" />

                <div className="flex items-center gap-2 text-[#67739E] text-[18px] mb-4">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400" />
                  <span>{developer || builder || projectInfo?.developer || "—"}</span>
                </div>

                <hr className="border-[#D9E1F2] mb-4" />

                <div className="flex items-center gap-2 text-[#67739E] text-[18px] mb-4">
                  <Square size={14} />
                  <span>{builtUpArea ? `${builtUpArea} Sq Ft` : sqft || "—"}</span>
                </div>

                <hr className="border-[#D9E1F2] mb-6" />

                <div className="text-[25px] font-semibold text-[#01155E] mb-4">
                  Starting at {currency}
                  <span className="text-[36px] ml-2">
                    {price ? Number(price).toLocaleString() : "—"}
                  </span>
                </div>

                <hr className="border-[#D9E1F2] mb-4" />

                <h4 className="text-[#01155E] font-semibold text-[20px] mb-4">Contact With Us Now !</h4>

                <div className="rounded-xl bg-[#F5F8FF] p-4 w-full max-w-[350px]">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={agent?.profileImage}
                      className="w-[56px] h-[56px] rounded-full object-cover"
                      alt="Agent"
                    />
                    <div>
                      <div className="font-semibold text-[#01155E] text-[18px] leading-none mb-2">
                        {agent?.name || "—"}
                      </div>
                      <div className="text-[#01155E] flex items-center gap-2 text-[18px]">
                        <Phone size={18} />
                        <span>{agent?.phone || "—"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="w-[42px] h-[42px] flex items-center justify-center border border-[#01155E] rounded-[10px]">
                      <Phone size={18} />
                    </button>
                    <button className="flex-1 h-[42px] border border-[#01155E] text-[#01155E] rounded-[10px] font-semibold text-[18px] hover:bg-[#01155E] hover:text-white transition-all">
                      Request Details
                    </button>
                  </div>
                </div>

              </div>

              {/* Promo Card */}
              <div className="relative rounded-[10px] overflow-hidden bg-gradient-to-b from-[#01155E] to-[#1e3a8a] p-8 text-center text-white">
                <div className="mb-6">
                  <h2 className="text-[28px] font-semibold mb-3">New Template</h2>
                  <p className="text-blue-200 text-[15px] leading-relaxed mb-6">
                    Advertise your real estate to a wider audience with our landing page.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold text-[18px] shadow-lg">
                    Try It Now
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-6">
                  {images?.slice(0, 3).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="rounded-lg h-36 object-cover border-2 border-white/20"
                      alt="promo"
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <h2 className="text-[30px] font-semibold text-[#01155E] text-center mb-10">
            Similar Properties In {location?.community || "Expo City"}
          </h2>
          <div className="grid grid-cols-3 gap-[26px]">
            {SIMILAR.map((item) => (
              <div key={item.id} className="bg-white border border-[#D9E1F2] rounded-[10px] overflow-hidden group">
                <div className="relative h-[240px]">
                  <img src={item.image} className="w-full h-full object-cover" alt="similar" />
                  <div className="absolute top-3 left-3 bg-[#01155E]/80 backdrop-blur-md text-white text-[12px] px-3 py-1 rounded">
                    Off-Plan | Resale
                  </div>
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                    <Heart size={16} className="text-[#01155E]" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-[20px] font-semibold text-[#01155E] mb-2">{item.title}</h3>
                  <div className="flex items-center text-[#67739E] text-[18px] mb-4">
                    <MapPin size={14} className="mr-1 text-[#01155E]" /> {item.location}
                  </div>
                  <div className="flex justify-between border-y border-[#D9E1F2] py-3 mb-4">
                    <div className="flex items-center gap-1.5 text-[#01155E] font-semibold text-[18px]"><Bed size={16} /> {item.beds}</div>
                    <div className="flex items-center gap-1.5 text-[#01155E] font-semibold text-[18px]"><Bath size={16} /> {item.baths}</div>
                    <div className="flex items-center gap-1.5 text-[#01155E] font-semibold text-[18px]"><Square size={16} /> {item.sqft}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[24px] font-semibold text-[#01155E]">{item.price}</div>
                    <button className="border border-[#D9E1F2] px-4 py-2 rounded-lg font-semibold text-[#01155E] text-[13px] hover:bg-[#01155E] hover:text-white transition-all">
                      View Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}