import { useState } from "react";
import listingimage from "../../assets/ListingCard.jpg";

const MapMarker = ({ item, isActive = false, onClose }) => {
  const [hovered, setHovered] = useState(false);
  const [closed, setClosed] = useState(false);

  const showPopup = (hovered || isActive) && !closed;

  // Format price range or single price
  const formatPrice = (min, max) => {
    const price = min || max;
    if (!price) return "Price on request";
    return `AED ${Number(price).toLocaleString("en-US")}`;
  };

  // Off Plan / Ready decided from expected_delivery_date
  const getBadgeText = () => {
    if (item?.expected_delivery_date) {
      const delivery = new Date(item.expected_delivery_date);
      const today = new Date();
      return delivery > today ? "Off Plan" : "Ready";
    }
    return "Off Plan";
  };

  const badgeText = getBadgeText();

  // Format delivery date as "Q3 2027" style
  const formatDeliveryQuarter = (dateStr) => {
    if (!dateStr) return "Ready";
    const date = new Date(dateStr);
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    return `Q${quarter} ${date.getFullYear()}`;
  };

  return (
    <div
      className="relative z-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* HOVER CARD - matches reference design */}
      {showPopup && (
        <div
          className="absolute z-50 bg-white rounded-2xl shadow-2xl overflow-visible"
          style={{
            width: "340px",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px",
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setClosed(true);
              onClose && onClose();
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "#fff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="flex" style={{ gap: "14px" }}>
            {/* LEFT: Image with badge */}
            <div
              className="relative rounded-xl overflow-hidden flex-shrink-0"
              style={{ width: "130px", height: "160px" }}
            >
              <img
                src={item?.feature_image || listingimage}
                alt={item?.feature_image_alt_text || item?.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = listingimage;
                }}
              />

              {/* Status badge (Off Plan / Ready) */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  background: "#FFFFFF",
                  color: "#01155E",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "5px 10px",
                  borderRadius: "20px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              >
                {badgeText}
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="flex flex-col justify-start pt-1 min-w-0 flex-1">
              <p
                className="text-[ #01155E ] font-bold truncate"
                style={{ fontSize: "17px", lineHeight: "1.2" }}
                title={item?.title}
              >
                {item?.title || "Property Title"}
              </p>

              <p
                className="text-[ #67739E] truncate"
                style={{ fontSize: "13px", marginTop: "2px" }}
              >
                {item?.developer_name || "Developer Name"}
              </p>

              <div
                style={{
                  borderBottom: "1px solid #EDEDED",
                  margin: "10px 0",
                }}
              />

              <p className="text-[ #67739E]" style={{ fontSize: "13px" }}>
                from:
              </p>
              <p
                className="font-bold text-[ #01155E]"
                style={{ fontSize: "22px", marginTop: "2px" }}
              >
                {formatPrice(item?.min_price, item?.max_price)}
              </p>

              <p className="text-gray-400" style={{ fontSize: "13px", marginTop: "8px" }}>
                {formatDeliveryQuarter(item?.expected_delivery_date)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DEFAULT: Purple Home Icon marker with count */}
      <div
        style={{
          background: "#0f2988",
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" fill="white" />
        </svg>

        <span
          style={{
            background: "white",
            color: "#0f2988",
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