import React, { useState, useEffect, useCallback, useRef } from "react";
import underline from "../../assets/underline.png";
import LoginPopup from "../../Pages/LoginPopup"; // adjust path to match your project structure

// Reads the same "user" object your favorites-sync code writes to
// localStorage, and treats its presence as "logged in".
function getIsLoggedIn() {
  try {
    const raw = localStorage.getItem("user");
    const user = JSON.parse(raw);
    const result = Boolean(user && Object.keys(user).length > 0);
    // 🐛 DEBUG
    console.log("[Flipbook] getIsLoggedIn() raw localStorage.user:", raw);
    console.log("[Flipbook] getIsLoggedIn() parsed:", user, "-> result:", result);
    return result;
  } catch (err) {
    console.log("[Flipbook] getIsLoggedIn() threw error:", err);
    return false;
  }
}

export default function PropertyFlipbookSection({
  eyebrow = "Yupland Research",
  title = "Dubai Real Estate Market Report 2026",
  description = "Structured, research-led analysis of Dubai's off-plan and ready property markets — covering transaction trends, escrow regulation, investment risk frameworks, and where institutional capital is moving next. This report tracks the shift from speculative cycles to a more mature, regulation-backed market, with data sourced from the Dubai Land Department, JLL, and CBRE.",
  description2 = "Full breakdowns, charts, and the structural case for long-term investment are in the report below. Sign up for free to unlock the complete report.",
  fullBookUrl = " https://heyzine.com/flip-book/1c8e4fadcc.html",
  previewBookUrl = "https://heyzine.com/flip-book/52e562bcf0.html",
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const initial = getIsLoggedIn();
    console.log("[Flipbook] INITIAL isLoggedIn state:", initial);
    return initial;
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const hasAutoPromptedRef = useRef(false);

  const refreshLoginState = useCallback(() => {
    console.log("[Flipbook] refreshLoginState() called — event fired");
    const next = getIsLoggedIn();
    console.log("[Flipbook] setting isLoggedIn to:", next);
    setIsLoggedIn(next);
  }, []);

  useEffect(() => {
    console.log("[Flipbook] mounting — attaching storage & auth-changed listeners");
    window.addEventListener("storage", refreshLoginState);
    window.addEventListener("auth-changed", refreshLoginState);
    return () => {
      console.log("[Flipbook] unmounting — removing listeners");
      window.removeEventListener("storage", refreshLoginState);
      window.removeEventListener("auth-changed", refreshLoginState);
    };
  }, [refreshLoginState]);

  // 🐛 DEBUG: log every time isLoggedIn actually changes / re-renders
  useEffect(() => {
    console.log("[Flipbook] RENDER — isLoggedIn is now:", isLoggedIn);
  }, [isLoggedIn]);

  const brochureUrl = isLoggedIn ? fullBookUrl : previewBookUrl;
  console.log("[Flipbook] computed brochureUrl:", brochureUrl);

  const handleUnlockClick = () => {
    if (getIsLoggedIn()) {
      setIsLoggedIn(true);
      return;
    }
    setShowLoginPopup(true);
  };

  const handleLoginClose = () => {
    setShowLoginPopup(false);
    refreshLoginState();
  };

  return (
    <section className="w-full bg-white overflow-hidden mb-30">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-0 pt-12 lg:pt-16">
        <div className="max-w-2xl">
          <p
            className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-[#001A54]"
            style={{ fontFamily: "Archivo, sans-serif" }}
          >
            {eyebrow}
          </p>

          <h2
            className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#001A54] inline-block pb-4 lg:pb-6 leading-tight"
            style={{
              fontFamily: "Archivo, sans-serif",
              backgroundImage: `url(${underline})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 90%",
              backgroundSize: "457px 6px",
            }}
          >
            {title}
          </h2>
        </div>

        <div className="mt-5 space-y-4 max-w-2xl">
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#01155E99]">
            {description}
          </p>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#01155E99]">
            {description2}
          </p>
        </div>
      </div>

      <div className="mt-8 w-full flex justify-center px-5 lg:px-0">
        <div className="w-full max-w-[1440px]">
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

          {!isLoggedIn && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleUnlockClick}
                className="mt-8 mb-14 bg-[#001A54] text-white w-full sm:w-auto min-w-[280px] lg:w-[431px] h-[50px] rounded-md text-[16px] lg:text-[20px] font-semibold transition-all duration-300 hover:bg-[#01206b]"
              >
                Get Full Report
              </button>
            </div>
          )}
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