import React from 'react';

function GovernanceControls() {
  return (
    <div className="w-full bg-white">
      {/* SECTION 1: GOVERNANCE */}
      <section className="w-full py-[40px] md:py-[60px] flex justify-center px-4">
        {/* CONTENT WRAPPER */}
        <div className="w-full max-w-[1200px]">
          
          {/* TITLE */}
          <div className="mb-[40px] md:mb-[60px]">
            <h2
              className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-tight mb-[10px]"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              Governance, Reporting, and Controls
            </h2>

            {/* UNDERLINE - Responsive width */}
            <div className="flex w-full max-w-[614px] items-end">
              <div className="w-[150px] md:w-[292px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[1px] md:h-[2px] bg-[#01155E]" />
            </div>
          </div>

          {/* TEXT BLOCK WITH LEFT BORDER */}
          <div className="flex gap-4 md:gap-6 text-[#01155E]">
            {/* Left Vertical Line - Height auto-adjusts to text */}
            <div className="w-[4px] md:w-[6px] bg-[#01155E] self-stretch" />

            {/* Text Content */}
            <div 
              className="flex flex-col gap-4 md:gap-2 text-[16px] sm:text-[18px] font-normal "
              style={{ letterSpacing: '0%' }}
            >
              <p>
                Asset management is governed through international operating practices,
                ensuring that assets are managed with consistency, discipline, and
                transparency.
              </p>
              <p>
                Owners receive periodic reporting covering portfolio income performance
                and occupancy trends, operating cost visibility and efficiency indicators,
                asset condition and lifecycle planning, risk exposure and compliance
                status, and tenant satisfaction and service quality metrics.
              </p>
              <p>
                Service providers are managed through clearly defined KPIs and SLAs,
                ensuring accountability, cost control, and consistent delivery across
                the portfolio.
              </p>
              <p>
                Where appropriate, management structures may be aligned to
                performance-linked or occupancy-based fee models, ensuring alignment
                between asset performance and management incentives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXECUTION PLATFORM */}
      <section className="w-full py-[40px] md:py-[60px] flex justify-center px-4">
        <div className="w-full max-w-[1200px]">
          
          {/* TITLE SECTION */}
          <div className="mb-[40px] md:mb-[60px]">
            <h2
              className="text-[#01155E] text-[28px] md:text-[32px] font-semibold mb-[10px] leading-tight"
              style={{ fontFamily: 'General Sans, sans-serif' }}
            >
              Execution Platform
            </h2>

            {/* UNDERLINE */}
            <div className="flex items-end w-full max-w-[614px]">
              <div className="w-[80px] md:w-[100px] h-[6px] bg-[#01155E]" />
              <div className="flex-1 h-[1px] bg-[#01155E]" />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div
            className="text-[#01155E] flex flex-col gap-4 md:gap-3 text-[16] md:text[18] "
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontWeight: '400',
              letterSpacing: '0%',
            }}
          >
            <p>
              Asset and property management execution is carried out through an 
              appointed, RERA-licensed platform, providing compliant operations, 
              in-house Ejari services, dedicated asset, facilities, and property 
              management teams, and systems that offer real-time visibility on 
              occupancy, income, and reporting.
            </p>

            <p>
              Our role remains focused on strategy, structuring, oversight, and 
              alignment, ensuring that execution supports portfolio objectives 
              rather than driving them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GovernanceControls;