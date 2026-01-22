import React from 'react';
import imageurl from '../../assets/engagement-scope.jpg';

const EngagementScope = () => {
  const listItems = [
    "We frame the project opportunity and align expectations",
    "We act as the initial access point into the execution structure",
    "We introduce projects into appointed RERA-licensed brokerage teams",
    "We do not participate in marketing execution, sales operations, contracting, or settlement",
    "These activities are carried out directly by appointed RERA-licensed brokerage teams"
  ];

  return (
    <section className="w-full bg-white pb-[50px] pt-[40px] flex justify-center">
      <div className="w-[1200px] flex flex-col">
        
        {/* HEADER SECTION */}
        <div className="mb-[66px]">
          <h2
            className="text-[#01155E] text-[28px] font-semibold mb-[10px]"
            style={{ fontFamily: 'Archivo, sans-serif' }}
          >
            Engagement Scope
          </h2>
          {/* UNDERLINE MATCHING IMAGE */}
          <div className="flex w-[291.5px]">
            <div className="w-[195.38px] h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>

        {/* CONTENT SECTION (FLEX) */}
        <div className="flex justify-between items-start">
          
          {/* LEFT SIDE: IMAGE CONTAINER (600px) */}
          <div className="w-[600px] h-[449px] rounded-[8px] overflow-hidden"
          style={{boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.8)"}}>
            <img 
              src={imageurl} // Replace with your image path
              alt="Modern Villa"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT SIDE: TEXT CONTENT (545px) */}
          <div className="w-[545px] flex flex-col gap-4">
  {/* Heading */}
  <h2 
    className="text-[#000183] text-[20px] font-semibold text-justify align-middle leading-[100%]"
    style={{ fontFamily: 'General Sans, sans-serif' }}
  >
    Our involvement is focused on structuring, access, and pathway definition.
  </h2>

  {/* List Items */}
  <ul className="flex flex-col gap-3">
    {listItems.map((item, index) => (
      <li key={index} className="flex items-start gap-[18px]">
        <span className="text-[#000183] text-[18px]">•</span>
        <span 
          className="text-[#000183] text-[18px] font-normal text-justify align-middle leading-[180%]"
          style={{ fontFamily: 'General Sans, sans-serif' }}
        >
          {item}
        </span>
      </li>
    ))}
  </ul>

  {/* Footer Text */}
  <p 
    className="text-[#01155E] text-[18px] font-normal text-justify align-middle leading-[100%]"
    style={{ fontFamily: 'General Sans, sans-serif' }}
  >
    This structure ensures transparency, accountability, and a clear separation 
    between engagement structuring and operational execution.
  </p>
</div>

        </div>
      </div>
    </section>
  );
};

export default EngagementScope;