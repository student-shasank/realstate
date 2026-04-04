import React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import  {VITE_MAPBOX_TOKEN} from "../../Constant/constant.js"

// Aapna Mapbox Access Token yahan dalein
const MAPBOX_TOKEN = VITE_MAPBOX_TOKEN ;

export default function PropertyMap({ coordinates, title }) {
  // Mapbox GeoJSON mein coordinates [lng, lat] hote hain
  const lng = coordinates?.coordinates?.[0];
  const lat = coordinates?.coordinates?.[1];

  // Agar coordinates nahi hain toh map load mat karo
  if (!lng || !lat) return <div className="h-64 bg-gray-100 flex items-center justify-center rounded-xl">Map coordinates not available</div>;

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Navigation Controls (Zoom in/out) */}
        <NavigationControl position="top-right" />

        {/* Custom Marker */}
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <div className="relative flex flex-col items-center group">
            {/* Tooltip on Hover */}
            <div className="absolute bottom-10 bg-[#01155E] text-white text-xs py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {title}
            </div>
            {/* Icon */}
            <div className="bg-white p-2 rounded-full shadow-md border-2 border-[#01155E]">
              <MapPin size={24} className="text-[#01155E]" />
            </div>
          </div>
        </Marker>
      </Map>
    </div>
  );
}