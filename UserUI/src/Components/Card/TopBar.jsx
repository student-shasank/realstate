import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

function TopBar() {
  const location = useLocation();

  // Check if current page is Home Page
  const isHomePage = location.pathname === "/";

  // Dynamic Theme Classes
  const bgClass = isHomePage
    ? "bg-[#01155E] text-white border-white/10"
    : "bg-white text-[#01155E] border-gray-200";

  const hoverTextClass = isHomePage
    ? "hover:text-gray-300"
    : "hover:text-[#01155E]/70";

  const dividerClass = isHomePage ? "text-white/30" : "text-gray-300";

  return (
    <div
      className={`text-xs sm:text-sm py-2 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 border-b hidden md:block transition-colors duration-300 ${bgClass}`}
    >
      <div className="w-full flex items-center justify-between font-semibold">
        
        {/* Left Side: Contact Information */}
        <div className="flex items-center gap-4 sm:gap-6 font-500">
          <a
            href="tel:+919999995871"
            className={`flex items-center gap-2 transition-colors ${hoverTextClass}`}
          >
            <Phone size={14} className="shrink-0" />
            <span>+971 505 773767 </span>
          </a>

          <span className={dividerClass}>|</span>

          <a
            href="mailto:info@yupland.ae"
            className={`flex items-center gap-2 transition-colors ${hoverTextClass}`}
          >
            <Mail size={14} className="shrink-0" />
            <span>info@yupland.ae</span>
          </a>
        </div>

        {/* Right Side: Contact Us & Language */}
        <div className="flex items-center gap-5 font-semibold">
          {/* Contact Us */}
          <Link
            to="/contact"
            className={`transition-colors ${hoverTextClass}`}
          >
            Contact Us
          </Link>

          <span className={dividerClass}>|</span>

          {/* Language */}
          <button
            type="button"
            className={`flex items-center gap-2 font-semibold transition-colors ${hoverTextClass}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h12M9 3v2m2 0a9 9 0 01-9 9m3-3l3 3m6-9h7m-3.5-2v2m0 0a9 9 0 01-9 9m3-3l3 3"
              />
            </svg>
            <span>Language</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default TopBar;
