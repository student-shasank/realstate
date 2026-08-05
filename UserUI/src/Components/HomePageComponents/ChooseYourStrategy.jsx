import React from 'react';
import firstimage from "../../assets/chooseyourstrategy1.jpg"
import Secondimage from "../../assets/chooseyourstrategy2.jpg"

const ChooseYourStrategy = () => {
  return (
    <section className="w-full flex justify-center py-12 md:py-[70px] px-4 bg-white font-sans">
      <div className="w-full max-w-[1452px] flex flex-col items-center">
        
        {/* --- Header Block --- */}
        <div className="w-full max-w-[1213px] mb-10 md:mb-[60px] text-left">
          <h2 className="font-['Archivo'] font-semibold text-[32px] md:text-[48px] leading-tight text-[#01155E] mb-2 pb-2 inline-block">
            Choose Your Strategy
          </h2>
          <div className="flex w-full max-w-[574px]">
            <div className="w-[120px] md:w-[240px] h-[6px] md:h-[8px] bg-[#01155E]"></div>
            <div className="flex-1 h-[2px] bg-[#01155E] self-center"></div>
          </div>
          <p className="text-[#67739E] text-[18px] md:text-[20px]   max-w-[1141px] mt-6 font-['General_Sans']">
            Real estate opportunities generally fall into two categories: offplan and ready properties. Each represents a different stage in the property lifecycle and serves distinct investment and ownership objectives, whether the focus is on long term value creation, structured capital deployment, or immediate asset utilisation.
          </p>
        </div>

        {/* --- Image Area --- */}
        <div className="relative z-20 flex flex-col md:flex-row gap-8 md:gap-[93px] justify-center items-center w-full max-w-[1213px]">
          {/* Left Image */}
          <div className="w-full md:w-[560px] h-[300px] md:h-[448px] rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
            <img src={firstimage} alt="Offplan construction site" className="w-full h-full object-cover" />
          </div>
          {/* Right Image */}
          <div className="w-full md:w-[560px] h-[300px] md:h-[448px] rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
            <img src={Secondimage} alt="Ready luxury property" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* --- Bottom Content Container (Responsive Gradient) --- */}
        <div className="w-full max-w-[1452px] mt-[-120px] md:-mt-[224px] pt-[160px] md:pt-[280px] pb-12 md:pb-20 px-6 lg:px-[40px]  xl:px-[100px] rounded-[24px] bg-gradient-to-b from-[rgba(28,77,255,0.04)] to-[rgba(28,77,255,0.12)]">
          <div className="max-w-[1213px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-x-24">

            {/* Left Column: Offplan */}
            <div className="flex flex-col">
              <h3 className="font-['Archivo'] font-semibold text-[26px] md:text-[32px] leading-[120%] text-[#01155E] underline underline-offset-[6px] decoration-1 mb-6">
                Off-Plan / Pre-Construction Properties
              </h3>
              <div className="text-[#67739E] text-[17px] md:text-[18px]  space-y-8 font-['General_Sans']">
                <p>
                  Offplan properties are units acquired prior to project completion, including during pre-launch, pre-construction, and construction phases. This stage provides early access to developments before they are fully delivered and priced at market maturity
                </p>
                <div>
                  <span className="font-bold block mb-3 text-[#01155E] text-[20px] font-['Archivo']">Advantages:</span>
                  <ul className="list-disc pl-5 sm:space-y-2">
                    <li>Access to pricing during the early stages of a project lifecycle</li>
                    <li>Structured payment schedules that enable phased capital deployment over time</li>
                    <li>Strong potential for value appreciation as the project progresses toward completion</li>
                    <li>Opportunity to secure units in newly launched developments and emerging growth locations</li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold block mb-3 text-[#01155E] text-[20px] font-['Archivo']">Best suited for:</span>
                  <ul className="list-disc pl-5 sm:space-y-2">
                    <li>Investors focused on long term value creation and capital appreciation</li>
                    <li>Buyers seeking to optimise capital deployment through structured payment timelines</li>
                    <li>Investors targeting asset growth during the development lifecycle</li>
                    <li>Buyers aligning acquisition with future ownership or strategic resale planning</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Ready Properties */}
            <div className="flex flex-col border-t lg:border-t-0 border-blue-100 pt-10 lg:pt-0">
              <h3 className="font-['Archivo'] font-semibold text-[26px] md:text-[32px] leading-[120%] text-[#01155E] underline underline-offset-[6px] decoration-1 mb-6 font-['Archivo']">
                Ready Properties (Secondary Market)
              </h3>
              <div className="text-[#67739E] text-[17px] md:text-[18px] leading-[160%] space-y-8 font-['General_Sans']">
                <p>
                  Ready properties are fully completed units that are available for ownership, occupancy, or rental use, representing assets that are already constructed and operational.
                </p>
                <div>
                  <span className="font-bold block mb-3 text-[#01155E] text-[20px] font-['Archivo']">Advantages:</span>
                  <ul className="list-disc pl-5 sm:space-y-2">
                    <li>Suitable for buyers seeking immediate property utilisation</li>
                    <li>Ability to generate rental income without a development or construction period</li>
                    <li>Full visibility of the completed unit, layout, and building at the time of acquisition</li>
                    <li>Appropriate for buyers focused on acquiring operational, income-producing real estate assets</li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold block mb-3 text-[#01155E] text-[20px] font-['Archivo']">Best suited for:</span>
                  <ul className="list-disc pl-5 sm:space-y-2">
                    <li>Buyers planning personal use within a near-term timeframe</li>
                    <li>Investors prioritising rental income generation and cash flow</li>
                    <li>Buyers seeking completed properties within established buildings or communities</li>
                    <li>Investors focused on asset utilisation and income-producing real estate</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourStrategy;





