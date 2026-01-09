import React from 'react';
import imageurl from '../../assets/underline.png';
const ServicesSection = () => {
  const services = [
    { title: "Project Marketing And Sales Structuring" },
    { title: "Property Management Structuring" },
    { title: "Asset Management Structuring" },
    { title: "Development Advisory And Project Coordination" },
    { title: "Handover & Snagging Representation" },
    { title: "Mortgage Coordination" },
    { title: "Residency & Investor Visa Advisory (UAE)" },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto bg-white py-16 md:py-24 flex justify-center">
      {/* Main Container: 
          Using flex-wrap and gap to allow the text and cards 
          to flow exactly like the screenshot.
      */}
      <div className="flex flex-wrap gap-[21px] max-w-[1200px] px-4">
        
        {/* HEADER BLOCK: This occupies the first slot in the grid */}
        <div className="flex flex-col pt-2" style={{ width: '273px' }}>
        <h2
  className="text-[#01155E] text-[48px] font-bold inline-block pb-6 mb-6"
  style={{
    fontFamily: "Archivo, sans-serif",
    width: "fit-content",
    backgroundImage: `url(${imageurl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left 90%",
    backgroundSize: "192.5px 6px",
  }}
>
  Services
</h2>

          <p className="text-[#64748B] text-[16px] leading-relaxed">
            Discover the unique characteristics of diverse communities, catering to various preferences from luxury to family-friendly environments.
          </p>
        </div>

        {/* SERVICE CARDS */}
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex flex-col bg-[#01155E] rounded-[16px] p-7 shadow-lg transition-transform hover:-translate-y-1"
            style={{ 
              width: '273px', 
              height: '366px',
              flex: '0 0 auto'
            }}
          >
            <div className="flex-grow">
              <h3 className="text-white text-[20px] font-bold mb-4 leading-tight underline underline-offset-8 decoration-white/20">
                {service.title}
              </h3>
              <p className="text-blue-100/70 text-[14px] leading-relaxed">
                Having your dedicated property manager, can turn your investment into a lucrative cash flow opportunity.
              </p>
            </div>

            <button className="w-full py-3 bg-white text-[#01155E] rounded-[8px] font-bold text-[15px] hover:bg-gray-100 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;