import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, resetLoginState } from "../features/Authentation/login";
import { toast } from "react-toastify";
import formbackground from "../assets/formbackground.jpg"; // Corrected import

function LoginPopup({ isOpen, onClose, openSignup }) {
  const dispatch = useDispatch();

  const { user, loading, error, success } = useSelector(
    (state) => state.loginAuth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync(formData));
  };

  useEffect(() => {
    if (success && user) {
      toast.success("Login Successful!");
      window.dispatchEvent(new Event("auth-changed"));
      onClose();
      dispatch(resetLoginState());
    }
  }, [success, user, dispatch, onClose]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error.message || "Login failed. Please try again."
      );
      dispatch(resetLoginState());
    }
  }, [error, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4">
      {/* Main Container with Register Form Styling */}
      <div 
        className="w-full max-w-[527px] min-h-[402px] rounded-[16px] p-6 flex flex-col gap-4 shadow-xl relative overflow-hidden backdrop-blur-md bg-blue-900/70 mx-auto lg:mx-0"
        style={{ boxShadow: '0px 0px 20px 0px #000183' }}
      >
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 -z-10 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${formbackground})` }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-[24px] z-10 hover:scale-110 transition-transform"
        >
          ×
        </button>

        {/* Heading with General Sans Font */}
        <h2 className="text-center font-['General_Sans'] font-semibold text-[24px] text-white">
          Login
        </h2>

        {/* Form Layout */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[50px] px-4 rounded-[8px] bg-white outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-[50px] px-4 rounded-[8px] bg-white outline-none"
            required
          />

          {/* Submit Button Styling */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-[192px] h-[50px] rounded-[8px] bg-[#01155E] px-8 text-[20px] md:text-[24px] font-bold text-white transition-all hover:opacity-90 flex items-center justify-center"
          >
            {loading ? "..." : "Submit"}
          </button>
        </form>

        {/* Footer Text / Sign up Toggle */}
        <div className="mt-1 text-center text-white">
            <p className="text-[14px] opacity-90">
                Not a member?{" "}
                <button
                    type="button"
                    onClick={openSignup}
                    className="underline font-bold hover:text-blue-200"
                >
                    Sign up
                </button>
            </p>
            <p className="mt-1 text-center text-[11px] md:text-[14px]  text-white opacity-90">
               By submitting this form, you acknowledge that you have read and agree to the Yupland Terms of Use, Privacy Policy, and Disclaimer, and consent to being contacted by Yupland or relevant licensed brokerages, developers, or service providers regarding your inquiry.
            </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;