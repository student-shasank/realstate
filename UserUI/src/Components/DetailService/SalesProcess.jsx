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

  // Common Card Style
  const cardClass = "w-[253px] bg-[#01155E] text-white pt-[10px] pb-[10px] px-[28.5px] font-medium text-[20px] leading-[28px] min-h-[90px] rounded-[5px]";
  const rowStyle = "grid grid-cols-4 gap-[10px]";

  return (
    <section className="w-full bg-white py-[50px] flex justify-center">
      <div className="w-[1200px]">
        
        {/* HEADER SECTION */}
        <div className="pt-[60px] pb-[60px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold mb-[8px]"
           
          >
            Project Marketing & Sales Process
          </h2>
          <div className="flex w-[504.5px] mb-[17px]">
            <div className="w-[252.25px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
         <p
  className="
    text-[20px]
    font-semibold
    leading-[100%]
    tracking-[0]
    text-justify
    font-['General_Sans']
    text-[#67739E]
  "
  
>
  Executed through appointed RERA-licensed brokerage teams
</p>
        </div>

        {/* PARENT DIV FOR ALL BOXES WITH SPECIFIC PADDING */}
        <div 
          className="py-[50px] px-[79px] flex flex-col gap-[24px]"
          style={{ fontFamily: 'General Sans, sans-serif' }}
        >
          {/* ROW 1: 4 Boxes */}
          <div className={rowStyle}>
            {row1.map((text, i) => (
              <div key={i} className={cardClass}>{text}</div>
            ))}
          </div>

          {/* ROW 2: 4 Boxes */}
          <div className={rowStyle}>
            {row2.map((text, i) => (
              <div key={i} className={cardClass}>{text}</div>
            ))}
          </div>

          {/* ROW 3: 3 Boxes (Centered) */}
          <div className="flex justify-center gap-[15px]">
            {row3.map((text, i) => (
              <div key={i} className={`${cardClass} w-[calc(25%-11.25px)]`}>
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