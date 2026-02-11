import React from 'react'

function MarketSupply() {
    const snapshotData = [
    { label: "Average Price (AED / sq.ft)", value: "961" },
    { label: "Total Transactions (YTD 2026)", value: "2" },
    { label: "Total Residential Units", value: "260" },
    { label: "Under-Construction Units", value: "0" },
  ];

  const faqs = [
    {
      q: "1. Where is Al Waha located in Dubai?",
      a: "Al Waha is located within Dubailand and is accessed via Emirates Road (E611), near residential areas such as Arabian Ranches and Mudon"
    },
    {
      q: "2. What types of properties are available in Al Waha?",
      a: "The community includes a mix of apartments, townhouses, and villas."
    },
    {
      q: "3. How is road connectivity from Al Waha?",
      a: "Al Waha has direct access to Emirates Road (E611), enabling road-based connectivity across Dubai"
    },
    {
      q: "4. Are schools and nurseries available near Al Waha?",
      a: "Yes. Several established schools and nurseries operate in nearby communities such as The Sustainable City, Mudon, and Arabian Ranches"
    },
    {
      q: "5. Is public transport easily accessible from Al Waha?",
      a: "Public transport is not directly accessible within the community, and residents primarily rely on road connectivity."
    }
  ];
  return (
    <div>
      <div className="flex flex-col items-center w-full bg-white p-4 md:p-10 font-['General_Sans']">
      <div className="w-full max-w-[1200px] flex flex-col gap-10">
        
        {/* --- MARKET & SUPPLY SNAPSHOT --- */}
        <div className="flex justify-start">
          <div className="w-full md:w-[518px] md:h-[315px] bg-[#01155E] rounded-[16px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] flex flex-col items-center pt-[40px] pb-8 md:pb-0">
            <h2 className="text-[#FBFBFB] font-medium text-[24px] leading-none underline underline-offset-8 decoration-1 mb-[40px]">
              Market & Supply Snapshot
            </h2>
            <div className="flex w-full px-6 md:px-[60px]">
              <div className="w-[70%] md:w-[280px] flex flex-col gap-[20px] border-r border-[#FBFBFB]/30 pr-4">
                {snapshotData.map((item, i) => (
                  <span key={i} className="text-[#FBFBFB] font-normal text-[14px] md:text-[18px] leading-none whitespace-nowrap">
                    {item.label}
                  </span>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-[20px] items-center justify-center">
                {snapshotData.map((item, i) => (
                  <span key={i} className="text-[#FBFBFB] font-normal text-[14px] md:text-[18px] leading-none">
                    {item.value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- FAQS SECTION --- */}
        <div className="w-full flex flex-col gap-[16px]">
          <div className="  pb-1 w-fit mb-4">
            <h1 className="text-[#01155E] font-['Archivo'] font-semibold text-[36px] md:text-[48px] leading-none">
              FAQs
            </h1>
              <div class="flex w-[464px]"><div class="w-[180px] h-[8px] bg-[#01155E]"></div><div class="flex-1 h-[2px] bg-[#01155E]"></div></div>
          </div>
          
          <div className="flex flex-col gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="text-[#01155E] font-semibold text-[20px] leading-none">
                  {faq.q}
                </h3>
                <p className="text-[#67739E] font-normal text-[16px] leading-tight">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- DISCLOSURE SECTION --- */}
        <div className="w-full mt-4">
          <h3 className="text-[#01155E] font-normal text-[20px] leading-none mb-2">
            Disclosure
          </h3>
          <p className="text-[#67739E] font-normal text-[16px] leading-relaxed max-w-[1200px]">
            This community guide is intended for general informational and marketing purposes only. 
            Information is based on publicly available sources, developer disclosures, and mapping data 
            at the time of preparation. Distances, travel times, amenities, and availability are 
            approximate and subject to change. Buyers and investors are advised to independently verify 
            all details with official developers, authorities, and service providers before making any 
            property or investment decisions.
          </p>
        </div>

      </div>
    </div>
    </div>
  )
}

export default MarketSupply