import React from 'react';
import patternBg from "../../assets/Vector (7).png"

const MarketActivityCard = ({ percentage, title, transactions, reportLabel }) => {
  return (
    <div className="relative w-full max-w-[576px] h-auto lg:h-[402px] bg-[#01155E] rounded-[16px] p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)]">
      {/* Decorative Background Pattern - Absolute Positioned */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[307px] h-[347px] bg-[radial-gradient(circle,_#3B82F6_0%,_transparent_70%)] blur-3xl rounded-full"></div>
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)',
            backgroundSize: '12px 12px',
            maskImage: 'radial-gradient(circle at right, black, transparent)'
          }}>
        </div>
      </div>

      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 w-[80%] h-full pointer-events-none select-none z-0">
        <img
          src={patternBg}
          alt=""
          className="w-full h-full object-contain object-right-top opacity-80"
          aria-hidden="true"
        />
      </div>

      {/* Card Header Content - CENTER ALIGNED */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h3 className="font-['General_Sans'] font-medium text-[48px] lg:text-[64px] leading-[120%] text-white tracking-tight">
          {percentage}
        </h3>
        <p className="font-['General_Sans'] font-medium text-[14px] lg:text-[16px] leading-none text-white mt-2">
          {title}
        </p>

        <div className="flex items-center gap-4 mt-8 lg:mt-7">
          <div className="h-[1px] w-12 bg-white opacity-60"></div>
          <span className="font-['General_Sans'] font-medium text-[16px] text-white uppercase tracking-wider">
            {transactions} Transactions
          </span> <div className="h-[1px] w-12 bg-white opacity-60"></div>
        </div>
      </div>

      {/* Buttons Block - CENTER ALIGNED */}
      <div className="relative z-10 mt-10 lg:mt-0 flex flex-col gap-[20px] w-full max-w-[516px] mx-auto">
        <button className="w-full font-['Archivo'] h-[50px] bg-[#F8FAFC] hover:bg-white transition-colors text-[#01155E] rounded-[8px] flex items-center justify-center text-[14px] lg:text-[16px]">
          {reportLabel}
        </button>
        <button className="w-full h-[50px] font-['Archivo'] bg-transparent border border-white/30 hover:bg-white/10 transition-colors text-white rounded-[8px] flex items-center justify-center text-[14px] lg:text-[16px]">
          Delivered via WhatsApp
        </button>
      </div>
    </div>
  );
};

const DubaiMarketActivity = () => {
  const marketData = [
    {
      percentage: "65.3%",
      title: "Dubai Off-Plan Transactions 2025",
      transactions: "131,200",
      reportLabel: "View 2025 Off-Plan Report"
    },
    {
      percentage: "34.7%",
      title: "Dubai Ready Property Transactions 2025",
      transactions: "69,620",
      reportLabel: "View 2025 Ready Property Report"
    }
  ];

  return (
    <section className="w-full py-16 lg:py-24 px-4 font-sans">
      <div className="max-w-[1200px] mx-auto">

        {/* Heading Block */}
        <div className="mb-12 lg:mb-16">
          <div className="inline-block relative">
            <h2 className="font-['Archivo'] font-semibold text-[32px] md:text-[40px] lg:text-[48px] leading-none text-[#01155E] mb-2">
              Dubai Market Activity 2025
            </h2>
            <div className="flex w-[574px]"><div className="w-[240px] h-[8px] bg-[#01155E]"></div><div className="flex-1 h-[2px] bg-[#01155E]"></div></div>
          </div>
          <p className="font-['General_Sans'] font-n text-[16px] lg:text-[20px] leading-none text-[#67739E] mt-5">
            Source: Property Monitor · Dubai Land Department
          </p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-[48px]">
          {marketData.map((data, index) => (
            <MarketActivityCard
              key={index}
              percentage={data.percentage}
              title={data.title}
              transactions={data.transactions}
              reportLabel={data.reportLabel}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default DubaiMarketActivity;
