import React from 'react'
import Communitie from '../../../src/assets/communitiebriefaiwala.jpg';

function MarketData() {
  return (
    <div>
        <div className="flex justify-center items-center min-h-screen  p-4">
      {/* Main Container - 1200px wide */}
      <div className="w-full max-w-[1200px] flex flex-col gap-[12px]">
        
        {/* Market Data Heading */}
        <div >
          <h1 className="text-[#01155E] font-['Archivo'] font-semibold text-[32px] md:text-[48px] leading-none">
            Market Data
          </h1>
           <div class="flex w-[264px]"><div class="w-[122px] h-[8px] bg-[#01155E]"></div><div class="flex-1 h-[2px] bg-[#01155E]"></div></div>
        </div>

        {/* Description Text */}
        <p className="text-[#67739E] font-['General_Sans'] font-normal text-[16px] md:text-[18px] leading-tight max-w-[1200px] mt-10 mb-6">
          Due to limited transaction volume over the past 12 months, statistically meaningful 
          price movement data is not available for this community. This is common in 
          low-density, end-user-driven residential communities.
        </p>

        {/* Image Container */}
        <div className="relative w-full h-[250px] md:h-[366px] rounded-[16px] overflow-hidden shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] bg-[#01155E]">
          <img 
            src={Communitie}
            alt="Modern Villa" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Market Activity Footer Section */}
        <div className="flex flex-col gap-2 mt-2">
          <h2 className="text-[#01155E] font-['General_Sans'] font-medium text-[20px] md:text-[24px] underline underline-offset-4 decoration-1">
            Market Activity Note
          </h2>

          <div className="flex flex-col gap-1 text-[#717171] font-['General_Sans']">
            <span className="text-[14px] md:text-[16px]   text-[#67739E] font-medium">
              Data last updated: 6 January 2026 | GST
            </span>
            <span className="text-[18px] text-[#67739E] md:text-[20px] font-semibold text-[]">
              Editable line for notes or methodology
            </span>
            <span className="text-[12px] md:text-[14px]  text-[#67739E] font-normal uppercase">
              Source: Property Monitor
            </span>
          </div>
        </div>
      </div>

      
    </div>
    </div>
  )
}

export default MarketData