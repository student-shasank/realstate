import React from 'react';
import communityimage from "../../assets/imageurl.png";
import imageurl from '../../assets/underline.png';
import firstcard from '../../assets/community.jpg';
import Secondcard from '../../assets/community.jpg';

export default function CommunitiesBrief() {
  const tickerItems = [
    { title: "Looking to Sell Your Property?", desc: "Partner with us for a smooth, transparent, and profitable sale." },
    { title: "Looking to Sell Your Property?", desc: "Partner with us for a smooth, transparent, and profitable sale." },
    { title: "Looking to Sell Your Property?", desc: "Partner with us for a smooth, transparent, and profitable sale." },
    { title: "Looking to Sell Your Property?", desc: "Partner with us for a smooth, transparent, and profitable sale." },
  ];

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

          <p className="text-gray-500 text-lg mb-8 font-medium">
            Are you looking for the perfect neighborhood in Dubai? Discover the unique
            characteristics of diverse communities, catering to various preferences
            from luxury to family-friendly environments.
          </p>
          <button className="bg-[#001A54] text-white px-8 py-3 w-[431px] h-[50px] rounded-md  text-sm transition-colors font-medium text-[20px]">
            Discover Your Neighbourhood
          </button>
        </div>
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
      <p className="text-white text-[20px] leading-[1.3] font-medium">
        We work with developers and landowners to structure and position real estate projects for market
      </p>
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
      <p className="text-white text-[20px] leading-[1.3] font-medium">
        We work with developers and landowners to structure and position real estate projects for market
      </p>
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
      <p className="text-white text-[20px] leading-[1.3] font-medium">
        We work with developers and landowners to structure and position real estate projects for market
      </p>
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
      <p className="text-white text-[20px] leading-[1.3] font-medium">
        We work with developers and landowners to structure and position real estate projects for market
      </p>
    </div>
  </div>
</div>



</section>
    </section>
  );
}