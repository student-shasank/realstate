import React, { useState, useEffect, useCallback } from "react";
import underline from "../../assets/underline.png";
import LoginPopup from "../../Pages/LoginPopup"; // adjust path to match your project structure

/**
 * Reads the same "user" object your auth flow writes to localStorage
 * and treats a valid, authenticated user as "logged in".
 *
 * NOTE: We check for a real identifier (token/_id/id), not just
 * "an object with any keys" — an empty/placeholder user object should
 * NOT count as logged in.
 */
function getIsLoggedIn() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return false;

    const user = JSON.parse(raw);
    return Boolean(user && (user.token || user._id || user.id));
  } catch {
    return false;
  }
}

export default function PropertyFlipbookSection({
  eyebrow = "Yupland Research",
  title = "Dubai Real Estate Market Report 2026",
  description = "Structured, research-led analysis of Dubai's off-plan and ready property markets — covering transaction trends, escrow regulation, investment risk frameworks, and where institutional capital is moving next. This report tracks the shift from speculative cycles to a more mature, regulation-backed market, with data sourced from the Dubai Land Department, JLL, and CBRE.",
  description2 = "Full breakdowns, charts, and the structural case for long-term investment are in the report below. Sign up for free to unlock the complete report.",
  fullBookUrl = "https://heyzine.com/flip-book/52e562bcf0.html",
  previewBookUrl = "https://heyzine.com/flip-book/1c8e4fadcc.html",
  
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const refreshLoginState = useCallback(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, []);

  useEffect(() => {
    window.addEventListener("storage", refreshLoginState);
    window.addEventListener("auth-changed", refreshLoginState);
    return () => {
      window.removeEventListener("storage", refreshLoginState);
      window.removeEventListener("auth-changed", refreshLoginState);
    };
  }, [refreshLoginState]);

  const brochureUrl = isLoggedIn ? fullBookUrl : previewBookUrl;

  const reportLink =
 "https://acrobat.adobe.com/id/urn:aaid:sc:AP:3c0df375-ee73-4cd2-92d2-19651d06fc96";
 const handleGetReport = (e) => {
  e?.stopPropagation();

  if (!getIsLoggedIn()) {
    setShowLoginPopup(true);
    return;
  }

  window.open(reportLink, "_blank", "noopener,noreferrer");
};

 const handleUnlockClick = () => {
  if (!getIsLoggedIn()) {
    setShowLoginPopup(true);
  }
};

  const handleLoginClose = () => {
    setShowLoginPopup(false);
    refreshLoginState();
  };
return (
  <section className="w-full bg-white overflow-hidden mb-30">
    {/* Single outer wrapper — matches FeaturesSection's outer 1440 logic */}
    <div className="max-w-[1440px] mx-auto px-5 lg:px-0 pt-12 lg:pt-16">

      {/* Inner content wrapper — everything text/button related sits at 1200 */}
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl">
         

         <h2
  className="w-full text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#001A54] pb-4 lg:pb-6 leading-[1.15] lg:whitespace-nowrap"
  style={{
    fontFamily: "Archivo, sans-serif",
    backgroundImage: `url(${underline})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left bottom",
    backgroundSize: "457px 6px",
  }}
>
  {title}
</h2>
        </div>
      </div>

      {/* Flipbook — stays full width of the 1440 outer, like FeaturesSection's image column */}
      <div className="mt-8 w-full flex justify-center">
        <div className="w-full">
          <div className="relative">
            <iframe
              key={brochureUrl}
              src={brochureUrl}
              title={`${title} - ${eyebrow}`}
              allowFullScreen
              allow="autoplay; fullscreen; clipboard-write"
              scrolling="no"
              className="fp-iframe"
              style={{
                border: "1px solid lightgray",
                width: "100%",
                height: "400px",
              }}
            />

            {!isLoggedIn && (
              <p className="mt-3 text-center text-[14px] text-[#01155E99]">
                Showing a 5-page preview.{" "}
                <button
                  type="button"
                  onClick={handleUnlockClick}
                  className="font-semibold text-[#001A54] underline underline-offset-2"
                >
                  Log in
                </button>{" "}
                to view the full 23-page report.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Button back inside the 1200 inner wrapper, aligned with heading */}
     <div className="max-w-[1200px] mx-auto flex items-center justify-center">
  <button
    type="button"
    onClick={handleGetReport}
    className="mt-8 mb-14 bg-[#001A54] text-white w-full sm:w-auto min-w-[280px] lg:w-[431px] h-[50px] rounded-md text-[16px] lg:text-[20px] font-semibold transition-all duration-300 hover:bg-[#01206b]"
  >
    Get Full Report
  </button>
</div>
    </div>

    <LoginPopup
      isOpen={showLoginPopup}
      onClose={handleLoginClose}
      openSignup={() => {
        setShowLoginPopup(false);
      }}
    />
  </section>
);
 }
