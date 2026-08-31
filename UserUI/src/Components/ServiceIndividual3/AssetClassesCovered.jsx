import React from 'react'

function AssetClassesCovered() {
  return (
    <div>
      {/* SECTION: Added responsive padding (px-4) and adjusted vertical padding for mobile (py-16) */}
      <section className="w-full bg-white py-15 md:py-[60px] px-4 flex justify-center">
        
        {/* CONTENT WRAPPER: Changed fixed 1200px to max-w-[1200px] and w-full */}
        <div className="w-full max-w-[1200px]">

          {/* TITLE SECTION */}
          <div className="mb-10 md:mb-[60px] pb-[13px]">
            <h2
              className="text-[#01155E] text-[28px] md:text-[32px] font-semibold leading-[100%] mb-[10px]"
              style={{ fontFamily: 'Archivo, sans-serif' }}
            >
              Asset Classes Covered
            </h2>

            {/* UNDERLINE: Made the container responsive so it doesn't overflow small screens */}
            <div className="flex w-full max-w-[414px]">
              <div className="w-[120px] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
              <div className="flex-1 h-[2px] mt-[2px] md:mt-[3px] bg-[#01155E]" />
            </div>
          </div>

          {/* SUB HEADING */}
          <h3 className="text-[#01155E] text-[18px] md:text-[20px] font-semibold  md:leading-[100%] mb-[20px] text-justify">
            Developers engage with us at an early stage of a project.
          </h3>

          {/* PARAGRAPHS */}
          <div className="flex flex-col text-[#01155E] text-[16px] md:text-[18px]  font-normal text-justify">
            {/* Bullet List */}
            <ul className="list-disc pl-5 md:pl-6 mb-6">
              <li className="mb-2">Residential portfolio management</li>
              <li className="mb-2">Commercial building management</li>
              <li>Warehouse and industrial portfolio management</li>
            </ul>

            {/* Description Text */}
            <p>
              These asset classes reflect the scope of execution supported by the
              appointed RERA-licensed asset and property management platform. Each
              portfolio is approached as a connected investment ecosystem, not a
              collection of standalone units.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default AssetClassesCovered