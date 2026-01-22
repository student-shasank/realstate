import React from 'react'
import image from '../../../src/assets/servicedetail2.jpg'

function Ourwork({
  paragraphs = [
    `We work with developers and landowners to structure and position real estate projects 
     for market entry by defining the engagement framework and establishing the 
     appropriate execution pathway.`,

    `Our role is to act as the initial engagement and access point, ensuring that 
     opportunities are properly framed, expectations are aligned, and projects 
     are introduced into a defined project marketing and sales execution structure.`,

    `We do not execute marketing, sales, or contracting activities. Instead, 
     we structure the opportunity and control entry into execution by directing 
     projects into the appropriate licensed execution framework.`
  ]
}) {
  return (
    <div>
      <section className="bg-white w-full flex items-center justify-center  p-4 md:py-16">
        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left Image Section */}
          <div className="relative flex justify-center items-center h-[300px] md:h-[450px] lg:h-[500px] pr-30">
            <div className="absolute w-[90%] max-w-[560px] h-[80%] bg-[#E3E9FF] rounded-[14px] rotate-[-4deg] z-10" />

            <div className="absolute w-[90%] max-w-[560px] h-[75%] rounded-[14px] overflow-hidden shadow-lg z-20  translate-x-[10px] translate-y-[10px]">
              <img
                src={image}
                alt="Modern Luxury Villa"
                className="w-full h-full object-cover"
                style={{ objectPosition: '0 -122px' }}
              />
            </div>
          </div>

          {/* Right Text Section */}
          <div className="flex flex-col justify-center px-10">
            <div className="w-full lg:max-w-[574px] mx-auto lg:mx-0 text-base font-normal text-justify leading-relaxed text-[18px] text-[#01155E]">
              
              {paragraphs.map((para, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? 'mb-4'
                      : index === 1
                      ? 'mb-1'
                      : 'mt-6'
                  }
                >
                  {para}
                </p>
              ))}

            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Ourwork
