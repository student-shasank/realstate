import React from 'react'
import backgroundImage from '../../../src/assets/detailservicebackground.png';
import formbackground from '../../../src/assets/formbackground.jpg'

function HeroSection() {
  return (
    <>
      <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-white pt-8  px-4">
        
        {/* ADDED BACKGROUND PART ONLY */}
      <div 
  className="absolute top-0 left-0 z-0 h-[452px] w-[990px] bg-no-repeat bg-left-top bg-contain"
  style={{ backgroundImage: `url(${backgroundImage})` }}
/>

        {/* Inner Container: Max width 1200px */}
        <div className="relative z-10 w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4  pb-20">
          
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
  {/* Header Container: Corrected width and height based on your design specs (448x157) */}
  <div className="w-[548px] h-auto min-h-[157px] mb-8">
    <h1 className=" font-semibold font-archivo text-[48px] leading-[1.1] text-[#01155E] uppercase text-left"
   >
      PROJECT MARKETING<br />
      AND SALES<br />
      STRUCTURING
    </h1>
  </div>
  
  {/* Description: Removed justify and fixed padding to prevent overlap */}
  <p className="font-['General_Sans'] font-normal text-[18px] leading-[1.6] text-[#01155E] text-left max-w-[448px]">
    AQUA Properties provides A to Z Project Marketing and Sales solutions. 
    We are involved on all aspects throughout all phases from planning 
    to introducing a project to the market while working closely with 
    developers from start to finish.
  </p>
</div>

          {/* Right Column: Register Form Card */}
          <div className="w-full max-w-[527px] min-h-[402px] rounded-[16px] p-6 flex flex-col gap-4 shadow-xl relative overflow-hidden backdrop-blur-md bg-blue-900/70" style={{ boxShadow: '0px 0px 20px 0px #000183' }}>
            {/* Form Background Image Overlay */}
  <div 
            className="absolute inset-0 -z-10 opacity-30 bg-cover bg-center"
            style={{ backgroundImage: `url(${formbackground})` }}
          />

           <h2 className="text-center font-['General_Sans'] font-semibold text-[24px] leading-[100%] tracking-[0] text-white pb-3">
  Register
</h2>


            <form className="flex flex-col gap-4 items-center">
              <input 
                type="text" 
                placeholder="Enter your Name"
                className="w-full max-w-[479px] h-[50px] px-4 py-[10px] rounded-[8px] bg-white border-none outline-none text-gray-800 placeholder-gray-400 [font-family:'General_Sans']"
              />
              <input 
                type="email" 
                placeholder="Enter your Email"
                className="w-full max-w-[479px] h-[50px] px-4 py-[10px] rounded-[8px] bg-white border-none outline-none text-gray-800 placeholder-gray-400 [font-family:'General_Sans']"
              />
              <input 
                type="tel" 
                placeholder="Enter your Mobile"
                className="w-full max-w-[479px] h-[50px] px-4 py-[10px] rounded-[8px] bg-white border-none outline-none text-gray-800 placeholder-gray-400 [font-family:'General_Sans']"
              />

             <button
  type="submit"
  className="mt-2 h-[50px] rounded-[8px] bg-[#01155E] px-12 text-center font-['General_Sans'] text-[24px] font-bold leading-[100%] tracking-[0] text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
>
  Submit
</button>

            </form>

            <p className="mt-auto text-center font-['General_Sans'] text-[16px] leading-[100%] tracking-[0] text-white font-normal">
  By submitting this form, you agree to the{" "}
  <span className="cursor-pointer font-semibold">
    privacy policy
  </span>{" "}
  &{" "}
  <span className="cursor-pointer font-semibold">
    terms and conditions
  </span>
</p>

          </div>

        </div>
       

      </section>
       <div className="w-full h-[7px] bg-[#01155E29] mt-10" ></div>
    </>
  )
}

export default HeroSection