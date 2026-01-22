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
    <section className="w-full bg-white py-[120px] flex justify-center">
      {/* CONTENT WRAPPER */}
      <div className="w-[1200px]">
        
        {/* TITLE SECTION */}
        <div className="mb-[60px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold mb-[10px]"
            style={{ 
              fontFamily: 'General Sans, sans-serif',
              lineHeight: '100%' 
            }}
          >
            How the Engagement Works
          </h2>

          {/* STEPPED UNDERLINE */}
          <div className="flex items-end w-[450px]">
            <div className="w-[162px] h-[6px] bg-[#01155E]" />
            <div className="flex-1 h-[1px] bg-[#01155E]" />
          </div>
        </div>

        {/* MAIN CONTENT BLOCK */}
        <div 
          className="text-[#01155E]"
          style={{
            fontFamily: 'General Sans, sans-serif',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}
        >
          {/* SUB-HEADING - Bold and 20px per image principle */}
          <h3 className="text-[20px] font-bold mb-[30px]">
            Our involvement is focused on structuring access and defining the correct execution pathway.
          </h3>

          {/* BULLET LIST */}
          <ul className="flex flex-col gap-2 mb-[40px]">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-[6px] block h-[4px] w-[4px] min-w-[4px] rounded-full bg-[#01155E]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* FOOTER TEXT */}
          <p className="mt-6">
            This structure ensures transparency, accountability, and a clear separation between engagement structuring and operational execution.
          </p>
        </div>

      </div>
    </section>
  );
}

export default EngagementWorks;