import React from "react";
import imageurl from '../../assets/underline.png';

const ServicesSection = () => {
  const services = [
    "Project Marketing And Sales Structuring",
    "Project Marketing And Sales Structuring",
    "Property Management Structuring",
    "Asset Management Structuring",
    "Development Advisory And Project Coordination",
    "Handover & Snagging Representation",
    "Mortgage Coordination",
    "Residency & Investor Visa Advisory (UAE)",
  ];

  return (
    <section className="w-full bg-white py-[120px]">
      <div className="max-w-[1200px] mx-auto  py-16  ">
              <div className="max-w-2xl">
                <h2
                  className="text-[48px] font-bold text-[#001A54] mb-2 inline-block pb-6"
                  style={{
                    fontFamily: "Archivo, sans-serif",
                    backgroundImage: `url(${imageurl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left 90%",
                    backgroundSize: "257px 6px",
                  }}
                >
                   Services
                </h2>
      
                <p className="text-gray-500 text-lg mb-8 font-medium">
                   Discover the unique characteristics of diverse communities, catering
              to various preferences from luxury to family-friendly environments.
                </p>
               
              </div>
            </div>


      <div className="max-w-[1200px] mx-auto flex flex-col gap-[36px]">

        {/* ROW 1 */}
        <div className="flex justify-between gap-[21px]">

          {/* TITLE CARD (same style as community brief) */}
         

          {/* 4 SERVICE CARDS */}
          {services.slice(0, 4).map((title, index) => (
           <div
  key={index}
  className="w-[273px] h-[366px] bg-[#01155E] rounded-[16px]
  pt-[29px] px-[25px] pb-[14px] flex flex-col"
>
  {/* CONTENT WRAPPER */}
  <div className="flex flex-col">

    {/* TITLE — FIXED HEIGHT */}
    <h3
      className="w-[226px] h-[90px]
      text-white text-[24px] font-medium leading-[30px]
      underline underline-offset-4 decoration-white"
    >
      {title}
    </h3>

    {/* TEXT — ALWAYS SAME START POSITION */}
    <p
      className="w-[226px] mt-[47px]
      text-[#D9D9D9] text-[16px] leading-[22px]"
    >
      Having your dedicated property manager can turn your investment
      into a lucrative cash flow opportunity.
    </p>
  </div>

  {/* BUTTON — ALWAYS BOTTOM */}
  <button
    className="mt-auto w-full py-3 bg-white text-[#01155E]
    rounded-[8px] font-bold text-[15px]"
  >
    View Details
  </button>
</div>

          ))}
        </div>

        {/* ROW 2 */}
        <div className="flex justify-between gap-[21px]">
          {services.slice(4).map((title, index) => (
           <div
  key={index}
  className="w-[273px] h-[366px] bg-[#01155E] rounded-[16px]
  pt-[29px] px-[25px] pb-[14px] flex flex-col"
>
  {/* CONTENT WRAPPER */}
  <div className="flex flex-col">

    {/* TITLE — FIXED HEIGHT */}
    <h3
      className="w-[226px] h-[90px]
      text-white text-[24px] font-medium leading-[30px]
      underline underline-offset-4 decoration-white"
    >
      {title}
    </h3>

    {/* TEXT — ALWAYS SAME START POSITION */}
    <p
      className="w-[226px] mt-[47px]
      text-[#D9D9D9] text-[16px] leading-[22px]"
    >
      Having your dedicated property manager can turn your investment
      into a lucrative cash flow opportunity.
    </p>
  </div>

  {/* BUTTON — ALWAYS BOTTOM */}
  <button
    className="mt-auto w-full py-3 bg-white text-[#01155E]
    rounded-[8px] font-bold text-[15px]"
  >
    View Details
  </button>
</div>

          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
