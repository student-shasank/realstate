import React from 'react'
import { useState } from 'react';
import Communitiesoverview from '../../../src/assets/detailservicebackground.jpg';


function CommunitiesOverview() {

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <section className="flex flex-col md:flex-row w-full max-w-[1200px] mx-auto p-2 gap-12 bg-white text-[#01155E] mb-20">

        {/* Left Column: Content */}
        <div className="flex-1 max-w-[511px]">
          <h1 className="font-['Archivo'] font-medium text-[48px] leading-[100%] mb-6">
            Community Overview
          </h1>

          <div className="font-['General_Sans'] font-normal text-[20px] leading-[120%]  text-[#67739E]  mb-8 space-y-4">
            <p>
              Al Waha is a gated residential community located within Dubailand, developed by Dubai Properties.
              The community is primarily residential in nature and is characterised by low-density development
              and a quiet neighbourhood setting.
            </p>
            <p>
              Al Waha is situated along Emirates Road (E611), offering direct road connectivity across Dubai
              while remaining removed from high-density urban districts.
            </p>
          </div>

          {/* Location & Connectivity */}
          <div className="mb-8 max-w-[374px] mt-16">
            <h2 className="font-['General_Sans'] font-bold text-[24px] leading-[120%] mb-4 text-[#01155E]">
              Location & Connectivity
            </h2>
            <ul className="font-['General_Sans'] font-normal text-[20px] leading-[150%] space-y-3">
              <li>
                <span className=" text-[#01155E]">Nearest Areas:</span>
                <span className="text-[#67739E]"> Arabian Ranches, Mudon, The Sustainable City</span>
              </li>
              <li>
                <span className=" text-[#01155E]">Primary Road Access:</span>
                <span className="text-[#67739E]"> Emirates Road (E611)</span>
              </li>
              <li>
                <span className=" text-[#01155E]">Public Transport:</span>
                <span className="text-[#67739E]"> No direct or clearly defined public transport access; residents primarily rely on private vehicles, taxis, and ride-hailing services</span>
              </li>
              <li>
                <span className=" text-[#01155E]">Mobility:</span>
                <span className="text-[#67739E]"> Private vehicles, taxis, and ride-hailing services</span>
              </li>
            </ul>
          </div>

          {/* Planning Note */}
          <div className="mb-8 max-w-[374px]  mt-16">
            <h2 className="font-['General_Sans'] font-semibold text-[20px] leading-[100%] mb-3">
              Planning Note
            </h2>
            <p className="font-['General_Sans'] font-normal text-[18px] leading-[140%] text-[#67739E]">
              Al Waha is planned as a low-density, gated residential enclave within the Dubailand corridor, with an emphasis on internal privacy, landscaped open spaces, and controlled vehicular access rather than mixed-use or commercial integration.
              Schools & Nurseries

            </p>
          </div>

          <button
            className="
    w-[431px] 
    h-[50px] 
    flex 
    items-center 
    justify-center 
    bg-[#01155E] 
    text-[#FBFBFB] 
    rounded-[8px] 
    p-[12px] 
    font-['General_Sans'] 
    font-semibold 
    text-[20px] 
    leading-none 
    hover:bg-blue-900 
    transition-colors
  "
          >
            Discover Your Neighbourhood
          </button>
        </div>

        {/* Right Column: Image and Worship Info */}
        <div className="flex-1 relative">
          {/* Remove overflow-hidden from this container so the boxes can "hang" outside */}
          <div className="relative w-full max-w-[610px] h-[791px]">

            {/* Move the rounded corners and overflow-hidden here */}
            <img
              src={Communitiesoverview}
              alt="Community View"
              className="w-full h-full object-cover rounded-[24px] overflow-hidden"
            />

            {/* Dark Transaction Card - Positioned to peek off the right edge */}
            <div className="absolute top-[36px] -right-[90px] w-[384px] h-[112px] bg-[#01155E] rounded-[24px] p-2 flex items-center shadow-[0px_0px_100px_0px_rgba(255,255,255,0.5)] z-10">
              <div className="text-white flex items-center gap-4 ml-6">
                <span className="text-5xl font-bold">87+</span>
                <span className="text-[24px] font-medium leading-tight">
                  Successful <br />Transactions Monthly
                </span>
              </div>
            </div>

            {/* White Transaction Card - Positioned to peek off the left edge */}
            <div className="absolute top-[637px] -left-[75px] w-[403px] h-[112px] bg-[#FBFBFB] rounded-[24px] p-[8px] flex items-center shadow-[0px_0px_100px_0px_#FFFFFF] z-10">
              <div className="flex items-center gap-[10px] ml-[20px]"> {/* Added margin-left to push text into the visible area */}
                <span className="text-[#01155E] text-[64px] font-bold leading-none">
                  87+
                </span>
                <span className="text-[#01155E] font-['General_Sans'] font-medium text-[24px] leading-[100%]">
                  Successful <br />Transactions Monthly
                </span>
              </div>
            </div>
          </div>

          {/* Places of Worship Section below image */}
          <div className="mt-8 max-w-[467px]">
            <h2 className="font-['General_Sans'] font-semibold text-[20px] leading-[100%] mb-4">
              Places of Worship
            </h2>
            <div className="font-['General_Sans'] font-normal text-[16px] leading-[150%] text-gray-600 space-y-4">
              <div>
                <p className=" text-[#01155E]">Mosques</p>
                <p>Mudon Mosque</p>
                <p className='text-[#67739E]'>Al Madina Al Mustadama Masjid - The Sustainable City</p>
              </div>
              <div>
                <p className=" text-[#01155E]">Churches, Temples & Gurudwaras</p>
                <p className='text-[#67739E]'>Located in established worship districts across Dubai and accessible by car.</p>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#01155E] animate-in fade-in duration-500">
                <p className="font-['General_Sans'] font-normal text-[16px] leading-[150%] text-[#67739E]">
                  Due to limited transaction volume over the past 12 months, statistically meaningful price movement data is not available for this community. This is common in low-density, end-user-driven residential communities.
                </p>
              </div>
            )}

            {/* 4. Toggle Link */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-block mt-6 font-['General_Sans'] font-medium text-[24px] leading-[100%] underline text-[#01155E] cursor-pointer hover:opacity-80"
            >
              {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
          </div>
          <div class="relative h-full w-1/2"><div class="absolute -right-11 top-[40.7px] z-20 h-[180.66px] w-[180.66px] rounded-full bg-[#1C4DFF12]"></div><div class="absolute -right-75 -z-10 top-10  h-[300px] w-[300px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]"></div></div>
        </div>
      </section>


    </div>
  )
}

export default CommunitiesOverview