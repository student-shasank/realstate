import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/Authentation/login";
import { clearFavorites } from "../features/dashboard/favoriteligting/favoriteSlice";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileOpen(false);
    navigate("/");
 
dispatch(clearFavorites());
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          Abc
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
             <Link className="nav-link" to="/listings">Listing</Link>

          {/* Search */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-1">
            <input
              type="text"
              placeholder="Search products"
              className="bg-transparent outline-none text-sm w-48"
            />
          </div>

          {/* Auth */}
          {!user ? (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold shadow"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-6 py-4 space-y-3">
            <Link className="block nav-link" to="/">Home</Link>
            <Link className="block nav-link" to="/about">About</Link>
            <Link className="block nav-link" to="/contact">Contact</Link>

            {!user ? (
              <Link
                to="/login"
                className="block text-center mt-4 px-6 py-2 rounded-full bg-indigo-600 text-white"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full mt-4 px-6 py-2 rounded-full bg-red-500 text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

/* Tailwind helper class (add to globals.css)
.nav-link {
  @apply text-gray-700 font-medium hover:text-indigo-600 transition;
}
*/
