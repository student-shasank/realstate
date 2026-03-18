import React from 'react'
import backgroundImage from '../../../src/assets/detailservicebackground.png';

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

      {/* HERO / CTA SECTION */}
      <section className="relative flex w-full items-center justify-center overflow-hidden pb-10">
        <div className="relative w-full max-w-[1200px] min-h-[350px] md:min-h-[450px] lg:min-h-[568px] flex items-center px-4 md:px-6 lg:px-8">
          
          {/* BACKGROUND BLUR EFFECT */}
          <div 
            className="absolute inset-0 z-0 opacity-30 md:opacity-40 blur-[60px] md:blur-[80px]"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* DECORATIVE CIRCLES (Absolute positions adjusted for mobile) */}
          <div className="absolute left-0 md:left-3 top-[20%] md:top-[180px] z-10 h-[100px] w-[100px] md:h-[165px] md:w-[165px] rounded-full bg-[#1C4DFF12]" />
          <div className="absolute right-[8%] sm:right-[19%] top-[31%] lg:right-[23%] lg:top-[40%] z-10 h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] lg:h-[185px] lg:w-[185px] rounded-full bg-[#1C4DFF12]" />
          
          {/* CONTENT: TEXT + BUTTON */}
          <div className="relative z-20 flex flex-col gap-8 md:gap-10 py-10 w-full">
            <h1 
              className="font-['General_Sans'] text-[32px] sm:text-[42px] md:text-[54px] lg:text-[64px] font-medium leading-[1.2] tracking-tight text-[#01155E]"
            >
              Looking to <br className="hidden sm:block" /> 
              Property Management <br className="hidden lg:block" /> Structuring?
            </h1>
            
            <button 
              className="flex h-[56px] md:h-[64px] w-full max-w-[280px] items-center justify-center rounded-lg bg-[#01155E] font-['General_Sans'] text-[16px] md:text-[18px] font-medium text-white transition-all hover:bg-opacity-90 active:scale-95 shadow-lg"
            >
              Register Now
            </button>
          </div>

          {/* LARGE BLUR CIRCLE (Hidden on small screens for performance) */}
         <div className="hidden sm:block absolute right-[-20px] sm:right-[-30px] top-0 z-0 h-[280px] w-[280px] sm:h-[276px] sm:w-[276px] lg:h-[400px] lg:w-[400px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />
        </div>
      </section>

    </div>
  )
}

export default Propertysale;