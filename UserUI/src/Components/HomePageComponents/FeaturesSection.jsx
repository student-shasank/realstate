import React from 'react';
import { MessageSquare, Building2, Users } from 'lucide-react';
import iMAGEURL from "../../assets/3b838c3424b9960411ce6e2f801322bd1815fa00.png"

const FeaturesSection = () => {
  return (
    /* Outer Section: Max width 1440px and centered */
    <section className="w-full max-w-[1440px] mx-auto pt-16 md:pt-24 bg-white flex flex-col items-center mt-20 md:mt-60">

      {/* Inner Content Container: Locked to 1200px */}
      <div className="w-full max-w-[1248px] px-4 md:px-6 relative z-10">

   <h2 
  className="text-[#01155E] text-[64px] font-semibold text-center mb-10"
  style={{ 
    fontFamily: 'Archivo, sans-serif', 
    fontWeight: '600',
    lineHeight: '100%', 
    letterSpacing: '0%' 
  }}
>
  What sets us apart?
</h2>

        {/* Grid Container centered within the 1200px */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-24 gap-y-10 md:gap-y-16 z-10 p-6 md:p-16 bg-white mb-[-60px] md:mb-[-100px]">

          {/* Quick Response */}
          <FeatureCard 
            Icon={MessageSquare}
            title="Quick Response"
            description="We guarantee swift responses to client inquiries, ensuring their needs are promptly addressed by dedicated real estate brokers."
          />

          {/* First-Class Service */}
          <div className="flex flex-col">
            <div className="flex gap-6 mb-4 items-center">
              <div className="flex items-center justify-center">
                <Building2 className="text-[#01155E] w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#01155E]">First-Class Service</h3>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              We simplify the home buying and selling process, managing negotiations and paperwork on behalf of all parties involved.
            </p>
            <button className="bg-[#01155E] text-white px-10 py-3 rounded-md font-semibold w-fit hover:bg-[#0a227e] transition-colors">
              Discover
            </button>
          </div>

          {/* Experienced Staff */}
          <FeatureCard 
            Icon={Users}
            title="Experienced Staff"
            description="Our team comprises diligent individuals with exceptional credentials and comprehensive training, providing top-notch services to clients."
          />

          {/* Empty div to maintain grid balance */}
          <div className="hidden md:block"></div>
        </div>
      </div>

      {/* Full Width Image (Relative to the 1440px wrapper) */}
      <div className="w-full relative z-20"> 
        <img
          src={iMAGEURL}
          alt="Real Estate Houses"
          className="w-full object-cover block"
          style={{ height: '436px' }}
        />
      </div>
    </section>
  );
};

const FeatureCard = ({ Icon, title, description }) => (
  <div className="flex flex-col">
    <div className="flex gap-6 mb-4 items-center">
      <div className="flex items-center justify-center">
        <Icon className="text-[#01155E] w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-[#01155E]">{title}</h3>
    </div>
    <p className="text-gray-500 text-lg leading-relaxed">
      {description}
    </p>
  </div>
);

export default FeaturesSection;