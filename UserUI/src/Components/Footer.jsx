import React, { useEffect, useState } from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Replace with your actual asset paths
import bg1 from '../assets/Blog1.jpg';
import bg2 from '../assets/Blog1.jpg';
import bg3 from '../assets/Blog1.jpg';

const images = [bg1, bg2, bg3];

const Footer = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-full min-h-[850px] overflow-hidden flex items-center justify-center">
      
      {/* BACKGROUND CAROUSEL */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* FIXED SIZE CONTAINER: 1560 x 554 */}
      <div 
        style={{ width: '1560px', height: '554px' }}
        className="relative z-10 bg-[#020B4D] text-white flex overflow-hidden"
      >
        {/* INNER DOTTED BORDER BOX (Matches the image overlay) */}
        <div className="absolute inset-10 pointer-events-none"></div>

        {/* LEFT SECTION (Logo & About) - approx 35% width */}
        <div className="w-[35%] h-full flex flex-col p-16 z-20">
          <div className="p-10 h-full flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-7xl font-bold tracking-tight">yupland</h2>
            </div>
            <p className="text-[24px] leading-relaxed text-gray-300">
              YupLand is a real estate marketing and information platform created
              to help you research off-plan projects, explore communities, and
              understand Dubai’s real estate landscape.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION (Nav, Services, Contact) - approx 65% width */}
        <div className="w-[65%] h-full p-16 z-20 pl-0">
          <div className=" p-10 h-full grid grid-cols-3">
            
            {/* Nav Links */}
            <div className="flex flex-col gap-3 text-[24px]">
              {['About', 'Services', 'Properties', 'Offplan', 'Communities', 'Careers', 'Blog', 'Contact Us'].map((item) => (
                <span key={item} className="cursor-pointer hover:text-blue-400">{item}</span>
              ))}
            </div>

            {/* Services */}
            <div className="flex flex-col gap-6 text-[24px] pr-4">
              <span>Property Buying Assistance</span>
              <span>Off-plan Advisory</span>
              <span>Ready Property Assistance</span>
              <span>Property Management</span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-4 text-[24px]">
                <div className="flex gap-3">
                  <Phone size={20} className="mt-1 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span>India: +91 99999 95871</span>
                    <span>Canada: +1 437 328 8508</span>
                    <span>Phone (UAE only): +971 505737367</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Mail size={20} className="mt-1 flex-shrink-0" />
                  <div className="flex flex-col truncate">
                    <span>divyansh@aquaproperties.com</span>
                    <span>chitkaradivyansh@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <span className="text-[15px] opacity-80">Follow us :</span>
                <div className="flex gap-4">
                  <Facebook size={20} className="cursor-pointer hover:scale-110 transition-transform" />
                  <Twitter size={20} className="cursor-pointer hover:scale-110 transition-transform" />
                  <Instagram size={20} className="cursor-pointer hover:scale-110 transition-transform" />
                  <Linkedin size={20} className="cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;