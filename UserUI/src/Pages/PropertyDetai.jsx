import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyMap from '../Components/Card/PropertyMap.jsx';
import { useNavigate } from "react-router-dom";
import { extractAllImages, getSafeImageUrl, getImageByIndex } from '../Components/utils/imageExtractor.jsx';
import { mapPropertyDetailData } from '../Components/utils/Propertydetailmapper.jsx';
import { sendListingEnquiry, resetEnquiryState } from "../features/Enquiery/enquirySlice.js";
import {
  fetchListingDetail,
  resetListingDetailState,
} from "../features/dashboard/listingDetailSlice.jsx";
import {
  MapPin, Bed, Bath, Square, Calendar, Hash, CheckCircle, Utensils, Baby, Camera, Thermometer, GlassWater, Store, Scissors,
  Shirt,
  Map,
  ChevronDown, ChevronUp, Play, Star, Phone, Mail, Heart,
  Share2, Maximize, Download, Wifi, Dumbbell, Car,
  ShieldCheck, Dog, Flame, Users, Waves, BanknoteArrowDown, Banknote, X, Image, ChevronLeft, ChevronRight, ArrowLeft
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

const AMENITY_MAP = {
  bbq: { label: "BBQ Area", icon: "bbq" },
  bbqarea: { label: "BBQ Area", icon: "bbq" },
  pool: { label: "Pool", icon: "pool" },
  swimmingpool: { label: "Pool", icon: "pool" },
  gym: { label: "Gym", icon: "gym" },
  fitnesscenter: { label: "Gym", icon: "gym" },
  pet: { label: "Pet-friendly", icon: "pet" },
  kids: { label: "Kids' Area", icon: "kids" },
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

function GalleryModal({ images, onClose, agentAvatar, latlong, coordinates, title }) {
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedIndex, setSelectedIndex] = useState(null); // null = grid view, number = single image view

  const openImage = (i) => setSelectedIndex(i);
  const backToGrid = () => setSelectedIndex(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-[1100px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">

        <div className="flex items-center border-b border-[#D9E1F2] px-6 py-0 relative">
          {selectedIndex !== null && activeTab === "photos" && (
            <button
              onClick={backToGrid}
              className="flex items-center gap-2 px-4 py-4 text-[15px] font-semibold text-[#01155E] hover:text-[#254B86] transition-colors"
            >
              <ArrowLeft size={18} />
              Back to gallery
            </button>
          )}

          <button
            onClick={() => setActiveTab("photos")}
            className={`flex items-center gap-2 px-6 py-4 text-[18px] font-semibold border-b-2 transition-colors ${activeTab === "photos"
              ? "border-[#01155E] text-[#01155E]"
              : "border-transparent text-[#67739E] hover:text-[#01155E]"
              }`}
          >
            <Image size={18} />
            Photos ({images?.length || 0})
          </button>
          <button
            onClick={() => { setActiveTab("map"); setSelectedIndex(null); }}
            className={`flex items-center gap-2 px-6 py-4 text-[18px] font-semibold border-b-2 transition-colors ${activeTab === "map"
              ? "border-[#01155E] text-[#01155E]"
              : "border-transparent text-[#67739E] hover:text-[#01155E]"
              }`}
          >
            <MapPin size={18} />
            Map
          </button>

          <button
            onClick={onClose}
            className="absolute right-4 top-3 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#67739E] hover:text-[#01155E]"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto relative">
          {activeTab === "photos" ? (
            selectedIndex === null ? (
              <div className="p-4 grid grid-cols-2 gap-3">
                {images?.map((src, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-[10px] h-[260px] cursor-pointer"
                    onClick={() => openImage(i)}
                  >
                    <img
                      src={getSafeImageUrl(src)}
                      alt={`Property ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative bg-black flex items-center justify-center h-full min-h-[500px]">
                <button
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
                >
                  <ChevronLeft size={22} />
                </button>

                <img
                  src={getSafeImageUrl(images[selectedIndex])}
                  alt={`Property ${selectedIndex + 1}`}
                  className="max-h-[70vh] max-w-[90%] object-contain rounded-md"
                />

                <button
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
                >
                  <ChevronRight size={22} />
                </button>

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-[14px] bg-black/50 px-3 py-1 rounded-full">
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>
            )
          ) : (
            <div className="flex-1 overflow-y-auto">
              <PropertyMap
                latlong={latlong}
                coordinates={coordinates}
                title={title}
              />
            </div>
          )}
        </div>

        <div className="border-t border-[#D9E1F2] px-6 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <img src={getSafeImageUrl(agentAvatar)} alt="Agent" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="text-[13px] text-[#67739E]">Listing by</p>
              {/* <p className="text-[#01155E] font-semibold text-[15px]">{agentName}</p> */}
              <p className="text-[#01155E] font-semibold text-[15px]">Divyansh Chitkara</p>
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

export default function PropertyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { listing, loading } = useSelector(
    (state) => state.listingDetail
  );

  // Enquiry redux state — top-level hook, NOT inside any function
  const { loading: enquiryLoading, success: enquirySuccess, error: enquiryError } = useSelector(
    (state) => state.enquiry
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchListingDetail(Number(id)));
    }

    return () => {
      dispatch(resetListingDetailState());
    };
  }, [dispatch, id]);

  const rawListing = listing || {};
  const PROPERTY = mapPropertyDetailData(rawListing);

  const imageData = extractAllImages(rawListing);
  const images = imageData.allImages;
  const featureImage = imageData.featureImage;
  const totalImages = imageData.totalImages;

  const [floorPlan1Open, setFloorPlan1Open] = useState(true);
  const [floorPlan2Open, setFloorPlan2Open] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [popupType, setPopupType] = useState(null);
  // brochure | availability
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

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
    community = {},
  } = PROPERTY;

  const OFFPLAN_STATUSES = [
    "announced",
    "eoi",
    "startofsales",
    "onsale",
    "outofstock",
  ];

 const getDisplayStatus = (status) => {
    if (!status) return "—";

    const key = status.toLowerCase().replace(/\s+/g, "");

    return OFFPLAN_STATUSES.includes(key) ? "Off Plan" : status;
  };

  const isOffPlan = completionStatus
    ? OFFPLAN_STATUSES.includes(
        completionStatus.toLowerCase().replace(/\s+/g, "")
      )
    : false;

  const developerImage =
    PROPERTY?.developer_image || rawListing?.developer_image;
  const [showFullDesc, setShowFullDesc] = useState(false);
  const shortDescription = description?.slice(0, 300);

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

  const formatPrice = (val, cur = currency) =>
    val ? `${cur} ${Number(val).toLocaleString()}` : "—";

  const paymentSteps =
    paymentPlan?.steps?.length > 0
      ? paymentPlan.steps.map((s) => ({ label: s.label, value: `${s.percent}%` }))
      : [
        { label: "On Booking", value: "20%" },
        { label: "During Construction", value: "40%" },
        { label: "Upon Handover", value: "40%" },
      ];

  const propertyInfoRows = [
    {
      label: "Built-up Area",
      value: builtUpArea
        ? `${builtUpArea} Sq Ft`
        : rawListing?.area_start
          ? `${rawListing.area_start} Sq Ft`
          : "—",
    },
    {
      label: "Total Building Area",
      value: totalBuildingArea
        ? `${totalBuildingArea} Sq Ft`
        : rawListing?.area_end
          ? `${rawListing.area_end} Sq Ft`
          : "—",
    },
    {
      label: "Property ID",
      value: referenceNo || rawListing?.id || "—",
    },
    {
      label: "Year Built",
      value:
        yearBuilt ||
        new Date(rawListing?.created_at).getFullYear() ||
        "—",
    },
    {
      label: "Ownership",
      value: ownership || "Freehold",
    },
    {
      label: "Rooms",
      value: rooms || bedrooms || "—",
    },
    {
      label: "Handover",
      value:
        handoverDate ||
        rawListing?.expected_completion_date?.slice(0, 4) ||
        "—",
    },
    {
      label: "Listing Date",
      value: rawListing?.created_at
        ? new Date(rawListing.created_at).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
        : "—",
    },
    {
      label: "Furnishing",
      value: furnishing || "Furnished",
    },
    {
      label: "Property Status",
      value:
        propertyStatus ||
        rawListing?.project_status ||
        "Vacant",
    },
   {
  label: "Service Charges",
  value: serviceCharges?.value
    ? `AED ${serviceCharges.value} / Sq Ft`
    : "—",
}
  ];

  const overviewStats = [
    { icon: <Bed size={24} className="text-[#67739E]" />, val: overview?.bedrooms ?? bedrooms ?? "—", label: "Bedrooms" },
    { icon: <Bath size={24} className="text-[#67739E]" />, val: overview?.bathrooms ?? bathrooms ?? "—", label: "Bathrooms" },
    { icon: <Car size={24} className="text-[#67739E]" />, val: overview?.garage ?? garage ?? "—", label: "Parking" },
    { icon: <Calendar size={24} className="text-[#67739E]" />, val: overview?.yearBuilt ?? yearBuilt ?? "—", label: "Year Built" },
    { icon: <Square size={24} className="text-[#67739E]" />, val: overview?.areaSize ?? (builtUpArea ? `${builtUpArea} Sq Ft` : "—"), label: "Area Size" },
  ];

  const unitTypesList =
    unitTypes?.length > 0
      ? unitTypes.map((u) => ({
        type: u.bedrooms || u.type || "—",
        sqft: u.sqFt ? `${u.sqFt} Sq Ft` : u.sqft || "—",
        price: formatPrice(u.startingPrice || u.price),
      }))
      : [];

  const floorPlansList = floorPlans?.length > 0 ? floorPlans : [];

  const rawData = amenities?.length > 0 ? amenities : (features || []);

  const amenitiesList = rawData.map((item) => {
    const key = typeof item === "string"
      ? item.toLowerCase().replace(/\s+/g, "")
      : "";

    return AMENITY_MAP[key] || {
      label: item,
      icon: "default"
    };
  });

  const buildingInfoRow1 = [
    { label: "Building Name", value: buildingInfo?.buildingName || projectInfo?.name || "—" },
    { label: "Year of Completion", value: buildingInfo?.yearOfCompletion || projectInfo?.completion || yearBuilt || "—" },
    { label: "Total Floors", value: buildingInfo?.totalFloors ?? "—" },
    { label: "Swimming Pools", value: buildingInfo?.swimmingPools || "—" },
  ];
  const buildingInfoRow2 = [
    { label: "Total Parking Spaces", value: buildingInfo?.totalParkingSpaces ?? "—" },
   {
  label: "Total Building Area",
  value:
    buildingInfo?.totalBuildingArea &&
    buildingInfo.totalBuildingArea !== "—" &&
    buildingInfo.totalBuildingArea !== "-"
      ? `${buildingInfo.totalBuildingArea} Sq Ft`
      : totalBuildingArea &&
        totalBuildingArea !== "—" &&
        totalBuildingArea !== "-"
      ? `${totalBuildingArea} Sq Ft`
      : "—",
},
    { label: "Elevators", value: buildingInfo?.elevators || "—" },
  ];

  const youtubeEmbed = youtubeVideoId
    ? `https://www.youtube.com/embed/${youtubeVideoId}`
    : null;

  const parseLatLong = (latlong) => {
    if (!latlong) return null;

    const [lat, lng] = latlong.split(",").map(Number);

    if (isNaN(lat) || isNaN(lng)) return null;

    return {
      type: "Point",
      coordinates: [lng, lat], // correct order
    };
  };

  // Single, clean handleSubmit — handles both "brochure" and "availability" popups
 const handleSubmit = async () => {
  if (!name || !email || !phone) return;

  const result = await dispatch(
    sendListingEnquiry({
      listingId: rawListing?._id,
      name,
      email,
      phone,
      requestType: popupType,
    })
  );

  if (sendListingEnquiry.fulfilled.match(result)) {
    if (popupType === "brochure" && brochureUrl) {
      window.open(brochureUrl, "_blank");
    }

    setName("");
    setEmail("");
    setPhone("");
    setPopupType(null);
    dispatch(resetEnquiryState());
  }
};

  return (
    <div className="bg-white min-h-screen mt-25">
      {showGallery && (
        <GalleryModal
          images={images}
          onClose={() => setShowGallery(false)}
          agentAvatar={agent?.profileImage}
          latlong={rawListing?.latlong}
          coordinates={location?.coordinates}
          title={title}
        />
      )}

      <Breadcrumbs />
      <div className="max-w-[1290px] mx-auto pt-10 pb-20">

        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 pr-0">
            <h1 className="text-[48px] font-[Archivo] font-semibold text-[#01155E] leading-tight mb-3 capitalize">
              {title || "—"}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="bg-[#01155E] text-white text-[13px] font-medium px-3 py-1.5 rounded-md uppercase">
                {[getDisplayStatus(completionStatus), "initial sale"]
                  .filter(Boolean)
                  .join(" | ") || "—"}
              </span>

              <div className="flex items-center gap-2 text-[#67739E] text-[16px] font-medium capitalize">
                <img
                  src={Appartmentimage}
                  alt="type"
                  className="w-5 h-5 object-contain capitalize"
                />
                <span>{PROPERTY?.types || "—"}</span>
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

              <div className="border-l border-[#D9E1F2] h-5" />

              <div className="flex items-center gap-2">
                {developerImage ? (
                  <img
                    src={getSafeImageUrl(developerImage)}
                    alt="developer"
                    className="w-6 h-6 object-contain rounded-full border border-gray-200"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-200" />
                )}

                <span>
                  {developer || builder || projectInfo?.developer || "—"}
                </span>
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
              <span className="text-[18px] font-semibold text-[#01155E]">
                Starting at
              </span>
              <span className="text-[28px] font-semibold text-[#01155E] uppercase">
                AED {PROPERTY?.price_start ? Number(PROPERTY.price_start).toLocaleString() : "—"}
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

        <div className="grid grid-cols-12 gap-[10px] h-[520px] mb-12">
          <div className="col-span-7 relative h-full">
            <img
              src={getSafeImageUrl(featureImage)}
              className="w-full h-[521px]  rounded-[6px]"
              alt="Main"
            />

            <span className="absolute top-3 left-3 bg-white text-[#01155E] text-[13px] font-medium px-3 py-1.5 rounded-md shadow-sm uppercase">
              {getDisplayStatus(completionStatus)}
            </span>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>
          <div className="col-span-5 grid grid-cols-2 gap-[10px] h-full">
            <img src={getSafeImageUrl(getImageByIndex(images, 1))} className="w-full h-[255px] object-cover rounded-[6px]" alt="s1" />
            <div className="relative h-[255px]">
              <img src={getSafeImageUrl(getImageByIndex(images, 2))} className="w-full h-full object-cover rounded-[6px]" alt="s2" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-[170px] h-[52px] bg-[#254B86]/50 backdrop-blur-[30px] border border-white/20 rounded-[10px] text-white font-semibold text-[18px] hover:bg-[#254B86]/70 transition-all">
                  View On Map
                </button>
              </div>
            </div>
            <img src={getSafeImageUrl(getImageByIndex(images, 3))} className="w-full h-[255px] object-cover rounded-[6px]" alt="s3" />

            <div
              className="relative h-[255px] overflow-hidden rounded-[6px] cursor-pointer"
              onClick={() => setShowGallery(true)}
            >
              <img src={getSafeImageUrl(getImageByIndex(images, 4))} className="w-full h-full object-cover" alt="s4" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                <div className="flex flex-col items-center gap-1 text-white">
                  <div className="flex items-center gap-1.5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <span className="text-[22px] font-semibold">{totalImages}</span>
                  </div>
                  <span className="text-[13px] font-medium opacity-90">View All Photos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[30px]">
          <div className="flex-1 min-w-0">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-[26px] font-semibold text-[#01155E]">Overview</h2>
              <button
                onClick={() => setPopupType("brochure")}
                className="flex items-center gap-2 bg-[#01155E] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold"
              >
                <Download size={16} />
                Download Brochure
              </button>
            </div>

            <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-8 mb-8">
              <div className="flex justify-between items-center pb-6 border-b border-[#D9E1F2] mb-8">
                {overviewStats.map((item, i) => (
                  <div key={i} className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-[24px] font-semibold text-[#01155E]">{item.val}</span>
                    </div>
                    <span className="text-[#67739E] text-[15px]">{item.label}</span>
                  </div>
                ))}
              </div>

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

              <p className="text-[#67739E] text-[18px] leading-relaxed">
                <span
                  dangerouslySetInnerHTML={{
                    __html: showFullDesc
                      ? description
                      : description?.slice(0, 300),
                  }}
                />

                {description?.length > 300 && (
                  <span
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="text-[#01155E] font-semibold cursor-pointer ml-1"
                  >
                    {showFullDesc ? " Read Less" : "... Read More"}
                  </span>
                )}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-[26px] font-[600] text-[#01155E] mb-6">Regulatory Information</h3>
              <div className="flex gap-6">
                {!isOffPlan && (
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
                )}

                <div className={`${isOffPlan ? "w-full" : "w-[280px]"} border border-[#D9E1F2] rounded-[10px] flex items-center justify-center p-6`}>
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

           <h2 className="text-[28px] font-semibold text-[#01155E] mb-7">Unit Types</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
  {unitTypesList.map((unit, i) => (
    <div key={i} className="bg-[#F5F8FF] border border-[#D9E1F2] rounded-[15px] p-8 flex flex-col gap-6">
     <h3 className="text-[#01155E] font-semibold text-[24px]">
  {unit.type === 0 || unit.type === "0"
    ? "Studio"
    : unit.type === 1 || unit.type === "1"
    ? "1 Bedroom"
    : `${unit.type} Bedrooms`}
</h3>
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
      <button
        onClick={() => setPopupType("availability")}
        className="w-fit border border-[#01155E] bg-transparent text-[#01155E] font-semibold px-8 py-4 rounded-xl text-[18px] hover:bg-[#01155E] hover:text-white transition-all"
      >
        Check Availability
      </button>
    </div>
  ))}
</div>

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
                        <Banknote size={12} className="text-[#01155E]" />
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

            <div className="flex justify-between items-center mb-7.5">
              <div>
                <h2 className="text-[28px] font-semibold text-[#01155E]">Community</h2>
                <p className="text-[#67739E] font-semibold text-[24px]">
                  {community?.title || location?.community || "—"}
                </p>
              </div>
              <button
                onClick={() => {
                  if (community?.slug) {
                    navigate(`/communities/${community.slug}`);
                  }
                }}
                className="bg-[#01155E] text-white px-6 py-2.5 rounded-lg text-[18px] font-semibold"
              >
                Explore Community
              </button>
            </div>

            <div className="rounded-[10px] overflow-hidden border border-[#D9E1F2] w-[850px] h-[395px] mb-8">
              <img
                src={getSafeImageUrl(
                  community?.marketSupply?.image ||
                  location?.communityImage ||
                  propertycommunity
                )}
                className="w-full h-full object-cover"
                alt="Community"
              />
            </div>

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
                latlong={rawListing?.latlong}
                coordinates={location?.coordinates}
                title={title}
              />
            </div>

            {youtubeEmbed && (
              <>
                <h2 className="text-[28px] font-semibold text-[#01155E] mb-10 mt-10">
                  Project Video
                </h2>

                <div className="relative rounded-[10px] overflow-hidden mb-10 h-[380px]">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videos[0]}`}
                    title="Property Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </>
            )}

          </div>

          <div className="w-[410px] flex-shrink-0">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-6">

                <div className="flex items-start gap-2 mb-4">
  <Star
    size={18}
    fill="#0e0d0d"
    className="mt-1 flex-shrink-0"
  />
  <span className="text-[#01155E] font-semibold text-[22px] capitalize leading-[1.3]">
    {title || "—"}
  </span>
</div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#01155E] text-white text-[12px] px-2.5 py-1.5 rounded-[4px] font-medium uppercase">
                    {getDisplayStatus(completionStatus)}
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
                  {(PROPERTY?.developer_image || rawListing?.developer_image) ? (
                    <img
                      src={getSafeImageUrl(
                        PROPERTY?.developer_image || rawListing?.developer_image
                      )}
                      alt="developer"
                      className="w-5 h-5 object-contain rounded-full border border-gray-200"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gray-200" />
                  )}

                  <span>
                    {developer || builder || projectInfo?.developer || "—"}
                  </span>
                </div>

                <hr className="border-[#D9E1F2] mb-4" />

                <div className="flex items-center gap-2 text-[#67739E] text-[18px] mb-4">
                  <Square size={14} />
                  <span>{builtUpArea ? `${builtUpArea} Sq Ft` : sqft || "—"}</span>
                </div>

                <hr className="border-[#D9E1F2] mb-6" />

                <div className="text-[20px] font-semibold text-[#01155E] mb-4">
                  Starting at  {currency}
                  <span className="text-[36px] ml-2">
                    {price ? Number(price).toLocaleString() : "—"}
                  </span>
                </div>

                <hr className="border-[#D9E1F2] mb-4" />

                <h4 className="text-[#01155E] font-semibold text-[20px] mb-4">Contact With Us Now !</h4>

                <div className="rounded-xl bg-[#F5F8FF] p-4 w-full max-w-[350px]">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={getSafeImageUrl(agent?.profileImage)}
                      className="w-[56px] h-[56px] rounded-full object-cover"
                      alt="Agent"
                    />
                    <div>
                      {/* <div className="font-semibold text-[#01155E] text-[18px] leading-none mb-2">
                        {agent?.name || "—"}
                      </div> */}
                        <div className="font-semibold text-[#01155E] text-[18px] leading-none mb-2">
                      Divyansh Chitkara
                      </div>
                      <div className="text-[#01155E] flex items-center gap-2 text-[18px]">
                        <Phone size={18} />
                        <span>{'+91 99999 95871'}</span>
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
            </div>
          </div>
        </div>

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

      {popupType && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPopupType(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-[#01155E] mb-2">
              {popupType === "brochure"
                ? "Download Brochure"
                : "Check Availability"}
            </h3>

            <p className="text-[#67739E] text-sm mb-6">
              Enter your details to receive {popupType === "brochure" ? "the brochure" : "availability info"}.
            </p>

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-[#D9E1F2] rounded-lg mb-4"
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#D9E1F2] rounded-lg mb-4"
            />
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-[#D9E1F2] rounded-lg mb-4"
            />

            {enquiryError && (
              <p className="text-red-500 text-sm mb-3">{enquiryError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={enquiryLoading}
              className="w-full bg-[#01155E] text-white py-3 rounded-lg disabled:opacity-50"
            >
              {enquiryLoading ? "Submitting..." : "Submit"}
            </button>

          </div>
        </div>
      )}

      <div className="max-w-[1290px] mx-auto mt-12 mb-22 px-4">
        <div className="border-t border-gray-200 pt-6">
          <p className="text-[#67739E] font-normal text-[16px] leading-relaxed ">
            Property information, pricing, availability, specifications, and
            project details presented on this page are provided for general
            informational purposes only. Such information may change without
            notice and should be independently verified with the relevant
            developer or licensed brokerage before making any property-related
            decision.
          </p>
        </div>
      </div>
    </div>
  );
}