import React from 'react'
import Table1 from "../../assets/table1.png"
import Table2 from "../../assets/table2.png"
import Table3 from "../../assets/table3.png"

function LifecycleFramework() {
  return (
    <div className="w-full bg-white overflow-hidden">
      
      {/* SECTION 1: Lifecycle Framework */}
      <section className="w-full py-12 md:py-20 flex justify-center px-4 md:px-4 relative">
        <div className="w-full max-w-[1200px] z-20">
          {/* TITLE */}
          <div className="mb-10 md:mb-[60px]">
            <h2 className="text-[#01155E] text-[26px] md:text-[32px] font-semibold leading-tight mb-[10px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Development Lifecycle Framework
            </h2>
            <div className="flex w-full max-w-[414px]">
              <div className="w-[120px] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] bg-[#01155E] self-end mb-[2px]" />
            </div>
          </div>

          <p className="text-[#01155E] text-[16px] md:text-[18px] font-normal  mb-8 ">
            The following framework illustrates how development activities are structured across the lifecycle of a project, from pre-construction through post-construction.
          </p>

          {/* TABLE CONTAINER - Added horizontal scroll for mobile */}
          <div className="w-full overflow-x-auto pb-4">
             <div className="min-w-[800px] lg:w-[900px]">
                <img src={Table1} alt="Table 1" className="w-full h-auto block shadow-sm rounded-lg" />
             </div>
          </div>
        </div>

        {/* BACKGROUND DECORATION (Hidden on mobile for cleaner look or scaled down) */}
        <div className="hidden lg:block absolute -right-40 top-[400px] opacity-30 z-10 h-[185px] w-[185px] rounded-full bg-[#1C4DFF12]" />
      </section>

      {/* SECTION 2: Domain Specialisation */}
      <section className="w-full py-12 md:py-20 flex justify-center px-4 md:px-4 bg-gray-50/30">
        <div className="w-full max-w-[1200px]">
          <div className="mb-10 md:mb-[60px]">
            <h2 className="text-[#01155E] text-[26px] md:text-[32px] font-semibold leading-tight mb-[10px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Domain Specialisation Framework
            </h2>
            <div className="flex w-full max-w-[414px]">
              <div className="w-[120px] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] bg-[#01155E] self-end mb-[2px]" />
            </div>
          </div>

          <p className="text-[#01155E] text-[16px] md:text-[18px] font-normal  mb-8 ">
            The following domains outline how responsibilities are structured across regulatory, construction, and procurement functions, with execution delivered through an appointed development management platform.
          </p>

          <div className="w-full overflow-x-auto pb-4">
             <div className="min-w-[800px] lg:w-[900px]">
                <img src={Table2} alt="Table 2" className="w-full h-auto block shadow-sm rounded-lg" />
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Sales Support */}
      <section className="w-full py-12 md:py-20 flex justify-center px-4 md:px-4 relative">
        <div className="w-full max-w-[1200px]">
          <div className="mb-10 md:mb-[60px]">
            <h2 className="text-[#01155E] text-[26px] md:text-[32px] font-semibold leading-tight mb-[10px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Sales Support and Customer Services
            </h2>
            <div className="flex w-full max-w-[414px]">
              <div className="w-[120px] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] bg-[#01155E] self-end mb-[2px]" />
            </div>
          </div>

          <p className="text-[#01155E] text-[16px] md:text-[18px] font-normal  mb-8 ">
            The following outlines how sales and customer-facing activities are coordinated to align with construction progress, regulatory requirements, and escrow milestones.
          </p>

          <div className="w-full overflow-x-auto pb-8">
             <div className="min-w-[800px] lg:w-[900px]">
                <img src={Table3} alt="Table 3" className="w-full h-auto block shadow-sm rounded-lg" />
             </div>
          </div>

          <p className="text-[#01155E] text-[15px] md:text-[18px] font-normal   italic border-l-4 border-blue-100 pl-4">
            Oversight at this stage is limited to coordination, monitoring, and reporting, with all statutory responsibility retained by the appointed execution parties.
          </p>
        </div>
      </section>

      {/* SECTION 4: Execution Platform */}
      <section className="w-full py-12 md:py-20 flex justify-center px-4 md:px-4">
        <div className="w-full max-w-[1200px]">
          <div className="mb-8 md:mb-12">
            <h2 className="text-[#01155E] text-[26px] md:text-[32px] font-semibold leading-tight mb-[10px]" style={{ fontFamily: 'Archivo, sans-serif' }}>
              Execution Platform
            </h2>
            <div className="flex w-full max-w-[500px]">
              <div className="w-[120px] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] bg-[#01155E] self-end mb-[2px]" />
            </div>
          </div>

          <div className="flex border-l-[4px] border-[#01155E] pl-5 md:pl-[30px] py-2">
            <p className="text-[#01155E] text-[16px] md:text-[18px] font-normal  max-w-[1000px]">
              Development management execution is carried out through an appointed, RERA-licensed platform with established operational experience across development management, construction coordination, regulatory compliance, and project handover in Dubai.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LifecycleFramework