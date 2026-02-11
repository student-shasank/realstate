import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, Menu, Languages } from "lucide-react";
import { logoutUser } from "../features/Authentation/login";
import { clearFavorites } from "../features/dashboard/favoriteligting/favoriteSlice";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.loginAuth);

  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileOpen(false);
    navigate("/");
    dispatch(clearFavorites());
  };

  const navItems = [
    { name: "Home", path: "/" },  
    { name: "Service", path: "/service" },
    { name: "Blogs", path: "/blogs" },
    { name: "About us", path: "/about" },
    { name: "Contact us", path: "/contact" },
    { name: "Communities", path: "/detailservice" },
  ];

  const textStyle = {
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%",
  };

  const textColor = isHomePage ? "#01155E" : "#FFFFFF";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 h-[72px] md:h-[100px] flex justify-center transition-all duration-300
        ${
          isHomePage
            ? "bg-white/20 backdrop-blur-md border-b border-white/10"
            : "bg-[#01155E]"
        }
      `}
    >
      <div className="w-full px-4 md:px-12 flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tight shrink-0"
          style={{ color: textColor }}
        >
          yupland
        </Link>

        {/* Navigation Links */}
       <div className="hidden md:flex items-center justify-between flex-1 max-w-[700px] mx-auto">

  <Link
    to="/"
    className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
    style={{
      ...textStyle,
      fontWeight: location.pathname === "/" ? 700 : 400,
      color: textColor,
    }}
  >
    Home
  </Link>

<div className="relative group flex items-center h-full">
  {/* 1. Service Link */}
  <Link
    to="/service"
    className="flex items-center gap-1 py-4" // py-4 se hover area bada ho jata hai
    style={{
      ...textStyle,
      fontWeight: location.pathname.includes("service") ? 700 : 400,
      color: textColor,
    }}
  >
    Service
    <span className="text-[10px] transition-transform group-hover:rotate-180">▼</span>
  </Link>

  {/* 2. Dropdown Menu */}
  {/* Yahan 'pt-4' (padding-top) wo invisible bridge hai */}
  <div className="absolute top-[80%] left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
    
    {/* Inner Container: Isme background aur shadow hoga */}
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
      <Link to="/marketingandSales" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 border-b border-gray-50">
        Marketing & Sales
      </Link>
      <Link to="/assetStructuring" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 border-b border-gray-50">
        Asset Structuring
      </Link>
      <Link to="/propertyStructuring" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 border-b border-gray-50">
        Property Structuring
      </Link>
      <Link to="/advisoryCoordination" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 border-b border-gray-50">
        Advisory Coordination
      </Link>
      <Link to="/handoverSnagging" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 border-b border-gray-50">
        Handover & Snagging
      </Link>
      <Link to="/mortgageCoordination" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 border-b border-gray-50">
        Mortgage Coordination
      </Link>
      <Link to="/investorVisaAdvisory" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
        Investor Visa Advisory
      </Link>
    </div>
  </div>
</div>



  <Link
    to="/blogs"
    className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
    style={{
      ...textStyle,
      fontWeight: location.pathname === "/blogs" ? 700 : 400,
      color: textColor,
    }}
  >
    Blogs
  </Link>

  <Link
    to="/about"
    className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
    style={{
      ...textStyle,
      fontWeight: location.pathname === "/about" ? 700 : 400,
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
      fontWeight: location.pathname === "/contact" ? 700 : 400,
      color: textColor,
    }}
  >
    Contact us
  </Link>

  <Link
    to="/communities"
    className={`transition-all ${isHomePage ? "" : "hover:font-bold"}`}
    style={{
      ...textStyle,
      fontWeight: location.pathname === "/detailservice" ? 700 : 400,
      color: textColor,
    }}
  >
    Communities
  </Link>

</div>


        {/* Auth & Language */}
        <div className="flex items-center gap-x-10 shrink-0">
          {!user ? (
            <Link to="/login" className="flex items-center gap-2 group">
              <span
                style={{
                  ...textStyle,
                  color: textColor,
                  fontWeight: 400,
                }}
              >
                Login
              </span>
              <div className="bg-[#01155E] p-1.5 rounded-full">
                <User size={18} className="text-white fill-current" />
              </div>
            </Link>
          ) : (
            <div className="relative">
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
          <div className="hidden md:flex items-center gap-2 cursor-pointer hover:opacity-70 transition-all">
            <Languages size={20} className="text-white" />
            <span
              style={{
                ...textStyle,
                color: textColor,
                fontWeight: 400,
              }}
            >
              Language
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden ml-4"
            style={{ color: textColor }}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
