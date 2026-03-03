import React from 'react';
import backgroundImage from "../../../src/assets/detailservicebackground.png";
import RightImage from "../../../src/assets/Rightimage.jpeg";

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-16 lg:py-24">
      
      {/* Background Pattern - Made responsive with object-fit and percentage widths */}
      <div 
        className="absolute top-0 left-0 w-full max-w-[600px] lg:max-w-[997px] h-full pointer-events-none z-0 opacity-50 lg:opacity-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'top left',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] ml-auto">
        
        {/* Heading Section - Added padding-left to match text content */}
        <div className="mb-8 px-6 md:px-12 lg:pl-20 lg:pr-0">
          <h2 
            className="text-[#01155E] font-semibold text-3xl md:text-4xl lg:text-[48px] leading-tight mb-4"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Who We Are
          </h2>
          {/* Responsive Divider */}
          <div class="flex w-[264px]"><div class="w-[122px] h-[8px] bg-[#01155E]"></div><div class="flex-1 h-[2px] bg-[#01155E]"></div></div>
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
          
          {/* Left Side: Text Content */}
          <div 
            className="w-full lg:max-w-[580px] px-6 md:px-12 lg:pl-20 lg:pr-0 text-[#67739E] text-base md:text-[18px] text-justify space-y-6"
            style={{ 
              fontFamily: 'General Sans, sans-serif',
              lineHeight: '1.6' 
            }}
          >
            <p>
              Yupland is a real estate marketing and information platform
              designed to provide structured access to property opportunities
              across the United Arab Emirates. It serves as a centralised gateway
              where users can explore real estate developments, analyse
              communities, and access organised property information through a
              clear and structured interface.
            </p>
            <p>
              The platform lets users explore both off-plan and ready properties,
              review developer profiles, evaluate community insights and market
              data, and stay informed with real estate-focused content and
              market updates.
            </p>
            <p>
              Yupland is currently focused primarily on Dubai and is progressively
              expanding its database and coverage across the UAE.
            </p>
          </div>

          {/* Right Side: Image - Flushed to right on LG, Centered on Mobile */}
          <div className="w-full lg:w-1/2 flex justify-end">
            <img 
              src={RightImage}
              alt="Hand holding a house model" 
              className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[772px] h-auto object-contain object-right"
              style={{ maxHeight: '529px' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;