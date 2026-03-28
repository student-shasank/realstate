import React, { useMemo, useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import MapCard from "./MapCard.jsx";

const MapSection = ({ listings = [] }) => {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const [selected, setSelected] = useState(null);

  const validListings = useMemo(() => {
    return listings.filter(
      (item) =>
        item?.location?.coordinates?.coordinates &&
        Array.isArray(item.location.coordinates.coordinates) &&
        item.location.coordinates.coordinates.length === 2
    );
  }, [listings]);

  const defaultCenter = validListings[0]?.location?.coordinates?.coordinates || [55.136, 25.112];

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
            const [lng, lat] = item.location.coordinates.coordinates;

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

          {selected && (
            <Popup
              longitude={selected.location.coordinates.coordinates[0]}
              latitude={selected.location.coordinates.coordinates[1]}
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
          )}
        </Map>
      </div>
    </div>
  );
};

export default MapSection;