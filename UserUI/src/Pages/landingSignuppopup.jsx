import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync, resetRegisterState } from "../features/Authentation/RegisterSlice";
import { toast } from "react-toastify";
import dubaiSkyline from "../assets/DubaiSkylinee.jpg"; // Right-panel image — replace with your asset

function landingSignuppopup({ isOpen, onClose, openLogin }) {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.registerAuth
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAsync(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success("Registration successful!");
      dispatch(resetRegisterState());
      setFormData({ firstName: "", lastName: "", email: "", password: "", role: "user" });
      onClose();
    }
  }, [success, dispatch, onClose]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error.message || "Registration failed. Please try again."
      );
      dispatch(resetRegisterState());
    }
  }, [error, dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-[2px] px-4"
      // 🔹 Yahan se onClick={onClose} hata diya — ab backdrop (left/right area) click karne se popup close nahi hoga
    >
      {/* Main Container — two-column card */}
      <div
        className="w-full max-w-[825px] min-h-[560px] rounded-[20px] shadow-2xl relative flex overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---------------- LEFT: Form panel ---------------- */}
        <div className="w-full md:w-[58%] flex flex-col justify-center gap-5 p-8 md:p-10">
          <span className="text-[12px] font-semibold tracking-[0.12em] text-[#01155E] uppercase">
            Welcome to Yupland
          </span>

          <div className="flex flex-col gap-2 -mt-2">
            <h2 className="font-['General_Sans'] font-bold text-[28px] leading-tight text-[#01155E]">
              Create your account
            </h2>
            <p className="text-[14px] text-[#6B7280] leading-snug">
              Join Yupland to save properties, get market insights and stay
              updated.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* First Name + Last Name side by side */}
            <div className="w-full flex gap-3">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 h-[50px] px-4 rounded-[8px] border border-[#E5E7EB] bg-white outline-none text-[#01155E] placeholder-[#9CA3AF] focus:border-[#01155E] transition-colors"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 h-[50px] px-4 rounded-[8px] border border-[#E5E7EB] bg-white outline-none text-[#01155E] placeholder-[#9CA3AF] focus:border-[#01155E] transition-colors"
                required
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[50px] px-4 rounded-[8px] border border-[#E5E7EB] bg-white outline-none text-[#01155E] placeholder-[#9CA3AF] focus:border-[#01155E] transition-colors"
              required
            />

            {/* Password with show/hide toggle */}
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-[50px] px-4 pr-11 rounded-[8px] border border-[#E5E7EB] bg-white outline-none text-[#01155E] placeholder-[#9CA3AF] focus:border-[#01155E] transition-colors"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#01155E] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full h-[50px] rounded-[8px] bg-[#01155E] text-[16px] font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                "..."
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  Sign Up
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E5E7EB]" />
            <span className="text-[12px] text-[#9CA3AF] whitespace-nowrap">
              or continue with
            </span>
            <div className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          {/* Social buttons */}
         

          <p className="text-center text-[13px] text-[#6B7280] -mt-1">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                openLogin?.();
              }}
              className="underline font-semibold text-[#01155E]"
            >
              Login
            </button>
          </p>
        </div>

        {/* ---------------- RIGHT: Image panel ---------------- */}
        <div className="hidden md:flex md:w-[42%] relative flex-col justify-end p-8 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dubaiSkyline})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01155E] via-[#01155E]/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 w-9 h-9 rounded-full bg-white text-[#01155E] flex items-center justify-center text-[18px] hover:opacity-90 transition-opacity"
            aria-label="Close"
          >
            ×
          </button>

          <div className="relative z-10 flex flex-col gap-3">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
                <path d="M9 9h.01M9 13h.01M9 17h.01" />
              </svg>
            </div>
            <h3 className="text-[22px] font-bold leading-tight">
              Your journey to the perfect property starts here.
            </h3>
            <p className="text-[13px] text-white/80 leading-snug">
              Discover premium properties, expert insights and exclusive
              opportunities across Dubai.
            </p>
          </div>
        </div>

        {/* Close button for mobile (no right panel) */}
        <button
          type="button"
          onClick={onClose}
          className="md:hidden absolute right-4 top-4 z-20 w-9 h-9 rounded-full bg-gray-100 text-[#01155E] flex items-center justify-center text-[18px]"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default landingSignuppopup;