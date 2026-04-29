import React from "react";
import { Facebook, Instagram, Linkedin, Phone, Mail } from "lucide-react";
import footerBg from "../assets/footer-bg.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full min-h-[627px] overflow-hidden">

      {/* BACKGROUND IMAGE */}
     <img src={footerBg} alt="Footer Background" className="absolute inset-0 w-full h-full object-cover object-bottom" />

      {/* BLUE OVERLAY */}
      <div className="absolute inset-0 bg-[#1E2F6B]/90" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 text-white">

        <div className="flex flex-col lg:flex-row justify-between gap-12">

          {/* LEFT SECTION */}
          <div className="max-w-[320px]">

            <div className="bg-[#142A63] inline-block px-6 py-3 mb-6">
              <h2 className="text-[48px] font-bold leading-none">yupland</h2>
            </div>

            <p className="text-[18px] leading-relaxed Text-[#FFFFFF] ">
              Yupland is a real estate platform helping buyers and investors
              discover, evaluate, and secure the right properties across the UAE.
            </p>

          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col sm:flex-row gap-16">

            {/* PLATFORM */}
            <div>
              <h4 className="font-semibold text-[18px] mb-4">Platform</h4>
              <div className="flex flex-col gap-3 Text-[#FFFFFF]  text-[18px]">
                
<Link to="/about">About</Link>
<Link to="/contact">Contact</Link>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="font-semibold text-[18px] mb-4">Legal</h4>
              <div className="flex flex-col gap-3 text-[18px] Text-[#FFFFFF]">
               <Link to="/termsofuse">Terms of Use</Link>
<Link to="/privacy">Privacy Policy</Link>
<Link to="/disclamer">Disclaimer</Link>
<Link to="/datascource">Data Sources</Link>
              </div>
            </div>

            {/* CONTACT */}
            <div className="max-w-[280px]">

              <div className="flex gap-3 mb-5">
                <Phone />
                <div className="Text-[#FFFFFF] text-[18px]">
                  <p>India: +91 99999 95871</p>
                  <p>Canada: +1 437 328 8508</p>
                  <p>Phone (UAE only): +971 505773767</p>
                </div>
              </div>

              <div className="flex gap-3 mb-5">
                <Mail />
                <div className="text-[#FFFFFF] text-[18px] break-words">
                  <p>divyansh@aquaproperties.com</p>
                  <p>chitkaradivyansh@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <span className="text-[#9CA3AF] text-sm">Follow us :</span>
                <Facebook size={18} />
                <span className="text-lg font-bold">𝕏</span>
                <Instagram size={18} />
                <Linkedin size={18} />
              </div>

            </div>

          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-16 border-t border-white/20 pt-6  Text-[#FFFFFF]">
          <p>© 2026 yupland. All rights reserved.</p>
          <p className="mt-2 max-w-[900px]">
            All content on this website is original intellectual property of
            yupland and may not be reproduced, republished, adapted,
            paraphrased, reworded, distributed, or used to create derivative
            works, in whole or in part, without prior written consent.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;