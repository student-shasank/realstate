import React from 'react';

const SellProperty = () => {
  return (
   <section className="relative flex w-full items-center justify-center overflow-hidden bg-white py-20">
      {/* Main Container - 1200px Layout */}
      <div className="relative flex h-[400px] w-[1200px] items-center justify-between px-4">
        
        {/* Left Side: Text Content */}
        <div className="z-20 flex flex-col gap-8">
          <h1 className="max-w-[600px] font-['General_Sans'] text-[64px] font-medium leading-[140%] tracking-normal text-[#01155E]">
            Looking to <br /> Sell Your Property?
          </h1>
          
         <button className="flex h-[69px] w-[548px] items-center justify-center gap-[10px]  font-['General_Sans'] text-[24px] font-medium  rounded-lg bg-[#01155E] p-[10px] text-base font-medium text-white transition-opacity hover:opacity-90">
  Register Now
</button>

        </div>

        {/* Right Side: Decorative Circles Area */}
        <div className="relative h-full w-1/2">
          
          {/* Small Circle */}
          <div className="absolute left-31 top-[55.7px] z-20 h-[185.66px] w-[185.66px] rounded-full  bg-[#1C4DFF12]">
            {/* Dimension Label (Matches the measurement tooltip in your screenshot) */}
           
          </div>

          {/* Big Circle */}
          <div className="absolute left-[206.47px] top-0 z-10 h-[381.53px] w-[381.53px] rounded-full bg-[#1C4DFF12]" />
          
        </div>

        {/* Design Grid Line (The blue dashed line from the design tool) */}
       
      </div>
    </section>
  );
};

export default SellProperty;