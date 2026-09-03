import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync, resetRegisterState } from "../features/Authentation/RegisterSlice";
import { toast } from "react-toastify";
import formbackground from "../assets/formbackground.jpg"; // Image import
import { Link } from "react-router-dom";

function SignupPopup({ isOpen, onClose, openLogin }) {
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4"
      onClick={onClose}
    >
      {/* Main Container - Styled as per your reference */}
      <div
        className="w-full max-w-[527px] min-h-[402px] rounded-[16px] p-6 flex flex-col gap-4 shadow-xl relative overflow-hidden backdrop-blur-md bg-blue-900/70 mx-auto"
        style={{ boxShadow: '0px 0px 20px 0px #000183' }}
        onClick={(e) => e.stopPropagation()}
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
          className="absolute right-4 top-4 text-white text-[26px] z-20 hover:opacity-80 transition-transform"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-center font-['General_Sans'] font-semibold text-[24px] text-white">
          Register
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          {/* First Name + Last Name side by side */}
          <div className="w-full flex gap-3">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 h-[50px] px-4 rounded-[8px] bg-white outline-none text-[#01155E]"
              required
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 h-[50px] px-4 rounded-[8px] bg-white outline-none text-[#01155E]"
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[50px] px-4 rounded-[8px] bg-white outline-none text-[#01155E]"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-[50px] px-4 rounded-[8px] bg-white outline-none text-[#01155E]"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-[192px] h-[50px] rounded-[8px] bg-[#01155E] text-[20px] md:text-[24px] font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "..." : "Submit"}
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-center text-white text-[14px]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              openLogin?.();
            }}
            className="underline font-bold"
          >
            Login
          </button>
        </p>

       <p className="text-center text-[11px] md:text-[13px] text-white opacity-80 leading-tight">
  By submitting this form, you acknowledge that you have read and agree to
  the Yupland Terms of Use,{" "}
  <Link to="/privacy" className="underline hover:text-gray-200 transition-colors">
    Privacy Policy
  </Link>
  , and Disclaimer.
</p>
      </div>
    </div>
  );
}

export default SignupPopup;