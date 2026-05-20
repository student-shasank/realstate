import React from 'react';
// Import your local image asset here
import DubaiSkyline from "../../assets/DubaiSkylinee.jpg"; 

function BlogDetailSection() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-['General_Sans']">
      {/* Main Container - Adjusted for layout in image_55149c.jpg */}
      <div className="max-w-[1200px] w-full p-6 md:py-1 lg:py-9 px-8 flex flex-col lg:grid lg:grid-cols-2 gap-10  bg-[#F9FAFB] rounded-3xl overflow-hidden shadow-sm">
        
        {/* Left Side: Content Section */}
        <div className="flex flex-col w-full lg:max-w-[519px]">
          
          {/* Header Section */}
          <div className="relative mb-12">
            <h2 className="text-[#01155E] text-[36px] font-semibold font-['Archivo'] mb-3">
              Subtitle of blog
            </h2>
            {/* Custom Underline - Thick blue start, thin grey continuation */}
            <div className="flex items-center w-full max-w-[320px]">
              <div className="w-[120px] h-[6px] bg-[#01155E]"></div>
              <div className="flex-1 h-[1.5px] bg-[#D1D5DB]"></div>
            </div>
          </div>

          {/* Body Text - Matching Design Specs */}
          <div className="flex flex-col gap-8 text-[#67739E] text-[18px] font-normal leading-[1.6] text-justify">
            <p>
              Yupland is a real estate marketing and information platform designed 
              to provide structured access to property opportunities across the 
              United Arab Emirates. It serves as a centralised gateway where users 
              can explore real estate developments, analyse communities, and access 
              organised property information through a clear and structured interface.
            </p>
            <p>
              The platform lets users explore both off-plan and ready properties, 
              review developer profiles, evaluate community insights and market data, 
              and stay informed with real estate-focused content and market updates. 
              Yupland consolidates fragmented market information into a single, 
              structured environment, allowing users to research and evaluate 
              opportunities with greater clarity and efficiency.
            </p>
            <p>
              Yupland is currently focused primarily on Dubai and is progressively 
              expanding its database and coverage across the UAE. The platform is 
              designed to improve transparency and accessibility in property discovery 
              while supporting informed real estate decisions.
            </p>
          </div>
        </div>

        {/* Right Side: Image Section - Fixed Measurements */}
        <div 
          className="relative hidden lg:block overflow-hidden shadow-sm"
          style={{ 
            width: '520px', 
            height: '769px', 
            borderRadius: '14px',
            opacity: '1'
          }}
        >
          <img 
            src={DubaiSkyline} 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover"
            style={{ transform: 'rotate(0deg)' }}
          />
        </div>

        {/* Mobile Image Version */}
        <div className="w-full h-[400px] lg:hidden rounded-[14px] overflow-hidden">
          <img 
            src={DubaiSkyline} 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}

export default BlogDetailSection;