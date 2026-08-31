import React from 'react'
import backgroundImage from '../../../src/assets/detailservicebackground.png';
import {
 
  MapPin,ArrowRight
} from "lucide-react";

function Propertysale() {
  return (
    <div className="flex flex-col items-center bg-white w-full overflow-hidden">
      
      {/* TOP TEXT SECTION - max-w-1200px and px-4 for mobile/tablet */}
      <div className="w-full max-w-[1200px] px-4 md:px-4 lg:px-4 py-12 md:py-16 lg:py-20">
        
        {/* HEADING SECTION */}
        <div className="mb-8 md:mb-10">
          <h2
            className="text-[#01155E] text-[24px] md:text-[28px] lg:text-[32px] font-semibold mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Next Step – Discuss Your Project
          </h2>
          
          {/* CUSTOM UNDERLINE - Responsive width */}
          <div className="flex w-full max-w-[300px] md:max-w-[414px] items-end">
            <div className="w-[120px] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* SUBTITLE WITH VERTICAL BORDER */}
        <div
          className="flex flex-col gap-[12px] text-[#01155E] text-[16px] md:text-[18px] font-normal leading-[1.6] border-l-[3px] border-[#01155E] pl-5 md:pl-6"
          style={{ fontFamily: 'General Sans, sans-serif' }}
        >
          <p>
            Every engagement begins with a structured discussion to understand the project, objectives, and market context.
          </p>
          <p>
            This ensures that projects move forward with the right positioning, the right execution pathway, and a clear structure from day one.
          </p>
        </div>


        
      </div>
<section className="px-5 pb-[70px]">
        <div className="w-[1200px] mx-auto">
          <div className="relative overflow-hidden rounded-[18px] bg-[#01155E] px-7 sm:px-10 lg:px-14 py-9 sm:py-11">
            <div className="absolute -right-[100px] -top-[130px] w-[350px] h-[350px] rounded-full border border-white/10" />
            <div className="absolute right-[30px] -bottom-[200px] w-[400px] h-[400px] rounded-full border border-white/10" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="hidden sm:flex w-[72px] h-[72px] rounded-full bg-white/10 items-center justify-center flex-shrink-0">
                  <MapPin size={30} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white text-[26px] sm:text-[32px] font-semibold leading-[120%]">
                    Ready to find your
                    <br />
                    perfect property?
                  </h2>
                  <p className="text-white/70 text-[14px] sm:text-[15px] mt-2">
                    Explore thousands of premium properties
                    <br className="hidden sm:block" />
                    across Dubai with Yupland.
                  </p>
                </div>
              </div>

              <a
                href="/listings"
                className="w-full lg:w-auto h-[50px] px-7 bg-white rounded-[7px] flex items-center justify-center gap-3 text-[#01155E] text-[14px] font-semibold hover:bg-[#67739E] hover:text-white transition-all duration-300"
              >
                Explore Properties
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* HERO / CTA SECTION */}
      

    </div>
  )
}

export default Propertysale;