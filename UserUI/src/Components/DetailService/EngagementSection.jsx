import React from 'react';

const EngagementSection = () => {
  return (
    <section className="w-full bg-white py-[120px] flex justify-center">
      {/* CONTENT WRAPPER */}
      <div className="w-[1200px]">

        {/* TITLE */}
        <div className="mb-[60px] pb-[13px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            How the Engagement Works
          </h2>

          {/* UNDERLINE */}
          <div className="flex w-[414px]">
            <div className="w-[162px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* SUB HEADING */}
       <h3
  className="text-[#01155E] text-[20px] font-semibold leading-[100%] mb-[20px] text-justify"
  
>
  Developers engage with us at an early stage of a project.
</h3>

        {/* PARAGRAPHS */}
       <div
  className="
    flex flex-col
    text-[#01155E]
    text-[18px]
    leading-[18px]
    font-normal
    text-justify
    leading-relaxed
  "
 
>
  <p className="mb-5">
    We review the asset from a commercial and market positioning perspective,
    discuss the relevant market context, and determine the appropriate project
    marketing and sales pathway based on the developer’s objectives.
  </p>

  <p className="">
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
