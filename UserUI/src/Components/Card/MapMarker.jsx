import { useState } from "react";
import listingimage from "../../assets/listingcard.jpg";

const MapMarker = ({ item, isActive = false }) => {
  const [hovered, setHovered] = useState(false);

  const showPopup = hovered || isActive;

  const formatPrice = (price) => {
    if (!price) return "Price";
    if (price >= 1000000) return `AED ${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `AED ${(price / 1000).toFixed(0)}K`;
    return `AED ${price}`;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* HOVER CARD - Bayut style popup */}
      {showPopup && (
        <div
          className="absolute z-50 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
          style={{
            width: "220px",
            bottom: "52px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {/* Property Image */}
          <div className="w-full h-[110px] bg-gray-200 relative overflow-hidden">
            {item?.images?.[0] ? (
              <img
                src={listingimage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#01155E] to-[#1C4DFF] flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="p-3">
            <p className="text-[#01155E] font-bold text-[14px] leading-tight">
              {formatPrice(item?.price)}
            </p>

            {item?.area && (
              <div className="flex items-center gap-1 mt-1">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                <span className="text-[11px] text-gray-500">
                  {item.area} sqft
                </span>
              </div>
            )}

            <p className="text-[11px] text-gray-500 mt-1 truncate">
              {item?.location?.address || item?.title || "UAE Property"}
            </p>
          </div>

          {/* Triangle pointer */}
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid white",
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
            }}
          />
        </div>
      )}

      {/* DEFAULT: Purple Home Icon with count (Bayut style) */}
      <div
        style={{
          background: "#7B2FBE",
          borderRadius: "20px 20px 20px 4px",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
          transition: "all 0.15s ease",
          transform: showPopup ? "scale(1.08)" : "scale(1)",
          border: showPopup ? "2px solid #fff" : "2px solid transparent",
        }}
      >
        {/* Home Icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" fill="white" />
        </svg>

        {/* Count badge */}
        <span
          style={{
            background: "white",
            color: "#7B2FBE",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: "800",
            lineHeight: 1,
          }}
        >
          1
        </span>
      </div>
    </div>
  );
};

export default MapMarker;