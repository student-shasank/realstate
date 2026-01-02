import React from 'react';

// Importing assets based on your file structure
import serviceImage1 from "../../assets/serviceimage1.jpg";
import serviceImage2 from "../../assets/serviceimage2.jpg";
import serviceImage3 from "../../assets/serviceimage3.jpg";
import serviceImage4 from "../../assets/serviceim,age4.jpg"; // Corrected based on your filename

const ServicesSection = () => {
  const services = [
    {
      title: "Property Buying Assistance",
      description: "Having your dedicated property manager, can turn your investment into a lucrative cash flow opportunity.",
      image: serviceImage1,
    },
    {
      title: "Off-plan Advisory",
      description: "Having your dedicated property manager, can turn your investment into a lucrative cash flow opportunity.",
      image: serviceImage2,
    },
    {
      title: "Ready Property Assistance",
      description: "Having your dedicated property manager, can turn your investment into a lucrative cash flow opportunity.",
      image: serviceImage3,
    },
    {
      title: "Property Management",
      description: "Having your dedicated property manager, can turn your investment into a lucrative cash flow opportunity.",
      image: serviceImage4,
    },
  ];

  return (
    <section className="w-full bg-white flex flex-col items-center ">
      
      {/* 📏 Content Container - 64px Margin Top */}
      <div className="w-full max-w-[1550px] px-4 mt-[64px] flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#01155E] text-6xl font-bold mb-4">Services</h2>
          <p className="text-[#64748B] text-xl max-w-4xl mx-auto leading-relaxed">
            Discover the unique characteristics of diverse communities, catering to various preferences from luxury to family-friendly environments
          </p>
        </div>

        {/* 🃏 Horizontal Cards Row - One line alignment */}
        <div className="flex flex-row flex-nowrap justify-center gap-[21px] w-full overflow-x-auto pb-10 scrollbar-hide">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex flex-col rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.12)] bg-white"
              style={{ 
                width: '359px',   // Fixed Width from your spec
                height: '482px',  // Fixed Height from your spec
              }}
            >
              {/* Top: Navy Text Area (Fixed Height) */}
              <div className="bg-[#01155E] p-8 h-[200px] flex flex-col justify-start">
                <h3 className="text-white text-[24px] font-bold mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-blue-100/80 text-[15px] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom: Image Area with the restored Button */}
              <div className="relative h-[282px]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                
                {/* 🔘 THE RESTORED BUTTON (Visible Overlay) */}
                <div className="absolute bottom-6 left-0 right-0 px-8">
                  <button className="w-full py-3 bg-white text-[#01155E] rounded-xl font-bold text-lg shadow-lg hover:bg-gray-50 transition-all active:scale-95 border-none cursor-pointer">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;