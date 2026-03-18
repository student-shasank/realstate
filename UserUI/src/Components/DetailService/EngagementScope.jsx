import React from 'react';
import imageurl from '../../assets/engagement-scope.jpg';

const EngagementScope = () => {
  const listItems = [
    "We frame the project opportunity and align expectations",
    "We act as the initial access point into the execution structure",
    "We introduce projects into appointed RERA-licensed brokerage teams",
    "We do not participate in marketing execution, sales operations, contracting, or settlement",
    "These activities are carried out directly by appointed RERA-licensed brokerage teams"
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Dynamic padding: pt-140 for mobile to clear nav, pt-180 for desktop */}
      <section className="w-full bg-white pb-[10px] pt-[140px] md:pt-[180px] px-4 md:px-4 flex justify-center">
        
        {/* Container with max-width and fluid width for smaller screens */}
        <div className="w-[100%] max-w-[1200px] flex flex-col">
          
          {/* HEADER SECTION */}
          <div className="mb-10 md:mb-[66px]">
            <h2
              className="text-[#01155E] text-[26px] md:text-[28px] font-semibold mb-[10px]"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              Engagement Scope
            </h2>
            {/* UNDERLINE: Responsive width */}
            <div className="flex w-full max-w-[291.5px]">
              <div className="w-[65%] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[3px] bg-[#01155E]" />
            </div>
          </div>

          {/* CONTENT SECTION: Stacks on xl (1280px) or lg (1024px) depending on your preference */}
          <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-10">
            
            {/* LEFT SIDE: IMAGE CONTAINER */}
            <div 
              className="w-full xl:w-[600px] h-[300px] md:h-[449px] rounded-[8px] overflow-hidden flex-shrink-0"
              style={{ boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.4)" }} // Slightly softened shadow for web feel
            >
              <img 
                src={imageurl} 
                alt="Modern Villa"
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT SIDE: TEXT CONTENT */}
            <div className="w-full xl:w-[545px] flex flex-col gap-6">
              {/* Heading */}
              <h2 
                className="text-[#000183] text-[18px] md:text-[20px] font-semibold text-left md:text-justify leading-[130%]"
                style={{ fontFamily: 'General Sans, sans-serif' }}
              >
                Our involvement is focused on structuring, access, and pathway definition.
              </h2>

              {/* List Items */}
              <ul className="flex flex-col ">
                {listItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-[15px] ">
                    <span className="text-[#000183] text-[18px] leading-[180%]">•</span>
                    <span 
                      className="text-[#000183] text-[16px] md:text-[18px] font-normal text-left md:text-justify leading-[160%] md:leading-[180%]"
                      style={{ fontFamily: 'General Sans, sans-serif' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footer Text */}
              <p 
                className="text-[#01155E] text-[16px] md:text-[18px] font-normal text-left md:text-justify leading-[150%]"
                style={{ fontFamily: 'General Sans, sans-serif' }}
              >
                This structure ensures transparency, accountability, and a clear separation 
                between engagement structuring and operational execution.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default EngagementScope;