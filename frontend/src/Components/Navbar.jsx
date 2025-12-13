import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/Authentation/login";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginAuth); // ⬅️ check login state
    const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileOpen(false);
    navigate("/")
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

        {/* Logo */}
        <Link to="/">
          <h3>Xyz</h3>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">{/* SVG */}</svg>
          </div>

          {/* ----------------------------- */}
          {/* SHOW LOGIN BUTTON OR PROFILE  */}
          {/* ----------------------------- */}

          {!user ? (
            <Link
              to="/login"
              className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              {/* Profile Icon */}
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-semibold"
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border p-2">
                  <p className="text-sm px-2 py-1">{user.name}</p>
                  <p className="text-xs px-2 pb-2 text-gray-500">{user.email}</p>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-2 text-sm hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="sm:hidden">
          <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <Link to="/" className="block">Home</Link>
          <Link to="/about" className="block">About</Link>
          <Link to="/contact" className="block">Contact</Link>

          {!user ? (
            <Link
              to="/login"
              className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="cursor-pointer px-6 py-2 mt-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
