import React, { useState } from 'react';
import {
  MapPin, Bed, Bath, Square, Calendar, Hash, CheckCircle,
  ChevronDown, ChevronUp, Play, Star, Phone, Mail, Heart,
  Share2, Maximize, Download, Wifi, Dumbbell, Car,
  ShieldCheck, Dog, Flame, Users, Waves, BanknoteArrowDown, Banknote, X, Image
} from 'lucide-react';
import Appartmentimage from "../assets/Appartment.png"
import floorplan1 from "../assets/floorplan.png"
import propertycommunity from "../assets/propertydetailcommunity.jpg"
import Breadcrumbs from '../Components/Card/Breadcrumbs';

const PROPERTY = {
  title: "High-Rise Townhouse In California",
  location: "Southwestern, Ontario, Canada",
  builder: "Zara Builders",
  sqft: "1,200/Sq Ft",
  status: "Off-Plan | Resale",
  rating: 5,
  reviews: 2,
  price: "AED 10,00,239",
  pricePerSqFt: "1,200/Sq Ft",
  overview: {
    bedrooms: 2,
    bathrooms: 2,
    garage: 2,
    yearBuilt: 2022,
    areaSize: "1,354",
  },
  info: [
    { label: "Built-up Area", value: "1435 Sq Ft" },
    { label: "Total Building Area", value: "3766 Sq Ft" },
    { label: "Property ID", value: "HZ24" },
    { label: "Year Built", value: "2022" },
    { label: "Ownership", value: "Freehold" },
    { label: "Rooms", value: "5" },
    { label: "Handover", value: "Q4 2027" },
    { label: "Listing Date", value: "19 Jan, 2026" },
    { label: "Furnishing", value: "Furnished" },
    { label: "Property Status", value: "Vacant" },
    { label: "Service Charges", value: "AED / Sq Ft" },
  ],
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
 "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
     "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800",
  ],
  description:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim...",
  amenities: [
    { icon: "bbq", label: "BBQ Area" },
    { icon: "kids", label: "Kids' Area" },
    { icon: "pool", label: "Pool" },
    { icon: "camera", label: "Security cameras on property" },
    { icon: "pet", label: "Pet-friendly" },
    { icon: "gym", label: "Gym" },
  ],
  buildingInfo: {
  buildingName: "Plazzo Heights",
  yearOfCompletion: "2026",
  totalFloors: "25",
  swimmingPools: "Available",
  totalParkingSpaces: "50",
  totalBuildingArea: "122.280 Sq Ft",
  elevators: "Available",
},
  paymentPlan: {
    name: "Payment Plan 60/40",
    onBooking: 20,
    duringConstruction: 40,
    uponHandover: 40,
  },
  unitTypes: [
    { type: "1 Bedroom", sqft: "850 Sq Ft", price: "AED 1.2M" },
    { type: "2 Bedroom", sqft: "850 Sq Ft", price: "AED 2.2M" },
    { type: "3 Bedroom", sqft: "1050 Sq Ft", price: "AED 3.2M" },
  ],
  floorPlans: [
    { title: "1 Bedroom", sqft: "1435 Sq Ft", price: "AED 1.2M", open: true },
    { title: "2 Bedroom", sqft: "1435 Sq Ft", price: "AED 1.2M", open: false },
  ],
  agent: {
    name: "Rachel Dan",
    phone: "0485.526.258",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100",
  },
};


const SIMILAR = [1, 2, 3].map((i) => ({
  id: i,
  title: "High-Rise Townhouse",
  location: "Southwestern Ontario, Canada",
  price: "AED 10,00,239",
  sqft: "122,280 sqft",
  beds: 41,
  baths: 32,
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
}));

function AmenityIcon({ type, size = 20 }) {
  const cls = `text-[#67739E]`;
  switch (type) {
    case "bbq": return <Flame size={size} className={cls} />;
    case "kids": return <Users size={size} className={cls} />;
    case "pool": return <Waves size={size} className={cls} />;
    case "camera": return <ShieldCheck size={size} className={cls} />;
    case "pet": return <Dog size={size} className={cls} />;
    case "gym": return <Dumbbell size={size} className={cls} />;
    default: return <CheckCircle size={size} className={cls} />;
  }
}

