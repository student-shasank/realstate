import React, { useEffect, useState } from "react";
import TopBar from "./Card/Topbar";
import Navbar from "./Navbar";

/**
 * Header wraps TopBar + Navbar together inside ONE fixed container.
 * Fixes the scroll gap: previously Navbar was `fixed` with a changing
 * `top` value (38px -> 0) while TopBar was in normal flow, so their
 * transitions were unsynced and a blank gap appeared during scroll.
 * Now both live inside a single fixed wrapper — TopBar's height
 * collapses on scroll, and Navbar just sits right below it in normal
 * flow, so a gap is never possible.
 */
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* TopBar collapses smoothly instead of just scrolling away */}
      <div
        className={`hidden md:block overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-[40px] opacity-100"
        }`}
      >
        <TopBar />
      </div>

      {/* Navbar no longer manages its own top offset — no gap possible */}
      <Navbar scrolled={scrolled} />
    </div>
  );
}

export default Header;