import React from 'react'

function ModelWorks() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Added responsive padding (px-6) and vertical spacing */}
      <section className="w-full bg-white py-[60px] md:py-[80px] px-4 md:px-4 flex justify-center">
        
        {/* 2. Changed fixed w-[1200px] to max-width with w-[95%] for mobile safety */}
        <div className="w-[100%] max-w-[1200px]">

          {/* TITLE SECTION */}
          <div className="mb-10 md:mb-[60px]">
            <h2
              className="text-[#01155E] text-[26px] md:text-[32px] font-semibold mb-[10px]"
              style={{ 
                fontFamily: 'General Sans, sans-serif',
                lineHeight: '120%' // Improved for mobile wrapping
              }}
            >
              Why This Model Works
            </h2>

            {/* 3. Responsive Underline: Removed fixed 614px width */}
            <div className="flex items-end w-full max-w-[400px] md:max-w-[614px]">
              <div className="w-[80px] md:w-[100px] h-[6px] bg-[#01155E]" />
              <div className="flex-1 h-[1px] bg-[#01155E]" />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div
            className="text-[#01155E] flex flex-col gap-5 leading-relaxed"
            style={{
              fontWeight: '400',
              fontSize: '18px',
              fontFamily: 'General Sans, sans-serif'
            }}
          >
            {/* Added responsive font size for better mobile readability */}
            <p className="text-[16px] md:text-[18px] leading-relaxed">
              Direct engagement with property management execution without prior
              structuring often leads to unclear scope, misaligned expectations,
              and operational friction.
            </p>

            <p className="text-[16px] md:text-[18px] leading-relaxed">
              By defining requirements upfront and introducing properties into the
              correct licensed management framework, owners benefit from professional
              execution, regulatory compliance, and consistent operational standards,
              while maintaining clear accountability.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default ModelWorks