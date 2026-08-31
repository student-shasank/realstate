import React, { useMemo, useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import MapCard from "./MapCard.jsx";

// ────────────────────────────────────────────────────────────
// Coordinate extraction — unified with PropertyMap.jsx's
// `parseCoords`. The old version here only understood two shapes
// (Ready-listing `location.coordinates.coordinates` array, and
// off-plan `latlong` string), so any listing whose coordinates
// were saved under a different shape — a full GeoJSON object
// (`{ type: "Point", coordinates: [lng, lat] }`), a plain
// `{ lat, lng }` / `{ latitude, longitude }` object, or a bare
// `[lat, lng]` array — silently returned `null` and got filtered
// out of `validListings`, so its marker never appeared even
// though the listing itself was valid.
//
// This now checks every shape the DB actually uses, in order:
//   1. GeoJSON Point object            -> { type:"Point", coordinates:[lng,lat] }
//   2. Ready-listing nested GeoJSON    -> item.location.coordinates.coordinates: [lng,lat]
//   3. Plain object                    -> { lat, lng } / { latitude, longitude } / { lon }
//   4. Bare array                      -> [lat, lng]  (off-plan style ordering)
//   5. "lat,lng" string                -> item.latlong, or item.location.coordinates as a string
//   6. Flat top-level fields           -> item.latitude / item.longitude (or item.lat / item.lng)
//
// Internally resolves to { lat, lng }, then this file converts to
// the [lng, lat] tuple Mapbox's Marker/Map expect at the call site.
// ────────────────────────────────────────────────────────────
const parseCoords = (coordinates, latlong) => {
  // 1. GeoJSON Point object: { type: "Point", coordinates: [lng, lat] }
  if (
    coordinates?.type === "Point" &&
    Array.isArray(coordinates?.coordinates) &&
    coordinates.coordinates.length >= 2
  ) {
    const [lng, lat] = coordinates.coordinates;
    if (!isNaN(lng) && !isNaN(lat)) return { lat: Number(lat), lng: Number(lng) };
  }

  // 2. Ready-listing nested GeoJSON array directly: coordinates.coordinates -> [lng, lat]
  if (
    coordinates &&
    typeof coordinates === "object" &&
    Array.isArray(coordinates?.coordinates) &&
    coordinates.coordinates.length >= 2
  ) {
    const [lng, lat] = coordinates.coordinates;
    if (!isNaN(lng) && !isNaN(lat)) return { lat: Number(lat), lng: Number(lng) };
  }

  // 3. Plain object: { lat, lng } / { latitude, longitude } / { lon }
  if (coordinates && typeof coordinates === "object" && !Array.isArray(coordinates)) {
    const lat = coordinates.lat ?? coordinates.latitude ?? null;
    const lng = coordinates.lng ?? coordinates.lon ?? coordinates.longitude ?? null;
    if (lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng)) {
      return { lat: Number(lat), lng: Number(lng) };
    }
  }

  // 4. Bare array: [lat, lng]
  if (Array.isArray(coordinates) && coordinates.length >= 2) {
    const [a, b] = coordinates;
    if (!isNaN(a) && !isNaN(b)) return { lat: Number(a), lng: Number(b) };
  }

  // 5. "lat,lng" string — either the dedicated `latlong` field, or
  // `coordinates` itself stored as a plain string.
  const latlongStr = latlong || (typeof coordinates === "string" ? coordinates : null);
  if (latlongStr && typeof latlongStr === "string" && latlongStr.trim() !== "") {
    const parts = latlongStr.split(",").map((s) => parseFloat(s.trim()));
    if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { lat: parts[0], lng: parts[1] };
    }
  }

  return null;
};

// Tries every field name a listing document might use, across all
// known source shapes, and returns [lng, lat] (Mapbox order) or
// null if truly nothing usable is present.
const getCoordinates = (item) => {
  const parsed =
    // Ready listing: item.location.coordinates (GeoJSON or nested array)
    parseCoords(item?.location?.coordinates, item?.latlong) ||
    // Some docs may keep GeoJSON/coords directly on item.coordinates
    parseCoords(item?.coordinates, item?.latlong) ||
    // Flat top-level lat/lng fields (item.latitude/longitude or item.lat/lng)
    parseCoords(
      {
        lat: item?.latitude ?? item?.lat,
        lng: item?.longitude ?? item?.lng ?? item?.lon,
      },
      null
    ) ||
    // Last resort: only the latlong string, nothing else present
    parseCoords(null, item?.latlong);

  if (!parsed) return null;
  return [parsed.lng, parsed.lat];
};

const MapSection = ({ listings = [] }) => {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const [selected, setSelected] = useState(null);

  const validListings = useMemo(() => {
    return listings.filter((item) => getCoordinates(item) !== null);
  }, [listings]);

  const defaultCenter = getCoordinates(validListings[0]) || [55.136, 25.112];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4 h-[700px]">
      {/* Left Side Cards */}
      <div className="overflow-y-auto pr-2 space-y-4">
        {validListings.map((item) => (
          <div
            key={item._id?.$oid || item._id}
            onClick={() => setSelected(item)}
            className="cursor-pointer border border-gray-200 rounded-2xl p-3 hover:shadow-md transition"
          >
            <MapCard item={item} />
          </div>
        ))}
      </div>

      {/* Right Side Map */}
      <div className="rounded-2xl overflow-hidden border border-gray-200">
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            longitude: defaultCenter[0],
            latitude: defaultCenter[1],
            zoom: 11,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          style={{ width: "100%", height: "100%" }}
        >
          <NavigationControl position="top-right" />

          {validListings.map((item) => {
            const coords = getCoordinates(item);
            if (!coords) return null;
            const [lng, lat] = coords;

            return (
              <Marker
                key={item._id?.$oid || item._id}
                longitude={lng}
                latitude={lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelected(item);
                }}
              >
                <div className="bg-[#01155E] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg cursor-pointer">
                  AED {Number(item?.price || 0).toLocaleString()}
                </div>
              </Marker>
            );
          })}

          {selected &&
            (() => {
              const selectedCoords = getCoordinates(selected);
              if (!selectedCoords) return null;
              const [selLng, selLat] = selectedCoords;

              return (
                <Popup
                  longitude={selLng}
                  latitude={selLat}
                  anchor="top"
                  closeOnClick={false}
                  onClose={() => setSelected(null)}
                  offset={20}
                >
                  <div className="min-w-[220px]">
                    <h3 className="font-bold text-sm text-[#01155E]">
                      {selected?.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {selected?.location?.community}, {selected?.location?.city}
                    </p>
                    <p className="text-sm font-semibold mt-2">
                      AED {Number(selected?.price || 0).toLocaleString()}
                    </p>
                  </div>
                </Popup>
              );
            })()}
        </Map>
      </div>
    </div>
  );
};

export default MapSection;