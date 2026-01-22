import React from 'react'
import imageurl from '../../assets/engagement-scope.jpg';

function EngagementWorks() {
 const listItems = [
    "We frame the project opportunity and align expectations",
    "We act as the initial access point into the execution structure",
    "We introduce projects into appointed RERA-licensed brokerage teams",
    "We do not participate in marketing execution, sales operations, contracting, or settlement",
    "These activities are carried out directly by appointed RERA-licensed brokerage teams"
  ];
  return (
    <div>

        <section className="w-full bg-white pb-[50px] pt-[40px] flex justify-center">
              <div className="w-[1200px] flex flex-col">
                
                {/* HEADER SECTION */}
                <div className="mb-[66px]">
                  <h2
                    className="text-[#01155E] text-[28px] font-semibold mb-[10px]"
                    style={{ fontFamily: 'Archivo, sans-serif' }}
                  >
                    How the Engagement Works
                  </h2>
                  {/* UNDERLINE MATCHING IMAGE */}
                  <div className="flex w-[291.5px]">
                    <div className="w-[195.38px] h-[8px] bg-[#01155E]" />
                    <div className="flex-1 h-[2px] bg-[#01155E]" />
                  </div>
                </div>
        
                {/* CONTENT SECTION (FLEX) */}
                <div className="flex justify-between items-start">
                  
                  {/* LEFT SIDE: IMAGE CONTAINER (600px) */}
                  <div className="w-[600px] h-[449px] rounded-[8px] overflow-hidden"
                  style={{boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.8)"}}>
                    <img 
                      src={imageurl} // Replace with your image path
                      alt="Modern Villa"
                      className="w-full h-full object-cover"
                    />
                  </div>
        
                  {/* RIGHT SIDE: TEXT CONTENT (545px) */}
                  {/* RIGHT SIDE: TEXT CONTENT */}
<div className="w-[545px] flex flex-col gap-2">
  
  <p
    className="text-[#01155E] text-[18px] font-normal text-justify leading-relaxed "
    
  >
    Asset owners engage with us to define portfolio-level priorities such as
    income stability, occupancy optimisation, operating cost discipline,
    capital preservation, and long-term exit or hold strategies.
  </p>

  <p
    className="text-[#01155E] text-[18px] font-normal text-justify leading-relaxed "
   
  >
    We assess portfolio performance, identify risk and inefficiency points,
    and structure an asset management model that governs leasing strategy,
    operational execution, reporting, and decision thresholds.
  </p>

  <p
    className="text-[#01155E] text-[18px] font-normal text-justify leading-relaxed  gap-2"
   
  >
    Once the framework is established, execution is carried out through a
    dedicated, RERA-licensed asset management and property management platform,
    while we remain involved at a strategic and oversight level.
  </p>

  <p
    className="text-[#01155E] text-[18px] font-normal text-justify leading-relaxed  "
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