import React from 'react';

const ModelBenefits = () => {
  return (
    <section className="w-full bg-white py-[60px] md:pb-[120px] px-6 flex justify-center">
      {/* CONTENT WRAPPER - Max width instead of fixed width */}
      <div className="w-full max-w-[1200px]">
        
        {/* TITLE SECTION */}
        <div className="mb-10 md:mb-[10px]">
          <h2
            className="text-[#01155E] text-2xl md:text-[32px] font-semibold mb-3"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Why This Model Works
          </h2>

          {/* CUSTOM UNDERLINE - Responsive width logic */}
          <div className="flex w-full max-w-[414px] items-end">
            <div className="w-[30%] md:w-[162px] h-1.5 md:h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* PARAGRAPHS CONTENT */}
        <div
          className="
            flex flex-col
            gap-2 md:gap-[8px]
            text-[#01155E]
            text-base md:text-[18px]
            font-normal
            tracking-normal
            max-w-[1100px]
            font-['General_Sans']
          "
        >
          <p>
            Direct access to execution without prior structuring often leads to mispricing, 
            diluted positioning, and inconsistent communication.
          </p>

          <p>
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