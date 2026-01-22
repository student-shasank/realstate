import React from 'react'

function ServiceCover() {
  return (
    <div>
        <section className="w-full bg-white py-[80px] flex justify-center">
  {/* CONTENT WRAPPER */}
  <div className="w-[1200px]">

    {/* TITLE */}
    <div className="mb-[60px] pb-[13px]">
      <h2
        className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        What This Service Covers
      </h2>

      {/* UNDERLINE - Adjusted width for new title */}
      <div className="flex w-[380px]">
        <div className="w-[190px] h-[8px] bg-[#01155E]" />
        <div className="flex-1 h-[2px] bg-[#01155E]" />
      </div>
    </div>

    {/* CONTENT SECTION */}
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
        lineHeight: '1.6', // Updated to 1.6 for better readability as per previous sections
      }}
    >
      {/* Bullet List from Image */}
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li>Pre-handover inspection using structured technical checklists</li>
        <li>Identification and documentation of visible defects and finishing issues</li>
        <li>Inspection of key structural, mechanical, electrical, and finishing elements</li>
        <li>Structured communication of snag items for submission to the developer or seller</li>
        <li>Support through the handover process to ensure issues are formally recorded before acceptance</li>
      </ul>

      {/* Concluding Statement from Image */}
      <p>
        The focus is on documentation, clarity, and accountability, not on repair execution.
      </p>
    </div>

  </div>
</section>


<section className="w-full bg-white py-[80px] flex justify-center">
  {/* CONTENT WRAPPER */}
  <div className="w-[1200px]">

    {/* TITLE */}
    <div className="mb-[60px] pb-[13px]">
      <h2
        className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        Indicative Inspection Scope (Executed by appointed inspection professionals)
      </h2>

      {/* UNDERLINE */}
      <div className="flex w-[500px]">
        <div className="w-[250px] h-[8px] bg-[#01155E]" />
        <div className="flex-1 h-[2px] bg-[#01155E]" />
      </div>
    </div>

    {/* SUB-DESCRIPTION */}
    <p
      className="text-[#01155E] text-[16px] font-normal mb-[60px]"
      style={{ fontFamily: 'General Sans, sans-serif' }}
    >
      The following domains outline how responsibilities are structured across regulatory, construction, and procurement functions, with execution delivered through an appointed development management platform.
    </p>

    {/* TWO COLUMN STRUCTURE */}
    <div className="grid grid-cols-2 gap-[40px] mb-[60px]">
      
      {/* COLUMN 1: Exterior Inspection */}
      <div>
        <h3 className="text-[#01155E] text-[22px] font-semibold mb-[20px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Exterior Inspection
        </h3>
        <ul className="list-disc pl-5 text-[#01155E] text-[18px] space-y-2" style={{ fontFamily: 'General Sans, sans-serif' }}>
          <li>Window glazing, frames, and all surrounds</li>
          <li>Damaged walls or paint imperfections</li>
          <li>Damage to concrete walls</li>
          <li>All paving and tiling</li>
          <li>Exterior electrical fittings</li>
          <li>Roofing</li>
          <li>Building exterior condition</li>
        </ul>
      </div>
      

      {/* COLUMN 2: Interior Inspection */}
      <div>
        <h3 className="text-[#01155E] text-[22px] font-semibold mb-[20px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
          Interior Inspection
        </h3>
        <ul className="list-disc pl-5 text-[#01155E] text-[18px] space-y-2" style={{ fontFamily: 'General Sans, sans-serif' }}>
          <li>Key and lock checks</li>
          <li>Tiling and grouting, including cracks, chips, and uneven laying</li>
          <li>Paint blemishes, spillages, marks, and stains</li>
          <li>Baths and sinks checked for scratches, finish quality, and fitting</li>
          <li>Drainage and plumbing checks for poor installation</li>
          <li>Electrical appliances and connections</li>
          <li>All kitchen cupboards and vanity tops checked for cracks, scratches, and poor installation</li>
          <li>Walls, coving, and skirting boards checked for paint finish quality, uneven surfaces, and cracks</li>
          <li>Ceiling fixtures checked for finish quality</li>
          <li>Door handles, locks, door stops, and related elements</li>
          <li>Air-conditioning checks and internal operational inspection</li>
        </ul>
      </div>
    </div>
    

    {/* CONCLUDING FOOTER */}
    <p
      className="text-[#01155E] text-[18px] font-normal leading-[1.6]"
      style={{ fontFamily: 'General Sans, sans-serif' }}
    >
      All observations are documented and compiled into a structured snag report for owner reference and submission prior to acceptance.
    </p>

  </div>
