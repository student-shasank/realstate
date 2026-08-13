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
    // ✅ Elevated card shell — rounded corners, soft shadow, subtle lift on hover
    <div
      onClick={openDetails}
      className="w-full bg-white overflow-hidden transition-all duration-300 rounded-2xl border border-gray-100 cursor-pointer shadow-[0_2px_10px_rgba(1,21,94,0.06)] hover:shadow-[0_12px_28px_rgba(1,21,94,0.16)] hover:-translate-y-1"
    >

      {/* --- Image Section --- */}
      <div
        className="relative w-full h-[240px] group rounded-t-2xl overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={getSafeImage(images[currentImg])}
          alt={item?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle bottom gradient so dots/price always readable */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* 🔄 Loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-black rounded-full animate-spin" />
          </div>
        )}

        {/* Status / off-plan badge (optional, shows if present) */}
        {item?.completion_status && (
          <span className="absolute top-3 left-3 z-20 bg-white/90 text-[ #01155E] text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {item.completion_status}
          </span>
        )}

        {/* Heart — Redux-backed, same as ListingCard */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full border-2 border-transparent bg-white/85 flex items-center justify-center transition-all duration-300 hover:border-[#01155E] hover:bg-white shadow-sm"
        >
          <svg
            width="18"
            height="18"
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
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-100 hover:bg-white shadow-sm z-20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#01155E"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-100 hover:bg-white shadow-sm z-20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#01155E"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={(e) => handleDotClick(e, i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === currentImg ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- Details Section --- */}
      <div className="pt-4 pb-4 px-4">

        {/* Price */}
        <h3 className="text-[20px] leading-tight font-bold text-[#01155E]">
          AED {item?.min_price?.toLocaleString?.() || "N/A"}
        </h3>

        {/* Title */}
        <p className="mt-1.5 text-[16px] text-[#222222] font-semibold truncate">
          {item?.title}
        </p>

        {/* Location */}
        <p className="text-[14px] text-[#67739E] mt-0.5 truncate">
          {[item?.district_name, item?.city_name].filter(Boolean).join(", ") || "N/A"}
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-3" />

        {/* Specs — each on its own line */}
        <div className="flex flex-col gap-1 text-[ #67739e] text-[14px]">

          <div className="flex items-center gap-2">
            <img src={Icon3} className="w-4 h-4 shrink-0" alt="beds" />
            <span className="font-medium  text-[#67739e]">
              {item?.bedrooms === 0 || item?.bedrooms === "Studio"
                ? "Studio"
                : item?.beds === 0 || item?.beds === "0"
                ? "Studio"
                : typeof item?.beds === "string"
                ? item.beds.replace(/^0,?/, "Studio,")
                : item?.beds ?? "N/A"}{" "}
              {typeof item?.beds !== "undefined" && item?.beds !== null
                ? ""
                : ""}
            </span>
          </div>

          <div className="flex items-center gap-2 ">
            <img src={Icon2} className="w-4 h-4 shrink-0" alt="baths" />
           <span className="font-medium text-[#67739e]">
  {item?.baths && Number(item.baths) !== 0 ? item.baths : "Inquire"}
</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={Icon1} className="w-4 h-4 shrink-0" alt="area" />
            <span className="font-medium  text-[#67739e]">
              {item?.max_area?.toLocaleString?.() || "N/A"} sqft
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapCard;