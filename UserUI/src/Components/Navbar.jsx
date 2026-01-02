import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, Menu } from "lucide-react";
import { logoutUser } from "../features/Authentation/login";
import { clearFavorites } from "../features/dashboard/favoriteligting/favoriteSlice";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.loginAuth);

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileOpen(false);
    navigate("/");
    dispatch(clearFavorites());
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Communities", path: "/communities" },
    { name: "Blogs", path: "/blogs" },
    { name: "About us", path: "/about" },
    { name: "Contact us", path: "/contact" },
  ];

  return (
   <nav className="fixed top-0 w-full z-50 h-[72px] md:h-[100px] flex justify-center bg-white/20 backdrop-blur-md border-b border-white/10">

     <div className="w-full max-w-[1200px] px-4 md:px-6 flex items-center justify-between">

        
        {/* Brand Logo */}
        <Link to="/" className="text-[#01155E] text-2xl font-black tracking-tight">
          yupland
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-x-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-[#01155E] text-[17px] transition-all hover:opacity-70 ${
                  isActive ? "font-black" : "font-semibold"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Login/Auth Section */}
        <div className="flex items-center">
          {!user ? (
            <Link to="/login" className="flex items-center gap-3 group">
              <span className="text-white text-lg font-bold drop-shadow-md">Login</span>
              <div className="bg-[#01155E] p-1.5 rounded-full">
                <User size={18} className="text-white fill-current" />
              </div>
            </Link>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 group">
                <span className="text-white font-bold drop-shadow-md">{user.name}</span>
                <div className="bg-[#01155E] p-1.5 rounded-full">
                  <User size={18} className="text-white fill-current" />
                </div>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 overflow-hidden">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-600 font-bold hover:bg-red-50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button onClick={() => setOpen(!open)} className="md:hidden ml-4 text-[#01155E]">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;