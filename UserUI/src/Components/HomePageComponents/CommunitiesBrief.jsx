import React from "react";
import imageurl from "../../assets/underline.png";
import firstcard from "../../assets/community.jpg";
import Secondcard from "../../assets/community.jpg";

export default function CommunitiesBrief() {
  return (
    <section className="w-full bg-white overflow-hidden">
      {/* --- Header Section --- */}
      <div className="max-w-[1200px] mx-auto px-5 lg:px-0 pt-12 lg:pt-16">
        <div className="max-w-2xl">
          <h2
            className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#001A54] inline-block pb-4 lg:pb-6 leading-tight"
            style={{
              fontFamily: "Archivo, sans-serif",
              backgroundImage: `url(${imageurl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 90%",
              backgroundSize: "457px 6px",
            }}
          >
            Communities brief
          </h2>
        </div>

        <div className="mt-5 space-y-4">
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#01155E99] ">
            Dubai is a city of distinct communities, not one uniform market.
            Prices, supply, rental demand, and lifestyle vary meaningfully
            from one neighbourhood to the next.
          </p>

          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#01155E99] ">
            Yupland delivers structured, research-driven community intelligence
            so you can understand each location clearly and assess
            opportunities with confidence, aligned with your budget, goals,
            and investment strategy.
          </p>
        </div>

        <button className="mt-8 bg-[#001A54] text-white w-full sm:w-auto min-w-[280px] lg:w-[431px] h-[50px] rounded-md text-[16px] lg:text-[20px] font-semibold transition-all duration-300 hover:bg-[#01206b]">
          Discover Your Neighbourhood
        </button>
      </div>

      {/* --- Cards Section --- */}
      <div className="max-w-[1200px] mx-auto px-5 lg:px-0 pt-12 pb-14">
        {/* FIRST ROW */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* CARD 1 */}
          <div
            className="relative w-full lg:w-[732px] h-[220px] lg:h-[252px] rounded-[20px] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${firstcard})` }}
          >
            <div className="absolute inset-0 bg-[#01155E]/60" />

            <div className="absolute bottom-6 left-6 md:top-8 md:left-8 max-w-[85%] border-l-[3px] border-white pl-4">
              <p className="text-[20px] md:text-[22px] font-semibold text-white underline decoration-white">
                Downtown Dubai
              </p>

              <p className="text-[15px] md:text-[20px] text-white font-light leading-relaxed mt-1">
                Prime luxury high-rise living
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div
            className="relative w-full lg:w-[456px] h-[220px] lg:h-[252px] rounded-[20px] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${Secondcard})` }}
          >
            <div className="absolute inset-0 bg-[#01155E]/60" />

            <div className="absolute bottom-6 left-6 md:top-8 md:left-8 max-w-[85%] border-l-[3px] border-white pl-4">
              <p className="text-[20px] md:text-[22px] font-semibold text-white underline decoration-white">
                Jumeirah Village
              </p>

              <p className="text-[15px] md:text-[20px] text-white font-light leading-relaxed mt-1">
                Circle Affordable homes with strong rental yields
              </p>
            </div>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* CARD 3 */}
          <div
            className="relative w-full lg:w-[456px] h-[220px] lg:h-[252px] rounded-[20px] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${firstcard})` }}
          >
            <div className="absolute inset-0 bg-[#01155E]/60" />

            <div className="absolute bottom-6 left-6 md:top-8 md:left-8 max-w-[85%] border-l-[3px] border-white pl-4">
              <p className="text-[20px] md:text-[22px] font-semibold text-white underline decoration-white">
                Dubai Hills Estate
              </p>

              <p className="text-[15px] md:text-[20px] text-white font-light leading-relaxed mt-1">
                Resort-style family living
              </p>
            </div>
          </div>

          {/* CARD 4 */}
          <div
            className="relative w-full lg:w-[732px] h-[220px] lg:h-[252px] rounded-[20px] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${Secondcard})` }}
          >
            <div className="absolute inset-0 bg-[#01155E]/60" />

            <div className="absolute bottom-6 left-6 md:top-8 md:left-8 max-w-[85%] border-l-[3px] border-white pl-4">
              <p className="text-[20px] md:text-[22px] font-semibold text-white underline decoration-white">
                Palm Jumeirah
              </p>

              <p className="text-[15px] md:text-[20px] text-white font-light leading-relaxed mt-1">
                Ultra-luxury beachfront living
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}