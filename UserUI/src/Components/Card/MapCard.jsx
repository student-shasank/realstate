import React, { useState, useEffect, useMemo } from "react";
import listingimage from '../../assets/ListingCard.jpg'
import { BedDouble, Bath, Square } from "lucide-react";
import Icon1 from '../../assets/icon1.png'
import Icon2 from '../../assets/icon2.png'
import Icon3 from '../../assets/icon3.png'

// ✅ NEW IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addFavoriteLocal,
  removeFavoriteLocal,
  toggleFavorite,
} from "../../features/dashboard/favoriteligting/favoriteSlice.jsx";

// ============================================================
// 🔧 FIX: MapCard was reading ONLY the raw off-plan field names
// directly off `item` (item.min_price, item.beds, item.baths,
// item.max_area, item.district_name, item.city_name,
// item.completion_status, item.all_images / item.feature_image).
// That works for off-plan project docs, but the DB also has
// manually-created "Ready" listings (ListingCreation.jsx) which
// store the SAME information under structured fields instead
// (location.address/city, overview.bedrooms/bathrooms, unitTypes,
// price_start, completionStatus, etc.) — so those listings showed
// "N/A" everywhere on the card even though the data exists.
//
// `mapPropertyDetailData` (used on the detail page) already knows
// how to reconcile BOTH shapes field-by-field. Reusing it here
// means the card and the detail page always agree on what a given
// listing's price/beds/baths/area/location/image actually is,
// instead of maintaining two separate (and now diverging) mapping
// rules.
// ============================================================
import { mapPropertyDetailData } from "../utils/Propertydetailmapper.jsx";

const MapCard = ({ item, onRequireLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentImg, setCurrentImg] = useState(0);

  // ✅ NEW STATES
  const [carouselImages, setCarouselImages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // Default image if none provided
  const IMG = listingimage;

  // ✅ Same id + favorite pattern as ListingCard
  const currentId = item?._id || item?.id;
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const favorites = useSelector((state) => state.favorites.favorites || []);
  const isFavorite = favorites.includes(currentId);

  // ── Normalize the raw item through the SAME mapper the detail
  // page uses, so off-plan docs AND Ready listings both resolve
  // to the correct value instead of falling back to "N/A".
  // Recomputed only when the underlying item actually changes.
  const mapped = useMemo(() => mapPropertyDetailData(item) || {}, [item]);

  // ============================================================
  // 🔧 FIX: helper that treats null / undefined / NaN / <= 0 as
  // "no price". Off-plan docs frequently store price_start /
  // price_end as the STRING '0.00' when the developer hasn't set
  // a real price yet (price is "on request"). Number('0.00') is
  // 0, which is falsy-looking but NOT null/undefined, so the old
  // `??` chain happily accepted it and rendered "AED 0" instead of
  // moving on to the next fallback (or finally showing "N/A").
  // ============================================================
  const toValidPrice = (val) => {
    if (val === null || val === undefined || val === "") return null;
    const n = Number(val);
    return !isNaN(n) && n > 0 ? n : null;
  };

  // ── Price ───────────────────────────────────────────────────
  // Off-plan: item.min_price. Ready listing / mapper: price_start
  // (apiData.price_start || apiData.price). Also fall back to the
  // lowest unitTypes.startingPrice if neither top-level field is set.
  const lowestUnitPrice = Array.isArray(mapped?.unitTypes) && mapped.unitTypes.length > 0
    ? mapped.unitTypes.reduce((min, u) => {
        const p = toValidPrice(u?.startingPrice ?? u?.price);
        if (p === null) return min;
        return min === null ? p : Math.min(min, p);
      }, null)
    : null;

  const displayPrice =
    toValidPrice(item?.min_price) ??
    toValidPrice(mapped?.price_start) ??
    toValidPrice(mapped?.price) ??
    lowestUnitPrice ??
    null;

  // ── Title ───────────────────────────────────────────────────
  const displayTitle = item?.title || mapped?.title || "—";

  // ── Location (district/city) ───────────────────────────────
  // Off-plan: item.district_name / item.city_name.
  // Ready listing: mapped.location.address / mapped.location.city
  // (mapper already resolves district_data / district_name / etc.
  // into location.address, and city_data / city_name into location.city).
  const displayDistrict =
    item?.district_name ||
    mapped?.location?.address ||
    mapped?.location?.community ||
    null;

  const displayCity =
    item?.city_name ||
    mapped?.location?.city ||
    null;

  // ── Bedrooms ────────────────────────────────────────────────
  // Off-plan: item.beds is a comma string like "0,1,1.5,2" (or
  // item.bedrooms for a single value). Ready listing: mapper's
  // `bedrooms` field (apiData.bedrooms || apiData.beds), which for
  // Ready listings comes from the form's bedrooms field. Fall back
  // to the lowest unitTypes bedrooms if nothing else is set.
  const lowestUnitBedrooms = Array.isArray(mapped?.unitTypes) && mapped.unitTypes.length > 0
    ? mapped.unitTypes[0]?.bedrooms
    : null;

  const bedsRaw =
    item?.beds ??
    item?.bedrooms ??
    mapped?.bedrooms ??
    lowestUnitBedrooms ??
    null;

  const formatBeds = (val) => {
    if (val === null || val === undefined || val === "" || val === "—") return "N/A";
    if (val === 0 || val === "0" || val === "Studio") return "Studio";
    if (typeof val === "string") return val.replace(/^0,?/, "Studio,");
    return val;
  };

  // ── Bathrooms ───────────────────────────────────────────────
  const bathsRaw = item?.baths ?? mapped?.bathrooms ?? null;
  const displayBaths =
    bathsRaw && Number(bathsRaw) !== 0 && bathsRaw !== "—" ? bathsRaw : "Inquire";

  // ── Area ────────────────────────────────────────────────────
  // Off-plan: item.max_area. Ready listing / mapper: builtUpArea
  // (apiData.builtUpArea || apiData.area_start), else totalBuildingArea,
  // else the highest unitTypes.sqFt as a last resort.
  const largestUnitArea = Array.isArray(mapped?.unitTypes) && mapped.unitTypes.length > 0
    ? mapped.unitTypes.reduce((max, u) => {
        const a = Number(u?.sqFt);
        if (!a || isNaN(a)) return max;
        return max === null ? a : Math.max(max, a);
      }, null)
    : null;

  const displayArea =
    item?.max_area ??
    mapped?.builtUpArea ??
    mapped?.totalBuildingArea ??
    largestUnitArea ??
    null;

  // ── Status badge ────────────────────────────────────────────
  const displayStatus = item?.completion_status || mapped?.completionStatus || null;

  // ── Images ──────────────────────────────────────────────────
  // fallback images (agar all_images khali ho)
  const fallbackImages = item?.feature_image
    ? [item.feature_image]
    : item?.images?.length > 0
      ? item.images
      : [IMG];

  // ============================================================
  // Off-plan docs keep gallery URLs under item.all_images.
  // Ready listings save the same photos, but the mapper already
  // knows to fall back through all_images → images → feature/cover
  // (mapped.images), so use that as an additional fallback instead_id 
  // of showing the placeholder for Ready listings whose photos
  // aren't under `all_images` specifically.
  // ============================================================
  const galleryImages =
    Array.isArray(item?.all_images) && item.all_images.length > 0
      ? item.all_images
      : Array.isArray(mapped?.images) && mapped.images.length > 0
      ? mapped.images
      : fallbackImages;

  const images =
    carouselImages.length > 0 ? carouselImages : galleryImages;

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
    if (item?._id) {
      navigate(`/listing/${item._id}`);
    }
  };

  // ✅ HOVER — images already present in item, bas set kar do
  const handleMouseEnter = () => {
    setIsHovered(true);

    if (carouselImages.length === 0) {
      setCarouselImages(galleryImages);
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

  // ✅ item change hone par reset (jaise ListingCard me hota hai)
  useEffect(() => {
    setCurrentImg(0);
    setCarouselImages([]);
    setIsHovered(false);
  }, [currentId]);

  return (
    // ✅ Elevated card shell — rounded corners, soft shadow, subtle lift on hover
    <div
      onClick={openDetails}
      className="w-full bg-white overflow-hidden transition-all duration-300 rounded-2xl border border-gray-100 cursor-pointer shadow-[0_2px_10px_rgba(1,21,94,0.06)] hover:shadow-[0_12px_28px_rgba(1,21,94,0.16)] hover:-translate-y-1"
    >

      {/* --- Image Section --- */}
      <div
        className="relative w-full h-[200px] sm:h-[220px] lg:h-[240px] group rounded-t-2xl overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={getSafeImage(images[currentImg])}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle bottom gradient so dots/price always readable */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Status / off-plan badge (optional, shows if present) */}
        {displayStatus && (
          <span className="absolute top-3 left-3 z-20 bg-white/90 text-[ #01155E] text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {displayStatus}
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
      <div className="pt-3 pb-3 px-3 sm:pt-4 sm:pb-4 sm:px-4">

        {/* Price */}
        <h3 className="text-[18px] sm:text-[19px] lg:text-[20px] leading-tight font-bold text-[#01155E]">
          {displayPrice != null ? `AED ${Number(displayPrice).toLocaleString()}` : "Price on request"}
        </h3>

        {/* Title */}
        <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#222222] font-semibold truncate">
          {displayTitle}
        </p>

        {/* Location */}
        <p className="text-[13px] sm:text-[14px] text-[#67739E] mt-0.5 truncate">
          {[displayDistrict, displayCity].filter(Boolean).join(", ") || "N/A"}
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-3" />

        {/* Specs — each on its own line */}
        <div className="flex flex-col gap-1 text-[ #67739e] text-[13px] sm:text-[14px]">

          <div className="flex items-center gap-2">
            <img src={Icon3} className="w-4 h-4 shrink-0" alt="beds" />
            <span className="font-medium  text-[#67739e]">
              {formatBeds(bedsRaw)}{" "}
            </span>
          </div>

          <div className="flex items-center gap-2 ">
            <img src={Icon2} className="w-4 h-4 shrink-0" alt="baths" />
            <span className="font-medium text-[#67739e]">
              {displayBaths}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src={Icon1} className="w-4 h-4 shrink-0" alt="area" />
            <span className="font-medium  text-[#67739e]">
              {displayArea != null ? Number(displayArea).toLocaleString() : "N/A"} sqft
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapCard;