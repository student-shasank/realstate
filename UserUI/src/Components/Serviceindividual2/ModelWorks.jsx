import React from 'react'

function ModelWorks() {
  return (
    <div>

        <section className="w-full bg-white py-[60px] flex justify-center">
  {/* CONTENT WRAPPER */}
  <div className="w-[1200px]">

    {/* TITLE SECTION */}
    <div className="mb-[60px]">
      <h2
        className="text-[#01155E] text-[32px] font-semibold mb-[10px]"
        style={{ 
          fontFamily: 'General Sans, sans-serif',
          lineHeight: '100%' 
        }}
      >
        Why This Model Works
      </h2>

      {/* MATCHED UNDERLINE DESIGN */}
      <div className="flex items-end w-[614px]">
        <div className="w-[100px] h-[6px] bg-[#01155E]" />
        <div className="flex-1 h-[1px] bg-[#01155E]" />
      </div>
    </div>

    {/* TEXT CONTENT */}
    <div
      className="text-[#01155E] flex flex-col gap-3 leading-relaxed"
      style={{
        
        fontWeight: '400',
        fontSize: '18px',
        letterSpacing: '0%',
      }}
    >
      <p className="leading-relaxed">
        Direct engagement with property management execution without prior
        structuring often leads to unclear scope, misaligned expectations,
        and operational friction.
      </p>

      <p className="leading-relaxed">
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