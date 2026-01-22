import React from 'react'

function GovernanceControls() {
  return (
    <div>

             <section className="w-full bg-white py-[60px] flex justify-center">
      {/* CONTENT WRAPPER */}
      <div className="w-[1200px]">

        {/* TITLE */}
        <div className="mb-[60px] pb-[13px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
          Governance, Reporting, and Controls
          </h2>

          {/* UNDERLINE */}
          <div className="flex w-[614px]">
            <div className="w-[292px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* SUB HEADING */}
       

       {/* TEXT BLOCK WITH LEFT BORDER */}
<div
  className="
    flex
    gap-6
    text-[#01155E]
    text-[18px]
    font-normal
    text-justify
  "
  style={{
    
    lineHeight: '100%',
    letterSpacing: '0%',
  }}
>
  {/* Left Vertical Line */}
  <div className="w-[6px] bg-[#01155E] h-[260px]  " />

  {/* Text Content */}
  <div className="flex flex-col  gap-1 w-[1200] h-[217px] leading-relaxed ">
    <p className=''>
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
    <p className=' '>
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

    {/* Another section in same*/}


   <section className="w-full bg-white py-[60px] flex justify-center">
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
        Execution Platform
      </h2>

      {/* MATCHED UNDERLINE DESIGN */}
      <div className="flex items-end w-[614px]">
        <div className="w-[100px] h-[6px] bg-[#01155E]" />
        <div className="flex-1 h-[1px] bg-[#01155E]" />
      </div>
    </div>

    {/* TEXT CONTENT - Following strictly: General Sans, 18px, 100% Line Height */}
    <div
      className="text-[#01155E] flex flex-col gap-3 leading-relaxed "
      style={{
        fontFamily: 'General Sans, sans-serif',
        fontWeight: '400',
        fontSize: '18px',
      
        letterSpacing: '0%',
      }}
    >
      <p className='leading-relaxed '>
        Asset and property management execution is carried out through an 
        appointed, RERA-licensed platform, providing compliant operations, 
        in-house Ejari services, dedicated asset, facilities, and property 
        management teams, and systems that offer real-time visibility on 
        occupancy, income, and reporting.
      </p>

      <p className='leading-relaxed '>
        Our role remains focused on strategy, structuring, oversight, and 
        alignment, ensuring that execution supports portfolio objectives 
        rather than driving them.
      </p>
    </div>

  </div>
</section>



    </div>
  )
}

export default GovernanceControls