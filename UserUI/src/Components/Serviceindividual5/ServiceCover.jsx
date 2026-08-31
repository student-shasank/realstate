import React from 'react'

function ServiceCover() {
  return (
    <div className="overflow-x-hidden">
      {/* SECTION 1: What This Service Covers */}
      <section className="w-full bg-white py-[60px] md:py-[80px] flex justify-center px-6">
        
        <div className="w-full max-w-[1200px]">
          <div className="mb-[40px] md:mb-[60px] pb-[13px]">
            <h2
              className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-[1.2] md:leading-[100%] mb-[10px]"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              What This Service Covers
            </h2>
            <div className="flex w-full max-w-[380px]">
              <div className="w-[120px] md:w-[190px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] bg-[#01155E] mt-[2px] md:mt-[3px]" />
            </div>
          </div>
          
          

          <div
            className="flex flex-col text-[#67739E] text-[16px] md:text-[18px] font-normal text-left "
            style={{ fontFamily: 'General Sans, sans-serif', }}
          >
            <ul className="list-disc pl-5 md:pl-6  ">
              <li>Pre-handover inspection using structured technical checklists</li>
              <li>Identification and documentation of visible defects and finishing issues</li>
              <li>Inspection of key structural, mechanical, electrical, and finishing elements</li>
              <li>Structured communication of snag items for submission to the developer or seller</li>
              <li>Support through the handover process to ensure issues are formally recorded before acceptance</li>
            </ul>
            <p>
              The focus is on documentation, clarity, and accountability, not on repair execution.
            </p>
            
          </div>
        </div>
        
      </section>
      

      {/* SECTION 2: Indicative Inspection Scope */}
      <section className="w-full bg-white py-[60px] md:py-[80px] flex justify-center px-6">
        <div className="w-full max-w-[1200px]">
          <div className="mb-[40px] md:mb-[10px] pb-[13px]">
            <h2
              className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-[1.2] mb-[10px]"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              Indicative Inspection Scope <span className="text-[20px] md:text-[24px] block md:inline">(Executed by appointed inspection professionals)</span>
            </h2>
            <div className="flex w-full max-w-[500px]">
              <div className="w-[150px] md:w-[250px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] bg-[#01155E] mt-[2px] md:mt-[3px]" />
            </div>
          </div>

          <p className="text-[#01155E] text-[16px] font-normal mb-[40px] md:mb-[60px]" style={{ fontFamily: 'General Sans, sans-serif' }}>
            The following domains outline how responsibilities are structured across regulatory, construction, and procurement functions, with execution delivered through an appointed development management platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mb-[40px] md:mb-[60px]">
            {/* COLUMN 1 */}
            <div>
              <h3 className="text-[#01155E] text-[20px] md:text-[22px] font-semibold mb-[20px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Exterior Inspection
              </h3>
              <ul className="list-disc pl-5 text-[#67739E] text-[16px] md:text-[18px] " style={{ fontFamily: 'General Sans, sans-serif' }}>
                <li>Window glazing, frames, and all surrounds</li>
                <li>Damaged walls or paint imperfections</li>
                <li>Damage to concrete walls</li>
                <li>All paving and tiling</li>
                <li>Exterior electrical fittings</li>
                <li>Roofing</li>
                <li>Building exterior condition</li>
              </ul>
            </div>
            {/* COLUMN 2 */}
            <div>
              <h3 className="text-[#01155E] text-[20px] md:text-[22px] font-semibold mb-[20px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Interior Inspection
              </h3>
              <ul className="list-disc pl-5 text-[#67739E] text-[16px] md:text-[18px] " style={{ fontFamily: 'General Sans, sans-serif' }}>
                <li>Key and lock checks</li>
                <li>Tiling and grouting, including cracks, chips, and uneven laying</li>
                <li>Paint blemishes, spillages, marks, and stains</li>
                <li>Baths and sinks checked for scratches, finish quality, and fitting</li>
                <li>Drainage and plumbing checks for poor installation</li>
                <li>Electrical appliances and connections</li>
                <li>Kitchen cupboards and vanity tops</li>
                <li>Walls, coving, and skirting boards</li>
                <li>Ceiling fixtures and finish quality</li>
                <li>Door handles, locks, and door stops</li>
                <li>Air-conditioning checks</li>
              </ul>
            </div>
          </div>
          <p className="text-[#67739E] text-[16px] md:text-[18px] " style={{ fontFamily: 'General Sans, sans-serif' }}>
            All observations are documented and compiled into a structured snag report for owner reference and submission prior to acceptance.
          </p>
        </div>
      </section>

      {/* SECTION 3: Does Not Include */}
      <section className="w-full bg-white py-[60px] md:py-[80px] flex justify-center px-6 relative">
        <div className="w-full max-w-[1200px] z-10">
          <div className="mb-[30px] md:mb-[40px] pb-[13px]">
            <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-[1.2] mb-[10px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
              What This Service Does Not Include
            </h2>
            <div className="flex w-full max-w-[480px]">
              <div className="w-[140px] md:w-[180px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] bg-[#01155E] mt-[2px] md:mt-[3px]" />
            </div>
          </div>
          <div className="text-[#67739E] text-[16px] md:text-[18px] " style={{ fontFamily: 'General Sans, sans-serif' }}>
            <ul className="list-disc pl-6 mb-6 ">
              <li>Selling or negotiating property transactions</li>
              <li>Construction execution or repair works</li>
              <li>Ongoing maintenance or property management</li>
            </ul>
            <p>
              Developers or sellers remain responsible for rectification in accordance with contractual obligations and defect liability provisions.
            </p>
          </div>
        </div>
        {/* Blurred Circles - Optimized for responsiveness
       <div className="hidden lg:block absolute -right-40 top- [40%] opacity-50 h-[185px] w-[185px] rounded-full bg-[#1C4DFF12]" /> */}
      </section>

      {/* SECTION 4: Execution Framework & Important Note (Combined Logic) */}
      <section className="w-full bg-white py-[60px] md:py-[80px] flex justify-center px-6">
        <div className="w-full max-w-[1200px] space-y-[80px]">
          {/* Execution Framework */}
          <div>
            <div className="mb-[40px] md:mb-[60px]">
              <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold mb-[10px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Execution Framework
              </h2>
              <div className="flex w-full max-w-[500px]">
                <div className="w-[120px] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
                <div className="flex-1 h-[2px] bg-[#01155E] mt-[2px] md:mt-[3px]" />
              </div>
            </div>
            <div className="flex border-l-[3px] border-[#01155E] pl-5 md:pl-[30px] py-[5px]">
              <div className="text-[#67739E] text-[16px] md:text-[18px]  text-left max-w-[1000px]" style={{ fontFamily: 'General Sans, sans-serif' }}>
                <p className="mb-4">
                  Handover inspections and snagging execution are delivered through appointed, licensed inspection professionals operating within a defined handover framework.
                </p>
                <p>
                  Our role is to structure the engagement and act as the primary coordination point, establishing clear accountability and ensuring documented outcomes throughout the handover inspection process.
                </p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div>
            <div className="mb-[40px] md:mb-[60px]">
              <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold mb-[10px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
                Important Note:
              </h2>
              <div className="flex w-full max-w-[480px]">
                <div className="w-[100px] md:w-[150px] h-[6px] md:h-[8px] bg-[#01155E]" />
                <div className="flex-1 h-[2px] bg-[#01155E] mt-[2px] md:mt-[3px]" />
              </div>
            </div>
            <div className="flex border-l-[3px] border-[#01155E] pl-5 md:pl-[30px] py-[5px]">
              <div className="text-[#67739E] text-[16px] md:text-[18px]  text-left max-w-[1000px]" style={{ fontFamily: 'General Sans, sans-serif' }}>
                <p className="mb-6">
                  This service is optional. Many buyers choose to handle handover independently.
                </p>
                <p>
                  It is offered for those who prefer added assurance, structured documentation, and reduced post-handover follow-up, particularly where time, distance, or experience may limit direct involvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceCover