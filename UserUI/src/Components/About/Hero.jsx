import React from 'react';
import backgroundImage from "../../../src/assets/detailservicebackground.png";
import RightImage from "../../../src/assets/RightImage.png";

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-20 lg:py-24 px-4">

      {/* Background Decoration */}
      <div
        className="absolute top-0 left-0 z-0 h-[350px] md:h-[452px] w-[990px] md:w-[990px] bg-no-repeat bg-left-top bg-contain opacity-40 md:opacity-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'top left',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] ml-auto">

        {/* Heading Section */}
        <div className="mb-10 px-4 md:px-4 lg:pl-20">
          <h2
            className="text-[#01155E] font-semibold text-[32px] md:text-[48px] lg:text-[48px] leading-tight mb-4"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Who We Are
          </h2>
          {/* Responsive Divider */}
          <div className="flex items-center w-full max-w-[300px]">
            <div className="w-[120px] h-[6px] md:h-[8px] bg-[#01155E]"></div>
            <div className="flex-1 h-[2px] bg-[#01155E]"></div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-6">

          {/* Left Side: Text Content */}
          <div
            className="w-full lg:w-[45%]  lg:pl-20 lg:pr-0 text-[#67739E] text-base md:text-lg lg:text-[18px] md:text-justify text-left space-y-6"
            style={{
              fontFamily: 'General Sans, sans-serif',
              lineHeight: '1.7'
            }}
          >
            <p>
              Yupland is a real estate marketing and information platform designed to provide structured access to property opportunities across the United Arab Emirates. It serves as a centralised gateway where users can explore real estate developments, analyse communities, and access organised property information through a clear and structured interface
            </p>
            <p>
            The platform lets users explore both off-plan and ready properties, review developer profiles, evaluate community insights and market data, and stay informed with real estate-focused content and market updates. Yupland consolidates fragmented market information into a single, structured environment, allowing users to research and evaluate opportunities with greater clarity and efficiency.
            </p>
            <p className="font-medium">
             

Yupland is currently focused primarily on Dubai and is progressively expanding its database and coverage across the UAE. The platform is designed to improve transparency and accessibility in property discovery while supporting informed real estate decisions.
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-[50%] flex justify-end items-center">
            <div className="w-full pl-6 lg:pl-0">
              {/* pl-6 on mobile prevents the image from touching the left edge if it's not full width */}
              <img
                src={RightImage}
                alt="Real estate concept"
                className="w-full h-auto object-cover lg:object-contain lg:object-right rounded-l-3xl lg:rounded-none shadow-2xl lg:shadow-none"
                style={{ maxHeight: '550px' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;

