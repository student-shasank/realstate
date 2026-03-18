import React from 'react';
import communityimage from "../../assets/imageurl.png";
import imageurl from '../../assets/underline.png';
import firstcard from '../../assets/community.jpg';
import Secondcard from '../../assets/community.jpg';

export default function CommunitiesBrief() {
 

  return (
    <section className="w-full bg-white">
      {/* --- Header Section --- */}
      <div className="max-w-[1200px] mx-auto  pt-16 h-[331px]  ">
        <div className="max-w-2xl">
          <h2
            className="text-[48px] font-bold text-[#001A54] mb-2 inline-block pb-6"
            style={{
               fontFamily: "Archivo, sans-serif",
              backgroundImage: `url(${imageurl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 90%",
              backgroundSize: "457px 6px",
            }}
          >
            Communities brief
          </h2>
          </div>

          <p className=" text-[20px] text-[#01155E99]  mb-8 ">
       <p>  Dubai is a city of distinct communities, not one uniform market. Prices, supply, rental demand, and lifestyle vary meaningfully from one neighbourhood to the next.</p> 

  <p> Yupland delivers structured, research-driven community intelligence so you can understand each location clearly and assess opportunities with confidence, aligned with your budget, goals, and investment strategy.

</p>
          </p>
          <button className="bg-[#001A54] text-white px-8 py-3 w-[431px] h-[50px] rounded-md  text-sm transition-colors font-semibold text-[20px]">
            Discover Your Neighbourhood
          </button>
        
      </div>

      {/* --- Image Section --- */}
      
 <section className="flex flex-row items-start justify-center gap-4 px-10 pt-14   bg-white">

  {/* CARD 1 & 2 (Wide Cards) */}
 <div className="flex gap-4">
  {/* CARD 1 - Width: 463px */}
  <div
    className="relative w-[732px] h-[252px] rounded-[20px] overflow-hidden bg-cover bg-center"
    style={{ backgroundImage: `url(${firstcard})` }}
  >
    {/* Blue Overlay */}
    <div className="absolute inset-0 bg-[#01155E]/60" />

    {/* Text Content */}
    <div className="absolute top-8 left-8 max-w-[380px] border-l-[3px] border-white pl-4">
  <p className='text-[22px] font-semibold text-white underline decoration-white'>Downtown Dubai</p>
  <p className='text-[20px] text-white font-light'>Prime luxury high-rise living</p>
</div>
  </div>

  {/* CARD 2 - Updated Width: 456px */}
  <div
    className="relative w-[456px] h-[252px] rounded-[20px] overflow-hidden bg-cover bg-center"
    style={{ backgroundImage: `url(${Secondcard})` }}
  >
    {/* Blue Overlay */}
    <div className="absolute inset-0 bg-[#01155E]/60" />

    {/* Text Content */}
     <div className="absolute top-8 left-8 max-w-[380px] border-l-[3px] border-white pl-4">
  <p className='text-[22px] font-semibold text-white underline decoration-white'>Jumeirah Village </p>
  <p className='text-[20px] text-white font-light'>Circle Affordable homes with strong rental yields</p>
</div>
  </div>
</div>



</section>
<section className="flex flex-row items-start justify-center gap-4 px-10 pb-14 pt-4   bg-white">

  {/* CARD 1 & 2 (Wide Cards) */}
 <div className="flex gap-4">
  {/* CARD 1 - Width: 463px */}
  <div
    className="relative w-[456px] h-[252px] rounded-[20px] overflow-hidden bg-cover bg-center"
    style={{ backgroundImage: `url(${firstcard})` }}
  >
    {/* Blue Overlay */}
    <div className="absolute inset-0 bg-[#01155E]/60" />

    {/* Text Content */}
    <div className="absolute top-8 left-8 max-w-[380px] border-l-[3px] border-white pl-4">
  <p className='text-[22px] font-semibold text-white underline decoration-white'>Dubai Hills Estate
</p>
  <p className='text-[20px] text-white font-light'>Resort-style family living</p>
</div>
  </div>

  {/* CARD 2 - Updated Width: 456px */}
  <div
    className="relative w-[732px] h-[252px] rounded-[20px] overflow-hidden bg-cover bg-center"
    style={{ backgroundImage: `url(${Secondcard})` }}
  >
    {/* Blue Overlay */}
    <div className="absolute inset-0 bg-[#01155E]/60" />

    {/* Text Content */}
    <div className="absolute top-8 left-8 max-w-[380px] border-l-[3px] border-white pl-4">
  <p className='text-[22px] font-semibold text-white underline decoration-white'>Palm Jumeirah
</p>
  <p className='text-[20px] text-white font-light'>Ultra-luxury beachfront living</p>
</div>
  </div>
</div>



</section>
    </section>
  );
}