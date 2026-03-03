import React from 'react';
import DeveloperAccess1 from "../../assets/Devloperaccess1.jpg"
import DeveloperAccess2 from "../../assets/Devloperaccess2.jpg"
import DeveloperAccess3 from "../../assets/Devloperaccess3.jpg"

const DeveloperAccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-10 bg-white">
      {/* Main Container */}
      <div className="max-w-7xl w-full p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-10 lg:gap-16 bg-[#F9FAFB] rounded-3xl overflow-hidden shadow-sm">
        
        {/* Left Side: Images Section */}
        <div className="flex flex-col w-full lg:w-1/2 gap-4">
          {/* Big Image Top */}
          <div className="w-full aspect-square md:aspect-[5/4] bg-gray-200 rounded-2xl overflow-hidden">
             <img 
               src={DeveloperAccess1} 
               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
               alt="Developer Access Main" 
             /> 
          </div>

          {/* Bottom Two Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
               <img 
                 src={DeveloperAccess2} 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                 alt="Developer Access Sub 1" 
               /> 
            </div>
            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
               <img 
                 src={DeveloperAccess3} 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                 alt="Developer Access Sub 2" 
               /> 
            </div>
          </div>
        </div>

        {/* Right Side: Content Section */}
        <div className="flex flex-col w-full lg:w-1/2 justify-center gap-8 md:gap-10">
          {/* Title Section */}
          <div className="relative inline-block">
            <h2 className="text-[#01155E] text-3xl md:text-4xl lg:text-5xl font-semibold font-['Archivo'] leading-tight mb-4">
              Access to Developers
            </h2>
            {/* Custom Responsive Divider */}
              <div class="flex w-[264px]"><div class="w-[122px] h-[8px] bg-[#01155E]"></div><div class="flex-1 h-[2px] bg-[#01155E]"></div></div>
          </div>

          {/* Description Text */}
          <div className="space-y-4 md:space-y-6 text-[#67739E] text-base md:text-lg font-normal font-['General_Sans'] leading-relaxed text-justify">
            <p>
              Yupland is a real estate marketing and information platform designed to provide structured access to property opportunities across the United Arab Emirates. It serves as a centralised gateway where users can explore real estate developments, analyse communities, and access organised property information through a clear and structured interface.
            </p>
            <p>
              The platform lets users explore both off-plan and ready properties, review developer profiles, evaluate community insights and market data, and stay informed with real estate-focused content and market updates. Yupland consolidates fragmented market information into a single, structured environment, allowing users to research and evaluate opportunities with greater clarity and efficiency.
            </p>
            <p className="hidden md:block">
              Yupland is currently focused primarily on Dubai and is progressively expanding its database and coverage across the UAE. The platform is designed to improve transparency and accessibility in property discovery while supporting informed real estate decisions.
            </p>
          </div>

          {/* List Items */}
          <div className="flex flex-col gap-4">
            <ListItem text="Direct Developer Access" />
            <ListItem text="Exclusive Project Launches" />
            <ListItem text="Comprehensive Market Data" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for clean code
const ListItem = ({ text }) => (
  <div className="flex items-center gap-4">
    {/* Blue Circle Icon */}
    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#F0F4FF] rounded-full">
      <svg 
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#01155E" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M5 12h14m-7-7 7 7-7 7"/>
      </svg>
    </div>
    <span className="text-[#01155E] text-lg md:text-xl font-semibold font-['General_Sans']">
      {text}
    </span>
  </div>
);

export default DeveloperAccess;