import React, { useState } from "react";
import listingimage from '../../assets/ListingCard.jpg'
import { BedDouble, Bath, Square } from "lucide-react";
import Icon1 from '../../assets/icon1.png'
import Icon2 from '../../assets/icon2.png'
import Icon3 from '../../assets/icon3.png'

// ✅ NEW IMPORTS
import { useDispatch } from "react-redux";
import { fetchListingDetail } from "../../features/dashboard/listingDetailSlice";
import { extractAllImages } from "../../Components/utils/imageExtractor";

const MapCard = ({ item }) => {
  const dispatch = useDispatch();

  const [currentImg, setCurrentImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  // ✅ NEW STATES
  const [carouselImages, setCarouselImages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Default image if none provided
  const IMG = listingimage;

  // ✅ fallback + dynamic images
  const fallbackImages = item?.feature_image
    ? [item.feature_image]
    : [IMG];

  const images =
    carouselImages.length > 0 ? carouselImages : fallbackImages;

  // ✅ SAFE IMAGE HANDLER
  const getSafeImage = (img) => {
    if (!img) return IMG;
    if (typeof img === "string") return img;
    return img?.url || img?.secure_url || img?.imageUrl || IMG;
  };

  // ✅ HOVER FETCH (same as ListingCard)
  const handleMouseEnter = async () => {
    setIsHovered(true);

    if (carouselImages.length === 0 && !isLoading) {
      setIsLoading(true);
      try {
        const res = await dispatch(fetchListingDetail(item.id)).unwrap();
        const imageData = extractAllImages(res);
        setCarouselImages(imageData.allImages);
      } catch (err) {
        console.log("Image fetch error", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImg(0);
  };

  return (
    <div className="w-full bg-white overflow-hidden transition-all duration-300">
      
      {/* --- Image Section --- */}
      <div 
        className="relative w-full h-[180px] group rounded-xl overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={getSafeImage(images[currentImg])}
          alt={item?.title} 
          className="w-full h-full object-cover"
        />

        {/* 🔄 Loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-black rounded-full animate-spin" />
          </div>
        )}

        {/* TruCheck Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-black">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span className="text-[11px] font-bold text-gray-800">TruCheck™</span>
        </div>

        {/* Heart */}
        <button 
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlisted ? "#ef4444" : "rgba(0,0,0,0.3)"} stroke="white" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Arrows */}
        {isHovered && images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentImg(prev => prev === 0 ? images.length - 1 : prev - 1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/70 rounded-full flex items-center justify-center opacity-100 hover:bg-white"
            >
              ◀
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentImg(prev => prev === images.length - 1 ? 0 : prev + 1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/70 rounded-full flex items-center justify-center opacity-100 hover:bg-white"
            >
              ▶
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.slice(0, 5).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full ${i === currentImg ? "w-1.5 bg-white" : "w-1.5 bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      {/* --- Details Section --- */}
      <div className="pt-3 pb-2">
        
        {/* ✅ FIXED PRICE ERROR */}
        <h3 className="text-[18px] font-bold text-[#222222]">
          AED {item?.min_price?.toLocaleString?.() || "N/A"}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-3 mt-1 text-[#444444] text-[14px]">

          {item?.bedrooms === 0 || item?.bedrooms === "Studio" ? (
            <span>Studio</span>
          ) : (
            <div className="flex items-center gap-1.5">
              <img src={Icon3} className="w-4 h-4" />
              <span>{item?.beds || "N/A"}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <img src={Icon2} className="w-4 h-4" />
            <span>{item?.baths || "N/A"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <img src={Icon1} className="w-4 h-4" />
            <span>{item?.max_area?.toLocaleString?.()} sqft</span>
          </div>
        </div>

        {/* Title */}
        <p className="mt-2 text-[16px] text-[#01155E] font-semibold truncate">
          {item?.title}
        </p>

        {/* Location */}
        <p className="text-[16px] text-[#67739E] mt-1">
          {[item?.district_name, item?.city_name].filter(Boolean).join(", ") || "N/A"}
        </p>

      </div>
    </div>
  );
};

export default MapCard;