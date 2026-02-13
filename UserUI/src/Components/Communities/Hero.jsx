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

function CommunityProfile() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { currentProfile, loading } = useSelector((state) => state.community);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (slug) dispatch(fetchCommunityProfile(slug));
    return () => dispatch(clearProfile());
  }, [slug, dispatch]);

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

  // ✅ EXACT DATA MAPPING (aapke JSON ke hisaab se)
  const cardData = (currentProfile.hero?.cards || []).map((c) => ({
    title: c.title,
    subtitle: c.subtitle,
    image: imageurl, // ✅ bydefault (as you said)
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
      <section className="flex flex-col items-center py-12 bg-white">
        <div
          className="absolute top-0 left-0 z-0 h-[452px] w-[990px] bg-no-repeat bg-left-top bg-contain"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Container for Heading and Content */}
        <div className="w-[1200px] flex flex-col gap-10">
          {/* Heading Section */}
          <div className="relative">
            <h2 className="text-[#01155E] font-['Archivo'] font-semibold text-[48px] leading-[100%] uppercase">
              {currentProfile.title}
            </h2>

            {/* Underline Decoration */}
            <div className="flex w-[574px]">
              <div className="w-[240px] h-[8px] bg-[#01155E]"></div>
              <div className="flex-1 h-[2px] bg-[#01155E]"></div>
            </div>
          </div>

          {/* Background Decorative Container */}
          <div
            className="relative w-[976.89px] h-[427.20px] rotate-[-180deg] opacity-100 self-center"
            style={{ backgroundImage: "url('your-bg-pattern-url')" }}
          >
            {/* same as your code */}
          </div>

          {/* Cards Grid */}
          <div className="flex justify-between items-start -mt-[450px] z-10">
            {cardData.map((card, index) => (
              <div key={index} className="w-[362px] h-[511px] flex flex-col items-center">
                {/* Card Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-[362px] h-[393px] rounded-[16px] object-cover"
                />

                {/* Down Button / Info Section */}
                <div className="mt-[18px] w-[361px] h-[100px] bg-[#01155E] rounded-[5px] flex flex-col justify-center items-center gap-[10px] p-[10px]">
                  <h3 className="text-[#FBFBFB] font-['General_Sans'] font-semibold text-[20px] leading-[100%] text-center">
                    {card.title}
                  </h3>
                  <p className="text-[#FBFBFB] font-['General_Sans'] font-normal text-[20px] leading-[100%] text-center">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= 2) COMMUNITIES OVERVIEW SECTION ========================= */}
      <section className="flex flex-col md:flex-row w-full max-w-[1200px] mx-auto p-8 gap-12 bg-white text-[#01155E]">
        {/* Left Column: Content */}
        <div className="flex-1 max-w-[511px]">
          <h1 className="font-['Archivo'] font-medium text-[48px] leading-[100%] mb-6">
            Community Overview
          </h1>

          {/* overview.html (same style, just dynamic content) */}
          <div
            className="font-['General_Sans'] font-normal text-[20px] leading-[120%]  text-[#67739E]  mb-8 space-y-4"
            dangerouslySetInnerHTML={{ __html: currentProfile.overview?.html || "" }}
          />

          {/* Location & Connectivity (admin html) */}
          <div
            className="mb-8 max-w-[374px] mt-16 text-[18px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentProfile.overview?.locationConnectivityHtml || "" }}
          />

          {/* Planning Note */}
          <div className="mb-8 max-w-[374px]  mt-16">
            <h2 className="font-['General_Sans'] font-semibold text-[20px] leading-[100%] mb-3">
              Planning Note
            </h2>

            <div
              className="font-['General_Sans'] font-normal text-[18px] leading-[140%] text-[#67739E]"
              dangerouslySetInnerHTML={{ __html: currentProfile.planningNote?.html || "" }}
            />
          </div>

          <button
            className="
              w-[431px] 
              h-[50px] 
              flex 
              items-center 
              justify-center 
              bg-[#01155E] 
              text-[#FBFBFB] 
              rounded-[8px] 
              p-[12px] 
              font-['General_Sans'] 
              font-semibold 
              text-[20px] 
              leading-none 
              hover:bg-blue-900 
              transition-colors
            "
          >
            Discover Your Neighbourhood
          </button>
        </div>

        {/* Right Column: Image and Worship Info */}
        <div className="flex-1 relative">
          <div className="relative w-full max-w-[610px] h-[791px]">
            <img
              src={Communitiesoverview}
              alt="Community View"
              className="w-full h-full object-cover rounded-[24px] overflow-hidden"
            />

            {/* Dark Transaction Card */}
            <div className="absolute top-[36px] -right-[90px] w-[384px] h-[112px] bg-[#01155E] rounded-[24px] p-2 flex items-center shadow-[0px_0px_100px_0px_rgba(255,255,255,0.5)] z-10">
              <div className="text-white flex items-center gap-4 ml-6">
                <span className="text-5xl font-bold">87+</span>
                <span className="text-[24px] font-medium leading-tight">
                  Successful <br />
                  Transactions Monthly
                </span>
              </div>
            </div>

            {/* White Transaction Card */}
            <div className="absolute top-[637px] -left-[75px] w-[403px] h-[112px] bg-[#FBFBFB] rounded-[24px] p-[8px] flex items-center shadow-[0px_0px_100px_0px_#FFFFFF] z-10">
              <div className="flex items-center gap-[10px] ml-[20px]">
                <span className="text-[#01155E] text-[64px] font-bold leading-none">87+</span>
                <span className="text-[#01155E] font-['General_Sans'] font-medium text-[24px] leading-[100%]">
                  Successful <br />
                  Transactions Monthly
                </span>
              </div>
            </div>
          </div>

          {/* Places of Worship */}
          <div className="mt-8 max-w-[467px]">
            <h2 className="font-['General_Sans'] font-semibold text-[20px] leading-[100%] text-[#01155E] m-0">
              Places of Worship
            </h2>

            <div
              className="font-['General_Sans'] font-normal text-[16px] leading-[150%]  "
              dangerouslySetInnerHTML={{ __html: currentProfile.sidebar?.worshipHtml || "" }}
            />

            {isExpanded && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#01155E] animate-in fade-in duration-500">
                <div
                  className="font-['General_Sans'] font-normal text-[16px] leading-[150%] text-[#67739E]"
                  dangerouslySetInnerHTML={{ __html: currentProfile.sidebar?.readMoreHtml || "" }}
                />
              </div>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-block mt-6 font-['General_Sans'] font-medium text-[24px] leading-[100%] underline text-[#01155E] cursor-pointer hover:opacity-80"
            >
              {isExpanded ? "Show Less" : "Read More..."}
            </button>
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
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop"
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
          {/* --- MARKET & SUPPLY SNAPSHOT --- */}
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

