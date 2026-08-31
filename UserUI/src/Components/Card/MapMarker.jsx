import { useState } from "react";
import listingimage from "../../assets/ListingCard.jpg";

const MapMarker = ({ item, isActive = false, onClose }) => {
  const [hovered, setHovered] = useState(false);
  const [closed, setClosed] = useState(false);

  const showPopup = (hovered || isActive) && !closed;

  // ============================================================
  // 🔧 FIX (price): real off-plan docs don't have `min_price` /
  // `max_price` — price lives under `price_start` / `price_end`.
  // Those are also often the STRING '0.00' when a developer
  // hasn't set a real price (i.e. "price on request"), so
  // Number('0.00') = 0 must be treated as "no price".
  // getPrice() checks min/max_price first (other sources may use
  // these), falls back to price_start/price_end, and only
  // accepts values > 0.
  // ============================================================
  const getPrice = (item) => {
    if (item?.price_upon_request) return null;

    const candidates = [
      item?.min_price,
      item?.max_price,
      item?.price_start,
      item?.price_end,
    ];

    for (const raw of candidates) {
      if (raw === null || raw === undefined || raw === "") continue;
      const n = Number(raw);
      if (!isNaN(n) && n > 0) return n;
    }

    return null;
  };

  // Format price range or single price
  const formatPrice = (item) => {
    const price = getPrice(item);
    if (!price) return "Price on request";
    return `AED ${price.toLocaleString("en-US")}`;
  };

  // Compact price for the marker pill itself (e.g. "1.4M", "709K")
  const formatCompactPrice = (item) => {
    const price = getPrice(item);
    if (!price) return "N/A";
    if (price >= 1_000_000) {
      const val = price / 1_000_000;
      return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}M`;
    }
    if (price >= 1_000) {
      const val = price / 1_000;
      return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}K`;
    }
    return price.toString();
  };

  // ============================================================
  // 🔧 FIX (badge/date): the real document doesn't have
  // `expected_delivery_date` at all — the actual field is
  // `expected_completion_date` (e.g. '2026-03-31'). The old code
  // only ever checked expected_delivery_date, so it was always
  // undefined → badge always fell back to "Off Plan" and quarter
  // always fell back to "Ready", regardless of the real status.
  // getDeliveryDate() checks both field names; project_completed
  // (explicit boolean on the doc) takes priority when present.
  // ============================================================
  const getDeliveryDate = (item) =>
    item?.expected_delivery_date || item?.expected_completion_date || null;

  const getBadgeText = (item) => {
    if (item?.project_completed) return "Ready";
    const raw = getDeliveryDate(item);
    if (raw) {
      const delivery = new Date(raw);
      const today = new Date();
      if (!isNaN(delivery.getTime())) {
        return delivery > today ? "Off Plan" : "Ready";
      }
    }
    return "Off Plan";
  };

  // Format delivery date as "Q3 2027" style
  const formatDeliveryQuarter = (item) => {
    if (item?.project_completed) return "Ready";
    const dateStr = getDeliveryDate(item);
    if (!dateStr) return "Ready";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Ready";
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    return `Q${quarter} ${date.getFullYear()}`;
  };

  // ============================================================
  // 🔧 FIX (image): `item.feature_image` doesn't exist as a flat
  // string on the real document. The photo actually lives under
  // `item.images.feature` (off-plan shape) or inside
  // `item.all_images[0]` (gallery array). getMarkerImage() checks
  // every shape we know about so the popup thumbnail isn't stuck
  // on the placeholder.
  // ============================================================
  const getMarkerImage = (item) => {
    const candidate =
      item?.feature_image ||
      item?.images?.feature ||
      (Array.isArray(item?.all_images) && item.all_images[0]) ||
      (Array.isArray(item?.images) && item.images[0]) ||
      null;

    if (!candidate) return listingimage;
    if (typeof candidate === "string") return candidate;
    return candidate?.url || candidate?.secure_url || candidate?.imageUrl || listingimage;
  };

  const badgeText = getBadgeText(item);
  const isHighlighted = showPopup;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", zIndex: isHighlighted ? 60 : 10 }}
    >
      {/* HOVER CARD - matches reference design */}
      {showPopup && (
        <div
          className="absolute z-50 bg-white rounded-2xl shadow-2xl overflow-visible"
          style={{
            width: "340px",
            bottom: "56px",
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
                src={getMarkerImage(item)}
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
                className="text-[#01155E] font-bold truncate"
                style={{ fontSize: "17px", lineHeight: "1.2" }}
                title={item?.title}
              >
                {item?.title || "Property Title"}
              </p>

              <p
                className="text-[#67739E] truncate"
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

              <p className="text-[#67739E]" style={{ fontSize: "13px" }}>
                from:
              </p>
              <p
                className="font-bold text-[#01155E]"
                style={{ fontSize: "22px", marginTop: "2px" }}
              >
                {formatPrice(item)}
              </p>

              <p className="text-gray-400" style={{ fontSize: "13px", marginTop: "8px" }}>
                {formatDeliveryQuarter(item)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DEFAULT: Professional price-pill marker with pointer tail */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: isHighlighted ? "scale(1.08) translateY(-2px)" : "scale(1)",
          transition: "transform 0.15s ease, background 0.15s ease",
        }}
      >
        {/* Pill body */}
        <div
          style={{
            background: isHighlighted ? "#01155E" : "#FFFFFF",
            color: isHighlighted ? "#FFFFFF" : "#01155E",
            border: isHighlighted ? "1px solid #01155E" : "1px solid #E2E5EC",
            borderRadius: "18px",
            padding: "7px 12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: isHighlighted
              ? "0 6px 16px rgba(1,21,94,0.35)"
              : "0 2px 8px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap",
            fontFamily: "inherit",
          }}
        >
          <span
            style={{
              fontSize: "12.5px",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            AED {formatCompactPrice(item)}
          </span>

          {/* Status dot */}
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background:  "#22C55E" ,
              flexShrink: 0,
            }}
          />
        </div>

        {/* Pointer tail — points exactly at the coordinate */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: `7px solid ${isHighlighted ? "#01155E" : "#FFFFFF"}`,
            filter: "drop-shadow(0 2px 1px rgba(0,0,0,0.12))",
            marginTop: "-1px",
          }}
        />
      </div>
    </div>
  );
};

export default MapMarker;