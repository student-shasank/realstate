import React from 'react'
import Table1 from "../../assets/table1.png"
import Table2 from "../../assets/table2.png"
import Table3 from "../../assets/table3.png"

function LifecycleFramework() {
  return (
    <div>

    <section className="w-full bg-white py-[80px] flex justify-center">
        

      {/* CONTENT WRAPPER */}
      <div className="w-[1200px] z-20">
        
        {/* TITLE */}
        <div className="mb-[60px] pb-[13px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Development Lifecycle Framework
          </h2>

          {/* UNDERLINE (Matching the previous section style) */}
          <div className="flex w-[414px]">
            <div className="w-[162px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* SUB HEADING / DESCRIPTION */}
        <p
          className="text-[#01155E] text-[18px] font-normal leading-[1.6] mb-[40px] text-justify"
       
        >
          The following framework illustrates how development activities are structured across the lifecycle of a project, from pre-construction through post-construction.
        </p>

        {/* TABLE IMAGE PLACEHOLDER */}
        <div className="w-[900px] h-[425px]">
          {/* Replace 'src' with your image URL when ready */}
          <img 
            src={Table1}
            alt="Development Lifecycle Framework Table" 
            className="w-full h-auto block"
            style={{ minHeight: '420px', }} 
          />
        </div>

      </div>
      <div className="relative h-full ">
                    <div className="absolute -right-40 top-[599.7px] opacity-50 z-20 h-[185.66px] w-[185.66px] rounded-full bg-[#1C4DFF12] opasity-0.7" ></div>
                    <div className="absolute -right-124 z-10 top-63  opacity-50 h-[500px] w-[500px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />
                  </div>`
    </section>
    <section className="w-full bg-white py-[80px] flex justify-center">
      {/* CONTENT WRAPPER */}
      <div className="w-[1200px]">
        
        {/* TITLE */}
        <div className="mb-[60px] pb-[13px]">
          <h2
            className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Domain Specialisation Framework
          </h2>

          {/* UNDERLINE */}
          <div className="flex w-[414px]">
            <div className="w-[162px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* SUB HEADING / DESCRIPTION */}
        <p
          className="text-[#01155E] text-[18px] font-normal leading-[1.6] mb-[40px] text-justify"
       
        >
          The following domains outline how responsibilities are structured across regulatory, construction, and procurement functions, with execution delivered through an appointed development management platform.
        </p>

        {/* TABLE IMAGE PLACEHOLDER */}
        <div className="w-[900px] h-[425px]">
          <img 
            src={Table2} // Add your image URL here
            alt="Domain Specialisation Framework Table" 
            className="w-full h-auto block"
            style={{ minHeight: '420px' }} 
          />
        </div>

      </div>
    </section>

 {/* 3 session */}

<section className="w-full bg-white py-[80px] flex justify-center">
    <div className="relative h-full ">
                    <div className="absolute -right-330 top-[569.7px] opacity-50 z-20 h-[185.66px] w-[185.66px] rounded-full bg-[#1C4DFF12] opasity-0.7" ></div>
                    <div className="absolute left-300 z-10 top-73  opacity-50 h-[500px] w-[500px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />
                  </div>`
  {/* CONTENT WRAPPER */}
  <div className="w-[1200px]">
    
    {/* TITLE */}
    <div className="mb-[60px] pb-[13px]  ">
      <h2
        className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        Sales Support and Customer Services
      </h2>

      {/* UNDERLINE */}
      <div className="flex w-[414px]">
        <div className="w-[162px] h-[8px] bg-[#01155E]" />
        <div className="flex-1 h-[2px] bg-[#01155E]" />
      </div>
    </div>

     

    {/* TOP DESCRIPTION */}
    <p
      className="text-[#01155E] text-[18px] font-normal leading-relaxed mb-[40px] text-justify"
     
    >
      The following outlines how sales and customer-facing activities are coordinated to align with construction progress, regulatory requirements, and escrow milestones, while sales execution is handled through the appointed brokerage framework.
    </p>
   

    {/* TABLE IMAGE PLACEHOLDER */}
    <div className="w-[900px] w-[262px] mb-[40px]">
      <img 
        src={Table3} // Add your Table image URL here
        alt="Sales Support & Customer Services Table" 
        className="w-full h-auto block"
        
      />
    </div>
   

    {/* BOTTOM DESCRIPTION */}
    <p
      className="text-[#01155E] text-[18px] font-normal leading-[1.6] text-justify"
     
    >
      Oversight at this stage is limited to coordination, monitoring, and reporting, with all statutory responsibility retained by the appointed execution parties.
    </p>

    
  </div>
</section>

<section className="w-full bg-white py-[80px] flex justify-center">
  {/* CONTENT WRAPPER */}
  <div className="w-[1200px]">
    
    {/* TITLE */}
    <div className="mb-[60px] pb-[13px]">
      <h2
        className="text-[#01155E] text-[32px] font-semibold leading-[100%] mb-[10px]"
        style={{ fontFamily: 'Archivo, sans-serif' }}
      >
        Execution Platform
      </h2>

      {/* UNDERLINE */}
      <div className="flex w-[500px]">
        <div className="w-[162px] h-[8px] bg-[#01155E]" />
        <div className="flex-1 h-[2px] bg-[#01155E]" />
      </div>
    </div>

    {/* CONTENT WITH LEFT VERTICAL BORDER */}
    <div className="flex border-l-[3px] border-[#01155E] pl-[30px] py-[10px]">
      <p
        className="text-[#01155E] text-[18px] font-normal leading-relaxed text-justify max-w-[1000px]"
       
      >
        Development management execution is carried out through an appointed, RERA-licensed platform with established operational experience across development management, construction coordination, regulatory compliance, and project handover in Dubai.
      </p>
    </div>

  </div>`
  
   
</section>
    </div>
  )
}

export default LifecycleFramework