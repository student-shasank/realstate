import React from 'react';
import patternImage from '../../src/assets/detailservicebackground.png';
import cityBackground from "../assets/BlogpageBg.jpg";
import SubtitelofBlog from '../Components/Blog/SubtitelofBlog';
import BlogDetailSection from '../Components/Blog/BlogDetailSection';
import BlogFullWidthSection from '../Components/Blog/BlogFullWidthSection';

const Blog = () => {
  return (
    <>
    <section className="relative w-full  bg-white overflow-hidden mt-20">
      
      {/* TOP LEFT PATTERN */}
      <div
        className="absolute top-0 left-0 z-0 h-[452px] w-[990px] bg-no-repeat bg-left-top opacity-100"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: 'contain',
        }}
      />

      {/* MAIN CONTENT CONTAINER - Restricted to 1440px to match specs */}
      <div className="relative z-10  mx-auto">

        {/* BLOG TITLE SECTION - H: 168px, Padding: 50px 148px */}
        <div className="w-full h-[168px] pt-[60px] pb-[50px] px-[148px] flex flex-col gap-[10px]">
          <div className="w-[1200px] h-[52px]">
            <h1 className="text-[#01155E] text-[48px] font-semibold font-['Archivo'] leading-[100%]">
              Blog Title
            </h1>

            {/* Decorative Line */}
            <div className="flex items-end w-[280px] mt-2">
              <div className="w-[110px] h-[8px] bg-[#01155E]"></div>
              <div className="flex-1 h-[2px] bg-[#01155E]"></div>
            </div>
          </div>
        </div>

        {/* INTRODUCTION SECTION - H: 499px, Top: 319px */}
        <div className="relative overflow-hidden h-[499px] flex items-center "> {/* Adjusting margin to align with 'top: 319px' flow */}

          {/* BACKGROUND IMAGE with specific opacity from image_57c330.jpg */}
          <div className="absolute inset-0 z-0 opacity-[0.65]">
            <img
              src={cityBackground}
              alt="background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* WHITE OVERLAY */}
          <div className="absolute inset-0 bg-white/40 z-[1]" />

          {/* CONTENT BOX - Width: 1200px (Centered via 148px padding) */}
          <div className="relative z-10 px-[148px] flex flex-col gap-[80px] w-full">

            {/* INTRODUCTION HEADING - H: 50px */}
            <div className="w-[1200px] h-[50px] flex flex-col gap-[10px]">
              <h2 className="text-[#01155E] text-[32px] md:text-[42px] font-bold font-['Archivo'] leading-tight">
                Introduction
              </h2>

              <div className="flex items-end w-[400px] md:w-[850px]">
                <div className="w-[180px] md:w-[220px] h-[8px] md:h-[10px] bg-[#01155E]"></div>
                <div className="flex-1 h-[2px] bg-[#01155E]"></div>
              </div>
            </div>

            {/* TEXT BOX - Width: 1200px, Height: 205px */}
            <div className="w-[1200px] h-[205px] flex flex-col gap-6">
              <p className="text-[#01155E] text-[20px] md:text-[22px] font-medium font-['General_Sans'] leading-[1.6]">
                Yupland is a real estate marketing and information platform managed by
                <span className="font-bold"> Divyansh Chitkara</span>.
                Yupland itself does not provide real estate brokerage services.
              </p>

              <p className="text-[#01155E] text-[18px] md:text-[20px] font-normal font-['General_Sans'] leading-[1.6] opacity-90">
                While every effort is made to ensure that the information presented on
                Yupland is accurate and current, all information is provided for general
                informational purposes only and should not be considered legally binding.
                Users are encouraged to independently verify property details,
                availability, and pricing with the respective developers and authorised
                representatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <SubtitelofBlog/>
    <BlogDetailSection/>
    <BlogFullWidthSection/>
    </>
  );
};

export default Blog;