import React from 'react';
import imageurl from '../../assets/underline.png';
import Servicehero from '../../assets/serviceshero.png';
import Serviceimage from '../../assets/servicepage.png';

const HeroSection = () => {
  return (
    <section className="w-full bg-white overflow-hidden relative  sm:pb-12 lg:pb-0">

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0 min-h-[auto] lg:min-h-[500px] flex flex-col lg:flex-row items-center relative">

        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 py-8 sm:py-10 lg:py-6 lg:pt-5 z-10">

          {/* Heading + Subtitle */}
          <div className="mb-8 sm:mb-10">
            <h2
              className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#001A54] mb-2 inline-block pb-4 sm:pb-6"
              style={{
                fontFamily: "Archivo, sans-serif",
                backgroundImage: `url(${imageurl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left 90%",
                backgroundSize: "clamp(200px, 80%, 427px) 6px",
              }}
            >
              All Services
            </h2>

            <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-[#01155E] w-full max-w-[600px] lg:max-w-[700px]">
              Are you looking for the perfect neighborhood in Dubai? Discover the unique characteristics of diverse communities, catering to various preferences from luxury to family-friendly environments.
            </p>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-4 sm:space-y-5 max-w-xl">
            <p className=" font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] tracking-normal text-[#01155E99]">
              We support property owners and investors by structuring access to professional property management services delivered through appointed, RERA-licensed property management teams operating in the UAE market.
            </p>

            <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-[#01155E99]">
              Our role is to act as the initial engagement and access point, helping owners define management requirements, align expectations, and transition their assets into an appropriate licensed property management execution structure.
            </p>

            <p className="font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-[#01155E99]">
              We do not perform property management activities directly. Execution is delivered by appointed, RERA-licensed property management teams with established operational experience in the UAE market.
            </p>
          </div>

          {/* CTA Button */}
          <button className="mt-8 sm:mt-10 px-6 sm:px-19 py-3 font-[Archivo] bg-[#01155E] text-white text-[14px] sm:text-[20px] font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300  w-full sm:w-auto">
            Discover More details
          </button>
        </div>

        {/* Floating Decorative Service Image — hidden on mobile/tablet */}
        <div className="absolute -top-10 right-16 xl:right-24 w-[280px] h-[170px] lg:w-[340px] lg:h-[206px] xl:w-[395.94px] xl:h-[240.06px] z-20 hidden lg:block">
          <img
            src={Serviceimage}
            alt="Decorative Pattern"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right Hero Image — hidden on mobile, visible lg+ */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-[380px] h-[320px] xl:w-[541.14px] xl:h-[458.98px] ml-[10]">
        <div className="relative w-full h-full">
          <div className="absolute inset-0">
            <img
              src={Servicehero}
              alt="Modern Luxury Villa"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Mobile Hero Image — shown only on small/medium screens */}
      <div className="block lg:hidden w-full mt-6  sm:pl-[24px] ">
        <img
          src={Servicehero}
          alt="Modern Luxury Villa"
          className="w-full max-h-[380px] sm:max-h-[460px]  rounded-lg"
        />
      </div>

      {/* Bottom Blue Bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#01155E] h-[7px] w-full" />
    </section>
  );
};

export default HeroSection;