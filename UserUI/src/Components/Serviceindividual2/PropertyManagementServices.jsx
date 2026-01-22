import React from 'react'
import imageurl from '../../assets/engagement-scope.jpg';

function PropertyManagementServices() {
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
<div className="w-[545px] flex flex-col gap-2 pt-10">
  <p
    className="text-[#01155E] text-[18px] font-normal text-justify  leading-relaxed"
    style={{ fontFamily: 'General Sans, sans-serif' }}
  >
    Executed through appointed RERA-licensed property management teams. Once introduced into execution, property management services may include:
  </p>

  <ul className="list-none flex flex-col gap-1">
    {[
      "Property evaluations and safety checks",
      "Market research and rental valuation",
      "Tenant screening and rental agreement management",
      "Rent collection and payment administration",
      "Facilities management and maintenance coordination",
      "Regulatory compliance and tenant communication",
    ].map((item, index) => (
      <li 
        key={index}
        className="text-[#01155E] text-[18px] font-normal text-justify leading-relaxed flex gap-2"
        style={{ fontFamily: 'General Sans, sans-serif' }}
      >
        <span>•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>

  <p
    className="text-[#01155E] text-[18px] font-normal text-justify leading-relaxed mt-2"
    style={{ fontFamily: 'General Sans, sans-serif' }}
  >
    All services are delivered directly by the appointed management team in accordance with applicable regulations.
  </p>
</div>

        
                </div>
              </div>
            </section>
    </div>
  )
}

export default PropertyManagementServices