import React from 'react';
import imageurl from '../../assets/underline.png';
import Servicehero from '../../assets/serviceshero.png';
import Serviceimage from '../../assets/servicepage.png';

const HeroSection = () => {
  return (
    <section className="w-full bg-white overflow-hidden relative   pb-10">

      {/* Container to center content at 1200px */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-0 min-h-[500px] flex flex-col lg:flex-row items-center relative">

        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 py-6 pt-5 z-10">
          <div className="mb-10">
            <h2
              className="text-[48px] font-bold text-[#001A54] mb-2 inline-block pb-6"
              style={{
                fontFamily: "Archivo, sans-serif",
                backgroundImage: `url(${imageurl})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left 90%",
                backgroundSize: "427px 6px",
              }}
            >
              All Services
            </h2>
            <p className="font-archivo font-normal text-[20px] leading-[100%] text-[#475569] w-[700px] text-[#01155E99]">
              Are you looking for the perfect neighborhood in Dubai? Discover the unique characteristics of diverse communities, catering to various preferences from luxury to family-friendly environments.
            </p>

          </div>

          <div className="space-y-5 text-[#64748b] text-lg leading-relaxed max-w-xl">


            <p className="font-archivo font-normal text-[16px] leading-[20px] tracking-normal   text-[#01155E99]">
              We support property owners and investors by structuring access to professional property management services delivered through appointed, RERA-licensed property management teams operating in the UAE market.
            </p>


            <p className="font-archivo font-normal text-[16px] leading-[20px] text-[#01155E99]">
              Our role is to act as the initial engagement and access point, helping owners define management requirements, align expectations, and transition their assets into an appropriate licensed property management execution structure.
            </p>


            <p className="font-archivo font-normal  text-[16px] leading-[20px] text-[#01155E99]">
              We do not perform property management activities directly. Execution is delivered by appointed, RERA-licensed property management teams with established operational experience in the UAE market.
            </p>

          </div>

          <button className="mt-10 px-8 py-3 bg-[#01155E] text-white font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300">
            Discover More details
          </button>
        </div>

        {/* Floating Decorative Service Image */}
        <div className="absolute -top-10 right-24 w-[395.94px] h-[240.06px] z-20 hidden lg:block">
          <img
            src={Serviceimage}
            alt="Decorative Pattern"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right Image – Pinned to the absolute bottom and right edge of the screen */}
      <div className="absolute right-0 bottom-0 w-[541.14px] h-[458.98px] hidden lg:block">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 lg:clip-path-custom">
            <img
              src={Servicehero}
              alt="Modern Luxury Villa"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar: Touches bottom of section */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#01155E] h-[7px] w-full"

      />

    </section>
  );
};

export default HeroSection;