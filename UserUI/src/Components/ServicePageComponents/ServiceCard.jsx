import React from 'react';
import Service1 from '../../assets/servicecard1.jpg';
import Service2 from '../../assets/servicecard2.jpg';
import Service3 from '../../assets/servicecard3.jpg';
import { Link } from 'react-router-dom';

const SERVICES_DATA = [
   {
    title: "Project Marketing And SalesStructuring",
    description: "We work with developers and landowners to structure and position real estate projects for market",
    image: Service1,
    path: "/marketingandSales",
  },
  {
    title: "Asset Management Structuring",
    description: "We work with developers and landowners to structure and position real estate projects for market",
    image: Service1,
    path: "/assetStructuring",
  },
  {
    title: "Property Management Structuring",
    description: "We work with developers and landowners to structure and position real estate projects for market",
    image: Service1,
    path: "/propertyStructuring",
  },
  {
    title: "Development Advisory and Project Coordination",
    description: "We work with developers and landowners to structure and position real estate projects for market",
    image: Service2,
    path: "/advisoryCoordination",
  },
  {
    title: "Handover & Snagging Representation",
    description: "We work with developers and landowners to structure and position real estate projects for market",
    image: Service3,
    path: "/handoverSnagging",
  },
  {
    title: "Mortgage Coordination",
    description: "We work with developers and landowners to structure and position real estate projects for market",
    image: Service1,
    path: "/mortgageCoordination",
  },
  {
    title: "Residency & Investor Visa Advisory (UAE)",
    description: "We work with developers and landowners to structure and position real estate projects for market",
    image: Service2,
    path: "/investorVisaAdvisory",
  },
 
];

const ServiceCard = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {SERVICES_DATA.map((service, index) => (
            <Link
              to={service.path}
              key={index}
              className="no-underline w-full flex justify-center"
            >
              <div className="flex flex-col max-w-[390px] w-full group cursor-pointer">

                {/* Image Section */}
                <div className="relative h-[267px] rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />

                  {/* Hover Description */}
                  <div className="absolute top-6 left-6 right-6 flex opacity-0 -translate-y-4 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="w-1.5 bg-white rounded-full mr-4 shrink-0" />
                    <p className="font-semibold text-[20px] text-white leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Title Section */}
                <div className="flex items-center leading-snug border-l-4 border-[#01155E] pl-4 mt-4 h-[62px]">
                  <h3 className="text-[#01155E99] font-semibold text-xl">
                    {service.title}
                  </h3>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;