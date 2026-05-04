import React, { useMemo } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { VITE_MAPBOX_TOKEN } from "../../Constant/constant.js";

const MAPBOX_TOKEN = VITE_MAPBOX_TOKEN;

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
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="top-right" />

        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <div className="relative flex flex-col items-center group">
            <div className="absolute bottom-10 bg-[#01155E] text-white text-xs py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {title}
            </div>
            <div className="bg-white p-2 rounded-full shadow-md border-2 border-[#01155E]">
              <MapPin size={24} className="text-[#01155E]" />
            </div>
          </div>
        </Marker>
      </Map>
    </div>
  );
}