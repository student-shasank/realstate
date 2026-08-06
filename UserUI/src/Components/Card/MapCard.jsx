import React, { useState, useEffect } from "react";
import listingimage from '../../assets/ListingCard.jpg'
import { BedDouble, Bath, Square } from "lucide-react";
import Icon1 from '../../assets/icon1.png'
import Icon2 from '../../assets/icon2.png'
import Icon3 from '../../assets/icon3.png'

// ✅ NEW IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchListingDetail } from "../../features/dashboard/listingDetailSlice";
import { extractAllImages } from "../../Components/utils/imageExtractor";
import {
  addFavoriteLocal,
  removeFavoriteLocal,
  toggleFavorite,
} from "../../features/dashboard/favoriteligting/favoriteSlice.jsx";

const MapCard = ({ item, onRequireLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentImg, setCurrentImg] = useState(0);

  // ✅ NEW STATES
  const [carouselImages, setCarouselImages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Default image if none provided
  const IMG = listingimage;

  // ✅ Same id + favorite pattern as ListingCard
  const currentId = item?._id || item?.id;
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const isFavorite = favorites.includes(currentId);

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

  // ✅ Same favorite handling as ListingCard (Redux + login check)
  const handleFavorite = (e) => {
    e.stopPropagation();

    if (!currentId) return;

    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }

    if (isFavorite) {
      dispatch(removeFavoriteLocal(currentId));
    } else {
      dispatch(addFavoriteLocal(currentId));
    }

    dispatch(toggleFavorite(currentId));
  };

  // ✅ Same navigation-on-click pattern as ListingCard's openDetails
  const openDetails = () => {
    if (item?.id) {
      navigate(`/listing/${item.id}`);
    }
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

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setCurrentImg(index);
  };

  return (
    // ✅ Same "click gets blue" hover/border treatment as ListingCard, plus click-to-open
    <div
      onClick={openDetails}
      className="w-full bg-white overflow-hidden transition-all duration-300 rounded-xl border border-transparent cursor-pointer  hover:shadow-[0_8px_24px_rgba(1,21,94,0.10)]"
    >

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

        {/* Heart — now Redux-backed, same as ListingCard */}
       <button
  onClick={handleFavorite}
  className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full border-2 border-transparent bg-white/80 flex items-center justify-center transition-all duration-300 hover:border-[#01155E] hover:bg-white"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={isFavorite ? "#01155E" : "none"}
    stroke="#01155E"
    strokeWidth="1.8"
    className="transition-all duration-200"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
</button>

        {/* Arrows */}
        {isHovered && images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/70 rounded-full flex items-center justify-center opacity-100 hover:bg-white"
            >
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/70 rounded-full flex items-center justify-center opacity-100 hover:bg-white"
            >
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={(e) => handleDotClick(e, i)}
              className={`h-1.5 rounded-full ${i === currentImg ? "w-1.5 bg-white" : "w-1.5 bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      {/* --- Details Section --- */}
      <div className="pt-3 pb-2 px-1">

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
  <span>
    {item?.beds === 0 || item?.beds === "0"
      ? "S"
      : typeof item?.beds === "string"
      ? item.beds.replace(/^0,?/, "S,")
      : item?.beds ?? "N/A"}
  </span>
</div>
          )}

          <div className="flex items-center gap-1.5">
            <img src={Icon2} className="w-4 h-4" />
            <span>{item?.baths || "N/A"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <img src={Icon1} className="w-4 h-4 flex start " />
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