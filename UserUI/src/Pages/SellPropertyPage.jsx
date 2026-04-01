import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSellerFormData,
  setCurrentStep,
  createSellerLead,
  updateSellerLead,
  resetSellerLeadForm,
} from "../features/dashboard/sellerLeadSlice.jsx";


function SellPropertyPage() {
  const dispatch = useDispatch();

  const { formData, leadId, loading, submitLoading, currentStep, error } =
    useSelector((state) => state.sellerLead);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const propertyTypeOptions = [
    "Apartment",
    "Villa",
    "Townhouse",
    "Penthouse",
    "Land",
    "Commercial",
  ];

  const bedroomOptions = ["Studio", "1", "2", "3", "4+"];
  const completionOptions = ["Off Plan", "Ready"];
  const ownershipOptions = ["Owner", "Agent", "Other"];
  const sellTimelineOptions = [
    "Immediately",
    "Within 1 month",
    "Within 3 months",
    "Within 6 months",
    "Just exploring",
  ];
  const negotiableOptions = ["Yes", "No", "Depends on the offer"];
  const reasonOptions = [
    "Investment exit",
    "Upgrading to a larger property",
    "Relocating",
    "Portfolio rebalancing",
    "Completion of payment plan",
    "Looking to realise profit",
    "Other",
  ];
  const agentOptions = ["Yes", "No"];

  const progressWidth = useMemo(() => {
    if (submitted) return "100%";
    return currentStep === 1 ? "50%" : "100%";
  }, [currentStep, submitted]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name === "whatsappSame") {
        dispatch(
          setSellerFormData({
            whatsappSame: checked,
            ...(checked && { whatsappNumber: "" }),
          })
        );
      } else {
        dispatch(setSellerFormData({ [name]: checked }));
      }
      return;
    }

    if (type === "file") {
      dispatch(
        setSellerFormData({
          [name]: Array.from(files || []),
        })
      );
      return;
    }

    dispatch(
      setSellerFormData({
        [name]: value,
      })
    );
  };

  const validateStepOne = () => {
    const newErrors = {};

    if (!formData.ownerName?.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    if (!formData.contactNumber?.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    if (!formData.whatsappSame && !formData.whatsappNumber?.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.propertyLocation?.trim()) {
      newErrors.propertyLocation = "Property location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};

    if (
      formData.reasonForSelling === "Other" &&
      !formData.reasonForSellingOther?.trim()
    ) {
      newErrors.reasonForSellingOther = "Please enter the reason";
    }

    if (!formData.consent) {
      newErrors.consent = "You must confirm before submission";
    }

    if ((formData.images || []).length > 10) {
      newErrors.images = "Maximum 10 images allowed";
    }

    if ((formData.videos || []).length > 2) {
      newErrors.videos = "Maximum 2 videos allowed";
    }

    const maxSize = 25 * 1024 * 1024;

    const oversizedImage = (formData.images || []).find(
      (file) => file.size > maxSize
    );
    if (oversizedImage) {
      newErrors.images = "Each image must be under 25MB";
    }

    const oversizedVideo = (formData.videos || []).find(
      (file) => file.size > maxSize
    );
    if (oversizedVideo) {
      newErrors.videos = "Each video must be under 25MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateStepOne()) return;

    const payload = {
      ownerName: formData.ownerName,
      countryCode: formData.countryCode,
      contactNumber: formData.contactNumber,
      whatsappSame: formData.whatsappSame,
      whatsappNumber: formData.whatsappSame
        ? `${formData.countryCode}${formData.contactNumber}`
        : formData.whatsappNumber,
      email: formData.email,
      propertyLocation: formData.propertyLocation,
      leadStatus: "incomplete",
    };

    const resultAction = await dispatch(createSellerLead(payload));

    if (createSellerLead.fulfilled.match(resultAction)) {
      dispatch(setCurrentStep(2));
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    dispatch(setCurrentStep(1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateStepTwo()) return;

  if (!leadId) {
    setErrors((prev) => ({
      ...prev,
      submit: "Lead not found. Please complete Step 1 again.",
    }));
    return;
  }

  const payload = new FormData();

  Object.keys(formData).forEach((key) => {
    if (key !== "images" && key !== "videos") {
      payload.append(key, formData[key]);
    }
  });

  formData.images.forEach((file) => {
    payload.append("images", file);
  });

  formData.videos.forEach((file) => {
    payload.append("videos", file);
  });

  payload.append("leadStatus", "complete");

  // show success immediately
  setSubmitted(true);
  setErrors({});
  window.scrollTo({ top: 0, behavior: "smooth" });

  // upload in background
  dispatch(
    updateSellerLead({
      id: leadId,
      formData: payload,
    })
  );
};

  const renderFileNames = (filesArray) => {
    if (!filesArray?.length) return null;

    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {filesArray.map((file, index) => (
          <span
            key={`${file.name}-${index}`}
            className="rounded-full bg-[#EEF3FF] px-3 py-1 text-[12px] text-[#01155E]"
          >
            {file.name}
          </span>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] px-4 py-10 sm:px-6 lg:px-8 mt-20">
        <div className="mx-auto max-w-3xl rounded-[24px] bg-white p-6 shadow-sm sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E9F9EF]">
            <span className="text-2xl">✓</span>
          </div>

          <h1 className="text-center text-[28px] font-semibold text-[#01155E] sm:text-[36px]">
            Thank you
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-7 text-[#67739E] sm:text-[17px]">
            Our team will review your property details and contact you shortly.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#25D366] px-6 text-[16px] font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Contact us on WhatsApp
            </a>

            <button
              onClick={() => {
                setSubmitted(false);
                dispatch(resetSellerLeadForm());
                setErrors({});
              }}
              className="flex h-[52px] w-full items-center justify-center rounded-xl border border-[#D9E1F2] px-6 text-[16px] font-medium text-[#01155E] transition-all hover:bg-[#F7F9FC] sm:w-auto"
            >
              Submit Another Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold leading-tight text-[#01155E] sm:text-[36px] lg:text-[44px]">
            Sell Your Property
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#67739E] sm:text-[17px]">
            Share your property details with us. Our team will review the
            submission and contact you shortly. Listings will only go live after
            manual approval.
          </p>
        </div>

        <div className="mb-8 rounded-[20px] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-medium text-[#01155E]">
                {currentStep === 1 ? "Step 1 of 2" : "Step 2 of 2"}
              </p>
              <p className="mt-1 text-[13px] text-[#67739E]">
                {currentStep === 1
                  ? "Quick Contact Information"
                  : "Property Details & Submission"}
              </p>
            </div>

            <div className="flex gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  currentStep >= 1
                    ? "bg-[#01155E] text-white"
                    : "bg-[#E8EDF7] text-[#67739E]"
                }`}
              >
                1
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  currentStep >= 2
                    ? "bg-[#01155E] text-white"
                    : "bg-[#E8EDF7] text-[#67739E]"
                }`}
              >
                2
              </div>
            </div>
          </div>

          <div className="h-2 w-full rounded-full bg-[#EEF2F8]">
            <div
              className="h-2 rounded-full bg-[#01155E] transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] bg-white p-5 shadow-sm sm:p-8"
        >
          {error && (
            <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {errors.submit && (
            <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {errors.submit}
            </p>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-[24px] font-semibold text-[#01155E]">
                Quick Contact
              </h2>
              <p className="mt-2 text-[14px] text-[#67739E]">
                Fill the required details below to get started.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner name"
                    className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                  />
                  {errors.ownerName && (
                    <p className="mt-2 text-[13px] text-red-500">
                      {errors.ownerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="h-[52px] w-[110px] rounded-xl border border-[#D9E1F2] px-3 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="+971">+971</option>
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>

                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      inputMode="numeric"
                      placeholder="Enter phone number"
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                    />
                  </div>
                  {errors.contactNumber && (
                    <p className="mt-2 text-[13px] text-red-500">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>

                <div className="flex items-end">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D9E1F2] px-4 py-[14px] text-[14px] text-[#01155E]">
                    <input
                      type="checkbox"
                      name="whatsappSame"
                      checked={formData.whatsappSame}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    This number is also on WhatsApp
                  </label>
                </div>

                {!formData.whatsappSame && (
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      inputMode="numeric"
                      placeholder="Enter WhatsApp number"
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                    />
                    {errors.whatsappNumber && (
                      <p className="mt-2 text-[13px] text-red-500">
                        {errors.whatsappNumber}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                  />
                  {errors.email && (
                    <p className="mt-2 text-[13px] text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                    Property Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyLocation"
                    value={formData.propertyLocation}
                    onChange={handleChange}
                    placeholder="Community, Project name, Area"
                    className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                  />
                  {errors.propertyLocation && (
                    <p className="mt-2 text-[13px] text-red-500">
                      {errors.propertyLocation}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={loading}
                  className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#01155E] px-6 text-[16px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-[180px]"
                >
                  {loading ? "Saving..." : "Continue"}
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-[24px] font-semibold text-[#01155E]">
                    Property Details
                  </h2>
                  <p className="mt-2 text-[14px] text-[#67739E]">
                    Add optional property information to help our team review
                    the submission.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleBack}
                  className="flex h-[44px] items-center justify-center rounded-xl border border-[#D9E1F2] px-5 text-[14px] font-medium text-[#01155E] transition-all hover:bg-[#F7F9FC]"
                >
                  Back
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-[18px] font-semibold text-[#01155E]">
                  Property Information
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="">Select property type</option>
                      {propertyTypeOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Bedrooms
                    </label>
                    <select
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="">Select bedrooms</option>
                      {bedroomOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Completion Status
                    </label>
                    <select
                      name="completionStatus"
                      value={formData.completionStatus}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="">Select completion status</option>
                      {completionOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Community
                    </label>
                    <input
                      type="text"
                      name="community"
                      value={formData.community}
                      onChange={handleChange}
                      placeholder="Enter community"
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Project / Building Name
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      placeholder="Enter project or building name"
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Unit Number
                    </label>
                    <input
                      type="text"
                      name="unitNumber"
                      value={formData.unitNumber}
                      onChange={handleChange}
                      placeholder="Enter unit number"
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Size (sq ft)
                    </label>
                    <input
                      type="number"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder="Enter size"
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Asking Price (AED)
                    </label>
                    <input
                      type="number"
                      name="askingPrice"
                      value={formData.askingPrice}
                      onChange={handleChange}
                      placeholder="Enter asking price"
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Ownership Type
                    </label>
                    <select
                      name="ownershipType"
                      value={formData.ownershipType}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="">Select ownership type</option>
                      {ownershipOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#01155E]">
                  Seller Intent
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      When are you looking to sell?
                    </label>
                    <select
                      name="sellTimeline"
                      value={formData.sellTimeline}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="">Select timeline</option>
                      {sellTimelineOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Is your asking price negotiable?
                    </label>
                    <select
                      name="negotiable"
                      value={formData.negotiable}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="">Select an option</option>
                      {negotiableOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Reason for selling
                    </label>
                    <select
                      name="reasonForSelling"
                      value={formData.reasonForSelling}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="">Select reason</option>
                      {reasonOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Do you currently have an agent representing this property?
                    </label>
                    <select
                      name="hasAgent"
                      value={formData.hasAgent}
                      onChange={handleChange}
                      className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none focus:border-[#01155E]"
                    >
                      <option value="">Select option</option>
                      {agentOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.reasonForSelling === "Other" && (
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                        Other Reason
                      </label>
                      <input
                        type="text"
                        name="reasonForSellingOther"
                        value={formData.reasonForSellingOther}
                        onChange={handleChange}
                        placeholder="Enter your reason"
                        className="h-[52px] w-full rounded-xl border border-[#D9E1F2] px-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                      />
                      {errors.reasonForSellingOther && (
                        <p className="mt-2 text-[13px] text-red-500">
                          {errors.reasonForSellingOther}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#01155E]">
                  Property Media Upload
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Upload Images
                    </label>
                    <label className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#B9C6E2] bg-[#FAFBFE] px-4 text-center">
                      <span className="text-[15px] font-medium text-[#01155E]">
                        Choose up to 10 images
                      </span>
                      <span className="mt-2 text-[13px] text-[#67739E]">
                        JPG, PNG • Max 25MB each
                      </span>
                      <input
                        type="file"
                        name="images"
                        accept=".jpg,.jpeg,.png,.heic"
                        multiple
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                    {errors.images && (
                      <p className="mt-2 text-[13px] text-red-500">
                        {errors.images}
                      </p>
                    )}
                    {renderFileNames(formData.images)}
                  </div>

                  <div>
                    <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                      Upload Videos
                    </label>
                    <label className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#B9C6E2] bg-[#FAFBFE] px-4 text-center">
                      <span className="text-[15px] font-medium text-[#01155E]">
                        Choose up to 2 videos
                      </span>
                      <span className="mt-2 text-[13px] text-[#67739E]">
                        MP4, MOV • Max 25MB each
                      </span>
                      <input
                        type="file"
                        name="videos"
                        accept=".mp4,.mov,video/mp4,video/quicktime"
                        multiple
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                    {errors.videos && (
                      <p className="mt-2 text-[13px] text-red-500">
                        {errors.videos}
                      </p>
                    )}
                    {renderFileNames(formData.videos)}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-[18px] font-semibold text-[#01155E]">
                  Additional Comments
                </h3>

                <div className="mt-5">
                  <label className="mb-2 block text-[14px] font-medium text-[#01155E]">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Any additional information about the property?"
                    className="w-full rounded-2xl border border-[#D9E1F2] px-4 py-4 text-[15px] text-[#01155E] outline-none transition-all focus:border-[#01155E]"
                  />
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-[#D9E1F2] bg-[#FAFBFE] p-4 sm:p-5">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-[14px] leading-6 text-[#01155E]">
                    I confirm that I am the property owner or authorised to
                    submit this property and agree to be contacted regarding
                    this listing.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-2 text-[13px] text-red-500">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex h-[52px] w-full items-center justify-center rounded-xl border border-[#D9E1F2] px-6 text-[16px] font-medium text-[#01155E] transition-all hover:bg-[#F7F9FC] sm:w-[180px]"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#01155E] px-6 text-[16px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-[220px]"
                >
                  {submitLoading ? "Submitting..." : "Submit Property"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SellPropertyPage;