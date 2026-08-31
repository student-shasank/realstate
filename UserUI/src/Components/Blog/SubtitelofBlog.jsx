import React from 'react'
import DeveloperAccess1 from "../../assets/Devloperaccess1.jpg"
import DeveloperAccess2 from "../../assets/Devloperaccess2.jpg"
import DeveloperAccess3 from "../../assets/Devloperaccess3.jpg"

function SubtitelofBlog() {
   return (
      <div className="flex items-center justify-center  px-4 py-4 md:py-10 bg-white">
        {/* Main Container */}
        <div className="max-w-[1200px] w-full p-6 md:py-10 lg:py-12 px-8 flex flex-col lg:grid lg:grid-cols-2 gap-10  bg-[#F9FAFB] rounded-3xl overflow-hidden shadow-sm">
          
          {/* Left Side: Images Section - Keeps your original sizes on desktop */}
          <div className="flex flex-col w-full gap-4">
            {/* Big Image Top */}
            <div className="w-full max-w-[550px] aspect-square md:aspect-[5/4] bg-gray-200 rounded-2xl overflow-hidden">
               <img 
                 src={DeveloperAccess1} 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                 alt="Developer Access Main" 
               /> 
            </div>
  
            {/* Bottom Two Images */}
            <div className="grid grid-cols-2 gap-4 max-w-[550px]">
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
          <div className="flex flex-col w-full justify-center gap-8 md:gap-10">
            {/* Title Section */}
            <div className="relative inline-block">
              <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold font-['Archivo'] leading-tight mb-4">
            Blog Titel
              </h2>
              {/* Custom Divider */}
              <div className="flex w-[264px]">
                <div className="w-[122px] h-[8px] bg-[#01155E]"></div>
                <div className="flex-1 h-[2px] bg-[#01155E]"></div>
              </div>
            </div>
  
            {/* Description Text */}
            <div className="space-y-4 md:space-y-6 text-[#67739E] text-base md:text-lg font-normal font-['General_Sans']  md:text-justify">
              <p>
                Yupland is a real estate marketing and information platform designed to provide structured access to property opportunities across the United Arab Emirates. It serves as a centralised gateway where users can explore real estate developments, analyse communities, and access organised property information through a clear and structured interface.
              </p>
              <p>
                The platform lets users explore both off-plan and ready properties, review developer profiles, evaluate community insights and market data, and stay informed with real estate-focused content and market updates.
              </p>
              <p className="">
                Yupland is currently focused primarily on Dubai and is progressively expanding its database and coverage across the UAE. The platform is designed to improve transparency and accessibility in property discovery while supporting informed real estate decisions.
              </p>
            </div>
  
            {/* List Items */}
            <div className="flex flex-col gap-4">
              <ListItem text="Blog Titel" />
              <ListItem text="Exclusive Project Launches" />
              <ListItem text="Comprehensive Market Data" />
            </div>
          </div>
        </div>
      </div>
    );
}
const ListItem = ({ text }) => (
  <div className="flex items-center gap-4 group">
    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#F0F4FF] rounded-full   duration-300">
      <svg 
        className="w-3.5 h-3.5 stroke-[#01155E]  transition-colors duration-300"
        viewBox="0 0 24 24" 
        fill="none" 
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

export default SubtitelofBlog