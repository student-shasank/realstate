import React from 'react';
import { MessageCircle } from "lucide-react";
import communityimage from "../../assets/communityimage.jpg";

export default function CommunitiesBrief() {
  const stats = [
    { number: "35+", label: "Successful Transactions Monthly" },
    { number: "35+", label: "Successful Transactions Monthly" },
    { number: "87+", label: "Successful Transactions Monthly" },
  ];

  return (
    /* Outer Container: Max width 1440px and centered */
    <section 
      id="communities"
      className="bg-white w-full max-w-[1440px] mx-auto flex flex-col items-center overflow-hidden py-16 md:py-24"
    >
      {/* Inner Content Wrapper: Exactly 1248px content area with box-content fix */}
      <div className="w-full max-w-[1248px] box-content px-4 md:px-6 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-20">
         <h2 
  className="text-[#01155E] text-[48px] font-semibold text-center mb-4"
  style={{ 
    fontFamily: 'Archivo, sans-serif', 
    fontWeight: '600',
    lineHeight: '100%', 
    letterSpacing: '0' 
  }}
>
  Communities brief
</h2><p 
  className="text-[#64748B] text-[24px] w-[731px] h-[92px] mx-auto text-center mb-10"
  style={{ 
    lineHeight: '130%', // Adjusted for 24px font size within 92px height
    letterSpacing: '0%' 
  }}
>
  Are you looking for the perfect neighborhood in Dubai? Discover the unique 
  characteristics of diverse communities, catering to various preferences from 
  luxury to family-friendly environments.
</p>
        </div>

        {/* Main Content Flex Row - Gap exactly 21px */}
        <div className="w-full flex flex-col md:flex-row gap-[21px] justify-center items-start">
          
          {/* Left Column: Fixed 512px * 1096px */}
          <div 
            className="flex-shrink-0 w-full md:w-[512px] flex flex-col"
            style={{ height: '1096px' }}
          >
            {/* Top Content Block with 115px Bottom Margin */}
            <div className="mb-[115px]">
              <div className="mb-10">
                <p className="text-[26px] leading-[1.4] text-[#334155]">
                  <span className="text-[#01155E]  text-[32px]">YupLand</span> is a real estate marketing and information platform created to help you research off-plan projects, explore communities, and understand Dubai’s real estate landscape.
                </p>
              </div>
<button 
  className="bg-[#01155E] text-white rounded-full flex items-center justify-center transition-all hover:bg-[#081d72] active:scale-95 shadow-md"
  style={{ 
    width: '369px', 
    height: '43px',
    fontFamily: '"General Sans", sans-serif',
    fontSize: '20px',      // Scaled for the 43px height
    fontWeight: '500',     // Medium weight as per your style
    lineHeight: '100%',
    letterSpacing: '0%'
  }}
>
  Discover Your Neighbourhood
</button>

            </div>

            {/* Stats Section - Pushed down by the 115px margin above */}
            <div className="flex flex-col border-t border-[#E2E8F0] w-full">
              {stats.map((stat, index) => (
                <div key={index} className="py-10 border-b border-[#E2E8F0] flex items-center">
                  <div className="w-[188px]">
                    <span className="text-[88px] font-bold text-[#01155E] text-[96px] tracking-tighter leading-none">
                      {stat.number}
                    </span>
                  </div>
                  <div className="pl-10">
                    <span className="text-[#000000] text-[24px] font-medium leading-tight block max-w-[240px]">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image Section: Fixed 645px x 1107px */}
          <div 
            className="relative flex-shrink-0 w-full md:w-[645px] overflow-hidden"
            style={{ height: '1107px' }}
          >
            <img
              src={communityimage}
              alt="Dubai Architecture"
              className="w-full h-full object-cover rounded-[40px]"
            />

            {/* WhatsApp Overlay */}
            <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-md rounded-[20px] py-4 px-6 flex items-center gap-4 shadow-2xl border border-white/20">
               <div className="bg-[#25D366] p-2 rounded-full">
                  <MessageCircle className="w-8 h-8 text-white fill-current" />
               </div>
               <div>
                  <p className="text-[14px] text-gray-500 font-medium">Have a query?</p>
                  <p className="text-[20px] font-bold text-[#01155E]">Whatsapp Us</p>
               </div>
            </div>

            {/* Expert Overlay */}
            <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md rounded-[32px] p-6 flex items-center gap-6 shadow-2xl">
                <img src="https://i.pravatar.cc/100?img=11" className="w-20 h-20 rounded-full border-4 border-white" alt="Advisor" />
                <div>
                  <p className="text-[14px] text-gray-500 font-medium mb-1">Help and Support</p>
                  <p className="text-[22px] font-bold text-[#01155E] leading-tight">Get the consultation from our experts</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}