import React from 'react';
import backgroundimage from "../../assets/disclamerbackground.jpg";

const DisclaimerSection = () => {
  return (
    // Main Wrapper: uses responsive padding
    <section className="relative w-full flex flex-col items-center overflow-hidden bg-white py-12 md:py-20 px-6">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-25 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${backgroundimage})` }}
      />

      {/* Inner Content Container: max-width instead of fixed width */}
      <div className="relative z-10 w-full max-w-[1238px] flex flex-col gap-8 md:gap-[40px]">
        
        {/* Heading Section */}
        <div className="w-full">
          <h2 className="text-[#01155E] text-2xl md:text-[32px] font-semibold font-['Archivo'] leading-none pb-2 inline-block">
            Disclaimer
          </h2>
          {/* Responsive underline: shorter on mobile, matches your design on desktop */}
           <div class="flex w-[264px]"><div class="w-[122px] h-[8px] bg-[#01155E]"></div><div class="flex-1 h-[2px] bg-[#01155E]"></div></div>
        </div>

        {/* Text Content: Removed fixed pixel widths for fluid layout */}
        <div className="flex flex-col gap-6 md:gap-[24px] max-w-full lg:max-w-[932px]">
          <p className="text-[#01155E] text-base md:text-[18px] font-normal font-['General_Sans'] leading-relaxed text-left md:text-justify">
            Yupland is a real estate marketing and information platform managed by <span className="font-semibold text-lg md:text-[20px]">Divyansh Chitkara</span>. 
            Yupland itself does not provide real estate brokerage services.
          </p>

          <p className="text-[#01155E] text-base md:text-[18px] font-normal font-['General_Sans'] leading-relaxed text-left md:text-justify opacity-90">
            While every effort is made to ensure that the information presented on Yupland is 
            accurate and current, all information is provided for general informational purposes 
            only and should not be considered legally binding. Users are encouraged to 
            independently verify property details, availability, and pricing with the respective 
            developers and authorised representatives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerSection;