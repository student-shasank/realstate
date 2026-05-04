import React, { useState } from "react";
import listingimage from '../../assets/ListingCard.jpg'
import { BedDouble, Bath, Square } from "lucide-react";
import Icon1 from '../../assets/icon1.png'
import Icon2 from '../../assets/icon2.png'
import Icon3 from '../../assets/icon3.png'


const MapCard = ({ item }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  // Default image if none provided
   const IMG = listingimage;
  
  const images=[IMG, IMG, IMG]; // Mocking multiple for slider dots

  return (
    <div className="w-full bg-white overflow-hidden transition-all duration-300">
      {/* --- Image Section --- */}
      <div className="relative w-full h-[180px] group rounded-xl overflow-hidden">
        <img 
          src={images[currentImg]} 
          alt={item?.title} 
          className="w-full h-full object-cover"
        />

        {/* TruCheck Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-black">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span className="text-[11px] font-bold text-gray-800">TruCheck™</span>
        </div>

        {/* Heart / Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlisted ? "#ef4444" : "rgba(0,0,0,0.3)"} stroke="white" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Image Navigation Arrows */}
        <button 
          onClick={(e) => { e.stopPropagation(); setCurrentImg(prev => prev === 0 ? images.length - 1 : prev - 1); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); setCurrentImg(prev => prev === images.length - 1 ? 0 : prev + 1); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.slice(0, 5).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all ${i === currentImg ? "w-1.5 bg-white" : "w-1.5 bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      {/* --- Details Section --- */}
      <div className="pt-3 pb-2">
        {/* Price */}
        <h3 className="text-[18px] font-bold text-[#222222]">
          AED {item.min_price?.toLocaleString() || "10,00,239"}
        </h3>

        {/* Specs (Beds, Baths, Area) */}
       <div className="flex items-center gap-3 mt-1 text-[#444444] text-[14px]">

  {/* Bedrooms */}
  {item?.bedrooms === 0 || item?.bedrooms === "Studio" ? (
    <span>Studio</span>
  ) : (
    <div className="flex items-center gap-1.5">
      <img src={Icon3} alt="bedroom icon" className="w-4 h-4 object-contain" />
      <span>   {item.beds || "N/A"}</span>
    </div>
  )}

  {/* Bathrooms */}
  <div className="flex items-center gap-1.5">
    <img src={Icon2} alt="bathroom icon" className="w-4 h-4 object-contain" />
    <span> {item.baths || "N/A"}</span>
  </div>

  {/* Area (sqft) */}
  <div className="flex items-center gap-1.5">
    <img src={Icon1} alt="area icon" className="w-4 h-4 object-contain" />
    <span>{item.max_area?.toLocaleString()} sqft</span>
  </div>

</div>
        {/* Title / Location */}
        <p className="mt-2 text-[16px] text-[#01155E]  font-semibold truncate leading-tight">
          {item?.title || "Eagle Heights, Dubai Sports City, Dubai"}
        </p>

        {/* Agency Name */}
        <p className="text-[16px] text-[#67739E] mt-1  tracking-tight">
          <span>
  {[
    item?.district_name,
    item?.city_name
  ].filter(Boolean).join(", ") || "N/A"}
</span>
        </p>
      </div>
    </div>
  );
};

export default MapCard;