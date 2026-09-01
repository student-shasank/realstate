import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PropertyMap from '../Components/Card/PropertyMap.jsx';
import { useNavigate } from "react-router-dom";
import { extractAllImages, getSafeImageUrl, getImageByIndex } from '../Components/utils/imageExtractor.jsx';
import { mapPropertyDetailData } from '../Components/utils/Propertydetailmapper.jsx';
import { sendListingEnquiry, resetEnquiryState } from "../features/Enquiery/enquirySlice.js";
import { toast } from 'react-toastify';
import { fetchSimilarListings, resetSimilarListingsState } from "../features/dashboard/similarPropertiesSlice.jsx";

import {
  fetchListingDetail,
  resetListingDetailState,
} from "../features/dashboard/listingDetailSlice.jsx";
import {
  addFavoriteLocal,
  removeFavoriteLocal,
  toggleFavorite,
} from "../features/dashboard/favoriteligting/favoriteSlice.jsx";
import {
  MapPin, Bed, Bath, Square, Calendar, Hash, CheckCircle, Utensils, Baby, Camera, Thermometer, GlassWater, Store, Scissors,
  Shirt,
  Map,
  ChevronDown, ChevronUp, Play, Star, Phone, Mail, Heart,
  Share2, Maximize, Download, Wifi, Dumbbell, Car,
  ShieldCheck, Dog, Flame, Users, Waves, BanknoteArrowDown, Banknote, X, Image, ChevronLeft, ChevronRight, ArrowLeft, BadgeCheck,
  ShirtIcon
} from 'lucide-react';
import Appartmentimage from "../assets/Appartment.png"
import floorplan1 from "../assets/floorplan.png"
import propertycommunity from "../assets/propertydetailcommunity.jpg"
import Breadcrumbs from '../Components/Card/Breadcrumbs';
import Broker from '../assets/brocker.jpeg';
import LoginPopup from "../Pages/LoginPopup.jsx";
import SignupPopup from "../Pages/SignupPopup.jsx";

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
    default: return <BadgeCheck size={22} className="text-slate-400" />;
  }
};

function ReviewCard({ agentAvatar }) {
  return (
    <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-4 sm:p-6 flex-1">
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

function GalleryModal({
  images,
  onClose,
  agentAvatar,
  latlong,
  coordinates,
  title,
  onEmailClick,
  onCallClick,
  onWhatsAppClick,
  isEmailSending,
}) {
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 🆕 Body scroll lock jab tak modal khula hai — page ka apna
  // scrollbar nahi aayega, jo layout shift/hide issue create karta tha.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white rounded-none sm:rounded-2xl w-full h-full sm:h-auto max-w-full sm:max-w-[1100px] max-h-full sm:max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">

        {/* 🔧 FIX: header ab ek flex row hai — LEFT side (tabs) scroll
            karta hai chhoti screens par, RIGHT side (close button) kabhi
            scroll/overflow ke saath nahi hilta, hamesha visible rehta hai. */}
        <div className="flex items-center justify-between border-b border-[#D9E1F2] pr-2 sm:pr-4">
          <div className="flex items-center px-3 sm:px-6 py-0 overflow-x-auto min-w-0">
            {selectedIndex !== null && activeTab === "photos" && (
              <button
                onClick={backToGrid}
                className="flex items-center gap-2 px-2 sm:px-4 py-3 sm:py-4 text-[13px] sm:text-[15px] font-semibold text-[#01155E] hover:text-[#254B86] transition-colors whitespace-nowrap flex-shrink-0"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">Back to gallery</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 text-[14px] sm:text-[18px] font-semibold border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === "photos"
                ? "border-[#01155E] text-[#01155E]"
                : "border-transparent text-[#67739E] hover:text-[#01155E]"
                }`}
            >
              <Image size={18} />
              Photos ({images?.length || 0})
            </button>
            <button
              onClick={() => { setActiveTab("map"); setSelectedIndex(null); }}
              className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 text-[14px] sm:text-[18px] font-semibold border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === "map"
                ? "border-[#01155E] text-[#01155E]"
                : "border-transparent text-[#67739E] hover:text-[#01155E]"
                }`}
            >
              <MapPin size={18} />
              Map
            </button>
          </div>

          {/* 🆕 close button ab apna alag, non-scrolling flex item hai */}
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[#67739E] hover:text-[#01155E]"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto relative">
          {activeTab === "photos" ? (
            selectedIndex === null ? (
              <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {images?.map((src, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-[10px] h-[220px] sm:h-[260px] cursor-pointer"
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
              <div className="relative bg-black flex items-center justify-center h-full min-h-[320px] sm:min-h-[500px]">
                <button
                  onClick={showPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
                >
                  <ChevronLeft size={22} />
                </button>

                <img
                  src={getSafeImageUrl(images[selectedIndex])}
                  alt={`Property ${selectedIndex + 1}`}
                  className="max-h-[60vh] sm:max-h-[70vh] max-w-[85%] sm:max-w-[90%] object-contain rounded-md"
                />

                <button
                  onClick={showNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
                >
                  <ChevronRight size={22} />
                </button>

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-[13px] sm:text-[14px] bg-black/50 px-3 py-1 rounded-full">
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

        <div className="border-t border-[#D9E1F2] px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-center sm:justify-end bg-white">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end w-full sm:w-auto">
            <button
              onClick={onCallClick}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 border border-[#D9E1F2] rounded-lg text-[#01155E] font-semibold text-[13px] sm:text-[15px] hover:bg-gray-50 transition-colors"
            >
              <Phone size={16} /> Call
            </button>
            <button
              onClick={onEmailClick}
              disabled={isEmailSending}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 border border-[#D9E1F2] rounded-lg text-[#01155E] font-semibold text-[13px] sm:text-[15px] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Mail size={16} /> {isEmailSending ? "Sending..." : "Email"}
            </button>

            <button
              onClick={onWhatsAppClick}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 border border-[#D9E1F2] rounded-lg text-[#25D366] font-semibold text-[13px] sm:text-[15px] hover:bg-green-50 transition-colors"
            >
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


// ============================================================
// 🆕 SimilarPropertyCard — each card gets its OWN image carousel
// (hover-triggered prev/next arrows + dot indicators), matching
// the pattern used on the map/search cards. No extra libraries —
// pure React state per card, so cards don't interfere with each
// other's image index.
// ============================================================
function SimilarPropertyCard({
  item,
  getDisplayStatus,
  getBedroomsDisplay,
  navigate,
}) {
  const dispatch = useDispatch();

  const mappedItem = mapPropertyDetailData(item);
  const itemImages = extractAllImages(item);

  const galleryImages =
    itemImages.allImages?.length > 0
      ? itemImages.allImages
      : [itemImages.featureImage];

  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Favorite / like functionality — same pattern as ListingCard
  const itemId = item?._id || item?.id;
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const isFavorite = favorites.includes(itemId);

  const handleFavorite = (e) => {
    e.stopPropagation();

    if (!itemId) return;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isFavorite) {
      dispatch(removeFavoriteLocal(itemId));
    } else {
      dispatch(addFavoriteLocal(itemId));
    }

    dispatch(toggleFavorite(itemId));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleDot = (e, i) => {
    e.stopPropagation();
    setCurrentImg(i);
  };

  return (
    <div
      onClick={() => navigate(`/listing/${item._id}`)}
      className="bg-white border border-[#D9E1F2] rounded-[10px] overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-[0_12px_28px_rgba(1,21,94,0.16)] hover:-translate-y-1"
    >
      <div
        className="relative h-[200px] sm:h-[220px] lg:h-[240px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImg(0);
        }}
      >
        <img
          src={getSafeImageUrl(galleryImages[currentImg])}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={mappedItem.title}
        />

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 bg-[#01155E]/80 backdrop-blur-md text-white text-[11px] sm:text-[12px] px-2.5 sm:px-3 py-1 rounded z-10">
          {getDisplayStatus(mappedItem.completionStatus)}
        </div>

        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10 hover:bg-gray-50 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={16}
            fill={isFavorite ? "#01155E" : "none"}
            className="text-[#01155E]"
          />
        </button>

        {isHovered && galleryImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/85 rounded-full flex items-center justify-center hover:bg-white shadow-sm z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="text-[#01155E]" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/85 rounded-full flex items-center justify-center hover:bg-white shadow-sm z-10"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="text-[#01155E]" />
            </button>
          </>
        )}

        {galleryImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {galleryImages.slice(0, 6).map((_, i) => (
              <button
                key={i}
                onClick={(e) => handleDot(e, i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === currentImg ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold text-[#01155E] mb-2 capitalize truncate">
          {mappedItem.title || "—"}
        </h3>
        <div className="flex items-center text-[#67739E] text-[14px] sm:text-[15px] lg:text-[16px] mb-4 truncate">
          <MapPin size={14} className="mr-1 text-[#01155E] flex-shrink-0" />
          <span className="truncate">
            {[mappedItem.location?.address, mappedItem.location?.country]
              .filter(Boolean)
              .join(", ") ||
              item.project_location ||
              item.location ||
              "—"}
          </span>
        </div>
        <div className="flex justify-between border-y border-[#D9E1F2] py-3 mb-4">
          <div className="flex items-center gap-1.5 text-[#01155E] font-semibold text-[14px] sm:text-[15px] lg:text-[16px]">
            <Bed size={16} /> {getBedroomsDisplay(mappedItem.bedrooms) || item.beds || "—"}
          </div>
          <div className="flex items-center gap-1.5 text-[#01155E] font-semibold text-[14px] sm:text-[15px] lg:text-[16px]">
            <Bath size={16} /> {mappedItem.bathrooms ?? item.baths ?? "—"}
          </div>
          <div className="flex items-center gap-1.5 text-[#01155E] font-semibold text-[14px] sm:text-[15px] lg:text-[16px]">
            <Square size={16} />{" "}
            {mappedItem.builtUpArea
              ? `${mappedItem.builtUpArea} Sq Ft`
              : item.area_start
              ? `${item.area_start} Sq Ft`
              : "—"}
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="text-[19px] sm:text-[20px] lg:text-[22px] font-semibold text-[#01155E]">
            {mappedItem.price_start || item.price_start
              ? `AED ${Number(
                  mappedItem.price_start || item.price_start
                ).toLocaleString()}`
              : "Price on request"}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/listing/${item._id}`);
            }}
            className="border border-[#D9E1F2] px-4 py-2 rounded-lg font-semibold text-[#01155E] text-[13px] hover:bg-[#01155E] hover:text-white transition-all"
          >
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 🆕 SimilarPropertiesCarousel — professional horizontal
// scroll-snap carousel (prev/next arrow buttons that fade
// out at the ends, smooth scroll). No external carousel
// library required. Renders 1 card on mobile scaling up to a
// partial 4th-card "peek" on wide screens, matching the pattern
// used on real estate sites like Bayut/Property Finder.
// ============================================================
function SimilarPropertiesCarousel({ listings, getDisplayStatus, getBedroomsDisplay, navigate }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [listings]);

  const scrollByDirection = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-similar-card]");
    const cardWidth = card ? card.getBoundingClientRect().width : 380;
    el.scrollBy({ left: direction * (cardWidth + 24), behavior: "smooth" });
  };

  if (!listings || listings.length === 0) return null;

  return (
    <div className="relative">
      <style>{`
        .similar-carousel-track::-webkit-scrollbar { display: none; }
        .similar-carousel-track { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="similar-carousel-track flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-4 sm:px-0 -mx-4 sm:mx-0"
      >
        {listings.map((item) => (
          <div
            key={item._id}
            data-similar-card
            className="snap-start shrink-0 w-[85vw] xs:w-[300px] sm:w-[360px] lg:w-[380px]"
          >
            <SimilarPropertyCard
              item={item}
              getDisplayStatus={getDisplayStatus}
              getBedroomsDisplay={getBedroomsDisplay}
              navigate={navigate}
            />
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={() => scrollByDirection(-1)}
          className="hidden sm:flex absolute -left-5 top-[42%] -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white text-[#01155E] shadow-[0_4px_16px_rgba(1,21,94,0.25)] hover:bg-[#01155E] hover:text-white transition-all z-20"
          aria-label="Previous properties"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scrollByDirection(1)}
          className="hidden sm:flex absolute -right-5 top-[42%] -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white text-[#01155E] shadow-[0_4px_16px_rgba(1,21,94,0.25)] hover:bg-[#01155E] hover:text-white transition-all z-20"
          aria-label="Next properties"
        >
          <ChevronRight size={22} />
        </button>
      )}
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

  // Similar listings redux state — top-level hook, NOT inside any function
  const { listings: similarListings, status: similarStatus } = useSelector(
    (state) => state.similarListings
  );
  const similarLoading = similarStatus === "loading";

  useEffect(() => {
  if (id) {
    dispatch(fetchListingDetail(id)); // MongoDB _id string hai, Number() mat lagao
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

  // Call / Contact Us popup + Email(Connect) sending state — same pattern as ListingCard
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
const [isSignupOpen, setIsSignupOpen] = useState(false);

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
const getBedroomsDisplay = (val) => {
  if (val === null || val === undefined || val === "") return "—";

  const values = String(val)
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v !== "");

  if (values.length === 0) return "—";

  return values
    .map((v) => (v === "0" ? "Studio" : v))
    .join(", ");
};
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

  // Contact details / login check — same pattern as ListingCard
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const currentId = rawListing?._id || rawListing?.id;

  // Favorite / like functionality — same pattern as ListingCard
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const isFavorite = favorites.includes(currentId);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();

    if (!currentId) return;

    if (!isLoggedIn) {
      setIsLoginOpen(true); 
      return;
    }

    if (isFavorite) {
      dispatch(removeFavoriteLocal(currentId));
    } else {
      dispatch(addFavoriteLocal(currentId));
    }

    dispatch(toggleFavorite(currentId));
  };

  const agentName = agent?.name || rawListing?.agent_name || rawListing?.agentName || "Divyansh Chitkara";

  // Primary agent phone
  const agentPhoneRaw = "+971 505 773767";
  const agentPhoneDial = agentPhoneRaw.replace(/[^\d+]/g, "");

  // Secondary agent phone
  const agentPhoneRaw2 = "+1 437 328 8508";
  const agentPhoneDial2 = agentPhoneRaw2.replace(/[^\d+]/g, "");

  const agencyName = developer || rawListing?.developer_name || rawListing?.agency_name || "N/A";

  // Same behavior as ListingCard's handleCallClick
  const handleCallClick = () => {
    setIsCallPopupOpen(true);
  };

  // Same behavior as ListingCard's handleWhatsAppClick
  const handleWhatsAppClick = () => {
  const whatsappNumber = agentPhoneDial.replace(/^\+/, '');

  if (!whatsappNumber) {
    toast.error("Contact number not available");
    return;
  }

 const listingUrl = rawListing?._id
  ? `${window.location.origin}/listing/${rawListing._id}`
  : window.location.href;

  const message =
    `Hi Divyansh,\n\n` +
    `I'm reaching out regarding the following property on Yupland.\n\n` +
    `Project: ${title || 'N/A'}\n` +
    `Developer: ${developer || 'N/A'}\n\n` +
    `Listing ID: ${currentId || 'N/A'}\n` +
    `Listing: ${listingUrl}\n\n` +
    `I look forward to discussing this property with you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};
  // Same behavior as ListingCard's handleConnect
  const handleEmailClick = async () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return;
    }

    if (!rawListing?._id) {
      toast.error("Something went wrong, please refresh and try again");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    if (!storedUser?.firstName || !storedUser?.email) {
      toast.error("Please complete your profile (name, email) before connecting");
      return;
    }

    setIsEmailSending(true);

    try {
      await dispatch(
        sendListingEnquiry({
          listingId: rawListing._id,
          name: storedUser.firstName,
          email: storedUser.email,
          phone: storedUser.phone || "-",
          requestType: "availability",
        })
      ).unwrap();
      toast.success("Enquiry sent ✅");
    } catch (err) {
      toast.error(err || "Something went wrong");
    } finally {
      setIsEmailSending(false);
      dispatch(resetEnquiryState());
    }
  };

  // Fetch similar listings once we know the current property's location
  // Community/City directly rawListing se nikalo — mapper pe depend nahi karte
  // taaki agar mapper mein location.community/city set nahi ho raha ho tab bhi fetch chale.
  const communityForSimilar =
    rawListing?.district_data?.[0]?.name || location?.community;
  const cityForSimilar =
    rawListing?.city_data?.name || rawListing?.project_city || location?.city;

  useEffect(() => {
    if (communityForSimilar || cityForSimilar) {
      dispatch(
        fetchSimilarListings({
          community: communityForSimilar,
          city: cityForSimilar,
          excludeId: rawListing?._id,
        })
      );
    }

    return () => {
      dispatch(resetSimilarListingsState());
    };
  }, [dispatch, communityForSimilar, cityForSimilar, rawListing?._id]);

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
{ icon: <Bed size={24} className="text-[#67739E]" />, val: getBedroomsDisplay(overview?.bedrooms ?? bedrooms), label: "Bedrooms" },
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

  // 🔧 NEW: derived flag — true only if at least one real investment-insight
  // value came back from the API. Used to hide the whole "Investment
  // Insights" block instead of always rendering it with "—" placeholders.
  const hasInvestmentInsights = Boolean(
    investmentInsights?.rentalYield ||
    investmentInsights?.priceTrend ||
    investmentInsights?.pricePerSqFt
  );

  // 🔧 NEW: derived flag — true only if a real community image URL exists
  // (mapper now returns null instead of "—" when there is none).
  const hasCommunityImage = Boolean(
    community?.marketSupply?.image || location?.communityImage
  );
  const handleShareClick = async () => {
  const listingUrl = rawListing?._id
    ? `${window.location.origin}/listing/${rawListing._id}`
    : window.location.href;

  const shareData = {
    title: title || "Yupland Listing",
    text: `Check out this property on Yupland: ${title || ""}`,
    url: listingUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(listingUrl);
      toast.success("Link copied to clipboard");
    } else {
      const tempInput = document.createElement("input");
      tempInput.value = listingUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      toast.success("Link copied to clipboard");
    }
  } catch (err) {
    if (err?.name !== "AbortError") {
      toast.error("Unable to share right now");
    }
  }
};


  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {showGallery && (
        <GalleryModal
          images={images}
          onClose={() => setShowGallery(false)}
          agentAvatar={agent?.profileImage}
          latlong={rawListing?.latlong}
          coordinates={location?.coordinates}
          title={title}
          onEmailClick={handleEmailClick}
          onCallClick={handleCallClick}
          onWhatsAppClick={handleWhatsAppClick}
          isEmailSending={isEmailSending}
        />
      )}

      {/* CALL / CONTACT US MODAL — same pattern as ListingCard */}
      {isCallPopupOpen && ReactDOM.createPortal(
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsCallPopupOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCallPopupOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#67739E] hover:text-[#01155E] transition-colors"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl sm:text-2xl font-bold text-[#01155E] text-center mb-4">
              Contact Us
            </h3>

            <div className="text-center pb-5 mb-5 border-b border-[#D9E1F2]">
              <p className="text-[#01155E] font-semibold text-[16px] sm:text-[18px] capitalize">
                {title || "Property Name N/A"}
              </p>
              <p className="text-[#67739E] text-[13px] sm:text-[14px] mt-1">
                by <span className="text-[#01155E] font-semibold">{agencyName}</span>
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 pb-5 mb-5 border-b border-[#D9E1F2]">
              <div className="flex items-center justify-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                </div>
                <a
                  href={`tel:${agentPhoneDial}`}
                  className="text-[#01155E] text-[16px] sm:text-[20px] font-semibold hover:underline"
                >
                  {agentPhoneRaw}
                </a>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                </div>
                <a
                  href={`tel:${agentPhoneDial2}`}
                  className="text-[#01155E] text-[16px] sm:text-[20px] font-semibold hover:underline"
                >
                  {agentPhoneRaw2}
                </a>
              </div>
            </div>

            <div className="text-center pb-5 mb-5 border-b border-[#D9E1F2]">
              <p className="text-[#67739E] text-[14px] sm:text-[15px]">
                Broker: <span className="text-[#01155E] font-semibold">Divyansh Chitkara</span>
              </p>
            </div>

            {currentId && (
              <div className="text-center">
                <p className="text-[#67739E] text-[12px] sm:text-[13px] leading-[150%]">
                  Please quote property reference<br />
                  <span className="font-semibold text-[#01155E]">
                    Yupland - {currentId}
                  </span>{" "}
                  when calling us.
                </p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
      <LoginPopup
  isOpen={isLoginOpen}
  onClose={() => setIsLoginOpen(false)}
  openSignup={() => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  }}
/>

<SignupPopup
  isOpen={isSignupOpen}
  onClose={() => setIsSignupOpen(false)}
  openLogin={() => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  }}
/>

      {/* <Breadcrumbs /> */}
      {/* <Breadcrumbs customLabel={title} completionLabel={completionStatus} /> */}
      <Breadcrumbs customLabel={title} completionLabel={isOffPlan ? "Off-Plan" : "Ready"} />
      <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-0 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20">

        <div className="flex flex-col lg:flex-row justify-between items-start mb-6 lg:mb-8 gap-5 lg:gap-0">
          <div className="flex-1 pr-0 w-full">
            <h1 className="text-[26px] sm:text-[34px] lg:text-[48px] font-[Archivo] font-semibold text-[#01155E] leading-tight mb-3 capitalize">
              {title || "—"}
            </h1>

            <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-wrap">
              <span className="bg-[#01155E] text-white text-[12px] sm:text-[13px] font-medium px-3 py-1.5 rounded-md uppercase">
                {[getDisplayStatus(completionStatus), "initial sale"]
                  .filter(Boolean)
                  .join(" | ") || "—"}
              </span>

              <div className="flex items-center gap-2 text-[#67739E] text-[14px] sm:text-[16px] font-medium capitalize">
                <img
                  src={Appartmentimage}
                  alt="type"
                  className="w-5 h-5 object-contain capitalize"
                />
                <span>{PROPERTY?.types || "—"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#01155E]" />
                <span>
                  {[
                    location?.address,
                    location?.country
                  ].filter(Boolean).join(", ") || "—"}
                </span>
              </div>

              <div className="hidden sm:block border-l border-[#D9E1F2] h-5" />

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

              <div className="hidden sm:block border-l border-[#D9E1F2] h-5" />

              <div className="flex items-center gap-2">
                <Maximize size={18} className="text-[#01155E]" />
                <span>{builtUpArea ? `${builtUpArea} Sq Ft` : sqft || "—"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto">
            <div className="flex items-baseline gap-2 mb-0 lg:mb-4">
              <span className="text-[15px] sm:text-[18px] font-semibold text-[#01155E]">
                Starting at
              </span>
              <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-semibold text-[#01155E] uppercase">
                AED {PROPERTY?.price_start ? Number(PROPERTY.price_start).toLocaleString() : "—"}
              </span>
            </div>

            <div className="flex gap-3 mt-0 lg:mt-4">
              <button
                onClick={handleFavoriteToggle}
                className={`w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] flex items-center justify-center rounded-full transition-all ${
                  isFavorite
                    ? "bg-[#01155E] text-white"
                    : "bg-[#F0F4F8] text-[#01155E] hover:bg-gray-200"
                }`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
  onClick={handleShareClick}
  className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] flex items-center justify-center bg-[#F0F4F8] text-[#01155E] rounded-full hover:bg-gray-200 transition-all"
  aria-label="Share this property"
>
  <Share2 size={22} />
</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[10px] h-auto lg:h-[520px] mb-8 lg:mb-12">
          <div className="col-span-1 lg:col-span-7 relative h-[240px] sm:h-[340px] lg:h-full">
            <img
              src={getSafeImageUrl(featureImage)}
              className="w-full h-full lg:h-[521px] object-cover rounded-[6px]"
              alt="Main"
            />

            <span className="absolute top-3 left-3 bg-white text-[#01155E] text-[12px] sm:text-[13px] font-medium px-3 py-1.5 rounded-md shadow-sm uppercase">
              {getDisplayStatus(completionStatus)}
            </span>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>

            {/* Mobile/tablet: thumbnails are hidden, so surface a quick
                "View all photos" action directly on the hero image. */}
            <button
              onClick={() => setShowGallery(true)}
              className="lg:hidden absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-[12px] font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
            >
              <Image size={14} />
              {totalImages} Photos
            </button>
          </div>
          <div className="hidden lg:grid col-span-5 grid-cols-2 gap-[10px] h-full">
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

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[30px]">
          <div className="flex-1 min-w-0 w-full">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-5">
              <h2 className="text-[22px] sm:text-[24px] lg:text-[26px] font-semibold text-[#01155E]">Overview</h2>
              <button
                onClick={() => setPopupType("brochure")}
                className="flex items-center justify-center gap-2 bg-[#01155E] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold w-full sm:w-auto"
              >
                <Download size={16} />
                Download Brochure
              </button>
            </div>

            <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-4 sm:p-6 lg:p-8 mb-8">
                           <div className="flex justify-start sm:justify-between items-center pb-6 border-b border-[#D9E1F2] mb-8 flex-wrap gap-x-6 sm:gap-x-0 gap-y-4">
                {overviewStats.map((item, i) => (
                  <div key={i} className="flex flex-col items-start gap-1 min-w-[100px] sm:min-w-[110px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.icon}
                      <span className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-[#01155E] break-words">{item.val}</span>
                    </div>
                    <span className="text-[#67739E] text-[13px] sm:text-[14px] lg:text-[15px]">{item.label}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-[22px] sm:text-[25px] lg:text-[28px] font-[600] text-[#01155E] mb-6">Property Information</h3>
              <div className="border border-[#D9E1F2] rounded-[10px] mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 p-4 sm:p-6 border-b border-[#D9E1F2]">
                  {propertyInfoRows.slice(0, 4).map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] mb-1 capitalize">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px] capitalize ">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 p-4 sm:p-6 border-b border-[#D9E1F2]">
                  {propertyInfoRows.slice(4, 8).map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] mb-1 capitalize">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px] capitalize">{item.value}</p>
                    </div>
                  ))}
                </div>
                {propertyInfoRows.slice(8).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 p-4 sm:p-6">
                    {propertyInfoRows.slice(8).map((item, i) => (
                      <div key={i}>
                        <p className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] mb-1 capitalize">{item.label}</p>
                        <p className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px] capitalize">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-[#67739E] text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed">
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
              <h3 className="text-[22px] sm:text-[24px] lg:text-[26px] font-[600] text-[#01155E] mb-6">Regulatory Information</h3>
              <div className="flex flex-col lg:flex-row gap-6">
                {!isOffPlan && (
                  <div className="flex-1 border border-[#D9E1F2] rounded-[10px] p-4 sm:p-6">
                    <div className="grid grid-cols-2 gap-4 pb-5 border-b border-[#D9E1F2]">
                      <div>
                        <p className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] mb-1">Permit Number</p>
                        <p className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">{permitNumber}</p>
                      </div>
                      <div>
                        <p className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] mb-1">Zone Name</p>
                        <p className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">{zoneName}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-5 border-b border-[#D9E1F2]">
                      <div>
                        <p className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] mb-1">RERA</p>
                        <p className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">{rera}</p>
                      </div>
                      <div>
                        <p className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] mb-1">BRN</p>
                        <p className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">{brn}</p>
                      </div>
                    </div>
                    <div className="pt-5">
                      <p className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px] mb-1">Registered Agency</p>
                      <p className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">{registeredAgency}</p>
                    </div>
                  </div>
                )}

                <div className={`w-full ${isOffPlan ? "lg:w-full" : "lg:w-[280px]"} border border-[#D9E1F2] rounded-[10px] flex items-center justify-center p-6`}>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#01155E] rounded-tl-[4px]" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#01155E] rounded-tr-[4px]" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#01155E] rounded-bl-[4px]" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#01155E] rounded-br-[4px]" />

                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PERMIT-${permitNumber}-ZONE-${zoneName}-RERA-${rera}&color=01155E&bgcolor=ffffff`}
                      alt="QR Code"
                      className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-[22px] sm:text-[24px] lg:text-[26px] font-semibold text-[#01155E] mb-5">Payment Plan</h2>
            <div className="bg-[#1C4DFF0A] border border-[#D9E1F2] rounded-[10px] p-4 sm:p-6 lg:p-8 mb-8">
              <div className="flex justify-between items-center border border-[#D9E1F2] rounded-lg px-4 py-3 mb-6 cursor-pointer bg-white">
                <div className="flex items-center gap-2 text-[#67739E]">
                  <BanknoteArrowDown size={20} className="text-[#01155E]" />
                  <span className="text-[15px] sm:text-[18px] font-['Archivo'] text-[#01155E]">
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
              <div className="flex text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#01155E] mb-6">
                {paymentPlan?.steps?.map((step, i) => (
                  <span key={i} style={{ width: `${step.percent}%` }}>
                    {step.percent}%
                  </span>
                ))}
              </div>
              <div className="space-y-4">
                {paymentSteps.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-[#D9E1F2] last:border-0">
                    <span className="text-[#01155E] font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">{item.label}</span>
                    <span className="text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-semibold text-[#01155E] mb-5 sm:mb-7">Unit Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {unitTypesList.map((unit, i) => (
                <div key={i} className="bg-[#F5F8FF] border border-[#D9E1F2] rounded-[15px] p-5 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6">
                  <h3 className="text-[#01155E] font-semibold text-[19px] sm:text-[21px] lg:text-[24px]">
                    {unit.type === 0 || unit.type === "0"
                      ? "Studio"
                      : unit.type === 1 || unit.type === "1"
                        ? "1 Bedroom"
                        : `${unit.type} Bedrooms`}
                  </h3>
                  <div className="flex flex-wrap gap-4 sm:gap-6 text-[#67739E] text-[15px] sm:text-[16px] lg:text-[18px]">
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
                    className="w-fit border border-[#01155E] bg-transparent text-[#01155E] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-[15px] sm:text-[18px] hover:bg-[#01155E] hover:text-white transition-all"
                  >
                    Check Availability
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-bold text-[#01155E] mb-4 sm:mb-6">Building Information</h2>
              <div className="border border-[#D9E1F2] rounded-[10px] p-4 sm:p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 pb-6 border-b border-[#D9E1F2]">
                  {buildingInfoRow1.map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[13px] sm:text-[15px] lg:text-[16px] mb-2">{item.label}</p>
                      <p className="text-[#01155E] font-bold text-[15px] sm:text-[17px] lg:text-[18px]">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 pt-6">
                  {buildingInfoRow2.map((item, i) => (
                    <div key={i}>
                      <p className="text-[#67739E] text-[13px] sm:text-[15px] lg:text-[16px] mb-2">{item.label}</p>
                      <p className="text-[#01155E] font-semibold text-[15px] sm:text-[17px] lg:text-[18px]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-semibold text-[#01155E] mb-5">Amenites</h2>
            <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-4 sm:p-6 lg:p-8 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-y-8 gap-x-5 mb-8 sm:mb-10">
                {amenitiesList.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 group">
                    <div className="flex-shrink-0 transition-transform group-hover:scale-110 pt-2px">
                      <AmenityIcon type={item.icon} />
                    </div>
                    <span className="text-[#01155E] font-medium text-[15px] sm:text-[16px] lg:text-[17px] leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4 border-t border-gray-50">
                <button className="w-full sm:w-fit border-2 border-[#01155E] bg-transparent text-[#01155E] font-bold px-6 sm:px-10 py-3 sm:py-3.5 rounded-xl uppercase text-[13px] sm:text-[15px] tracking-wider hover:bg-[#01155E] hover:text-white transition-all duration-300">
                  View All Amenities
                </button>
              </div>
            </div>

            <h2 className="text-[22px] sm:text-[24px] lg:text-[26px] font-semibold text-[#01155E] mb-5">Floor Plans</h2>
            <div className="mb-8">
              {floorPlansList.map((plan, index) => (
                <div key={index} className="border border-[#D9E1F2] rounded-[10px] overflow-hidden mb-3">
                  <div
                    className="bg-[#EEF2FF] p-4 sm:p-5 flex flex-wrap justify-between items-center gap-3 cursor-pointer"
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
                      <span className="text-[#67739E] font-semibold text-[16px] sm:text-[18px] lg:text-[20px]">
                        {plan.bedrooms}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 sm:gap-6 text-[#67739E] text-[14px] sm:text-[16px] lg:text-[18px]">
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
                    <div className="bg-white p-4 sm:p-6 lg:p-8">
                      <div className="flex justify-center mb-6">
                        <img
                          src={plan.planImage || floorplan1}
                          alt="Floor Plan"
                          className="max-h-[240px] sm:max-h-[320px] lg:max-h-[380px] w-auto grayscale"
                        />
                      </div>
                      {plan.description && (
                        <>
                          <h4 className="font-semibold text-[#67739E] text-[16px] sm:text-[18px] mb-4">Description:</h4>
                          <p className="text-[#67739E] text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed">{plan.description}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-5 sm:mb-7.5">
              <div>
                <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-semibold text-[#01155E]">Community</h2>
                <p className="text-[#67739E] font-semibold text-[18px] sm:text-[21px] lg:text-[24px]">
                  {community?.title || location?.community || "—"}
                </p>
              </div>
              <button
                onClick={() => {
                  if (community?.slug) {
                    navigate(`/communities/${community.slug}`);
                  }
                }}
                className="bg-[#01155E] text-white px-5 sm:px-6 py-2.5 rounded-lg text-[15px] sm:text-[18px] font-semibold w-full sm:w-auto"
              >
                Explore Community
              </button>
            </div>

            {/* 🔧 FIX: was `{(community?.marketSupply?.image || location?.communityImage) && (...)}`.
                That check is unchanged, but it now works correctly because the mapper
                no longer feeds it a truthy "—" placeholder string when there's no
                real image — it feeds `null`, so this block genuinely hides when
                there is no community image. Using the `hasCommunityImage` flag here
                for clarity. */}
            {hasCommunityImage && (
              <div className="rounded-[10px] overflow-hidden border border-[#D9E1F2] w-full h-[200px] sm:h-[300px] lg:w-[850px] lg:h-[395px] mb-8">
                <img
                  src={getSafeImageUrl(
                    community?.marketSupply?.image || location?.communityImage
                  )}
                  className="w-full h-full object-cover"
                  alt="Community"
                />
              </div>
            )}

            {/* 🔧 FIX: Investment Insights section was rendering unconditionally,
                showing "Unlock Investment Insights" + three "—" rows even when
                the listing had no investment data at all. Now wrapped in
                `hasInvestmentInsights` so it only renders when at least one of
                rentalYield / priceTrend / pricePerSqFt actually came back from
                the API (mapper now returns null instead of "—" for these when
                missing, so the flag is accurate). */}
            {hasInvestmentInsights && (
              <div className="border border-[#01155E33] rounded-[10px] overflow-hidden mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 px-4 sm:px-6 py-4 border-b border-[#01155E33]">
                  <h2 className="text-[19px] sm:text-[22px] font-bold text-[#01155E]">Investment Insights</h2>
                  <button className="bg-[#01155E] text-white px-5 py-2.5 rounded-[8px] text-[14px] sm:text-[15px] font-semibold w-full sm:w-auto">
                    Unlock Investment Insights
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 px-4 sm:px-6 py-5">
                  <div>
                    <p className="text-[#67739E] text-[14px] sm:text-[15px] mb-1">Rental Yield</p>
                    <p className="text-[#01155E] font-bold text-[16px] sm:text-[17px]">{investmentInsights?.rentalYield || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[#67739E] text-[14px] sm:text-[15px] mb-1">Price Trends</p>
                    <p className="text-[#01155E] font-bold text-[16px] sm:text-[17px]">{investmentInsights?.priceTrend || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[#67739E] text-[14px] sm:text-[15px] mb-1">Price per sqft</p>
                    <p className="text-[#01155E] font-bold text-[16px] sm:text-[17px]">
                      {investmentInsights?.pricePerSqFt || "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 sm:mt-10">
              <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-semibold text-[#01155E] mb-5">Location Map</h2>
              <PropertyMap
                latlong={rawListing?.latlong}
                coordinates={location?.coordinates}
                title={title}
              />
            </div>

            {youtubeEmbed && (
              <>
                <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-semibold text-[#01155E] mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-10">
                  Project Video
                </h2>

                <div className="relative rounded-[10px] overflow-hidden mb-8 sm:mb-10 h-[220px] sm:h-[300px] lg:h-[380px]">
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

          <div className="w-full lg:w-[410px] flex-shrink-0">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-4 sm:p-6">

                <div className="flex items-start gap-2 mb-4">
                  <Star
                    size={18}
                    fill="#0e0d0d"
                    className="mt-1 flex-shrink-0"
                  />
                  <span className="text-[#01155E] font-semibold text-[19px] sm:text-[22px] capitalize leading-[1.3]">
                    {title || "—"}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#01155E] text-white text-[12px] px-2.5 py-1.5 rounded-[4px] font-medium uppercase">
                    {getDisplayStatus(completionStatus)}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-[#67739E] text-[15px] sm:text-[18px] mb-4">
                  <MapPin
                    size={19}
                    className="mt-1 flex-shrink-0 text-[#67739E]"
                  />

                  <span className="leading-7">
                    {[
                      location?.address,
                      location?.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </span>
                </div>
                <hr className="border-[#D9E1F2] mb-4" />

                <div className="flex items-center gap-2 text-[#67739E] text-[15px] sm:text-[18px] mb-4">
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

                <div className="flex items-center gap-2 text-[#67739E] text-[15px] sm:text-[18px] mb-4">
                  <Square size={14} />
                  <span>{builtUpArea ? `${builtUpArea} Sq Ft` : sqft || "—"}</span>
                </div>

                <hr className="border-[#D9E1F2] mb-6" />

                <div className="text-[17px] sm:text-[20px] font-semibold text-[#01155E] mb-4">
                  Starting at  {currency}
                  <span className="text-[28px] sm:text-[36px] ml-2">
                    {price ? Number(price).toLocaleString() : "—"}
                  </span>
                </div>

                <hr className="border-[#D9E1F2] mb-4" />

                <h4 className="text-[#01155E] font-semibold text-[17px] sm:text-[20px] mb-4">Contact Us Now !</h4>

                <div className="rounded-xl bg-[#F5F8FF] p-4 w-full sm:max-w-[350px]">
  <div className="flex items-center gap-4 mb-4">
    <img
      src={Broker}
      alt="Agent"
      className="w-14 h-14 rounded-full object-cover object-[center_20%] ring-2 ring-white shadow-sm"
    />
    <div>
      <div className="font-semibold text-[#01155E] text-[16px] sm:text-[18px] leading-none mb-1 mt-2">
        Divyansh Chitkara
      </div>
     
    </div>
  </div>

  <div className="flex items-center gap-2.5">
    <button
      onClick={handleCallClick}
      className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] flex items-center justify-center bg-white border border-[#D9E1F2] text-[#01155E] rounded-[12px] shadow-sm hover:bg-[#01155E] hover:border-[#01155E] hover:text-white hover:shadow-md transition-all duration-200"
      aria-label="Call"
    >
      <Phone size={19} />
    </button>

    <button
      onClick={handleWhatsAppClick}
      className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] flex items-center justify-center bg-white border border-[#D9E1F2] rounded-[12px] shadow-sm hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-md transition-all duration-200 group"
      aria-label="Chat on WhatsApp"
    >
      <svg width="19" height="19" viewBox="0 0 24 24" className="fill-[#25D366] group-hover:fill-white transition-colors">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.857L.057 23.571l5.9-1.548A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.939 0-3.756-.523-5.318-1.432l-.381-.226-3.499.918.934-3.408-.249-.394A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </button>

    <button
      onClick={handleEmailClick}
      disabled={isEmailSending}
      className="flex-1 h-[42px] sm:h-[46px] bg-[#01155E] text-white rounded-[12px] font-semibold text-[13px] sm:text-[15px] shadow-sm hover:bg-[#0A2470] hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isEmailSending ? "Connecting..." : "Request Details"}
    </button>
  </div>
</div>

              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-semibold text-[#01155E] text-center mb-6 sm:mb-8 lg:mb-10 px-2">
            Similar Properties In {location?.community || "this area"}
          </h2>

          {similarLoading ? (
            <p className="text-center text-[#67739E]">Loading similar properties...</p>
          ) : similarListings.length === 0 ? (
            <p className="text-center text-[#67739E]">No similar properties found nearby.</p>
          ) : (
            <SimilarPropertiesCarousel
              listings={similarListings}
              getDisplayStatus={getDisplayStatus}
              getBedroomsDisplay={getBedroomsDisplay}
              navigate={navigate}
            />
          )}
        </div>

      </div>

      {popupType && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPopupType(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#01155E] mb-2">
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

      <div className="max-w-[1290px] mx-auto mt-10 sm:mt-12 mb-14 sm:mb-22 px-4">
        <div className="border-t border-gray-200 pt-6">
          <p className="text-[#67739E] font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed ">
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