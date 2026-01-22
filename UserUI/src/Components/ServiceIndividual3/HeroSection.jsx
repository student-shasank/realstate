import React from 'react'
import backgroundImage from '../../../src/assets/detailservicebackground.png'
import formbackground from '../../../src/assets/formbackground.jpg'

function HeroSection({
  title = (
    <>
      PROJECT MARKETING <br />
      AND SALES <br />
      STRUCTURING
    </>
  ),
  description = `AQUA Properties provides A to Z Project Marketing and Sales solutions.
  We are involved on all aspects throughout all phases from planning
  to introducing a project to the market while working closely with
  developers from start to finish.`
}) {
  return (
    <div>
      <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-white pt-8 px-4">
        
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 z-0 h-[452px] w-[990px] bg-no-repeat bg-left-top bg-contain"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Inner Container */}
        <div className="relative z-10 w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 pb-20">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="w-[548px] h-auto min-h-[187px] mb-3 mt-3">
              <h1 className=" font-semibold text-[48px] leading-[1.3] text-[#01155E] uppercase text-left"  style={{ fontFamily: 'Archivo, sans-serif' }}>
                {title}
              </h1>
            </div>

            <p className="font-['General_Sans'] font-normal text-[18px] leading-[1.6] text-[#01155E] text-left max-w-[448px]">
              {description}
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full max-w-[527px] min-h-[402px] rounded-[16px] p-6 flex flex-col gap-4 shadow-xl relative overflow-hidden backdrop-blur-md bg-blue-900/70" style={{ boxShadow: '0px 0px 20px 0px #000183' }}>
            
            <div
              className="absolute inset-0 -z-10 opacity-30 bg-cover bg-center"
              style={{ backgroundImage: `url(${formbackground})` }}
            />

            <h2 className="text-center font-['General_Sans'] font-semibold text-[24px] text-white pb-3">
              Register
            </h2>

            <form className="flex flex-col gap-4 items-center">
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full max-w-[479px] h-[50px] px-4 rounded-[8px] bg-white outline-none"
              />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full max-w-[479px] h-[50px] px-4 rounded-[8px] bg-white outline-none"
              />
              <input
                type="tel"
                placeholder="Enter your Mobile"
                className="w-full max-w-[479px] h-[50px] px-4 rounded-[8px] bg-white outline-none"
              />

              <button
                type="submit"
                className="mt-2 h-[50px] rounded-[8px] bg-[#01155E] px-12 text-[24px] font-bold text-white transition-all hover:opacity-90"
              >
                Submit
              </button>
            </form>

            <p className="mt-auto text-center text-[16px] text-white">
              By submitting this form, you agree to the{" "}
              <span className="font-semibold cursor-pointer">privacy policy</span> &{" "}
              <span className="font-semibold cursor-pointer">terms and conditions</span>
            </p>
          </div>
        </div>
      </section>

      <div className="w-full h-[7px] bg-[#01155E29] mt-10" />
    </div>
  )
}

export default HeroSection
