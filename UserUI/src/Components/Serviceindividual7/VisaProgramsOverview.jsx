import React from 'react'

function VisaProgramsOverview() {
  return (
    <div className="overflow-hidden">
      {/* SECTION 1: VISA PROGRAMS */}
      <section className="w-full bg-white py-12 md:py-[80px] flex justify-center relative">
        <div className="w-full max-w-7xl px-4 md:px-4 z-20">
          {/* TITLE */}
          <div className="mb-10 md:mb-[10px] pb-[13px]">
            <h2 className="font-archivo text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-tight mb-2">
              Visa Programs Overview
            </h2>
            {/* UNDERLINE */}
            <div className="flex w-full max-w-[450px]">
              <div className="w-1/3 md:w-[190px] h-1.5 md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[6px] bg-[#01155E]" />
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="text-[#01155E] text-base md:text-[18px] font-normal  font-sans">
            {/* GOLDEN VISA SECTION */}
            <div className="mb-10">
              <h3 className="text-xl md:text-[22px] font-semibold underline mb-4">
                Golden Visa – 10-Year Residency
              </h3>
              <p className="mb-4 font-semibold text-[#67739E]">
                The Golden Visa offers long-term residency for qualifying investors and professionals seeking stability, flexibility, and long-term presence in the UAE.
              </p>
              <p className="mb-2 opacity-80">Eligibility Routes:</p>
              
              <h4 className="font-semibold mb-2">Property Investment</h4>
              <ul className="list-disc pl-6 mb-6  opacity-80 text-[#67739E]">
                <li>Minimum property value of AED 2,000,000</li>
                <li>Multiple properties may be combined to meet the minimum threshold</li>
                <li>Property revaluation may be required if the declared value is below the threshold</li>
                <li>Applicable to eligible ready and off-plan properties</li>
              </ul>

              <h4 className="font-semibold mb-2">Professional / Managerial Category</h4>
              <ul className="list-disc pl-6 mb-8 space-y-1 opacity-80">
                <li>Minimum gross monthly salary of AED 30,000</li>
                <li>Continuous employment with a UAE-based entity for at least 2 years</li>
                <li>Educational equivalency requirements may apply</li>
              </ul>
            </div>

            {/* RETIREMENT VISA SECTION */}
            <div className="mb-10">
              <h3 className="text-xl md:text-[22px] font-semibold underline mb-4">
                Retirement Visa – 5-Year Residency
              </h3>
              <p className="mb-4 font-semibold text-[#67739E]">
                Designed for individuals aged 55 years and above seeking long-term residence in the UAE.
              </p>
              <p className="mb-2 opacity-80">Eligibility</p>
              <ul className="list-disc pl-6 mb-8 space-y-1 opacity-80">
                <li>Minimum property investment of AED 1,000,000</li>
                <li>Minimum age requirement of 55 years</li>
              </ul>
            </div>

            {/* INVESTOR VISA SECTION */}
            <div>
              <h3 className="text-xl md:text-[22px] font-semibold underline mb-4">
                Investor Visa – 2-Year Residency
              </h3>
              <p className="mb-4 font-semibold text-[#67739E]">
                A renewable residency option suitable for property investors.
              </p>
              <p className="mb-2 opacity-80">Eligibility</p>
              <ul className="list-disc pl-6 mb-2 space-y-1 opacity-80">
                <li>Minimum property investment of AED 750,000</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BACKGROUND DECORATIONS - Hidden on small screens to prevent overflow */}
        <div className="hidden lg:block absolute -right-40 top-[599px] opacity-50 z-10 h-[185px] w-[185px] rounded-full bg-[#1C4DFF12]" />
        <div className="hidden lg:block absolute -right-40 top-60 opacity-50 z-0 h-[500px] w-[500px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />
      </section>

      {/* SECTION 2: CONSTRUCTION STAGE */}
      <section className="w-full bg-white py-12 md:py-[80px] flex justify-center relative">
        <div className="w-full max-w-7xl px-4 md:px-4">
          <div className="mb-10 md:mb-[10px] pb-[13px]">
            <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-tight mb-2 font-archivo">
              Construction Stage Requirement
            </h2>
            <div className="flex w-full max-w-[410px]">
              <div className="w-1/3 md:w-[162px] h-1.5 md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[6px] bg-[#01155E]" />
            </div>
          </div>

          <div className="flex flex-col space-y-4 text-[#67739E] text-base md:text-[18px] font-normal  opacity-80 max-w-[1000px] font-archivo">
            <p>For Investor Visa and Retirement Visa applications, the property must have reached at least 50% construction completion.</p>
            <p>This requirement does not apply to Golden Visa applications.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: DOCUMENTATION */}
      <section className="w-full bg-white py-12 md:py-[80px] flex justify-center">
        <div className="w-full max-w-7xl px-4 md:px-4">
          <div className="mb-10 md:mb-[10px] pb-[13px]">
            <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-tight mb-2 font-archivo">
              Documentation Requirements
            </h2>
            <div className="flex w-full max-w-[480px]">
              <div className="w-1/3 md:w-[180px] h-1.5 md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[6px] bg-[#01155E]" />
            </div>
          </div>

          <div className="text-[#67739E] text-base md:text-[18px] font-normal  font-archivo">
            <p className="mb-8 font-semibold">
              Documentation requirements vary based on visa category, applicant nationality, property type, and individual circumstances.
            </p>
            <h3 className="mb-4 font-semibold text-lg md:text-[20px]">
              Benefits of Long-Term UAE Residency
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8  list-disc pl-6 opacity-90 text-[#67739E]">
              <li>Long-term residency with renewal options</li>
              <li>Ability to sponsor family members</li>
              <li>Freedom from employer sponsorship</li>
              <li>100% ownership of businesses</li>
              <li>Flexibility to reside outside the UAE</li>
              <li>Easier access to banking & healthcare</li>
              <li>Smoother immigration processing</li>
              <li>Long-term stability</li>
              <li>Sponsor domestic staff</li>
              <li>Tax-friendly framework advantages</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: EXECUTION FRAMEWORK */}
      <section className="w-full bg-white py-12 md:py-[80px] flex justify-center relative">
        <div className="w-full max-w-7xl px-4 md:px-4 z-20">
          <div className="mb-10 md:mb-[10px] pb-[13px]">
            <h2 className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-tight mb-2 font-archivo">
              Execution Framework
            </h2>
            <div className="flex w-full max-w-[410px]">
              <div className="w-1/3 md:w-[162px] h-1.5 md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[6px] bg-[#01155E]" />
            </div>
          </div>

          <div className="flex border-l-[3px] border-[#01155E] pl-5 md:pl-[30px] ">
            <div className="text-[#67739E] text-base md:text-[18px] font-normal  max-w-[1000px] space-y-4 font-archivo">
              <p>Visa application processing and immigration execution are carried out by third-party service providers operating in accordance with applicable UAE regulations.</p>
              <p>Our role remains focused on eligibility assessment and pathway structuring.</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-20 bottom-10 opacity-40 h-[300px] w-[300px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />
      </section>

      {/* SECTION 5: NEXT STEPS */}
      <section className="w-full bg-white py-12 md:py-[80px] flex justify-center mb-10">
        <div className="w-full max-w-7xl px-4 md:px-4">
          <div className="mb-10 md:mb-[10px] pb-[13px]">
            <h2 className="text-[#01155E] text-2xl md:text-[32px] font-semibold leading-tight mb-2 font-archivo">
              Next Step – Eligibility Assessment
            </h2>
            <div className="flex w-full max-w-[520px]">
              <div className="w-1/3 md:w-[162px] h-1.5 md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[6px] bg-[#01155E]" />
            </div>
          </div>

          <div className="flex border-l-[3px] border-[#01155E] pl-5 md:pl-[30px] py-2">
            <div className="text-[#67739E] text-base md:text-[18px] font-normal leading-relaxed max-w-[1000px] space-y-6 font-archivo">
              <p>Every engagement begins with a structured discussion to assess eligibility, investment position, and residency objectives.</p>
              <p className="font-semibold italic">Initial eligibility discussions are conducted on a no-obligation basis.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VisaProgramsOverview