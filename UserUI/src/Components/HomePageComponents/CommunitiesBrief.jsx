import React from 'react';
import communityimage from "../../assets/imageurl.png";
import imageurl from '../../assets/underline.png';

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
      <div className="max-w-[1200px] mx-auto px-6 py-16 h-[544px] ">
        <div className="max-w-2xl">
          <h2
            className="text-4xl font-bold text-[#001A54] mb-2 inline-block pb-6"
            style={{
              fontFamily: "General Sans, sans-serif",
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
          <button className="bg-[#001A54] text-white px-8 py-3 rounded-md font-bold text-sm transition-colors">
            Discover Your Neighbourhood
          </button>
        </div>
      </div>

      {/* --- Image Section --- */}
      <div className="w-full">
        <img
          src={communityimage}
          alt="Real Estate Houses"
          className="w-full object-cover block"
          style={{ height: '363px' }}
        />
      </div>

      {/* --- Horizontal Ticker (The Blue Bar) --- */}
      <div
        className="w-full bg-[#001A54] overflow-hidden flex items-center"
        style={{
          height: '85px',    /* Fixed Height */
          padding: '10px'    /* Padding */
        }}
      >
        <div className="animate-marquee-infinite flex" style={{ gap: '10px' }}>
          {/* Loop items multiple times for seamless flow */}
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center shrink-0"
              style={{
                width: '614px', /* Specific Width */
                height: '49px'  /* Specific Height */
              }}
            >
              <h3
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'General Sans, sans-serif',
                  fontWeight: '500',
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'General Sans, sans-serif',
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  marginTop: '4px'
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}