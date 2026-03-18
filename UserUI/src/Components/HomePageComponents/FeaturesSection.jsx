import React from 'react';
import communityimage from "../../assets/communityimage.jpg";
import { MessageSquare, Users, Building2 } from "lucide-react";
import imageurl from '../../assets/underline.png';

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#001457]" />,
      title: "Direct Communication",
      desc: "Connect directly with the founder and developer representatives through the platform."
    },
    {
      icon: <Users className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#001457]" />,
      title: "Founder-Led Experience",
      desc: "Yupland is an independent Dubai real estate research and marketing platform."
    },
    {
      icon: <Building2 className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#001457]" />,
      title: "Research-Led Approach",
      desc: "Save ready and off-plan properties and compare off-plan projects."
    }
  ];

  return (
    <>
      {/* Heading */}
      <div className="w-full flex justify-center pt-8 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="w-full max-w-[1200px]">
          <h2
            className="text-[#001457] inline-block pb-[7px]"
            style={{
              fontFamily: "Archivo, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 5vw, 48px)",
              lineHeight: "100%",
              letterSpacing: "0%",
              backgroundImage: `url(${imageurl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left bottom",
              backgroundSize: "clamp(150px, 40vw, 273px) 6px",
            }}
          >
            Who are we?
          </h2>
        </div>
      </div>

      <section className="bg-white w-full flex justify-center py-4 pb-12 sm:pb-16">
        <div className="w-full max-w-[1240px] flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-stretch px-4 sm:px-6 overflow-visible">

          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col pt-2 lg:pt-4 w-full min-w-0">
            <div className="mb-6">

              <div className="w-full lg:max-w-[444px]">
                <div className="text-[15px] sm:text-[17px] lg:text-[20px] leading-[1.45] text-[#01155E99]">
                  <p className="mb-3 sm:mb-4">
                    <span className="text-[#001457] text-[26px] sm:text-[32px] lg:text-[40px] font-semibold leading-none">
                      YupLand
                    </span>{" "}
                    is an independent Dubai real estate research and marketing platform founded and operated by Divyansh Chitkara.
                  </p>
                  <p className="mb-3 sm:mb-4">
                    The platform organises structured information on Dubai's off-plan and ready property market, covering projects, communities, developers, and transaction activity, while enabling users to access market updates and insights and compare off-plan projects.
                  </p>
                  <p>
                    Yupland operates as an informational platform and does not itself act as a real estate brokerage.
                  </p>
                </div>
              </div>

              <button className="bg-[#001457] text-white rounded-[8px] px-6 sm:px-10 lg:px-12 py-3 sm:py-3.5 text-[15px] sm:text-[17px] lg:text-[20px] font-semibold transition-all hover:bg-[#081d72] w-full lg:max-w-[431px] mt-5 sm:mt-6">
                Discover Your Neighbourhood
              </button>
            </div>

            {/* Icon Features */}
            <div className="flex flex-col gap-5 sm:gap-6 mt-1 lg:pr-[35px]">
              {features.map((item, index) => (
                <div key={index} className="flex gap-4 sm:gap-6 items-start">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-[#001457] text-[15px] sm:text-[17px] lg:text-[20px] font-[600] mb-1 sm:mb-2">
                      {item.title}
                    </h4>
                    <p className="text-[#01155E99] text-[13px] sm:text-[15px] lg:text-[18px] leading-[1.5]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full lg:w-[600px] h-[320px] sm:h-[480px] lg:h-auto lg:self-stretch flex-shrink-0 mt-6 lg:mt-0">
            <img
              src={communityimage}
              alt="Dubai Architecture"
              className="w-full h-full lg:absolute lg:inset-0 object-cover rounded-[20px] sm:rounded-[28px] lg:rounded-[32px]"
            />

            {/* TOP RIGHT BADGE */}
            <div className="absolute top-4 -right-4 sm:top-6 sm:-right-6 lg:top-10 lg:-right-19 bg-[#001457] text-white rounded-[12px] sm:rounded-[16px] px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 flex items-center gap-2 sm:gap-3 lg:gap-4 shadow-2xl z-20">
              <span className="text-[28px] sm:text-[40px] lg:text-[60px] font-medium leading-none">87+</span>
              <p className="text-[11px] sm:text-[14px] lg:text-[24px] font-medium leading-tight w-[120px] sm:w-[190px] lg:w-[241px]">
                Successful Transactions Monthly
              </p>
            </div>

            {/* BOTTOM LEFT BADGE */}
            <div className="absolute bottom-4 -left-4 sm:bottom-6 sm:-left-6 lg:bottom-25 lg:-left-19 bg-white text-[#001457] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-5 flex items-center gap-3 sm:gap-4 lg:gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-20 border border-gray-100">
              <span className="text-[28px] sm:text-[40px] lg:text-[64px] font-medium leading-none">87+</span>
              <p className="text-[11px] sm:text-[14px] lg:text-[24px] font-medium leading-tight text-[#001457] w-[120px] sm:w-[190px] lg:w-[241px]">
                Successful Transactions Monthly
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
