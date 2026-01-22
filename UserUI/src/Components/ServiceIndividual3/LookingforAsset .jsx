import React from 'react'
import backgroundImage from '../../../src/assets/detailservicebackground.png';

function LookingforAsset () {
  return (
    <div>

         <div className="flex flex-col items-center bg-white">
              {/* WRAPPER FOR 1200PX ALIGNMENT */}
              <div className="w-full max-w-[1200px] px-4  py-20 ">
                
                {/* TOP PARAGRAPHS (From Image 2) */}
                
                {/* HEADING SECTION */}
                <div className="mb-[40px] ">
                  <h2
                    className="text-[#01155E] text-[32px] font-semibold mb-[10px] "
                    style={{ fontFamily: 'Archivo, sans-serif' }}
                  >
                    Next Step – Discuss Your Project
                  </h2>
        
                  {/* CUSTOM UNDERLINE */}
                  <div className="flex w-[400px] max-w-[414px] items-end ">
                    <div className="w-[162px] h-[8px] bg-[#01155E]" />
                    <div className="flex-1 h-[2px] bg-[#01155E]" />
                  </div>
                </div>
        
                {/* SUBTITLE WITH VERTICAL BORDER */}
                <div
                  className="
                    flex flex-col
                    absolute
                    gap-[8px]
                    text-[#01155E]
                    text-[18px]
                    font-normal
                    leading-[1.5]
                    font-['General_Sans']
                    border-l-[3px] border-[#01155E]
                    pl-6
                    z-20
                    
                    
                  "
                >
                  <p>
                    Every engagement begins with a structured discussion to understand the project, objectives, and market context.
                  </p>
                  <p>
                    This ensures that projects move forward with the right positioning, the right execution pathway, and a clear structure from day one.
                  </p>
                </div>
              </div>
        
              {/* HERO SECTION (Maintains its own 1200px container logic) */}
              <section className="relative flex w-full items-center justify-center overflow-hidden pb-10">
                <div className="relative flex h-[568px] w-[1200px] items-center justify-between px-4">
                  <div 
                    className="absolute inset-0 z-0 opacity-40 blur-[80px]"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
        
                  <div className="z-20 flex flex-col gap-10">
                    <div className="absolute left-3 top-[200.7px] z-20 h-[165.66px] w-[185.66px] rounded-full bg-[#1C4DFF12]"></div>
                    <h1 className="font-['General_Sans']   h-[225.66px] w-[1200.66px] text-[96px] font-medium leading-[1.2] tracking-normal text-[#01155E]  ">
                    Looking for <br />  Asset Management ?
                    </h1>
                    <button className="flex h-[64px] w-[280px] items-center justify-center rounded-lg bg-[#01155E] font-['General_Sans'] text-[18px] font-medium text-white transition-all hover:bg-opacity-90 active:scale-95">
                      Register Now
                    </button>
                  </div>
        
                  <div className="relative h-full w-1/2">
                    <div className="absolute right-81 top-[290.7px] z-20 h-[185.66px] w-[185.66px] rounded-full bg-[#1C4DFF12]"></div>
                    <div className="absolute -right-10 z-10 -top-0  h-[500px] w-[500px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />
                  </div>
                </div>
              </section>
            </div>
    </div>
  )
}

export default LookingforAsset 