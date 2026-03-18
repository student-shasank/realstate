import React from "react";
import imageurl from "../../assets/underline.png";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    { title: "Project Marketing And Sales Structuring", path: "/marketingandSales" },
    { title: "Project Marketing And Sales Structuring", path: "/marketingandSales" },
    { title: "Property Management Structuring", path: "/propertyStructuring" },
    { title: "Asset Management Structuring", path: "/assetStructuring" },
    { title: "Development Advisory And Project Coordination", path: "/advisoryCoordination" },
    { title: "Handover & Snagging Representation", path: "/handoverSnagging" },
    { title: "Mortgage Coordination", path: "/mortgageCoordination" },
    { title: "Residency & Investor Visa Advisory (UAE)", path: "/investorVisaAdvisory" },
  ];

  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-[120px]">
      
      {/* Heading */}
      <div className="max-w-[1200px] mx-auto mb-10">
        <h2
          className="inline-block pb-6 mb-4 text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#001A54]"
          style={{
            fontFamily: "Archivo, sans-serif",
            backgroundImage: `url(${imageurl})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 95%",
            backgroundSize: "200px 6px",
          }}
        >
          Services
        </h2>

        <div className="text-[#01155E99] text-[15px] sm:text-[17px] lg:text-[20px] leading-[1.7] max-w-[1000px] space-y-4">
          <p>
            Yupland functions as a marketing and information platform designed to
            support buyers, investors, and property owners across a wide range of
            real estate-related services in Dubai.
          </p>
          <p>
            All service enquiries are submitted through the platform and facilitated
            by Yupland through curated introductions to trusted independent service
            partners.
          </p>
          <p>
            While services are delivered directly by third-party providers, Yupland
            supports clients throughout the process by assisting with communication
            and coordination.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-[1200px] mx-auto">
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-3 
            xl:grid-cols-4 
            gap-6
            justify-items-center
          "
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="
                w-full 
                md:w-[240px] 
                xl:w-[273px] 
                h-[366px] 
                bg-[#01155E] 
                rounded-[16px] 
                pt-7 px-6 pb-4 
                flex flex-col
              "
            >
              <h3 className="text-white text-[22px] xl:text-[24px] font-medium leading-[1.3] underline underline-offset-4 decoration-white min-h-[90px]">
                {service.title}
              </h3>

              <p className="mt-[40px] xl:mt-[47px] text-[#D9D9D9] text-[15px] xl:text-[16px] leading-[1.6]">
                Having your dedicated property manager can turn your investment
                into a lucrative cash flow opportunity.
              </p>

              <Link
                to={service.path || "/"}
                className="mt-auto w-full py-3 bg-white text-[#01155E] rounded-[8px] font-bold text-[14px] text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center md:justify-end mt-8">
          <div className="font-medium text-[20px] lg:text-[24px] text-[#01155E] underline cursor-pointer hover:text-blue-700 transition">
            View All
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;