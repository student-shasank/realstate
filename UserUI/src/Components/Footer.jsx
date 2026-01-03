import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail } from 'lucide-react';
import footerBg from '../assets/xyz.png';

const Footer = () => {
  return (
    /* FULL FOOTER CONTAINER */
    <footer className="relative w-[1440px] h-[1297px] mx-auto overflow-hidden m">

      {/* BACKGROUND IMAGE — FULL HEIGHT */}
      <div className="absolute top-[100px] right-0 left-0 bottom-0 z-0">
  <img
  src={footerBg}
  alt="Footer Background"
  className="w-full h-full object-cover object-[0_-35px]"
/>
</div>

      {/* BLUE OVERLAY (TRANSPARENT LIKE FIGMA) */}
      <div className="absolute bottom-0 left-0 w-full h-[687px] z-10 bg-[#0A1A5E]/85" />

      {/* OPTIONAL GRADIENT FOR DEPTH (FIGMA FEEL) */}
      <div className="absolute bottom-0 left-0 w-full h-[687px] z-10 bg-gradient-to-t from-[#0A1A5E]/95 to-transparent" />

      {/* FOOTER CONTENT */}
      <div className="absolute bottom-0 left-0 w-full h-[687px] z-20">
        <div className="w-[1200px] h-full mx-auto py-[90px] flex flex-col justify-between text-white">

          <div className="flex justify-between mt-20">

            {/* LOGO + ABOUT */}
            <div className="w-[420px]">
              <h2 className="text-[72px] font-bold mb-8">yupland</h2>
              <p className="text-gray-300 text-lg  font-semibold text-[20px]">
                YupLand is a real estate marketing and information platform created
                to help you research off-plan projects, explore communities, and
                understand Dubai's real estate landscape.
              </p>
            </div>

            {/* LINKS */}
            <div className="flex flex-col gap-4 text-gray-300 text-[20px]">
              {[
                'About',
                'Services',
                'Properties',
                'Offplan',
                'Communities',
                'Careers',
                'Blog',
                'Contact Us',
              ].map((item) => (
                <a key={item} href="#" className="hover:text-white">
                  {item}
                </a>
              ))}
            </div>

            {/* SERVICES */}
            <div className="flex flex-col gap-4 text-gray-300 text-lg">
              <span>Property Buying Assistance</span>
              <span>Off-plan Advisory</span>
              <span>Ready Property Assistance</span>
              <span>Property Management</span>
            </div>

            {/* CONTACT */}
            <div className="flex flex-col gap-8">
              <div className="flex gap-4">
                <Phone />
                <div className="text-gray-300 text-[20px]">
                  <p>India: +91 99999 95871</p>
                  <p>Canada: +1 437 328 8508</p>
                  <p>UAE: +971 505773767</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail />
                <div className="text-gray-300 text-[20px]" >
                  <p>divyansh@aquaproperties.com</p>
                  <p>chitkaradivyansh@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-400">Follow us :</span>
                <Facebook />
                <span className="font-bold">𝕏</span>
                <Instagram />
                <Linkedin />
              </div>
            </div>
          </div>

         

        </div>
      </div>
    </footer>
  );
};

export default Footer;
