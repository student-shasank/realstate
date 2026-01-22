import React from 'react';

const ModelBenefits = () => {
  return (
    <section className="w-full bg-white pt-[60px] pb-[120px] flex justify-center">
      {/* CONTENT WRAPPER - 1200px */}
      <div className="w-[1200px]">
        
        {/* TITLE SECTION */}
        <div className="mb-[60px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Why This Model Works
          </h2>

          {/* CUSTOM UNDERLINE */}
          <div className="flex w-[414px] items-end">
            <div className="w-[162px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* PARAGRAPHS CONTENT */}
      <div
  className="
    flex flex-col
    gap-[28px]
    text-[#01155E]
    text-[18px]
    font-normal
    leading-[100%]
    tracking-[0]
    max-w-[1100px]
    font-['General_Sans']
  "
>
  <p>
    Direct access to execution without prior structuring often leads to mispricing, 
    diluted positioning, and inconsistent communication.
  </p>

  <p className="text-[18px] leading-[1.4]">
    By defining the engagement framework upfront and establishing the correct 
    execution pathway from the outset, projects enter the market with clarity, 
    aligned expectations, and a controlled transition into execution.
  </p>

  <p>
    This reduces friction, avoids duplication of roles, and supports more 
    efficient outcomes for all parties involved.
  </p>
</div>


      </div>
    </section>
  );
};

export default ModelBenefits;