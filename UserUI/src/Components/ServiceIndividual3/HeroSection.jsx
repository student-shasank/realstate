import React from 'react'
import backgroundImage from '../../../src/assets/detailservicebackground.png'
import formbackground from '../../../src/assets/formbackground.jpg'

function HeroSection({
  title = (
    <>
      PROJECT MARKETING <br className="hidden md:block" />
      AND SALES <br className="hidden md:block" />
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
        
        {/* Background Image - Responsive width */}
        <div
          className="absolute top-0 left-0 z-0  h-[350px]  md:h-[452px] w-[990px] md:w-[990px] bg-no-repeat bg-left-top bg-contain opacity-40 md:opacity-100"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Inner Container */}
        <div className="relative z-10 w-full max-w-[1200px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-4 pb-16 md:pb-20">

          {/* Left Content - Desktop font and left alignment maintained */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
            <div className="max-w-[548px] h-auto min-h-[120px] md:min-h-[187px] flex items-end mb-3 mt-3">
              <h1 className="font-semibold text-[32px] md:text-[48px] leading-[1.2] md:leading-[1.3] text-[#01155E]" style={{ fontFamily: 'Archivo, sans-serif' }}>
                {title}
              </h1>
            </div>

            <p className="font-['General_Sans'] font-normal text-[16px] md:text-[18px] leading-[1.6] text-[#01155E] max-w-[448px]">
              {description}
            </p>
          </div>

          {/* Right Form - Responsive and centered on small screens */}
          <div className="w-full max-w-[527px] min-h-[402px] rounded-[16px] p-6 flex flex-col gap-4 shadow-xl relative overflow-hidden backdrop-blur-md bg-blue-900/70 mx-auto lg:mx-0" style={{ boxShadow: '0px 0px 20px 0px #000183' }}>
            
            <div
              className="absolute inset-0 -z-10 opacity-30 bg-cover bg-center"
              style={{ backgroundImage: `url(${formbackground})` }}
            />

            <h2 className="text-center font-['General_Sans'] font-semibold text-[24px] text-white ">
              Register
            </h2>

            <form className="flex flex-col gap-4 items-center">
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full h-[50px] px-4 rounded-[8px] bg-white outline-none"
              />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full h-[50px] px-4 rounded-[8px] bg-white outline-none"
              />
              <input
                type="tel"
                placeholder="Enter your Mobile"
                className="w-full h-[50px] px-4 rounded-[8px] bg-white outline-none"
              />

              <button
                type="submit"
                className="mt-1 w-[192px] h-[50px] rounded-[8px] bg-[#01155E] px-12 text-[20px] md:text-[24px] font-bold text-white transition-all hover:opacity-90"
              >
                Submit
              </button>
            </form>

            <p className="mt-1 text-center text-[11px] md:text-[14px]  text-white opacity-90">
             By submitting this form, you acknowledge that you have read and agree to the Yupland Terms of Use, Privacy Policy, and Disclaimer, and consent to being contacted by Yupland or relevant licensed brokerages, developers, or service providers regarding your inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="w-full h-[7px] bg-[#01155E29] mt-4 md:mt-10" />
    </div>
  )
}

export default HeroSection;