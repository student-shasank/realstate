import React from 'react'

function AssetFramework() {
  return (
    <div>
      {/* Added px-4 for mobile breathing room and responsive py */}
      <section className="w-full bg-white py-16 md:py-[120px] px-6 flex justify-center overflow-hidden">
        
        {/* Changed w-[1200px] to max-w-[1200px] w-full */}
        <div className="w-full max-w-[1200px]">

          {/* TITLE SECTION */}
          <div className="mb-10 md:mb-[60px] pb-[13px]">
            <h2
              className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-[100%] mb-[10px]"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              Asset Management Framework
            </h2>

            {/* UNDERLINE: Changed fixed width to max-width to prevent horizontal scroll */}
            <div className="flex w-full max-w-[490px]">
              <div className="w-[180px] md:w-[240px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[3px] bg-[#01155E]" />
            </div>
          </div>

          {/* PARAGRAPHS */}
          <div
            className="flex flex-col text-[#01155E] text-[16px] md:text-[18px] font-normal sm:text-justify"
            style={{
              fontFamily: 'General Sans, sans-serif',
              lineHeight: '1.5', // Mobile par 100% tight lagta hai, 1.5 better hai
              letterSpacing: '0%',
            }}
          >
            {/* Bullet List */}
            {/* Desktop font settings preserved via 'md:' prefix */}
            <ul className="list-disc pl-5 md:pl-6 mb-8  ">
              <li>Portfolio-level performance assessment and benchmarking</li>
              <li>Occupancy optimisation and income stability strategy</li>
              <li>Hold, lease, upgrade, or exit decision support</li>
              <li>Capital expenditure planning and asset lifecycle forecasting</li>
              <li>Leasing and renewal strategy alignment across the portfolio</li>
              <li>Cost optimisation through KPI- and SLA-driven vendor management</li>
              <li>Facilities and maintenance governance at portfolio scale</li>
              <li>Regulatory compliance, certifications, and authority coordination</li>
              <li>Health, safety, and environmental oversight including audits and inspections</li>
              <li>Tenant experience measurement and satisfaction reporting</li>
              <li>Periodic financial, occupancy, and asset condition reporting</li>
            </ul>

            {/* Concluding Statement */}
            <p className="md:leading-[100%]">
              All operational activities are executed within this strategic framework,
              not in isolation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AssetFramework