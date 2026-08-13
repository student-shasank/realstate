import React from 'react';
// Ensure this path is correct based on your folder structure
// import backgroundImage from '../../../src/assets/detailservicebackground.png';
import {
 
  MapPin,ArrowRight
} from "lucide-react";

const SellProperty = () => {
  return (
//     <div className="flex flex-col items-center bg-white">
//       {/* WRAPPER FOR 1200PX ALIGNMENT */}
//       <div className="w-full max-w-[1200px] px-4  ">
        
//         {/* TOP PARAGRAPHS (From Image 2) */}
        
//         {/* HEADING SECTION */}
//         <div className="mb-[40px] ">
//           <h2
//             className="text-[#01155E] text-[32px] font-semibold mb-[10px] "
//             style={{ fontFamily: 'Archivo, sans-serif' }}
//           >
//             Next Step – Discuss Your Project
//           </h2>

//           {/* CUSTOM UNDERLINE */}
//           <div className="flex w-[400px] max-w-[414px] items-end ">
//             <div className="w-[162px] h-[8px] bg-[#01155E]" />
//             <div className="flex-1 h-[2px] bg-[#01155E]" />
//           </div>
//         </div>

//         {/* SUBTITLE WITH VERTICAL BORDER */}
//         <div
//           className="
//             flex flex-col
//             absolute
//             gap-[1px]
//             text-[#01155E]
//             text-[18px]
//             font-normal
//             font-['General_Sans']
//             border-l-[3px] border-[#01155E]
//             pl-6
//             z-20
            
            
//           "
//         >
//           <p>
//             Every engagement begins with a structured discussion to understand the project, objectives, and market context.
//           </p>
//           <p>
//             This ensures that projects move forward with the right positioning, the right execution pathway, and a clear structure from day one.
//           </p>
//         </div>
//       </div>

//       {/* HERO SECTION (Maintains its own 1200px container logic) */}
//      <section className="relative flex w-full items-center justify-center overflow-hidden pb-8 sm:pb-10 mt-30 sm:10">
//         <div className="relative w-full max-w-[1200px] min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] flex items-center px-4 sm:px-6 lg:px-8">

//           {/* BACKGROUND BLUR */}
//           <div
//             className="absolute inset-0 z-0 opacity-40 blur-[80px]"
//             style={{
//               backgroundImage: `url(${backgroundImage})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           />

//           {/* DECORATIVE CIRCLE — LEFT */}
//           <div className="absolute left-2 sm:left-4 top-[30%] z-10 h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] lg:h-[165px] lg:w-[165px] rounded-full bg-[#1C4DFF12]" />

//           {/* DECORATIVE CIRCLES — RIGHT */}
//           <div className="absolute right-[8%] sm:right-[19%] top-[31%] lg:right-[23%] lg:top-[40%] z-10 h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] lg:h-[185px] lg:w-[185px] rounded-full bg-[#1C4DFF12]" />
//           <div className="hidden sm:block absolute right-[-20px] sm:right-[-30px] top-0 z-0 h-[280px] w-[280px] sm:h-[276px] sm:w-[276px] lg:h-[400px] lg:w-[400px] rounded-full bg-[#1C4DFF08] backdrop-blur-[12px]" />

//           {/* TEXT + BUTTON */}
//           <div className="relative z-20 flex flex-col gap-6 sm:gap-8 py-10 sm:py-14 lg:py-20">
//             <h1
//               className="text-[36px] sm:text-[48px] lg:text-[64px] font-medium leading-[1.2] tracking-normal text-[#01155E]"
//               style={{ fontFamily: 'General Sans, sans-serif' }}
//             >
//               Looking to 
// <br /> Sell Your Property ? 
//             </h1>
//             <button
//               className="flex h-[44px] sm:h-[50px] lg:h-[64px] w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] items-center justify-center rounded-lg bg-[#01155E] text-[15px] sm:text-[17px] lg:text-[18px] font-medium text-white transition-all hover:bg-opacity-90 active:scale-95"
//               style={{ fontFamily: 'General Sans, sans-serif' }}
//             >
//               Register Now
//             </button>
//           </div>

//         </div>
//       </section>
//     </div>
<>
 <section className="px-5 pb-[70px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative overflow-hidden rounded-[18px] bg-[#01155E] px-7 sm:px-10 lg:px-14 py-9 sm:py-11">
            <div className="absolute -right-[100px] -top-[130px] w-[350px] h-[350px] rounded-full border border-white/10" />
            <div className="absolute right-[30px] -bottom-[200px] w-[400px] h-[400px] rounded-full border border-white/10" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="hidden sm:flex w-[72px] h-[72px] rounded-full bg-white/10 items-center justify-center flex-shrink-0">
                  <MapPin size={30} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white text-[26px] sm:text-[32px] font-semibold leading-[120%]">
                    Ready to find your
                    <br />
                    perfect property?
                  </h2>
                  <p className="text-white/70 text-[14px] sm:text-[15px] mt-2">
                    Explore thousands of premium properties
                    <br className="hidden sm:block" />
                    across Dubai with Yupland.
                  </p>
                </div>
              </div>

              <a
                href="/listings"
                className="w-full lg:w-auto h-[50px] px-7 bg-white rounded-[7px] flex items-center justify-center gap-3 text-[#01155E] text-[14px] font-semibold hover:bg-[#67739E] hover:text-white transition-all duration-300"
              >
                Explore Properties
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

</>
  );
};

export default SellProperty;