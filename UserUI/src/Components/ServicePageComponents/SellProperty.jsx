import React from 'react';

const SellProperty = () => {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-white py-10 sm:py-14 md:py-16 lg:py-20">
      
      <div className="relative flex w-full max-w-[1200px] min-h-[200px] sm:min-h-[260px] md:min-h-[320px] lg:h-[400px] items-center justify-between px-4 sm:px-6 md:px-8 xl:px-0">

        {/* Left Side: Text + Button */}
        <div className="z-20 flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 w-full md:w-1/2 lg:w-auto">
          
          <h1 className="font-['General_Sans'] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-medium leading-[130%] lg:leading-[140%] tracking-normal text-[#01155E]">
            Looking to <br /> Sell Your Property?
          </h1>

          <button className="flex items-center justify-center
            h-[48px] sm:h-[54px] md:h-[60px] lg:h-[69px]
            w-full sm:w-[360px] md:w-[440px] lg:w-[548px]
            font-['General_Sans'] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px]
            font-medium rounded-lg bg-[#01155E] px-4 text-white transition-opacity hover:opacity-90">
            Register Now
          </button>
        </div>

        {/* Right Side: Decorative Circles — hidden on mobile */}
        <div className="hidden md:block relative h-full w-1/2 flex-shrink-0">

          {/* Small Circle */}
          <div className="absolute rounded-full bg-[#1C4DFF12] z-20
            w-[100px] h-[100px] left-[80px] top-[80px]
            md:w-[130px] md:h-[130px] md:left-[100px] md:top-[90px]
            lg:w-[185.66px] lg:h-[185.66px] lg:left-[124px] lg:top-[55.7px]"
          />

          {/* Big Circle */}
          <div className="absolute rounded-full bg-[#1C4DFF12] z-10
            w-[220px] h-[220px] left-[140px] top-[20px]
            md:w-[280px] md:h-[280px] md:left-[170px] md:top-[-60px]
            lg:w-[381.53px] lg:h-[381.53px] lg:left-[206.47px] lg:top-0"
          />
        </div>

        {/* Mobile: Subtle background circle (decorative only) */}
        <div className="block md:hidden absolute right-[-60px] top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#1C4DFF08] z-0 pointer-events-none" />

      </div>
    </section>
  );
};

export default SellProperty;