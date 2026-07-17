import React from "react";
import imageurl from "../../assets/underline.png";
import { Link } from "react-router-dom";

// 👉 Add images (matching files in assets/services)
import ProjectMarketing from "../../assets/services/Project Marketing.jpg";
import PropertyManagement from "../../assets/services/Property Management.jpg";
import AssetManagement from "../../assets/services/Asset management.jpg";
import DevelopmentAdvisory from "../../assets/services/Development Advisory.jpg";
import HandoverSnagging from "../../assets/services/Handover and snagging.jpg";
import Mortgage from "../../assets/services/mortgage.jpg";
import ResidencyImage from "../../assets/services/Residency image.jpg";

const ServicesSection = () => {
  const services = [
    {
      title: "Project Marketing ",
      description: "We work with developers and landowners to structure and position real estate projects for market",
      image: ProjectMarketing,
      path: "/marketingandSales",
    },
    {
      title: "Property Management",
      description: "We help manage properties efficiently for better ROI and operations",
      image: PropertyManagement,
      path: "/propertyStructuring",
    },
    {
      title: "Asset Management",
      description: "Optimize your real estate portfolio with expert asset management",
      image: AssetManagement,
      path: "/assetStructuring",
    },
    {
      title: "Development Advisory",
      description: "End-to-end support for project development and execution",
      image: DevelopmentAdvisory,
      path: "/advisoryCoordination",
    },
    {
      title: "Handover & Snagging",
      description: "Ensure quality and compliance during handover process",
      image: HandoverSnagging,
      path: "/handoverSnagging",
    },
    {
      title: "Mortgage Coordination",
      description: "Seamless mortgage assistance for buyers and investors",
      image: Mortgage,
      path: "/mortgageCoordination",
    },
    {
      title: "Investor Visa Advisory",
      description: "Assess eligibility, investment needs, and program suitability before starting your immigration process.",
      image: ResidencyImage,
      path: "/investorVisaAdvisory",
    },
    // {
    //   title: "Residency & Investor Visa Advisory (UAE)",
    //   description: "Guidance for UAE residency and investor visa process",
    //   image: ResidencyImage,
    //   path: "/investorVisaAdvisory",
    // },
  ];
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-12 lg:py-[120px]">

      {/* Heading (same as before) */}
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

        <div className="text-[#01155E99] text-[15px] sm:text-[17px] lg:text-[20px] leading-[1.2] max-w-[1000px] space-y-4">
          <p>
            Yupland functions as a marketing and information platform designed to support buyers, investors, and property owners.
          </p>
          <p>
            All service enquiries are submitted through the platform and facilitated via trusted partners.
          </p>
        </div>
      </div>

      {/* 🔥 New Card Layout */}
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          {services.map((service, index) => (
            <Link
              to={service.path}
              key={index}
              className="w-full flex justify-center"
            >
              <div className="flex flex-col max-w-[390px] w-full group cursor-pointer">

                {/* Image */}
                <div className="relative h-[267px] rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />

                  {/* Hover Description */}
                  <div className="absolute top-6 left-6 right-6 flex opacity-0 -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="w-1.5 bg-white rounded-full mr-4" />
                    <p className="font-semibold text-[18px] text-white leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-center border-l-4 border-[#01155E] pl-4 mt-4 h-[62px]">
                  <h3 className="text-[#01155E99] font-semibold text-lg">
                    {service.title}
                  </h3>
                </div>

              </div>
            </Link>
          ))}

        </div>

        {/* View All */}
        <div className="flex justify-center md:justify-end mt-10">
          <div className="font-medium text-[20px] lg:text-[24px] text-[#01155E] underline cursor-pointer hover:text-blue-700 transition">
            View All
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;