</section>

<section className="w-full bg-white py-[80px] flex justify-center">
  <div className="w-[1200px]">
    {/* TITLE */}
    <div className="mb-[40px] pb-[13px]">
      <h2
        className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        What This Service Does Not Include
      </h2>
      {/* UNDERLINE */}
      <div className="flex w-[480px]">
        <div className="w-[180px] h-[8px] bg-[#01155E]" />
        <div className="flex-1 h-[2px] bg-[#01155E]" />
      </div>
    </div>

    {/* CONTENT */}
    <div className="text-[#01155E] text-[18px] font-normal leading-[1.6]" style={{ fontFamily: 'General Sans, sans-serif' }}>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        <li>Selling or negotiating property transactions</li>
        <li>Construction execution or repair works</li>
        <li>Ongoing maintenance or property management</li>
      </ul>
      <p>
        Developers or sellers remain responsible for rectification in accordance with contractual obligations and defect liability provisions.
      </p>
    </div>
  </div>

  <div className="relative h-full ">
                    <div className="absolute -right-40 top-[599.7px] opacity-50 z-20 h-[185.66px] w-[185.66px] rounded-full bg-[#1C4DFF12] opasity-0.7" ></div>
                    <div className="absolute -right-124 z-10 top-63  opacity-50 h-[500px] w-[500px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />
                  </div>`
</section>


<section className="w-full bg-white py-[80px] flex justify-center">
  {/* CONTENT WRAPPER */}
  <div className="w-[1200px]">
    
    {/* TITLE */}
    <div className="mb-[60px] pb-[13px]">
      <h2
        className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        Execution Framework
      </h2>

      {/* UNDERLINE */}
      <div className="flex w-[500px]">
        <div className="w-[162px] h-[8px] bg-[#01155E]" />
        <div className="flex-1 h-[2px] bg-[#01155E]" />
      </div>
    </div>

    {/* CONTENT WITH VERTICAL ACCENT */}
    <div className="flex border-l-[3px] border-[#01155E] pl-[30px] py-[10px]">
      <div
        className="text-[#01155E] text-[18px] font-normal leading-[1.6] text-justify max-w-[1000px]"
        style={{ fontFamily: 'General Sans, sans-serif' }}
      >
        <p className="mb-4">
          Handover inspections and snagging execution are delivered through appointed, licensed inspection professionals operating within a defined handover framework.
        </p>
        <p>
          Our role is to structure the engagement and act as the primary coordination point, establishing clear accountability and ensuring documented outcomes throughout the handover inspection process.
        </p>
      </div>
    </div>

  </div>
  <div className="relative h-full ">
                   
                    <div className="absolute right-194 z-10 top-93  opacity-60 h-[300px] w-[300px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />
                  </div>`
</section>

<section className="w-full bg-white py-[80px] flex justify-center">
  
  
  {/* CONTENT WRAPPER */}
  <div className="w-[1200px] z-20">
    
    {/* TITLE */}
    <div className="mb-[60px] pb-[13px]">
      <h2
        className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        Important Note:
      </h2>

      {/* UNDERLINE */}
      <div className="flex w-[480px]">
        <div className="w-[150px] h-[8px] bg-[#01155E]" />
        <div className="flex-1 h-[2px] bg-[#01155E]" />
      </div>
    </div>

    {/* CONTENT WITH LEFT VERTICAL BORDER ACCENT */}
    <div className="flex border-l-[3px] border-[#01155E] pl-[30px] py-[10px]">
      <div
        className="text-[#01155E] text-[18px] font-normal leading-[1.6] text-justify max-w-[1000px]"
        style={{ fontFamily: 'General Sans, sans-serif' }}
      >
        <p className="mb-6">
          This service is optional. Many buyers choose to handle handover independently.
        </p>
        <p>
          It is offered for those who prefer added assurance, structured documentation, and reduced post-handover follow-up, particularly where time, distance, or experience may limit direct involvement.
        </p>
      </div>
    </div>

  </div>
  
</section>


    </div>
  )
}

export default ServiceCover