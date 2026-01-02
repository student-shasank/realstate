import { MessageCircle } from "lucide-react";
import communityimage from "../../assets/communityimage.jpg";
export default function CommunitiesBrief() {
  const stats = [
    { number: "35+", label: "Successful Transactions Monthly" },
    { number: "35+", label: "Successful Transactions Monthly" },
    { number: "87+", label: "Sucessful Transactions Monthly" },
  ];

  return (
    <section 
  id="communities"
  className="bg-white w-full max-w-[1440px] mx-auto flex flex-col items-center overflow-hidden px-4 md:px-10 py-16 md:py-24"
>

      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-[56px] font-bold text-[#01155E] mb-4 leading-tight">
          Communities brief
        </h2>
        <p className="text-[#64748B] text-[20px] max-w-[900px] mx-auto leading-relaxed">
          Are you looking for the perfect neighborhood in Dubai? Discover the unique 
          characteristics of diverse communities, catering to various preferences from 
          luxury to family-friendly environments.
        </p>
      </div>

      {/* Content Section */}
   <div className="w-full flex flex-col md:flex-row gap-12">

        
        {/* Left Column - Updated Spacing to match Figma */}
      <div className="flex-1 px-0 md:px-[60px] pt-4">

          <div className="mb-8">
            <p className="text-[26px] leading-[1.4] text-[#334155]">
              <span className="text-[#01155E] font-bold text-[34px]">YupLand</span> is a real estate marketing and information platform created to help you research off-plan projects, explore communities, and understand Dubai’s real estate landscape.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex -space-x-5">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i+10}`} 
                  className="w-16 h-16 rounded-full border-2 border-white object-cover" 
                  alt="Team" 
                />
              ))}
            </div>
            <p className="text-[18px] text-[#64748B] leading-tight">
              Meet Our <br/> <span className="font-semibold">Professional Team</span>
            </p>
          </div>

          {/* LARGE SPACER: This matches the orange circled area in your image */}
      <div className="h-12 md:h-[180px]"></div>


          {/* Stats Section */}
          <div className="flex flex-col border-t border-[#E2E8F0] w-full">
            {stats.map((stat, index) => (
              <div key={index} className="py-10 border-b border-[#E2E8F0] flex items-center">
                <div className="w-[200px]">
                  <span className="text-[96px] font-bold text-[#01155E] tracking-tighter leading-none">
                    {stat.number}
                  </span>
                </div>
                <div className="pl-8">
                  <span className="text-[#000000] text-[28px] font-medium leading-tight block max-w-[240px]">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image Section */}
       <div className="relative flex-shrink-0 w-full md:w-[747px] h-[400px] md:h-[1033px]">

          <img
            src={communityimage}
            alt="Dubai Architecture"
            className="w-full h-full object-cover rounded-l-[40px]"
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
    </section>
  );
}