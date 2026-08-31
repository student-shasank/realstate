import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommunityProfile,
  clearProfile,
} from "../../features/communities/communitySlice";
import imageurl from "../../assets/communitieshero.jpg";
import backgroundImage from "../../../src/assets/detailservicebackground.png";
import Communitiesoverview from "../../../src/assets/detailservicebackground.jpg";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { VITE_GOOGLE_MAPS_API_KEY } from "../../Constant/constant.js";
import { TrendingUp, MapPin, Home as HomeIcon, Building2 } from "lucide-react";

function CommunityProfile() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { currentProfile, loading } = useSelector((state) => state.community);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (slug) dispatch(fetchCommunityProfile(slug));
    return () => dispatch(clearProfile());
  }, [slug, dispatch]);

  // ✅ Icon picker helper — card ke title ke basis par icon choose karta hai
  const getCardIcon = (title = "") => {
    const t = title.toLowerCase();
    if (t.includes("developer")) return TrendingUp;
    if (t.includes("area") || t.includes("location")) return MapPin;
    if (t.includes("property") || t.includes("type")) return HomeIcon;
    return Building2; // default fallback icon
  };

  // ========================= GOOGLE MAP INIT (NEW API) =========================
  useEffect(() => {
    if (!currentProfile?.latitude || !currentProfile?.longitude) return;

    let map;
    let marker;
    let infoWindow;
    let isMounted = true;

    setOptions({
      key: VITE_GOOGLE_MAPS_API_KEY,
      v: "weekly",
    });

    const initMap = async () => {
      try {
        const { Map } = await importLibrary("maps");
        const { AdvancedMarkerElement } = await importLibrary("marker");
        const { InfoWindow } = await importLibrary("maps");

        if (!isMounted) return;

        const mapContainer = document.getElementById("community-map");
        if (!mapContainer) return;

        const position = {
          lat: Number(currentProfile.latitude),
          lng: Number(currentProfile.longitude),
        };

        // 1. Map initialization
        map = new Map(mapContainer, {
          center: position,
          zoom: 14,
          mapId: "DEMO_MAP_ID", // ⚠️ apna real Map ID yahan daalein
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
        });

        // 2. Marker
        marker = new AdvancedMarkerElement({
          map,
          position,
          title: currentProfile.title,
        });

        // 3. Always-visible Title Label
        infoWindow = new InfoWindow({
          content: `<b style="color:#01155E;font-family:'General Sans', sans-serif;font-size:14px;">${currentProfile.title}</b>`,
          disableAutoPan: true,
        });
        infoWindow.open({ map, anchor: marker });
      } catch (err) {
        console.error("Google Maps load error:", err);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (marker) marker.map = null;
      if (infoWindow) infoWindow.close();
    };
  }, [currentProfile]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold text-[#01155E]">
        Loading Community Data...
      </div>
    );

  if (!currentProfile)
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold text-red-600">
        Community Not Found!
      </div>
    );

  // ✅ EXACT DATA MAPPING (Sirf image logic update kiya backend ke liye)
  const cardData = (currentProfile.hero?.cards || []).map((c) => ({
    title: c.title,
    subtitle: c.subtitle,
    image: c.image || imageurl,
  }));

  const snapshotData = (currentProfile.marketSupply?.rows || []).map((r) => ({
    label: r.label,
    value: r.value,
  }));

  const faqs = (currentProfile.faqs || []).map((f) => ({
    q: f.q,
    a: f.a,
  }));

  return (
    <div>
      {/* ========================= 1) HERO SECTION ========================= */}
      <section className="relative flex flex-col items-center py-14 px-4 bg-white overflow-hidden">
        <div
          className="absolute top-0 left-0 z-0  h-[350px]  md:h-[452px] w-[990px] md:w-[990px] bg-no-repeat bg-left-top bg-contain opacity-40 md:opacity-100"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        <div className="relative z-10 w-full max-w-[1200px] flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col items-start">
            <h2 className="text-[#01155E] font-['Archivo'] font-semibold text-3xl md:text-[48px] leading-tight uppercase">
              {currentProfile.title}
            </h2>

            <div className="flex w-full max-w-[574px] mt-2">
              <div className="w-1/3 md:w-[240px] h-[6px] md:h-[8px] bg-[#01155E]"></div>
              <div className="flex-1 h-[2px] bg-[#01155E] self-end"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {cardData.map((card, index) => {
              const Icon = getCardIcon(card.title);
              return (
                <div
                  key={index}
                  className="w-full max-w-[362px] flex flex-col items-center group"
                >
                  <div className="w-full h-[350px] md:h-[393px] overflow-hidden rounded-[16px]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 w-full min-h-[80px] bg-white rounded-[12px] flex items-center gap-4 p-4 shadow-[0px_2px_10px_rgba(0,0,0,0.08)] border  border-[#e1e1e1]">
                    <div className="flex-shrink-0 w-[44px] h-[44px] rounded-[10px] bg-[#01155E] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#ffff]" strokeWidth={2} />
                    </div>

                    <div className="flex flex-col items-start text-left">
                      <h3 className="text-[#01155E] font-['General_Sans'] font-bold text-sm md:text-[16px] uppercase leading-snug tracking-wide">
                        {card.title}
                      </h3>
                      <p className="text-[#67739E] font-['General_Sans'] font-normal text-xs md:text-[14px] leading-snug">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================= 2) COMMUNITIES OVERVIEW SECTION ========================= */}
      <section className="bg-white w-full flex justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="w-full max-w-[1240px] flex flex-col lg:flex-row gap-10 lg:gap-16 items-start overflow-visible">
          <div className="flex-1 w-full min-w-0">
            <h1
              className="text-[#01155E] mb-6 sm:mb-8"
              style={{
                fontFamily: "Archivo, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: "100%",
              }}
            >
              Community Overview
            </h1>

            <div
              className="font-['General_Sans'] font-normal text-[#67739E] mb-8 space-y-4"
              style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: "140%" }}
              dangerouslySetInnerHTML={{ __html: currentProfile.overview?.html || "" }}
            />

            <div
              className="mb-8 mt-10 lg:mt-16 text-[#01155E] opacity-90"
              style={{ fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: "1.6", maxWidth: "450px" }}
              dangerouslySetInnerHTML={{
                __html: currentProfile.overview?.locationConnectivityHtml || "",
              }}
            />

            <div className="mb-10 mt-10 lg:mt-16 max-w-[450px]">
              <h2 className="font-['General_Sans'] font-semibold text-[20px] leading-[100%] mb-3 text-[#01155E]">
                Planning Note
              </h2>
              <div
                className="font-['General_Sans'] font-normal text-[#67739E]"
                style={{ fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: "140%" }}
                dangerouslySetInnerHTML={{ __html: currentProfile.planningNote?.html || "" }}
              />
            </div>

            <button
              className="bg-[#01155E] text-[#FBFBFB] rounded-[8px] px-6 py-4 font-['General_Sans'] font-semibold transition-all hover:bg-blue-900 w-full lg:max-w-[431px]"
              style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
            >
              Discover Your Neighbourhood
            </button>
          </div>

          <div className="flex-1 w-full flex flex-col items-start lg:items-start">
            <div className="relative w-full lg:max-w-[610px] aspect-[3/4] sm:aspect-square lg:h-[791px]">
              <img
                src={currentProfile.overview?.image || Communitiesoverview}
                alt="Community View"
                className="w-full h-full lg:absolute lg:inset-0 object-cover rounded-[20px] sm:rounded-[28px] lg:rounded-[32px]"
              />

              <div className="absolute top-4 -right-4 sm:top-6 sm:-right-6 lg:top-10 lg:-right-19 bg-[#001457] text-white rounded-[12px] sm:rounded-[16px] px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 flex items-center gap-2 sm:gap-3 lg:gap-4 shadow-2xl z-20">
                <span className="text-[28px] sm:text-[40px] lg:text-[60px] font-medium leading-none">
                  87+
                </span>
                <p className="text-[11px] sm:text-[14px] lg:text-[24px] font-medium leading-tight w-[120px] sm:w-[190px] lg:w-[241px]">
                  Successful Transactions Monthly
                </p>
              </div>

              <div className="absolute bottom-4 -left-4 sm:bottom-6 sm:-left-6 lg:bottom-8 lg:-left-19 bg-white text-[#001457] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 flex items-center gap-3 sm:gap-4 lg:gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-20 border border-gray-100">
                <span className="text-[28px] sm:text-[40px] lg:text-[64px] font-medium leading-none">
                  87+
                </span>
                <p className="text-[11px] sm:text-[14px] lg:text-[24px] font-medium leading-tight text-[#001457] w-[120px] sm:w-[190px] lg:w-[241px]">
                  Successful Transactions Monthly
                </p>
              </div>
            </div>

            <div className="mt-12 sm:mt-16 w-full lg:max-w-[467px] text-left">
              <h2 className="font-['General_Sans'] font-semibold text-[20px] leading-[100%] text-[#01155E] mb-4">
                Places of Worship
              </h2>

              <div
                className="font-['General_Sans'] font-normal text-[#67739E]"
                style={{ fontSize: "clamp(14px, 1.6vw, 16px)", lineHeight: "150%" }}
                dangerouslySetInnerHTML={{ __html: currentProfile.sidebar?.worshipHtml || "" }}
              />

              {isExpanded && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#01155E] animate-in fade-in slide-in-from-top-2 duration-500">
                  <div
                    className="font-['General_Sans'] font-normal text-[#67739E]"
                    style={{ fontSize: "15px", lineHeight: "150%" }}
                    dangerouslySetInnerHTML={{
                      __html: currentProfile.sidebar?.readMoreHtml || "",
                    }}
                  />
                </div>
              )}

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-block mt-6 font-['General_Sans'] font-medium underline text-[#01155E] cursor-pointer hover:opacity-70 transition-opacity"
                style={{ fontSize: "clamp(18px, 2.2vw, 24px)" }}
              >
                {isExpanded ? "Show Less" : "Read More..."}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= 3) MARKET DATA SECTION ========================= */}
      <div className="flex justify-center items-center min-h-screen  p-4">
        <div className="w-full max-w-[1200px] flex flex-col gap-[12px]">
          <div>
            <h1 className="text-[#01155E] font-['Archivo'] font-semibold text-[32px] md:text-[48px] leading-none">
              Market Data
            </h1>
            <div className="flex w-[264px]">
              <div className="w-[122px] h-[8px] bg-[#01155E]"></div>
              <div className="flex-1 h-[2px] bg-[#01155E]"></div>
            </div>
          </div>

          <div
            className="text-[#67739E] font-['General_Sans'] font-normal text-[16px] md:text-[18px] leading-tight max-w-[1200px] mt-10 mb-6"
            dangerouslySetInnerHTML={{ __html: currentProfile.marketData?.descriptionHtml || "" }}
          />

          <div className="relative w-full h-[250px] md:h-[366px] rounded-[16px] overflow-hidden shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] bg-[#01155E]">
            <img
              src={
                currentProfile.marketSupply?.image ||
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop"
              }
              alt="Modern Villa"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h2 className="text-[#01155E] font-['General_Sans'] font-medium text-[20px] md:text-[24px] underline underline-offset-4 decoration-1">
              {currentProfile.marketData?.activityNote?.title || "Market Activity Note"}
            </h2>

            <div className="flex flex-col gap-1 text-[#717171] font-['General_Sans']">
              <span className="text-[14px] md:text-[16px]   text-[#67739E] font-medium">
                {currentProfile.marketData?.activityNote?.updatedText || ""}
              </span>
              <span className="text-[18px] text-[#67739E] md:text-[20px] font-semibold text-[]">
                {currentProfile.marketData?.activityNote?.noteLine || ""}
              </span>
              <span className="text-[12px] md:text-[14px]  text-[#67739E] font-normal uppercase">
                {currentProfile.marketData?.activityNote?.source || ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================= 4) MARKET SUPPLY SECTION ========================= */}
      <div className="flex flex-col items-center w-full bg-white p-4 md:p-10 font-['General_Sans']">
        <div className="w-full max-w-[1200px] flex flex-col gap-10">
          <div className="flex justify-start">
            <div className="w-full md:w-[518px] md:h-[315px] bg-[#01155E] rounded-[16px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] flex flex-col items-center pt-[40px] pb-8 md:pb-0">
              <h2 className="text-[#FBFBFB] font-medium text-[24px] leading-none underline underline-offset-8 decoration-1 mb-[40px]">
                Market & Supply Snapshot
              </h2>

              <div className="flex w-full px-6 md:px-[60px]">
                <div className="w-[70%] md:w-[280px] flex flex-col gap-[20px] border-r border-[#FBFBFB]/30 pr-4">
                  {snapshotData.map((item, i) => (
                    <span
                      key={i}
                      className="text-[#FBFBFB] font-normal text-[14px] md:text-[18px] leading-none whitespace-nowrap"
                    >
                      {item.label}
                    </span>
                  ))}
                </div>

                <div className="flex-1 flex flex-col gap-[20px] items-center justify-center">
                  {snapshotData.map((item, i) => (
                    <span
                      key={i}
                      className="text-[#FBFBFB] font-normal text-[14px] md:text-[18px] leading-none"
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- GOOGLE MAP SECTION --- */}
          <div className="map-section mt-10 mb-10">
            <h2 className="text-2xl font-bold mb-4">Location & Directions</h2>
            <div
              id="community-map"
              style={{
                width: "100%",
                height: "450px",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            />
            <p className="text-gray-500 mt-2 text-sm">
              📍 {currentProfile.title} is located at coordinates:{" "}
              {currentProfile.latitude}, {currentProfile.longitude}
            </p>
          </div>

          {/* --- FAQS SECTION --- */}
          <div className="w-full flex flex-col gap-[16px]">
            <div className="pb-1 w-fit mb-4">
              <h1 className="text-[#01155E] font-['Archivo'] font-semibold text-[36px] md:text-[48px] leading-none">
                FAQs
              </h1>
              <div className="flex w-[464px]">
                <div className="w-[180px] h-[8px] bg-[#01155E]"></div>
                <div className="flex-1 h-[2px] bg-[#01155E]"></div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-[#01155E] font-semibold text-[20px] leading-none">
                    {faq.q}
                  </h3>
                  <p className="text-[#67739E] font-normal text-[16px] leading-tight">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* --- DISCLOSURE SECTION --- */}
          <div className="w-full mt-4">
            <h3 className="text-[#01155E] font-normal text-[20px] leading-none mb-2">
              Disclosure
            </h3>
            <div
              className="text-[#67739E] font-normal text-[16px] leading-relaxed max-w-[1200px]"
              dangerouslySetInnerHTML={{ __html: currentProfile.disclosure?.html || "" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityProfile;