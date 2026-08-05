import React from 'react';
import platformindependent from "../../assets/brocker.jpeg"

const PlatformManagement = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white py-12 md:py-20 px-4">
      
      {/* Outer Section: Responsive container instead of 1238px */}
      <div className="w-full max-w-[1238px] flex flex-col gap-8 md:gap-10">
        
        {/* Title Section */}
        <div className="w-full">
          <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold font-['Archivo'] leading-none pb-2 inline-block">
            Platform Management
          </h2>
          {/* Custom Underline */}
            <div class="flex w-[264px]"><div class="w-[122px] h-[8px] bg-[#01155E]"></div><div class="flex-1 h-[2px] bg-[#01155E]"></div></div>
        </div>

        {/* Content Card: Removed fixed 400px height */}
        <div className="bg-[#F9FAFB] rounded-2xl border border-gray-200 p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-10 shadow-sm">
          
          {/* Left Side: Image Container */}
          <div className="w-full md:w-[356px] aspect-[356/337] flex-shrink-0 relative">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-[#F3F4F6]">
              <img 
                src={platformindependent} 
                alt="Platform Management"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="flex flex-col gap-5 md:gap-6">
            
            {/* First Paragraph */}
            <p className="text-[#01155E] text-lg md:text-[18px] font-normal font-['General_Sans'] leading-relaxed text-justify">
              Yupland is managed by <span className="font-semibold text-xl md:text-[20px]">Divyansh Chitkara</span>, 
              a licensed real estate broker active in the UAE property market.
            </p>

            {/* Detailed Disclaimer Text: Removed fixed 762px width */}
            <p className="w-full text-[#01155E] text-base md:text-[18px] font-normal font-['General_Sans'] leading-relaxed text-justify opacity-90">
              Yupland operates solely as a real estate marketing and information platform and 
              does not provide brokerage services directly. All regulated real estate activities, 
              including advisory, negotiations, documentation, and transaction execution, are 
              conducted by Divyansh Chitkara in his capacity as a licensed real estate broker 
              operating under Aqua Properties, a licensed real estate brokerage in Dubai, in 
              accordance with applicable regulatory requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformManagement;