import React from 'react'
import imageurl from '../../assets/communitieshero.jpg';
import backgroundImage from '../../../src/assets/detailservicebackground.png';


function Hero() {
   const cardData = [
  {
    title: "Developer",
    subtitle: "Dubai Properties",
    image: imageurl, // REMOVE THE EXTRA CURLY BRACES HERE
  },
  {
    title: "Master Area",
    subtitle: "Dubailand",
    image: imageurl, 
  },
  {
    title: "Property Types",
    subtitle: "Apartments, Townhouses, Villas",
    image: imageurl,
  }
];
  return (
    <div>
<section className="flex flex-col items-center py-12 bg-white">
    <div 
      className="absolute top-0 left-0 z-0 h-[452px] w-[990px] bg-no-repeat bg-left-top bg-contain"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
      {/* Container for Heading and Content */}
      <div className="w-[1200px] flex flex-col gap-10">
        
        {/* Heading Section */}
        <div className="relative">
          <h2 className="text-[#01155E] font-['Archivo'] font-semibold text-[48px] leading-[100%] uppercase">
            Community 1- Al Waha
          </h2>
          {/* Underline Decoration */}
         <div class="flex w-[574px]"><div class="w-[240px] h-[8px] bg-[#01155E]"></div><div class="flex-1 h-[2px] bg-[#01155E]"></div></div>
        </div>

        {/* Background Decorative Container */}
        <div 
          className="relative w-[976.89px] h-[427.20px] rotate-[-180deg] opacity-100 self-center"
          style={{ backgroundImage: "url('your-bg-pattern-url')" }} // Use the grid/dot pattern here
        >
          {/* The cards are positioned relative to the main flow, 
              but we use the transform to match your rotation specs if needed */}
        </div>

        {/* Cards Grid */}
        <div className="flex justify-between items-start -mt-[450px] z-10">
          {cardData.map((card, index) => (
            <div key={index} className="w-[362px] h-[511px] flex flex-col items-center">
              
              {/* Card Image */}
              <img 
                src={card.image} 
                alt={card.title}
                className="w-[362px] h-[393px] rounded-[16px] object-cover"
              />

              {/* Down Button / Info Section */}
              <div className="mt-[18px] w-[361px] h-[100px] bg-[#01155E] rounded-[5px] flex flex-col justify-center items-center gap-[10px] p-[10px]">
                <h3 className="text-[#FBFBFB] font-['General_Sans'] font-semibold text-[20px] leading-[100%] text-center">
                  {card.title}
                </h3>
                <p className="text-[#FBFBFB] font-['General_Sans'] font-normal text-[20px] leading-[100%] text-center">
                  {card.subtitle}
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  

    </div>
  )
}

export default Hero