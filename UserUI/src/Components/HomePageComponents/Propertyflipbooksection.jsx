import React, { useEffect, useRef, useState } from "react";
import underline from "../../assets/underline.png";

/**
 * BROCHURE FLIPBOOK SECTION (React + Tailwind)
 * ---------------------------------------------
 * Matches the design tokens used in CommunitiesBrief.jsx:
 * - Font: Archivo
 * - Heading color: #001A54, with the same underline.png underline graphic
 * - Body text color: #01155E99
 * - Primary button: #001A54 bg, hover #01206b
 * - Container: max-w-[1200px], same px-5 lg:px-0 gutters (assumes a
 *   1440px page, same as the rest of the site)
 *
 * WHAT THIS DOES
 * - Title + description for the report/brochure
 * - Embeds the flipbook (currently a Simplebooklet iframe link)
 * - Shows a lock overlay nudging signup after a delay, since
 *   Simplebooklet gives one link with ALL pages — there's no way to
 *   tell it "only show 5 pages to guests"
 *
 * IMPORTANT
 * This is a SOFT gate (a UX nudge), not real security. A visitor can
 * still open the raw Simplebooklet link directly and see all pages,
 * because nothing on Simplebooklet's side is actually restricted.
 *
 * FOR A REAL (SECURE) GATE LATER:
 * 1. Convert the brochure PDF into N page images on your server.
 * 2. Build an endpoint like GET /api/brochure/:id/pages that returns
 *    image URLs for pages 1-5 to logged-out visitors, all N pages to
 *    logged-in users.
 * 3. Replace the <iframe> below with a flipbook library such as
 *    react-pageflip, fed by the image URLs from that endpoint.
 * 4. Delete the setTimeout-based gate below — the backend response
 *    itself becomes the gate.
 *
 * Alternative: Simplebooklet has a built-in "Lead Gate" feature that
 * can do this natively without any custom backend — worth asking the
 * client if they'd rather enable that inside their Simplebooklet
 * dashboard instead.
 *
 * PROPS
 * - eyebrow, title, description: section copy
 * - brochureUrl: the Simplebooklet (or similar) iframe link
 * - isLoggedIn: pass real auth state here once you have it
 * - signupHref: where the "Sign up" buttons should send the visitor
 * - gateDelayMs: how long a guest can view before the overlay appears
 */
export default function PropertyFlipbookSection({
  eyebrow = "Yupland Research",
  title = "Dubai Real Estate Market Report 2026",
  description = "Structured, research-led analysis of Dubai's off-plan and ready property markets — covering transaction trends, escrow regulation, investment risk frameworks, and where institutional capital is moving next. This report tracks the shift from speculative cycles to a more mature, regulation-backed market, with data sourced from the Dubai Land Department, JLL, and CBRE.",
  description2 = "Full breakdowns, charts, and the structural case for long-term investment are in the report below. Sign up for free to unlock the complete report.",
  brochureUrl = "https://simplebooklet.com/photo10",
  isLoggedIn = false,
  signupHref = "/signup",
  gateDelayMs = 25000,
}) {
  const [gateVisible, setGateVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      setGateVisible(false);
      return;
    }
    timerRef.current = setTimeout(() => setGateVisible(true), gateDelayMs);
    return () => clearTimeout(timerRef.current);
  }, [isLoggedIn, gateDelayMs]);

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-0 pt-12 lg:pt-16 pb-14">
        {/* --- Header, matches CommunitiesBrief heading style --- */}
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

        {/* --- Flipbook frame --- */}
        <div className="relative mt-8">
          <div className="relative h-[420px] sm:h-[600px] lg:h-[760px] w-full overflow-hidden rounded-[20px] bg-[#001A54]">
            <iframe
              src={brochureUrl}
              title={`${title} - ${eyebrow}`}
              loading="lazy"
              allowFullScreen
              className="h-full w-full border-0"
            />

            {!isLoggedIn && gateVisible && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#001A54]/95 px-6 text-center">
                <svg
                  className="h-8 w-8 text-white/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
                <p
                  className="text-[20px] font-semibold text-white"
                  style={{ fontFamily: "Archivo, sans-serif" }}
                >
                  Sign up to keep reading
                </p>
                <p className="max-w-xs text-[16px] leading-relaxed text-white/70">
                  Create a free account to see the full report, including
                  transaction data and investment frameworks.
                </p>
                <a
                  href={signupHref}
                  className="mt-3 w-full sm:w-auto min-w-[220px] h-[50px] flex items-center justify-center rounded-md bg-white text-[#001A54] text-[16px] font-semibold transition-all duration-300 hover:bg-blue-50"
                >
                  Sign up free
                </a>
                <button
                  type="button"
                  onClick={() => setGateVisible(false)}
                  className="mt-1 text-[13px] text-white/60 underline underline-offset-2 hover:text-white"
                >
                  Keep browsing preview
                </button>
              </div>
            )}
          </div>

          {!isLoggedIn && (
            <p className="mt-3 text-center text-[14px] text-[#01155E99]">
              Showing a preview.{" "}
              <a
                href={signupHref}
                className="font-semibold text-[#001A54] underline underline-offset-2"
              >
                Sign up
              </a>{" "}
              to view the full report.
            </p>
          )}
        </div>

        <button
          onClick={() => (window.location.href = signupHref)}
          className="mt-8 bg-[#001A54] text-white w-full sm:w-auto min-w-[280px] lg:w-[431px] h-[50px] rounded-md text-[16px] lg:text-[20px] font-semibold transition-all duration-300 hover:bg-[#01206b]"
        >
          Get Full Report
        </button>
      </div>
    </section>
  );
}