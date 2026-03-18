import React from 'react';

const SalesProcess = () => {
  const row1 = [
    "Signing a Partnership",
    "Signing a Partnership",
    "Videography, Photography & Floor Plans",
    "Marketing Plan & Project Identity"
  ];

  const row2 = [
    "Sales, Lead Tracking & Reporting",
    "Project Launch",
    "Sales Contract",
    "Strata Marketing"
  ];

  const row3 = [
    "Project Updates to Buyers",
    "Preparation for Settlement",
    "Settlement & Handover"
  ];

  // Card Style: Removed hard width for responsiveness, kept min-h and padding
  const cardClass = "bg-[#01155E] text-white pt-[10px] pb-[10px] px-[18.5px] font-medium text-[18px] lg:text-[20px] leading-[28px] min-h-[90px] rounded-[5px] flex items-center justify-start";

  return (
    <section className="w-full bg-white py-[50px] flex justify-center px-4">
      <div className="w-full max-w-[1200px]">
        
        {/* HEADER SECTION */}
        <div className="pt-[30px] md:pt-[60px] pb-[40px] md:pb-[60px]">
          <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold mb-[8px]">
            Project Marketing & Sales Process
          </h2>
          <div className="flex w-full max-w-[504.5px] mb-[17px]">
            <div className="w-[50%] md:w-[252.25px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E] self-end" />
          </div>
          <p className="text-[18px] md:text-[20px] font-semibold leading-tight text-[#67739E] font-['General_Sans']">
            Executed through appointed RERA-licensed brokerage teams
          </p>
        </div>

        {/* BOXES CONTAINER */}
        <div 
          className="flex flex-col gap-[15px] md:gap-[24px]"
          style={{ fontFamily: 'General Sans, sans-serif' }}
        >
          {/* ROW 1 & 2: Grid 4 cols on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[24px]">
            {row1.map((text, i) => (
              <div key={i} className={cardClass}>{text}</div>
            ))}
            {row2.map((text, i) => (
              <div key={i} className={cardClass}>{text}</div>
            ))}
          </div>

          {/* ROW 3: Centered 3 boxes on desktop, matches grid flow on mobile */}
          <div className="flex flex-col sm:flex-row justify-center gap-[10px] md:gap-[24px]">
            {row3.map((text, i) => (
              <div 
                key={i} 
                className={`${cardClass} w-full lg:w-[calc(25%-18px)]`}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SalesProcess;