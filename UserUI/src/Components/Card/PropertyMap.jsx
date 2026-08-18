import React, { useMemo } from 'react';
import { GoogleMap, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import { VITE_GOOGLE_MAPS_API_KEY } from "../../Constant/constant.js";

/**
 * Parses coordinates from multiple formats:
 *  - GeoJSON object:  { type: "Point", coordinates: [lng, lat] }
 *  - latlong string:  "25.063013993390086,55.23122382705161"
 *  - Plain object:    { lat, lng } or { latitude, longitude }
 *  - Array:           [lat, lng]
 */
function parseCoords(coordinates, latlong) {
  // 1. GeoJSON: { type: "Point", coordinates: [lng, lat] }
  if (
    coordinates?.type === "Point" &&
    Array.isArray(coordinates?.coordinates) &&
    coordinates.coordinates.length >= 2
  ) {
    const [lng, lat] = coordinates.coordinates;
    if (!isNaN(lng) && !isNaN(lat)) return { lat: Number(lat), lng: Number(lng) };
  }

  // 2. Plain object: { lat, lng }
  if (coordinates && typeof coordinates === "object" && !Array.isArray(coordinates)) {
    const lat = coordinates.lat ?? coordinates.latitude ?? null;
    const lng = coordinates.lng ?? coordinates.lon ?? coordinates.longitude ?? null;
    if (lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng)) {
      return { lat: Number(lat), lng: Number(lng) };
    }
  }

  // 3. Array: [lat, lng]
  if (Array.isArray(coordinates) && coordinates.length >= 2) {
    const [a, b] = coordinates;
    if (!isNaN(a) && !isNaN(b)) return { lat: Number(a), lng: Number(b) };
  }

  // 4. latlong string: "25.063013993390086,55.23122382705161"
  const latlongStr = latlong || (typeof coordinates === "string" ? coordinates : null);
  if (latlongStr && typeof latlongStr === "string" && latlongStr.trim() !== "") {
    const parts = latlongStr.split(",").map((s) => parseFloat(s.trim()));
    if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { lat: parts[0], lng: parts[1] };
    }
  }

  return null;
}

export default function PropertyMap({ coordinates, latlong, title }) {
  const parsed = useMemo(
    () => parseCoords(coordinates, latlong),
    [coordinates, latlong]
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!parsed) {
    return (
      <div className="h-64 bg-gray-100 flex items-center justify-center rounded-xl text-gray-500">
        Map coordinates not available
      </div>
    );
  }

  const { lat, lng } = parsed;

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {isLoaded ? (
        <GoogleMap
          center={{ lat, lng }}
          zoom={14}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          <OverlayView
            position={{ lat, lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -height,
            })}
          >
            {/* ===== Professional Pin Marker ===== */}
            <div className="relative flex flex-col items-center group">
              {/* Title tooltip - shows on hover */}
              <div
                className="absolute -top-2 -translate-y-full bg-[#01155E] text-white text-[12px] font-semibold py-1.5 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
                style={{ maxWidth: "220px" }}
              >
                {title || "Property Location"}
                {/* tooltip's own little arrow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-5px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid #01155E",
                  }}
                />
              </div>

              {/* Pin body */}
              <div
                className="flex items-center justify-center bg-[#01155E] rounded-full shadow-lg transition-transform duration-150 group-hover:scale-110"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #FFFFFF",
                  boxShadow: "0 4px 12px rgba(1,21,94,0.4)",
                }}
              >
                <MapPin size={18} className="text-white" fill="white" fillOpacity={0.15} />
              </div>

              {/* Pointer tail */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "7px solid transparent",
                  borderRight: "7px solid transparent",
                  borderTop: "9px solid #01155E",
                  marginTop: "-2px",
                  filter: "drop-shadow(0 2px 1px rgba(0,0,0,0.15))",
                }}
              />

              {/* Pulse ring effect */}
              <div
                className="absolute rounded-full bg-[#01155E] opacity-20 animate-ping"
                style={{
                  width: "40px",
                  height: "40px",
                  top: 0,
                }}
              />
            </div>
          </OverlayView>
        </GoogleMap>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#01155E] font-semibold bg-gray-50">
          Loading map...
        </div>
      )}
    </div>
  );
}