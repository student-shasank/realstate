import React from 'react'

function AssetFramework() {
  return (
    <div>

         <section className="w-full bg-white py-[120px] flex justify-center">
      {/* CONTENT WRAPPER */}
      <div className="w-[1200px]">

        {/* TITLE */}
        <div className="mb-[60px] pb-[13px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
           Asset Management Framework
          </h2>

          {/* UNDERLINE */}
          <div className="flex w-[490px]">
            <div className="w-[240px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* SUB HEADING */}
       

        {/* PARAGRAPHS */}
      <div
  className="
    flex flex-col
    text-[#01155E]
    text-[18px]
    font-normal
    text-justify
  "
  style={{
    fontFamily: 'General Sans, sans-serif',
    lineHeight: '100%',
    letterSpacing: '0%',
  }}
>
  {/* Bullet List */}
  <ul className="list-disc pl-6 mb-8 space-y-2 leading-relaxed ">
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
  <p>
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