import React from 'react';
import communityimage from "../../assets/communityimage.jpg";
import { MessageSquare, Users, Building2 } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageSquare className="w-10 h-10 text-[#001457]" />,
      title: "Quick Response",
      desc: "We guarantee swift responses to client inquiries, ensuring their needs are promptly addressed by dedicated real estate brokers."
    },
    {
      icon: <Users className="w-10 h-10 text-[#001457]" />,
      title: "Experienced Staff",
      desc: "Our team comprises diligent individuals with exceptional credentials and comprehensive training, providing top-notch services to clients."
    },
    {
      icon: <Building2 className="w-10 h-10 text-[#001457]" />,
      title: "First-Class Service",
      desc: "We simplify the home buying and selling process, managing negotiations and paperwork on behalf of all parties involved."
    }
  ];

  return (
    <section className="bg-white w-full flex justify-center py-16">
      {/* Main Container - Adjusted for 1200px width and image alignment */}
      <div className="w-full max-w-[1240px] flex flex-col md:flex-row gap-16 items-start px-6">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 flex flex-col pt-4">
          <div className="mb-10">
            {/* Typography matches image: Blue YupLand, bold leading text */}
            <h2 className="text-[20px] leading-[1.3] text-[#1e293b] mb-10">
              <span className="text-[#001457]  text-[40px]">YupLand</span> is a real estate marketing and information platform created to help you research off-plan projects (Pre-construction), ready properties, explore communities, and understand Dubai’s real estate landscape.
            </h2>

            {/* Button matches image: Dark blue, exact text */}
            
            <button className="bg-[#001457] text-white rounded-[8px] px-12 py-3.5 text-[20px] font-medium transition-all hover:bg-[#081d72] w-full max-w-[380px]">
              Discover Your Neighbourhood
            </button>
            
          </div>

          {/* Icon Features List - Aligned to left */}
          <div className="flex flex-col gap-12 mt-4">
            {features.map((item, index) => (
              <div key={index} className="flex gap-6 items-start ">
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h4 className="text-[#001457] text-[24px] font-bold mb-2">{item.title}</h4>
                  <p className="text-[#64748b] text-[18px] leading-[1.5] max-w-[420px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE SECTION - Precise alignment for badges */}
        <div className="relative w-full md:w-[650px] h-[791px] flex-shrink-0">
          {/* Main Image with Rounded Corners as show in image */}
          <img
            src={communityimage}
            alt="Dubai Architecture"
            className="w-full h-full object-cover rounded-[32px]"
          />

          {/* TOP RIGHT BADGE: Dark Blue */}
          <div className="absolute top-10 -right-6 bg-[#001457] text-white rounded-[16px] px-8 py-6 flex items-center gap-4 shadow-2xl z-20">
             <span className="text-[60px] font-bold leading-none">87+</span>
             <p className="text-[18px] font-normal leading-tight w-[130px]">
               Successful Transactions Monthly
             </p>
          </div>

          {/* BOTTOM LEFT BADGE: White (Floating Over Bottom Edge) */}
          <div className="absolute bottom-8 -left-12 bg-white text-[#001457] rounded-[24px] px-10 py-8 flex items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-20 border border-gray-50">
             <span className="text-[72px] font-bold leading-none">87+</span>
             <p className="text-[24px] font-bold leading-tight text-[#001457] w-[150px]">
               Successful Transactions Monthly
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;