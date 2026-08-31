import React from "react";

//  Correct imports (ALL SAME SPELLING)
import achivment1 from "../../assets/achivment1.svg";
import achivment2 from "../../assets/achivment2.svg";
import achivment3 from "../../assets/achivment3.svg";
import achivment4 from "../../assets/achivment4.svg";

import achivment6 from "../../assets/img-6.svg";
import bgVideo from "../../assets/high.mp4";
import achivment8 from "../../assets/achivment1.svg";
import achivment7 from "../../assets/achivment2.svg";
import achivment9 from "../../assets/achivment3.svg";
import achivment10 from "../../assets/achivment4.svg";

const AwardsSection = () => {
  const awards = [
    { src: achivment1, alt: "Achievement 1" },
    { src: achivment2, alt: "Achievement 2" },
     { src: achivment7, alt: "Achievement 7" },
    { src: achivment3, alt: "Achievement 3" },
    { src: achivment4, alt: "Achievement 4" },
    { src: achivment6, alt: "Achievement 5" },
    
      { src: achivment8, alt: "Achievement 8" },
       { src: achivment9, alt: "Achievement 9" },
          { src: achivment10, alt: "Achievement 10" },
         
   
            { src: achivment6, alt: "Achievement 5" },
  ];

  return (
    <section className="relative w-full h-[550px] overflow-hidden flex flex-col items-center  bg-black py-20 px-6">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40 z-0"
      >
        <source src={bgVideo} />
      </video>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full text-center">
        
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-light tracking-widest text-white mb-16 pt-8 text-bold">
          AWARDS <span className="text-gray-400">&</span> RECOGNITIONS
        </h2>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center justify-items-center">
          {awards.map((award, index) => (
            <div key={index} className="flex justify-center w-full">
              <img
                src={award.src}
                alt={award.alt}
                className="max-h-25 md:max-h-20 w-auto object-contain 
                brightness-0 invert opacity-80 hover:opacity-100 
                transition-all duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Icon */}
      
    </section>
  );
};

export default AwardsSection;