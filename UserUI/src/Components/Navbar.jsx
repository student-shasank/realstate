import React, { useEffect, useState } from "react"; // Added useEffect
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, Menu, X, Languages, ChevronDown } from "lucide-react";

import { logoutUser } from "../features/Authentation/login";
import { clearFavorites } from "../features/dashboard/favoriteligting/favoriteSlice";
import { fetchNavList } from "../features/communities/communitySlice"; // Added this import
import LoginPopup from "../Pages/LoginPopup";
import SignupPopup from "../Pages/SignupPopup";
import Logo2 from "../assets/logo2.png";
import Logo3 from "../assets/logo3.png";

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [open, setOpen] = React.useState(false); // mobile menu open/close
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCommunitiesOpen, setMobileCommunitiesOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.loginAuth);

  // Get navList from Redux store
  const { navList } = useSelector((state) => state.community);

  // Fetch communities on load
  useEffect(() => {
    if (navList.length === 0) {
      dispatch(fetchNavList());
    }
  }, [dispatch, navList.length]);

  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileOpen(false);
    setOpen(false);
    navigate("/");
    dispatch(clearFavorites());
  };

  const textStyle = {
    fontSize: "clamp(13px, 0.95vw + 5px, 16px)",
    lineHeight: "100%",
    letterSpacing: "0%",
  };

  useEffect(() => {
    const handleLoginOpen = () => {
      setIsLoginOpen(true);
    };

    window.addEventListener("openLogin", handleLoginOpen);

    return () => {
      window.removeEventListener("openLogin", handleLoginOpen);
    };
  }, []);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
    setMobileCommunitiesOpen(false);
  }, [location.pathname, location.search]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const textColor = isHomePage ? "#01155e" : "#FFFFFF";

  const serviceLinks = [
    { to: "/marketingandSales", label: "Marketing & Sales" },
    { to: "/assetStructuring", label: "Asset Structuring" },
    { to: "/propertyStructuring", label: "Property Structuring" },
    { to: "/advisoryCoordination", label: "Advisory Coordination" },
    { to: "/handoverSnagging", label: "Handover & Snagging" },
    { to: "/mortgageCoordination", label: "Mortgage Coordination" },
    { to: "/investorVisaAdvisory", label: "Investor Visa Advisory" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 h-[64px] sm:h-[72px] lg:h-[90px] xl:h-[100px] flex justify-center transition-all duration-300
        ${
          isHomePage
            ? "bg-white backdrop-blur-md border-b border-white/10"
            : "bg-[#01155E]"
        }
      `}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 flex items-center justify-between">
          {/* Brand Logo */}

          <Link to="/" className="shrink-0">
            <img
              src={isHomePage ? Logo2 : Logo3}
              alt="Yupland Logo"
              className="h-9 sm:h-10 lg:h-11 xl:h-13 w-auto"
            />
          </Link>
          {/* Navigation Links - full menu only on lg+ (tablets get the drawer) */}
          <div className="hidden lg:flex items-center justify-between flex-1 xl:max-w-[900px] mx-auto gap-3 xl:gap-0">
            <Link
              to="/"
              className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
              style={{
                ...textStyle,
                fontWeight: location.pathname === "/" ? 600 : 500,
                color: textColor,
              }}
            >
              Home
            </Link>
            <Link
              to="/listings?completion=off-plan"
              className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
              style={{
                ...textStyle,
                fontWeight:
                  location.pathname === "/listings" &&
                  new URLSearchParams(location.search).get("completion") ===
                    "off-plan"
                    ? 600
                    : 500,
                color: textColor,
              }}
            >
              Off-plan
            </Link>

            <Link
              to="/listings?completion=ready"
              className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
              style={{
                ...textStyle,
                fontWeight:
                  location.pathname === "/listings" &&
                  new URLSearchParams(location.search).get("completion") ===
                    "ready"
                    ? 700
                    : 500,
                color: textColor,
              }}
            >
              Ready Properties
            </Link>
            <div className="relative group flex items-center h-full">
              <Link
                to="/communities"
                className="flex items-center gap-1 py-4 transition-all"
                style={{
                  ...textStyle,
                  fontWeight: location.pathname.includes("communities")
                    ? 600
                    : 500,
                  color: textColor,
                }}
              >
                Communities
                <span className="text-[10px] transition-transform group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              {/* Dynamic Dropdown Menu based on Redux navList */}
              <div className="absolute top-[80%] left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  {navList && navList.length > 0 ? (
                    navList.map((item) => (
                      <Link
                        key={item._id}
                        to={`/communities/${item.slug}`}
                        className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 border-b border-gray-50 last:border-0"
                      >
                        {item.title}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-400">
                      Loading...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Link
              to="/market-insights"
              className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
              style={{
                ...textStyle,
                fontWeight: location.pathname === "/Blogs" ? 600 : 500,
                color: textColor,
              }}
            >
              Market Insights
            </Link>

            <div className="relative group flex items-center h-full">
              {/* 1. Service Link */}
              <Link
                to="/service"
                className="flex items-center gap-1 py-4"
                style={{
                  ...textStyle,
                  fontWeight: location.pathname.includes("service")
                    ? 600
                    : 500,
                  color: textColor,
                }}
              >
                Services
                <span className="text-[10px] transition-transform group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              {/* 2. Dropdown Menu */}
              <div className="absolute top-[80%] left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  {serviceLinks.map((s, i) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className={`block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 ${
                        i !== serviceLinks.length - 1
                          ? "border-b border-gray-50"
                          : ""
                      }`}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
              style={{
                ...textStyle,
                fontWeight: location.pathname === "/about" ? 600 : 500,
                color: textColor,
              }}
            >
              About us
            </Link>

            <Link
              to="/contact"
              className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
              style={{
                ...textStyle,
                fontWeight: location.pathname === "/contact" ? 600 : 500,
                color: textColor,
              }}
            >
              Contact us
            </Link>
          </div>

          {/* Auth & Language */}
          <div className="flex items-center gap-x-3 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 shrink-0">
            {!user || !user?.name ? (
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="hidden lg:flex items-center gap-2 group"
              >
                <span
                  style={{
                    ...textStyle,
                    color: textColor,
                    fontWeight: 500,
                  }}
                >
                  Login
                </span>
                <div className="bg-[#01155E] p-1.5 rounded-full">
                  <User size={18} className="text-white fill-current" />
                </div>
              </button>
            ) : (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 group"
                >
                  <span
                    style={{
                      ...textStyle,
                      color: textColor,
                      fontWeight: 700,
                    }}
                  >
                    {user.name}
                  </span>
                  <div className="bg-[#01155E] p-1.5 rounded-full">
                    <User size={18} className="text-white fill-current" />
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 overflow-hidden">
                    {/* MY PROFILE */}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      👤 My Profile
                    </button>

                    {/* LOGOUT */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Language */}
            <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-70 transition-all">
              <Languages size={20} className="text-white shrink-0" />
              <span
                className="hidden xl:inline"
                style={{
                  ...textStyle,
                  color: textColor,
                  fontWeight: 500,
                }}
              >
                Language
              </span>
            </div>

            {/* Menu Button - visible on mobile AND tablet (below lg) */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden ml-2 sm:ml-4"
              style={{ color: textColor }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={26} className="sm:w-7 sm:h-7" /> : <Menu size={26} className="sm:w-7 sm:h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ===================== DRAWER (phones + tablets, below lg) ===================== */}

      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sliding panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-[85%] sm:w-[420px] max-w-[420px] bg-[#01155E] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-[64px] sm:h-[72px] px-4 sm:px-5 border-b border-white/10 shrink-0">
          <img src={Logo3} alt="Yupland Logo" className="h-8 sm:h-9 w-auto" />
          <button
            onClick={() => setOpen(false)}
            className="text-white p-1 -mr-1"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>

        {/* Drawer body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col divide-y divide-white/10">
            <Link
              to="/"
              className="py-3.5 text-white text-base"
              style={{
                fontWeight: location.pathname === "/" ? 700 : 500,
              }}
            >
              Home
            </Link>

            <Link
              to="/listings?completion=off-plan"
              className="py-3.5 text-white text-base"
              style={{
                fontWeight:
                  location.pathname === "/listings" &&
                  new URLSearchParams(location.search).get("completion") ===
                    "off-plan"
                    ? 700
                    : 500,
              }}
            >
              Off-plan
            </Link>

            <Link
              to="/listings?completion=ready"
              className="py-3.5 text-white text-base"
              style={{
                fontWeight:
                  location.pathname === "/listings" &&
                  new URLSearchParams(location.search).get("completion") ===
                    "ready"
                    ? 700
                    : 500,
              }}
            >
              Ready Properties
            </Link>

            {/* Communities - collapsible */}
            <div className="py-1">
              <button
                onClick={() => setMobileCommunitiesOpen(!mobileCommunitiesOpen)}
                className="w-full flex items-center justify-between py-2.5 text-white text-base"
                style={{
                  fontWeight: location.pathname.includes("communities")
                    ? 700
                    : 500,
                }}
              >
                Communities
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileCommunitiesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileCommunitiesOpen ? "max-h-96 pb-2" : "max-h-0"
                }`}
              >
                <Link
                  to="/communities"
                  className="block py-2 pl-3 text-sm text-white/80"
                >
                  All Communities
                </Link>
                {navList && navList.length > 0 ? (
                  navList.map((item) => (
                    <Link
                      key={item._id}
                      to={`/communities/${item.slug}`}
                      className="block py-2 pl-3 text-sm text-white/80"
                    >
                      {item.title}
                    </Link>
                  ))
                ) : (
                  <div className="py-2 pl-3 text-sm text-white/50">
                    Loading...
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/market-insights"
              className="py-3.5 text-white text-base"
              style={{
                fontWeight: location.pathname === "/Blogs" ? 700 : 500,
              }}
            >
              Market Insights
            </Link>

            {/* Services - collapsible */}
            <div className="py-1">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-2.5 text-white text-base"
                style={{
                  fontWeight: location.pathname.includes("service") ? 700 : 500,
                }}
              >
                Services
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileServicesOpen ? "max-h-[520px] pb-2" : "max-h-0"
                }`}
              >
                <Link
                  to="/service"
                  className="block py-2 pl-3 text-sm text-white/80"
                >
                  Overview
                </Link>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="block py-2 pl-3 text-sm text-white/80"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/about"
              className="py-3.5 text-white text-base"
              style={{
                fontWeight: location.pathname === "/about" ? 700 : 500,
              }}
            >
              About us
            </Link>

            <Link
              to="/contact"
              className="py-3.5 text-white text-base"
              style={{
                fontWeight: location.pathname === "/contact" ? 700 : 500,
              }}
            >
              Contact us
            </Link>
          </div>

          {/* Language - mobile */}
          <div className="flex items-center gap-2 mt-5 pt-5 border-t border-white/10 text-white/90">
            <Languages size={20} />
            <span className="text-sm font-medium">Language</span>
          </div>
        </div>

        {/* Drawer footer - auth actions */}
        <div className="px-4 sm:px-6 py-5 border-t border-white/10 shrink-0">
          {!user || !user?.name ? (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setIsLoginOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-white text-[#01155E] font-semibold rounded-full py-3 text-sm"
            >
              <User size={18} />
              Login / Sign up
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white font-semibold px-1 pb-2">
                <div className="bg-white/15 p-1.5 rounded-full">
                  <User size={18} className="text-white" />
                </div>
                {user.name}
              </div>
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="w-full text-left rounded-full py-2.5 px-4 text-sm text-white bg-white/10"
              >
                👤 My Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left rounded-full py-2.5 px-4 text-sm text-red-100 bg-red-500/80 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        openSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      <SignupPopup
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        openLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}

export default Navbar;