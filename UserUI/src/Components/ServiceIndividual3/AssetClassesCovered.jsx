import React from 'react'

function AssetClassesCovered() {
  return (
    <div>

 <section className="w-full bg-white py-[120px] flex justify-center">
      {/* CONTENT WRAPPER */}
      <div className="w-[1200px]">

        {/* TITLE */}
        <div className="mb-[60px] pb-[13px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
           Asset Classes Covered
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
    leading-[1.6]
    font-normal
    text-justify
  "
>
  {/* Bullet List */}
  <ul className="list-disc pl-6 mb-6">
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