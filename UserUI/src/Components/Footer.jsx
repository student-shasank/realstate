import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail } from 'lucide-react';
import footerBg from '../assets/footer-bg.jpg';

const Footer = () => {
  return (
    <footer className="relative w-full min-h-[687px] h-auto overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={footerBg}
        alt="Footer Background"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />

      {/* BLUE OVERLAY */}
      <div className="absolute inset-0 bg-[#0A1A5E]/85" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-[687px] h-full flex items-center py-10 sm:py-12">
        <div className="w-full max-w-[1200px] mx-auto text-white px-4 sm:px-6 lg:px-0">

          <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[8px]">

            {/* LOGO + ABOUT */}
            <div className="w-full lg:w-[328px]">
              <div className="bg-[#142A63] inline-block px-6 py-3 mb-6">
                <h2 className="text-[40px] sm:text-[48px] font-bold leading-none">
                  yupland
                </h2>
              </div>

              <p className="pt-[2.5px] pb-[2.5px] pr-0 lg:pr-[43px] pl-[12px] text-[#FFFFFF] text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-relaxed">
                YupLand is a real estate marketing and information platform created
                to help you research off-plan projects, explore communities, and
                understand Dubai's real estate landscape.
              </p>
            </div>

            {/* RIGHT SIDE 3 CARDS WRAPPER */}
            <div className="w-full flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-[16px] lg:gap-[8px] p-0 lg:p-[12px]">

              {/* LINKS */}
              <div className="w-full sm:w-[48%] lg:w-[227px] pt-[12px] pr-[12px] pl-[12px] flex flex-col gap-4 text-[#D1D5DB] text-[16px]">
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
              <div className="w-full sm:w-[48%] lg:w-[284px] pt-[12px] pr-[12px] pl-[12px] flex flex-col gap-4 text-[#D1D5DB] text-[16px]">
                <span>Property Buying Assistance</span>
                <span>Off-plan Advisory</span>
                <span>Ready Property Assistance</span>
                <span>Property Management</span>
              </div>

              {/* CONTACT */}
              <div className="w-full lg:w-[301px] pt-[12px] pr-[12px] pl-[12px] flex flex-col gap-6 text-[16px]">
                <div className="flex gap-4">
                  <Phone className="shrink-0" />
                  <div className="text-[#D1D5DB] break-words">
                    <p>India: +91 99999 95871</p>
                    <p>Canada: +1 437 328 8508</p>
                    <p>Phone (UAE only): +971 505773767</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="shrink-0" />
                  <div className="text-[#D1D5DB] break-words">
                    <p>divyansh@aquaproperties.com</p>
                    <p>chitkaradivyansh@gmail.com</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[#9CA3AF]">Follow us :</span>
                  <Facebook />
                  <span className="font-bold">𝕏</span>
                  <Instagram />
                  <Linkedin />
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