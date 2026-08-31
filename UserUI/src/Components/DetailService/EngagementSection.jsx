import React from 'react';

const EngagementSection = () => {
  return (
    <section className="w-full bg-white py-16 md:py-[120px] flex justify-center px-4 md:px-4">
      {/* CONTENT WRAPPER - Changed from fixed width to max-width */}
      <div className="w-full max-w-[1200px]">

        {/* TITLE */}
        <div className="mb-10 md:mb-[10px] pb-[10px]">
          <h2
            className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-tight md:leading-[100%] mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            How the Engagement Works
          </h2>

          {/* UNDERLINE - Responsive width */}
          <div className="flex w-full max-w-[414px]">
            <div className="w-[30%] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[1.5px] md:h-[2px] mt-auto bg-[#01155E]" />
          </div>
        </div>

        {/* SUB HEADING */}
        <h3 className="text-[#01155E] text-[18px] md:text-[20px] font-semibold leading-snug mb-[20px] text-left md:text-justify">
          Developers engage with us at an early stage of a project.
        </h3>

        {/* PARAGRAPHS */}
        <div className="flex flex-col text-[#01155E] text-[16px] md:text-[18px] font-normal text-left md:text-justify leading-relaxed">
          <p className="mb-5">
            We review the asset from a commercial and market positioning perspective,
            discuss the relevant market context, and determine the appropriate project
            marketing and sales pathway based on the developer’s objectives.
          </p>

          <p className="mb-5">
            Once alignment is established, the project is introduced into a structured
            execution process delivered by appointed RERA-licensed brokerage teams.
            From that point onward, all operational activities are handled directly
            by the execution team.
          </p>

          <p>
            This approach ensures clarity of responsibility, avoids role duplication,
            and allows developers to engage directly with licensed specialists
            for execution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EngagementSection;