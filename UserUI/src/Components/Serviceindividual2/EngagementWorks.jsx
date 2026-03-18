

import React from 'react';

function EngagementWorks() {
  const listItems = [
    "We assess property management requirements and align expectations",
    "We act as the initial access point to licensed property management services",
    "We introduce properties to appointed RERA-licensed property management teams",
    "We do not participate in tenant management, rent collection, maintenance, or facilities operations",
    "All operational activities are carried out directly by licensed property management teams."
  ];

  return (
    <section className="w-full bg-white py-16 md:py-[120px] px-4 flex justify-center">
      {/* CONTENT WRAPPER - Max width instead of fixed width */}
      <div className="w-full max-w-[1200px]">
        
        {/* TITLE SECTION */}
        <div className="mb-10 md:mb-[60px]">
          <h2
            className="text-[#01155E] text-2xl md:text-[32px] font-semibold mb-3 md:mb-[10px]"
            style={{ 
              fontFamily: 'General Sans, sans-serif',
              lineHeight: '120%' // Better for wrapped lines on mobile
            }}
          >
            How the Engagement Works
          </h2>

          {/* STEPPED UNDERLINE - Responsive width logic */}
          <div className="flex items-end w-full max-w-[450px]">
            <div className="w-1/3 md:w-[162px] h-[4px] md:h-[6px] bg-[#01155E]" />
            <div className="flex-1 h-[1px] bg-[#01155E]" />
          </div>
        </div>

        {/* MAIN CONTENT BLOCK */}
        <div 
          className="text-[#01155E]"
          style={{
            fontFamily: 'General Sans, sans-serif',
            fontSize: '16px', // Slightly smaller base for mobile
            fontWeight: '400',
            lineHeight: '1.5', // Standard readable line height
            letterSpacing: '0%'
          }}
        >
          {/* SUB-HEADING */}
          <h3 className="text-lg md:text-[20px] font-bold mb-6 md:mb-[30px] leading-tight">
            Our involvement is focused on structuring access and defining the correct execution pathway.
          </h3>

          {/* BULLET LIST */}
          <ul className="flex flex-col gap-4 md:gap-2 mb-10 md:mb-[40px]">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                {/* Bullet - Adjusted margin-top for better alignment with text */}
                <span className="mt-[10px] block h-[5px] w-[5px] min-w-[5px] rounded-full bg-[#01155E]" />
                <span className="md:text-[18px]">{item}</span>
              </li>
            ))}
          </ul>

          {/* FOOTER TEXT */}
          <p className="mt-6 md:text-[18px]">
            This structure ensures transparency, accountability, and a clear separation between engagement structuring and operational execution.
          </p>
        </div>

      </div>
    </section>
  );
}

export default EngagementWorks;