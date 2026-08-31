import React from 'react'
import imageurl from '../../assets/engagement-scope.jpg';

function EngagementWorks() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Added more padding top (pt) for desktop and mobile to clear the navbar */}
      <section className="w-full bg-white pb-[60px] pt-[140px] md:pt-[180px] px-4 md:px-4 flex sm:justify-center">
        
        {/* 2. Using max-w-[1200px] but w-[95%] to give some breathing room on edges */}
        <div className="w-[100%] max-w-[1200px] flex flex-col">
          
          {/* HEADER SECTION */}
          <div className="mb-10 md:mb-[60px]">
            <h2
              className="text-[#01155E] text-[26px] md:text-[32px] font-semibold mb-[12px]"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              How the Engagement Works
            </h2>
            <div className="flex w-full max-w-[300px]">
              <div className="w-[60%] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[3px] bg-[#01155E]" />
            </div>
          </div>
  
          {/* 3. Responsive Flex: Stack on 'lg' breakpoint (1024px) and below */}
          <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-10">
            
            {/* IMAGE: Adjusted for 1024px view */}
            <div 
              className="w-full xl:w-[580px] h-[350px] md:h-[450px] rounded-[12px] overflow-hidden flex-shrink-0"
              style={{boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"}}
            >
              <img 
                src={imageurl} 
                alt="Engagement Scope"
                className="w-full h-full object-cover"
              />
            </div>
  
            {/* TEXT: Desktop font sizes preserved */}
            <div className="w-full xl:w-[545px] flex flex-col gap-5 sm:text-justify">
              <p className="text-[#01155E] sm:text-[18px] text-[16px] font-normal  ">
                Asset owners engage with us to define portfolio-level priorities such as
                income stability, occupancy optimisation, operating cost discipline,
                capital preservation, and long-term exit or hold strategies.
              </p>

              <p className="text-[#01155E] sm:text-[18px] text-[16px] font-normal  ">
                We assess portfolio performance, identify risk and inefficiency points,
                and structure an asset management model that governs leasing strategy,
                operational execution, reporting, and decision thresholds.
              </p>

              <p className="text-[#01155E] sm:text-[18px] text-[16px] font-normal  "  
               style={{ fontFamily: 'General Sans, sans-serif' }}>
                Once the framework is established, execution is carried out through a
                dedicated, RERA-licensed asset management and property management platform,
                while we remain involved at a strategic and oversight level.
              </p>

              <p 
                className="text-[#01155E] sm:text-[18px] text-[16px] font-normal  "
                style={{ fontFamily: 'General Sans, sans-serif' }}
              >
                This ensures that owners are not involved in day-to-day operations,
                vendor coordination, or tenant matters, while still retaining full
                visibility and control over performance and outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EngagementWorks