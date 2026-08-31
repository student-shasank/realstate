import React from 'react';
// Reference to the image seen in image_4aa6fb.jpg
import DubaiCityscape from "../../assets/DubaiSkylinee.jpg"; 

function BlogFullWidthSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white py-8 px-4">
      
      {/* 1. Content Section (Top) */}
      {/* Constraints: Width 1200px, Height 360px */}
      <div 
        className="flex flex-col justify-start overflow-hidden mb-12"
        style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          height: 'auto', // Setting to auto for responsiveness, but optimized for your 360px spec
          minHeight: '360px',
          opacity: '1'
        }}
      >
        {/* Title and Divider matching image_4aa6fb.jpg */}
        <div className="mb-10">
          <h2 className="text-[#01155E] text-[32px] md:text-[36px] font-bold font-['Archivo'] mb-2">
            Subtitle of blog
          </h2>
          <div className="flex items-center w-[230px]">
            <div className="w-[110px] h-[5px] bg-[#01155E]"></div>
            <div className="flex-1 h-[1.5px] bg-[#01155E] opacity-20"></div>
          </div>
        </div>

        {/* Paragraphs with specific styling */}
        <div className="space-y-6 text-[#67739E] text-[18px] font-['General_Sans'] font-normal leading-relaxed text-justify">
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

      {/* 2. Image Section (Bottom) */}
      {/* Constraints: Width 1200px, Height 591px, Border-radius 14px */}
      <div 
        className="relative overflow-hidden shadow-sm"
        style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          height: '591px', 
          borderRadius: '14px',
          opacity: '1'
        }}
      >
        <img 
          src={DubaiCityscape} 
          alt="Dubai Skyline Overview" 
          className="w-full h-full object-cover"
          style={{ transform: 'rotate(0deg)' }}
        />
      </div>

    </div>
  );
}

export default BlogFullWidthSection;