import React from 'react'
import imageurl from '../../assets/engagement-scope.jpg';

function PropertyManagementServices() {
  return (
    <div className="w-full overflow-hidden">
      {/* Section with responsive padding to clear navbar and provide spacing */}
      <section className="w-full bg-white pb-[60px] pt-[80px] md:pt-[120px] px-4 md:px-4 flex sm:justify-center">
        
        {/* Container with max-width and breathing room */}
        <div className="w-[100%] max-w-[1200px] flex flex-col">
          
          {/* HEADER SECTION */}
          <div className="mb-10 md:mb-[60px]">
            <h2
              className="text-[#01155E] text-[26px] md:text-[32px] font-semibold mb-[12px]"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              How the Engagement Works
            </h2>
            {/* Responsive Underline */}
            <div className="flex w-full max-w-[300px]">
              <div className="w-[60%] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[3px] bg-[#01155E]" />
            </div>
          </div>
  
          {/* CONTENT SECTION: Stacks on mobile/tablet, side-by-side on XL (1280px+) */}
          <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-10">
            
            {/* IMAGE: Responsive height and width */}
            <div 
              className="w-full xl:w-[570px] h-[350px] md:h-[317px] rounded-[12px] overflow-hidden flex-shrink-0"
              style={{boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"}}
            >
              <img 
                src={imageurl} 
                alt="Property Management"
                className="w-full h-full object-cover"
              />
            </div>
  
            {/* TEXT CONTENT: Adjusted padding and font sizes for readability */}
            <div className="w-full xl:w-[596px] flex flex-col gap-5">
              <p
                className="text-[#01155E] sm:text-[18px] text-[16px] font-normal "
                style={{ fontFamily: 'General Sans, sans-serif' }}
              >
                Executed through appointed RERA-licensed property management teams <br />
                • Once introduced into execution, property management services may include:
              </p>

              <ul className="list-none flex flex-col gap-2">
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
                    className="text-[#01155E] sm:text-[18px] text-[16px] font-normal  flex gap-3"
                    style={{ fontFamily: 'General Sans, sans-serif' }}
                  >
                    <span className="text-[#01155E] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p
                className="text-[#01155E] sm:text-[18px] text-[16px] font-normal  mt-2"
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

export default PropertyManagementServices;