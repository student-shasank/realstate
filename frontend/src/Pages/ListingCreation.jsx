import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { createListing, resetListingState } from "../features/dashboard/listingSlice";
import { useNavigate } from "react-router-dom";

function ListingCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.listing);

  const [formData, setFormData] = useState({
    // --- Property Details ---
    title: "",
    referenceNo: "",
    price: "",
    currency: "AED",
    type: "",
    purpose: "",
    completionStatus: "",
    addedOn: "",

    // --- Specs ---
    bedrooms: "",
    bathrooms: "",
    builtUpArea: "",
    plotArea: "",
    furnishing: "",

    // --- Features ---
    features: "", // comma separated

    // --- Agent ---
    agentName: "",
    agency: "",
    phone: "",
    whatsapp: "",
    isResponsiveBroker: false,

    // --- Validated Info ---
    developer: "",
    ownership: "",
    validatedBuiltUpArea: "",
    validatedPlotArea: "",
    usage: "",

    // --- Project Info ---
    projectName: "",
    projectStatus: "",
    projectCompletion: "",
    handoverDate: "",
    projectDeveloper: "",
    lastInspected: "",

    // --- Location ---
    city: "",
    community: "",
    subCommunity: "",
    latitude: "",
    longitude: "",

    // --- Payment Plan ---
    downPayment: "",
    installmentPlan: [
      { month: "", percent: "" }
    ],

    // --- Images ---
    images: [],
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (success) {
      alert("Listing created successfully!");
      dispatch(resetListingState());
      navigate("/dashboard");
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...mapped]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleInstallmentChange = (index, field, value) => {
    const updated = [...formData.installmentPlan];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, installmentPlan: updated }));
  };

  const addInstallment = () => {
    setFormData((prev) => ({
      ...prev,
      installmentPlan: [...prev.installmentPlan, { month: "", percent: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData.images.forEach((file) => fd.append("images", file));
      } else if (key === "installmentPlan") {
        fd.append("installmentPlan", JSON.stringify(formData.installmentPlan));
      } else {
        fd.append(key, formData[key]);
      }
    }

    dispatch(createListing(fd));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <form
        className="space-y-12 w-full max-w-5xl bg-white p-8 rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* ==== PROPERTY DETAILS ==== */}
        <div className="border-b border-gray-300 pb-10">
          <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            {/* Title */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium">Title</label>
              <input name="title" value={formData.title} onChange={handleChange}
                className="mt-2 block w-full border rounded-md px-3 py-2" />
            </div>

            {/* Reference Number */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium">Reference No</label>
              <input name="referenceNo" value={formData.referenceNo} onChange={handleChange}
                className="mt-2 block w-full border rounded-md px-3 py-2" />
            </div>

            {/* Price */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange}
                className="mt-2 block w-full border rounded-md px-3 py-2" />
            </div>

            {/* Currency */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Currency</label>
              <select name="currency" value={formData.currency} onChange={handleChange}
                className="mt-2 block w-full border rounded-md px-3 py-2">
                <option>AED</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>

            {/* Type */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Type</label>
              <select name="type" value={formData.type} onChange={handleChange}
                className="mt-2 block w-full border rounded-md px-3 py-2">
                <option value="">Select</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>Office</option>
              </select>
            </div>

            {/* Purpose */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Purpose</label>
              <select name="purpose" value={formData.purpose} onChange={handleChange}
                className="mt-2 block w-full border rounded-md px-3 py-2">
                <option value="">Select</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>

            {/* Completion Status */}
           <div className="sm:col-span-3">
  <label className="block text-sm font-medium">Status</label>
  <select
    name="completionStatus"
    value={formData.completionStatus}
    onChange={handleChange}
    className="mt-2 block w-full border rounded-md px-3 py-2 bg-white"
  >
    <option value="">Select Status</option>
    <option value="Pending">Pending</option>
    <option value="Approved">Approved</option>
    <option value="Rejected">Rejected</option>
  </select>
</div>

            {/* Added On */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium">Added On</label>
              <input type="date" name="addedOn" value={formData.addedOn} onChange={handleChange}
                className="mt-2 block w-full border rounded-md px-3 py-2" />
            </div>

          </div>
        </div>

        {/* ==== SPECS ==== */}
        <div className="border-b pb-10">
          <h2 className="text-lg font-semibold">Property Specifications</h2>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 mt-6">
            <input name="bedrooms" placeholder="Bedrooms" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="bathrooms" placeholder="Bathrooms" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="builtUpArea" placeholder="Built Up Area" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="plotArea" placeholder="Plot Area" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="furnishing" placeholder="Furnishing" onChange={handleChange} className="border px-3 py-2 rounded" />
          </div>
        </div>

        {/* ==== FEATURES ==== */}
        <div className="border-b pb-10">
          <h2 className="text-lg font-semibold">Features</h2>
          <input
            name="features"
            placeholder="Comma separated (e.g. Pool, Garden, Gym)"
            value={formData.features}
            onChange={handleChange}
            className="mt-4 block w-full border rounded px-3 py-2"
          />
        </div>

        {/* ==== AGENT INFO ==== */}
        <div className="border-b pb-10">
          <h2 className="text-lg font-semibold">Agent Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 mt-6">
            <input name="agentName" placeholder="Agent Name" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="agency" placeholder="Agency" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="whatsapp" placeholder="Whatsapp" onChange={handleChange} className="border px-3 py-2 rounded" />

            <div className="flex items-center gap-3 mt-3">
              <input type="checkbox" name="isResponsiveBroker" checked={formData.isResponsiveBroker} onChange={handleChange} />
              <label>Responsive Broker</label>
            </div>
          </div>
        </div>

        {/* ==== LOCATION ==== */}
        <div className="border-b pb-10">
          <h2 className="text-lg font-semibold">Location</h2>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 mt-6">
            <input name="city" placeholder="City" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="community" placeholder="Community" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="subCommunity" placeholder="Sub-Community" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="latitude" placeholder="Latitude" onChange={handleChange} className="border px-3 py-2 rounded" />
            <input name="longitude" placeholder="Longitude" onChange={handleChange} className="border px-3 py-2 rounded" />
          </div>
        </div>

        {/* ==== PAYMENT PLAN ==== */}
        <div className="border-b pb-10">
          <h2 className="text-lg font-semibold">Payment Plan</h2>

          <input
            name="downPayment"
            placeholder="Down Payment (%)"
            onChange={handleChange}
            className="border px-3 py-2 rounded mt-4"
          />

          <h3 className="font-medium mt-6">Installments</h3>

          {formData.installmentPlan.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mt-4">
              <input
                placeholder="Month"
                value={item.month}
                onChange={(e) => handleInstallmentChange(index, "month", e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <input
                placeholder="Percent"
                value={item.percent}
                onChange={(e) => handleInstallmentChange(index, "percent", e.target.value)}
                className="border px-3 py-2 rounded"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addInstallment}
            className="mt-4 px-3 py-1 bg-gray-200 rounded"
          >
            + Add Installment
          </button>
        </div>

        {/* ==== IMAGES ==== */}
        <div className="border-b pb-10">
          <h2 className="text-lg font-semibold">Images</h2>

          <div className="mt-3 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 bg-gray-50">
            <div className="text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
              <label className="mt-4 text-sm text-indigo-600 cursor-pointer">
                Upload Images
                <input type="file" multiple className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.preview}
                    className="w-full h-32 object-cover rounded-lg shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded px-2 py-1 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-500"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default ListingCreation;
