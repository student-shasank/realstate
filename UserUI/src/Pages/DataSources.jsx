import React from 'react';

const DataSources = () => {
  return (
    <div className="w-full bg-white font-sans selection:bg-[#01155E]/10 pt-20">
      
      {/* --- Header Section --- */}
      <section className="w-full flex justify-center pt-[100px] pb-[60px] px-4">
        <div className="w-[1213px] text-left">
          <h1 className="font-['Archivo'] font-semibold text-[56px] leading-[100%] text-[#01155E]   inline-block">
            Data Sources
          </h1>
          <div className="flex w-[574px] mb-4"><div className="w-[240px] h-[8px]  mb-4 bg-[#01155E]"></div><div className="flex-1 h-[2px] bg-[#01155E]"></div></div>
          <p className="text-[#67739E] text-[18px] leading-[160%]">
            Last Updated: June 2026
          </p>
        </div>
      </section>

      {/* --- Main Background Content Area --- */}
      <section className="w-full flex justify-center pb-20 px-4">
        {/* Figma Dimensions: 1452px Width & Gradient Background */}
        <div className="w-[1452px] min-h-[1082px] pt-[80px] pb-20 px-[120px] rounded-[24px] bg-gradient-to-b from-[rgba(28,77,255,0.07)] to-[rgba(28,77,255,0.27)]">
          
          <div className="max-w-[1213px] mx-auto text-[#67739E] text-[18px] leading-[170%] space-y-10">
            
            {/* Introductory Section */}
            <section className="space-y-6">
              <p>
                Information presented on Yupland is compiled from publicly available data, official records, developer communications, and credible market publications.
              </p>
              <p>
                Yupland organises and presents structured information derived from a range of external sources in order to provide users with a consolidated overview of the real estate market. The platform aggregates and structures publicly available information for informational purposes and does not originate all the underlying data.
              </p>
            </section>

            {/* Sources List Section */}
            <section className="space-y-4">
              <h2 className="font-['Archivo'] font-semibold text-[32px] text-[#01155E] leading-[120%] underline underline-offset-[12px] decoration-1 mb-8">
                Sources of Information
              </h2>
              <p className="mb-6">Information published on the platform may be derived from sources including, but not limited to:</p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                {[
                  "Dubai Land Department transaction data",
                  "Property Monitor market analytics",
                  "Public announcements and project updates by developers",
                  "Government infrastructure and planning updates",
                  "Official government publications and regulatory announcements",
                  "Credible UAE news publications and media reports",
                  "Market research reports and industry publications",
                  "Publicly available property listing platforms"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#01155E] mt-[12px] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Verification and Responsibility */}
            <section className="space-y-6">
              <p>
                While reasonable efforts are made to reference reliable sources, Yupland does not control, independently verify, or guarantee the accuracy, completeness, reliability, or timeliness of information obtained from third-party sources.
              </p>
              <p>
                Information originating from external sources remains the responsibility of those respective sources and may change, be updated, or be corrected at any time without notice.
              </p>
              <p>
                Users are encouraged to independently verify any information obtained from the platform before relying on it for any decision-making purpose.
              </p>
            </section>

            {/* Ownership Section */}
            <section className="space-y-4 pt-6 border-t border-[#67739E]/20">
              <p>
                Yupland does not claim ownership of third-party data referenced on the platform unless explicitly stated. However, the organisation, structure, presentation, and compilation of information on the platform constitute original work and intellectual property of Yupland.
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DataSources;