function ReviewCard() {
  return (
    <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-6 flex-1">
      <div className="flex items-center gap-3 mb-4">
        <img src={PROPERTY.agent.avatar} alt="User" className="w-12 h-12 rounded-full object-cover" />
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
            className={`flex items-center gap-2 px-6 py-4 text-[18px] font-semibold border-b-2 transition-colors ${
              activeTab === "photos"
                ? "border-[#01155E] text-[#01155E]"
                : "border-transparent text-[#67739E] hover:text-[#01155E]"
            }`}
          >
            <Image size={18} />
            Photos ({images.length})
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex items-center gap-2 px-6 py-4 text-[18px] font-semibold border-b-2 transition-colors ${
              activeTab === "map"
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
              {images.map((src, i) => (
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
  const [floorPlan1Open, setFloorPlan1Open] = useState(true);
  const [floorPlan2Open, setFloorPlan2Open] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="bg-white min-h-screen mt-25">
      {showGallery && (
        <GalleryModal
          images={PROPERTY.images}
          onClose={() => setShowGallery(false)}
          agentName={PROPERTY.agent.name}
          agentAvatar={PROPERTY.agent.avatar}
          agentPhone={PROPERTY.agent.phone}
        />
      )}

      <Breadcrumbs />
      <div className="max-w-[1290px] mx-auto pt-10 pb-20">

        {/* ── Header ── */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 pr-8">
            <h1 className="text-[48px] font-[Archivo] font-semibold text-[#01155E] leading-tight mb-3">
              {PROPERTY.title}
            </h1>
            

<div className="flex items-center gap-4 mb-4">
  
  {/* Status Badge */}
  <span className="bg-[#01155E] text-white text-[13px] font-medium px-3 py-1.5 rounded-md">
    {PROPERTY.status}
  </span>

  {/* Property Type (Icon + Text) */}
  <div className="flex items-center gap-2 text-[#67739E] text-[16px] font-medium">
    <img
      src={Appartmentimage}
      alt="type"
      className="w-5 h-5 object-contain"
    />
    <span>{PROPERTY.type || "Apartment"}</span>
  </div>

</div>
            <div className="flex items-center gap-5 text-[#67739E] text-[18px] flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#01155E]" />
                <span>{PROPERTY.location}</span>
              </div>
              <div className="border-l border-[#D9E1F2] h-5" />
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-yellow-400" />
                <span>{PROPERTY.builder}</span>
              </div>
              <div className="border-l border-[#D9E1F2] h-5" />
              <div className="flex items-center gap-2">
                <Maximize size={18} className="text-[#01155E]" />
                <span>{PROPERTY.sqft}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-[22px] font-semibold text-[#01155E]">Starting at</span>
              <span className="text-[28px] font-semibold text-[#01155E]">{PROPERTY.price}</span>
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
              src={PROPERTY.images[0]}
              className="w-full h-full object-cover rounded-[6px]"
              alt="Main"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>
          <div className="col-span-5 grid grid-cols-2 gap-[10px] h-full">
            <img src={PROPERTY.images[1]} className="w-full h-[255px] object-cover rounded-[6px]" alt="s1" />
            <div className="relative h-[255px]">
              <img src={PROPERTY.images[2]} className="w-full h-full object-cover rounded-[6px]" alt="s2" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-[170px] h-[52px] bg-[#254B86]/50 backdrop-blur-[30px] border border-white/20 rounded-[10px] text-white font-semibold text-[18px] hover:bg-[#254B86]/70 transition-all">
                  View On Map
                </button>
              </div>
            </div>
            <img src={PROPERTY.images[3]} className="w-full h-[255px] object-cover rounded-[6px]" alt="s3" />

            {/* +N button — opens gallery */}
            <div
              className="relative h-[255px] overflow-hidden rounded-[6px] cursor-pointer"
              onClick={() => setShowGallery(true)}
            >
              <img src={PROPERTY.images[4]} className="w-full h-full object-cover" alt="s4" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                <div className="flex flex-col items-center gap-1 text-white">
                  <div className="flex items-center gap-1.5">
                    {/* Camera icon SVG */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    <span className="text-[22px] font-semibold">{PROPERTY.images.length}</span>
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
              <button className="flex items-center gap-2 bg-[#01155E] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold">
                <Download size={16} /> Download Brochure
              </button>
            </div>

            <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-8 mb-8">
              <div className="flex justify-between items-center pb-6 border-b border-[#D9E1F2] mb-8">
                {[
                  { icon: <Bed size={24} className="text-[#67739E]" />, val: PROPERTY.overview.bedrooms, label: "Bedrooms" },
                  { icon: <Bath size={24} className="text-[#67739E]" />, val: PROPERTY.overview.bathrooms, label: "Bathrooms" },
                  { icon: <Car size={24} className="text-[#67739E]" />, val: PROPERTY.overview.garage, label: "Garage" },
                  { icon: <Calendar size={24} className="text-[#67739E]" />, val: PROPERTY.overview.yearBuilt, label: "Year Built" },
                  { icon: <Square size={24} className="text-[#67739E]" />, val: PROPERTY.overview.areaSize, label: "Area Size" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-[24px] font-semibold text-[#01155E]">{item.val}</span>
                    </div>
                    <span className="text-[#67739E] text-[15px]">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Property Information */}
              <h3 className="text-[28px] font-[600] text-[#01155E] mb-6">Property Information</h3>
              <div className="border border-[#D9E1F2] rounded-[10px] mb-6">
                <div className="grid grid-cols-4 gap-y-6 p-6 border-b border-[#D9E1F2]">
                  {PROPERTY.info.slice(0, 4).map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[18px] mb-1">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[18px]">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-y-6 p-6 border-b border-[#D9E1F2]">
                  {PROPERTY.info.slice(4, 8).map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[18px] mb-1">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[18px]">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-y-6 p-6">
                  {PROPERTY.info.slice(8).map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[18px] mb-1">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[18px]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="border border-[#D9E1F2] rounded-[10px] p-6">
                <p className="text-[#67739E] text-[18px] leading-relaxed">
                  {PROPERTY.description}
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
                      <p className="text-[#01155E] font-semibold text-[18px]">143544</p>
                    </div>
                    <div>
                      <p className="text-[#67739E] text-[18px] mb-1">Zone Name</p>
                      <p className="text-[#01155E] font-semibold text-[18px]">East</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-5 border-b border-[#D9E1F2]">
                    <div>
                      <p className="text-[#67739E] text-[18px] mb-1">RERA</p>
                      <p className="text-[#01155E] font-semibold text-[18px]">Approved</p>
                    </div>
                    <div>
                      <p className="text-[#67739E] text-[18px] mb-1">BRN</p>
                      <p className="text-[#01155E] font-semibold text-[18px]">Approved</p>
                    </div>
                  </div>
                  <div className="pt-5">
                    <p className="text-[#67739E] text-[18px] mb-1">Registered Agency</p>
                    <p className="text-[#01155E] font-semibold text-[18px]">RTO</p>
                  </div>
                </div>
                <div className="w-[280px] border border-[#D9E1F2] rounded-[10px] flex items-center justify-center p-6">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#01155E] rounded-tl-[4px]" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#01155E] rounded-tr-[4px]" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#01155E] rounded-bl-[4px]" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#01155E] rounded-br-[4px]" />
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PERMIT-143544-ZONE-EAST-RERA-APPROVED&color=01155E&bgcolor=ffffff`}
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
                  <span className="text-[18px] font-['Archivo'] text-[#01155E]">Payment Plan 60/40</span>
                </div>
                <ChevronDown size={20} className="text-[#67739E]" />
              </div>
              <div className="flex h-2 rounded-full overflow-hidden mb-3 gap-0.5">
                <div className="bg-[#4A6CF7] rounded-l-full" style={{ width: "20%" }} />
                <div className="bg-[#1A2E82]" style={{ width: "40%" }} />
                <div className="bg-[#B8C8E8] rounded-r-full" style={{ width: "40%" }} />
              </div>
              <div className="flex text-[18px] font-medium text-[#01155E] mb-6">
                <span style={{ width: "20%" }}>20%</span>
                <span style={{ width: "40%" }}>40%</span>
                <span style={{ width: "40%" }}>40%</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "On Booking", value: "20%" },
                  { label: "During Construction", value: "40%" },
                  { label: "Upon Handover", value: "40%" },
                ].map((item, i) => (
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
              {PROPERTY.unitTypes.map((unit, i) => (
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
    {/* Row 1 */}
    <div className="grid grid-cols-4 gap-y-6 pb-6 border-b border-[#D9E1F2]">
      {[
        { label: "Building Name", value: PROPERTY.buildingInfo.buildingName },
        { label: "Year of Completion", value: PROPERTY.buildingInfo.yearOfCompletion },
        { label: "Total Floors", value: PROPERTY.buildingInfo.totalFloors },
        { label: "Swimming Pools", value: PROPERTY.buildingInfo.swimmingPools },
      ].map((item, i) => (
        <div key={i}>
          <p className="text-[#67739E] text-[16px] mb-2">{item.label}</p>
          <p className="text-[#01155E] font-bold text-[18px]">{item.value}</p>
        </div>
      ))}
    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-4 gap-y-6 pt-6">
      {[
        { label: "Total Parking Spaces", value: PROPERTY.buildingInfo.totalParkingSpaces },
        { label: "Total Building Area", value: PROPERTY.buildingInfo.totalBuildingArea },
        { label: "Elevators", value: PROPERTY.buildingInfo.elevators },
      ].map((item, i) => (
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
              <div className="grid grid-cols-3 gap-5 mb-6">
                {PROPERTY.amenities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <AmenityIcon type={item.icon} />
                    <span className="text-[#01155E] font-medium text-[18px]">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button className="w-fit border border-[#01155E] bg-transparent text-[#01155E] font-semibold px-8 py-4 rounded-xl uppercase text-[18px] hover:bg-[#01155E] hover:text-white transition-all">
                  View All Amenities
                </button>
              </div>
            </div>

            {/* Floor Plans */}
            <h2 className="text-[26px] font-semibold text-[#01155E] mb-5">Floor Plans</h2>
            <div className="mb-8">
              <div className="border border-[#D9E1F2] rounded-[10px] overflow-hidden mb-3">
                <div className="bg-[#EEF2FF] p-5 flex justify-between items-center cursor-pointer" onClick={() => setFloorPlan1Open(!floorPlan1Open)}>
                  <div className="flex items-center gap-3">
                    {floorPlan1Open ? <ChevronUp size={20} className="text-[#01155E]" /> : <ChevronDown size={20} className="text-[#01155E]" />}
                    <span className="text-[#67739E] font-semibold text-[20px]">1 Bedroom</span>
                  </div>
                  <div className="flex gap-6 text-[#67739E] text-[18px]">
                    <span className="flex items-center gap-1.5"><Maximize size={18} className="text-[#01155E]" /> 1435 Sq Ft</span>
                    <span className="flex items-center gap-1.5"><Banknote size={18} className="text-[#01155E]" />Starting at AED 1.2M</span>
                  </div>
                </div>
                {floorPlan1Open && (
                  <div className="bg-white p-8">
                    <div className="flex justify-center mb-6">
                      <img src={floorplan1} alt="Floor Plan" className="max-h-[380px] grayscale" />
                    </div>
                    <h4 className="font-semibold text-[#67739E] text-[18px] mb-4">Description:</h4>
                    <p className="text-[#67739E] text-[18px] leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    </p>
                  </div>
                )}
              </div>
              <div className="border border-[#D9E1F2] rounded-[10px] overflow-hidden">
                <div className="bg-[#EEF2FF] p-5 flex justify-between items-center cursor-pointer" onClick={() => setFloorPlan2Open(!floorPlan2Open)}>
                  <div className="flex items-center gap-3">
                    {floorPlan2Open ? <ChevronUp size={20} className="text-[#01155E]" /> : <ChevronDown size={20} className="text-[#01155E]" />}
                    <span className="text-[#67739E] font-semibold text-[20px]">2 Bedroom</span>
                  </div>
                  <div className="flex gap-6 text-[#67739E] text-[18px]">
                    <span className="flex items-center gap-1.5"><Maximize size={18} className="text-[#01155E]" /> 1435 Sq Ft</span>
                    <span className="flex items-center gap-1.5"><Banknote size={18} className="text-[#01155E]" />Starting at AED 1.2M</span>
                  </div>
                </div>
                {floorPlan2Open && (
                  <div className="bg-white p-8">
                    <div className="flex justify-center mb-6">
                      <img src="https://wcs.smartdraw.com/floor-plan/img/floorplan.png?bn=15153520265" alt="Floor Plan" className="max-h-[380px] grayscale" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            

            {/* Community */}
            <div className="flex justify-between items-center mb-7.5">
              <div>
                <h2 className="text-[28px] font-semibold text-[#01155E]">Community</h2>
                <p className="text-[#67739E] font-semibold text-[24px]">Expo City</p>
              </div>
              <button className="bg-[#01155E] text-white px-6 py-2.5 rounded-lg text-[18px] font-semibold">
                Explore Community
              </button>
            </div>
            <div className="rounded-[10px] overflow-hidden border border-[#D9E1F2] w-[850px] h-[395px] mb-8">
              <img src={propertycommunity} className="w-full h-full object-cover" alt="Community" />
            </div>
{/* Investment Insights */}
<div className="border  border-[#01155E33] rounded-[10px] overflow-hidden mb-8">
  {/* Header */}
  <div className="flex justify-between items-center px-6 py-4 border-b border-[#01155E33]">
    <h2 className="text-[22px] font-bold text-[#01155E]">Investment Insights</h2>
    <button className="bg-[#01155E] text-white px-5 py-2.5 rounded-[8px] text-[15px] font-semibold  transition-colors">
      Unlock Investment Insights
    </button>
  </div>

  {/* Stats Row */}
  <div className="grid grid-cols-3 px-6 py-5">
    <div>
      <p className="text-[#67739E] text-[15px] mb-1">Rental Yield</p>
      <p className="text-[#01155E] font-bold text-[17px]">Good</p>
    </div>
    <div>
      <p className="text-[#67739E] text-[15px] mb-1">Price Trends</p>
      <p className="text-[#01155E] font-bold text-[17px]">Increasing</p>
    </div>
    <div>
      <p className="text-[#67739E] text-[15px] mb-1">Price per sqft</p>
      <p className="text-[#01155E] font-bold text-[17px]">120 AED / Sq Ft</p>
    </div>
  </div>
</div>
            {/* Map Location */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[28px] font-semibold text-[#01155E]">Map Location</h2>
              <button className="bg-[#01155E] text-white px-6 py-2.5 rounded-lg text-[18px] font-semibold">Open Map</button>
            </div>
            <div className="rounded-[10px] overflow-hidden border border-[#D9E1F2] h-[380px] mb-8">
              <iframe
                title="map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%)" }}
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d185399.54539516793!2d-79.51888!3d43.6534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d68bf33a9b%3A0x15edd8c4de1c7581!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin"
              />
            </div>

            {/* Project Video */}
            <h2 className="text-[28px] font-semibold text-[#01155E] mb-5">Project Video</h2>
            <div className="relative rounded-[10px] overflow-hidden mb-10 h-[380px]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Property Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Reviews */}
           
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-[410px] flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star size={18} fill="#0e0d0d" />
                  <span className="text-[#01155E] font-semibold text-[22px]">High-Rise Townhouse</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#01155E] text-white text-[12px] px-2.5 py-1.5 rounded-[4px] font-medium">Off-Plan | Resale</span>
                  
                </div>
                <div className="flex items-center gap-2 text-[#67739E] text-[18px] mb-4">
                  <MapPin size={14} className="text-[#67739E]" />
                  <span>Southwestern, Ontario, Canada</span>
                </div>
                <hr className="border-[#D9E1F2] mb-4" />
                <div className="flex items-center gap-2 text-[#67739E] text-[18px] mb-4">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-500 to-yellow-400 flex-shrink-0" />
                  <span>Zara Builders</span>
                </div>
                <hr className="border-[#D9E1F2] mb-4" />
                <div className="flex items-center gap-2 text-[#67739E] text-[18px] mb-4">
                  <Square size={14} />
                  <span>1,200/Sq Ft</span>
                </div>
                <hr className="border-[#D9E1F2] mb-6" />
                <div className="text-[25px] font-semibold text-[#01155E] mb-4">Stating at AED <span className='text-[36px]'>10,00,239</span></div>
                <hr className="border-[#D9E1F2] mb-4" />
                <h4 className="text-[#01155E] font-semibold text-[20px] mb-4">Contact With Us Now !</h4>
                <div className="rounded-xl bg-[#F5F8FF] p-4 w-full max-w-[350px]">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={PROPERTY.agent.avatar} className="w-[56px] h-[56px] rounded-full object-cover" alt="Agent" />
                    <div>
                      <div className="font-semibold text-[#01155E] text-[18px] leading-none mb-2">{PROPERTY.agent.name}</div>
                      <div className="text-[#01155E] flex items-center gap-2 text-[18px]">
                        <Phone size={18} className="text-[#01155E]" />
                        <span>{PROPERTY.agent.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="w-[42px] h-[42px] flex items-center justify-center border border-[#01155E] rounded-[10px] bg-transparent hover:bg-white transition-colors">
                      <Phone size={18} className="text-[#01155E]" />
                    </button>
                    <button className="w-[42px] h-[42px] flex items-center justify-center border border-[#D9E1F2] rounded-[10px] bg-white hover:bg-green-50 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.571l5.9-1.548A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.939 0-3.756-.523-5.318-1.432l-.381-.226-3.499.918.934-3.408-.249-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      </svg>
                    </button>
                    <button className="flex-1 h-[42px] border border-[#01155E] text-[#01155E] rounded-[10px] font-semibold text-[18px] bg-transparent hover:bg-[#01155E] hover:text-white transition-all">
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
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold text-[18px] shadow-lg transition-colors">
                    Try It Now
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-6">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200" className="rounded-lg h-36 object-cover border-2 border-white/20" alt="p1" />
                  <img src="https://images.unsplash.com/photo-1600607687940-c52af096999c?auto=format&fit=crop&q=80&w=200" className="rounded-lg h-44 object-cover -translate-y-4 border-2 border-white/20 shadow-2xl" alt="p2" />
                  <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=200" className="rounded-lg h-36 object-cover border-2 border-white/20" alt="p3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <h2 className="text-[30px] font-semibold text-[#01155E] text-center mb-10">
            Similar Properties In Expo City
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