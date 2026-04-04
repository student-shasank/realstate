// ListingCreation.jsx
import React, { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { createListing, resetListingState } from "../features/dashboard/listingSlice";
import { useNavigate } from "react-router-dom";

const initialForm = {
  // Core
  title: "",
  referenceNo: "",
  slug: "",

  // Pricing
  price: "",
  currency: "AED",
  serviceCharges: "",

  // Classification
  type: "",
  purpose: "",
  completionStatus: "",   // "off-plan" | "ready"
  propertyStatus: "pending", // "pending"|"active"|"rejected"|"sold"
  listingStatus: "",      // "resale"|"new launch"|"secondary"
  availability: "available",
  isFeatured: false,
  furnishing: "",

  // Specs
  bedrooms: "",
  bathrooms: "",
  garage: "",
  rooms: "",
  builtUpArea: "",
  totalBuildingArea: "",
  plotArea: "",

  // Developer / Ownership
  developer: "",
  ownership: "",

  // Dates
  yearBuilt: "",
  handoverDate: "",
  listingDate: "",
  addedOn: "",

  // Content
  description: "",
  features: "",

  // Media
  youtubeVideoId: "",
  brochureUrl: "",

  // Agent
  agentName: "",
  agency: "",
  agentPhone: "",
  agentWhatsapp: "",
  agentEmail: "",
  isResponsiveBroker: false,

  // Validated Info
  validatedBuiltUpArea: "",
  validatedPlotArea: "",
  usage: "",

  // Project Info
  projectName: "",
  projectStatus: "",
  projectCompletion: "",
  projectDeveloper: "",
  lastInspected: "",

  // Location
  location: "",
  community: "",
  subCommunity: "",
  city: "",
  country: "",
  emirates: "",

  // Building Info (only Apartment)
  buildingName: "",
  yearOfCompletion: "",
  totalFloors: "",
  swimmingPools: "",
  totalParkingSpaces: "",
  elevators: "",

  // Unit Types (JSON array)
  unitTypes: [{ bedrooms: "", sqFt: "", startingPrice: "", availability: "available" }],

  // Floor Plans (JSON array)
  floorPlans: [{ bedrooms: "", sqFt: "", startingPrice: "", description: "" }],

  // Payment Plan
  paymentPlanName: "",
  downPayment: "",
  installmentPlan: [{ month: "", percent: "" }],
  paymentPlanSteps: [{ label: "", percent: "" }],

  // Investment Insights
  rentalYield: "",
  priceTrend: "",
  pricePerSqFt: "",

  // Internal
  internalListingId: "",
  sourceBrokerageName: "",
  listingAgentName: "",
  listingAgentPhone: "",
  listingAgentEmail: "",
  listingSourceType: "direct",
  listingValidUntil: "",
};

// ── Reusable Input & Select ───────────────────────────────────
const Input = ({ label, name, value, onChange, type = "text", placeholder, className = "" }) => (
  <div className={className}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, className = "" }) => (
  <div className={className}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>
          {o.label ?? o}
        </option>
      ))}
    </select>
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="border-b border-gray-200 pb-3 mb-6">
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

// ── Main Component ────────────────────────────────────────────
function ListingCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.listing);

  const [formData, setFormData] = useState(initialForm);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (success) {
      alert("Listing created successfully!");
      dispatch(resetListingState());
      navigate("/dashboard");
    }
  }, [success]);

  // ── Handlers ─────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...mapped]);
    setFormData((prev) => ({ ...prev, images: [...(prev.images || []), ...files] }));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  // Installment Plan
  const handleInstallmentChange = (index, field, value) => {
    const updated = [...formData.installmentPlan];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, installmentPlan: updated }));
  };
  const addInstallment = () =>
    setFormData((prev) => ({ ...prev, installmentPlan: [...prev.installmentPlan, { month: "", percent: "" }] }));
  const removeInstallment = (i) =>
    setFormData((prev) => ({ ...prev, installmentPlan: prev.installmentPlan.filter((_, idx) => idx !== i) }));

  // Payment Plan Steps
  const handleStepChange = (index, field, value) => {
    const updated = [...formData.paymentPlanSteps];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, paymentPlanSteps: updated }));
  };
  const addStep = () =>
    setFormData((prev) => ({ ...prev, paymentPlanSteps: [...prev.paymentPlanSteps, { label: "", percent: "" }] }));
  const removeStep = (i) =>
    setFormData((prev) => ({ ...prev, paymentPlanSteps: prev.paymentPlanSteps.filter((_, idx) => idx !== i) }));

  // Unit Types
  const handleUnitTypeChange = (index, field, value) => {
    const updated = [...formData.unitTypes];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, unitTypes: updated }));
  };
  const addUnitType = () =>
    setFormData((prev) => ({ ...prev, unitTypes: [...prev.unitTypes, { bedrooms: "", sqFt: "", startingPrice: "", availability: "available" }] }));
  const removeUnitType = (i) =>
    setFormData((prev) => ({ ...prev, unitTypes: prev.unitTypes.filter((_, idx) => idx !== i) }));

  // Floor Plans
  const handleFloorPlanChange = (index, field, value) => {
    const updated = [...formData.floorPlans];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, floorPlans: updated }));
  };
  const addFloorPlan = () =>
    setFormData((prev) => ({ ...prev, floorPlans: [...prev.floorPlans, { bedrooms: "", sqFt: "", startingPrice: "", description: "" }] }));
  const removeFloorPlan = (i) =>
    setFormData((prev) => ({ ...prev, floorPlans: prev.floorPlans.filter((_, idx) => idx !== i) }));

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        (formData.images || []).forEach((file) => fd.append("images", file));
      } else if (["installmentPlan", "paymentPlanSteps", "unitTypes", "floorPlans"].includes(key)) {
        fd.append(key, JSON.stringify(formData[key]));
      } else {
        fd.append(key, formData[key]);
      }
    });

    dispatch(createListing(fd));
  };

  const isApartment = formData.type.toLowerCase() === "apartment";

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-12 w-full max-w-5xl bg-white p-8 rounded-2xl shadow-lg">

        {/* ── PROPERTY DETAILS ── */}
        <section>
          <SectionTitle title="Property Details" />
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">
            <Input label="Title *"       name="title"       value={formData.title}       onChange={handleChange} className="sm:col-span-4" />
            <Input label="Reference No"  name="referenceNo" value={formData.referenceNo} onChange={handleChange} className="sm:col-span-2" />
            <Input label="Price (AED) *" name="price"       value={formData.price}       onChange={handleChange} type="number" className="sm:col-span-3" />
            <Select label="Currency"     name="currency"    value={formData.currency}    onChange={handleChange} options={["AED","USD","EUR"]} className="sm:col-span-3" />

            <Select label="Property Type" name="type" value={formData.type} onChange={handleChange}
              options={["Apartment","Villa","Townhouse","Penthouse","Land","Commercial"]} className="sm:col-span-3" />

            <Select label="Purpose" name="purpose" value={formData.purpose} onChange={handleChange}
              options={[{ value:"buy", label:"Buy" }, { value:"sell", label:"Sell" }]} className="sm:col-span-3" />

            <Select label="Completion Status" name="completionStatus" value={formData.completionStatus} onChange={handleChange}
              options={[{ value:"off-plan", label:"Off Plan" }, { value:"ready", label:"Ready" },{ value:"preconstruction", label:"Preconstruction" }]} className="sm:col-span-2" />

            <Select label="Listing Status" name="listingStatus" value={formData.listingStatus} onChange={handleChange}
              options={[{ value:"resale", label:"Resale" }, { value:"new launch", label:"New Launch" }, { value:"secondary", label:"Secondary" }]} className="sm:col-span-2" />

            <Select label="Property Status" name="propertyStatus" value={formData.propertyStatus} onChange={handleChange}
              options={[{ value:"pending", label:"Pending" }, { value:"active", label:"Active" }, { value:"rejected", label:"Rejected" }, { value:"sold", label:"Sold" }]} className="sm:col-span-2" />

            <Select label="Availability" name="availability" value={formData.availability} onChange={handleChange}
              options={[{ value:"available", label:"Available" }, { value:"unavailable", label:"Unavailable" }]} className="sm:col-span-2" />

            <Select label="Furnishing" name="furnishing" value={formData.furnishing} onChange={handleChange}
              options={["Furnished","Unfurnished","Semi-Furnished"]} className="sm:col-span-2" />

            <Input label="Service Charges (AED/sqft)" name="serviceCharges" value={formData.serviceCharges} onChange={handleChange} type="number" className="sm:col-span-2" />

            <div className="sm:col-span-6 flex items-center gap-3">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" />
              <label className="text-sm font-medium text-gray-700">Mark as Featured</label>
            </div>
          </div>
        </section>

        {/* ── SPECS ── */}
        <section>
          <SectionTitle title="Property Specifications" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <Input label="Bedrooms"           name="bedrooms"          value={formData.bedrooms}          onChange={handleChange} type="number" />
            <Input label="Bathrooms"          name="bathrooms"         value={formData.bathrooms}         onChange={handleChange} type="number" />
            <Input label="Garage"             name="garage"            value={formData.garage}            onChange={handleChange} type="number" />
            <Input label="Rooms"              name="rooms"             value={formData.rooms}             onChange={handleChange} type="number" />
            <Input label="Built Up Area (sqft)" name="builtUpArea"     value={formData.builtUpArea}       onChange={handleChange} type="number" />
            <Input label="Total Building Area"  name="totalBuildingArea" value={formData.totalBuildingArea} onChange={handleChange} type="number" />
            <Input label="Plot Area (sqft)"   name="plotArea"          value={formData.plotArea}          onChange={handleChange} type="number" />
            <Input label="Year Built"         name="yearBuilt"         value={formData.yearBuilt}         onChange={handleChange} type="number" />
            <Input label="Handover Date"      name="handoverDate"      value={formData.handoverDate}      onChange={handleChange} placeholder="Q4 2027" />
            <Input label="Added On"           name="addedOn"           value={formData.addedOn}           onChange={handleChange} type="date" />
          </div>
        </section>

        {/* ── DESCRIPTION + FEATURES ── */}
        <section>
          <SectionTitle title="Description & Features" />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                placeholder="Describe the property..."
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <Input label="Features (comma separated)" name="features" value={formData.features} onChange={handleChange}
              placeholder="Pool, Garden, Gym, BBQ Area" />
          </div>
        </section>

        {/* ── DEVELOPER / OWNERSHIP ── */}
        <section>
          <SectionTitle title="Developer & Ownership" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="Developer"   name="developer"  value={formData.developer}  onChange={handleChange} />
            <Select label="Ownership"  name="ownership"  value={formData.ownership}  onChange={handleChange}
              options={["freehold","leasehold"]} />
            <Select label="Usage"      name="usage"      value={formData.usage}      onChange={handleChange}
              options={["residential","commercial"]} />
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section>
          <SectionTitle title="Location" />
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">
            <Input label="Address / Area"  name="location"     value={formData.location}     onChange={handleChange} placeholder="Palm Jumeirah" className="sm:col-span-6" />
            <Input label="Community"       name="community"    value={formData.community}    onChange={handleChange} placeholder="Downtown" className="sm:col-span-3" />
            <Input label="Sub Community"   name="subCommunity" value={formData.subCommunity} onChange={handleChange} placeholder="West Crescent" className="sm:col-span-3" />
            <Input label="City"            name="city"         value={formData.city}         onChange={handleChange} placeholder="Dubai" className="sm:col-span-2" />
            <Input label="Country"         name="country"      value={formData.country}      onChange={handleChange} placeholder="UAE" className="sm:col-span-2" />
            <Input label="Emirates"        name="emirates"     value={formData.emirates}     onChange={handleChange} placeholder="Dubai" className="sm:col-span-2" />
          </div>
        </section>

        {/* ── PROJECT INFO ── */}
        <section>
          <SectionTitle title="Project Information" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="Project Name"       name="projectName"       value={formData.projectName}       onChange={handleChange} />
            <Input label="Project Developer"  name="projectDeveloper"  value={formData.projectDeveloper}  onChange={handleChange} />
            <Input label="Project Completion" name="projectCompletion" value={formData.projectCompletion} onChange={handleChange} placeholder="100%" />
            <Select label="Project Status" name="projectStatus" value={formData.projectStatus} onChange={handleChange}
              options={[{ value:"active", label:"Active" }, { value:"completed", label:"Completed" }]} />
            <Input label="Last Inspected" name="lastInspected" value={formData.lastInspected} onChange={handleChange} type="date" />
          </div>
        </section>

        {/* ── BUILDING INFO (only Apartment) ── */}
        {isApartment && (
          <section>
            <SectionTitle title="Building Information" subtitle="Only applicable for Apartments" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Input label="Building Name"          name="buildingName"         value={formData.buildingName}         onChange={handleChange} />
              <Input label="Year of Completion"     name="yearOfCompletion"     value={formData.yearOfCompletion}     onChange={handleChange} type="number" />
              <Input label="Total Floors"           name="totalFloors"          value={formData.totalFloors}          onChange={handleChange} type="number" />
              <Input label="Total Parking Spaces"   name="totalParkingSpaces"   value={formData.totalParkingSpaces}   onChange={handleChange} type="number" />
              <Select label="Swimming Pools"  name="swimmingPools" value={formData.swimmingPools} onChange={handleChange}
                options={[{ value:"available", label:"Available" }, { value:"not available", label:"Not Available" }]} />
              <Select label="Elevators" name="elevators" value={formData.elevators} onChange={handleChange}
                options={[{ value:"available", label:"Available" }, { value:"not available", label:"Not Available" }]} />
            </div>
          </section>
        )}

        {/* ── UNIT TYPES (only Apartment) ── */}
        {isApartment && (
          <section>
            <SectionTitle title="Unit Types" subtitle="e.g. 1BR, 2BR, 3BR options" />
            {formData.unitTypes.map((ut, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 p-4 border rounded-lg bg-gray-50">
                <Input label="Bedrooms"      name="bedrooms"      value={ut.bedrooms}      onChange={(e) => handleUnitTypeChange(i, "bedrooms", e.target.value)} placeholder="1 Bedroom" />
                <Input label="Sq Ft"         name="sqFt"          value={ut.sqFt}          onChange={(e) => handleUnitTypeChange(i, "sqFt", e.target.value)} type="number" />
                <Input label="Starting Price" name="startingPrice" value={ut.startingPrice} onChange={(e) => handleUnitTypeChange(i, "startingPrice", e.target.value)} type="number" />
                <div>
                  <Select label="Availability" name="availability" value={ut.availability}
                    onChange={(e) => handleUnitTypeChange(i, "availability", e.target.value)}
                    options={[{ value:"available", label:"Available" }, { value:"unavailable", label:"Unavailable" }, { value:"sold out", label:"Sold Out" }]} />
                  {formData.unitTypes.length > 1 && (
                    <button type="button" onClick={() => removeUnitType(i)}
                      className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" onClick={addUnitType}
              className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
              + Add Unit Type
            </button>
          </section>
        )}

        {/* ── FLOOR PLANS (only Apartment) ── */}
        {isApartment && (
          <section>
            <SectionTitle title="Floor Plans" />
            {formData.floorPlans.map((fp, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 p-4 border rounded-lg bg-gray-50">
                <Input label="Bedrooms"       value={fp.bedrooms}      onChange={(e) => handleFloorPlanChange(i, "bedrooms", e.target.value)} placeholder="1 Bedroom" />
                <Input label="Sq Ft"          value={fp.sqFt}          onChange={(e) => handleFloorPlanChange(i, "sqFt", e.target.value)} type="number" />
                <Input label="Starting Price" value={fp.startingPrice} onChange={(e) => handleFloorPlanChange(i, "startingPrice", e.target.value)} type="number" />
                <div>
                  <Input label="Description" value={fp.description} onChange={(e) => handleFloorPlanChange(i, "description", e.target.value)} placeholder="Optional" />
                  {formData.floorPlans.length > 1 && (
                    <button type="button" onClick={() => removeFloorPlan(i)}
                      className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" onClick={addFloorPlan}
              className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
              + Add Floor Plan
            </button>
          </section>
        )}

        {/* ── PAYMENT PLAN ── */}
        <section>
          <SectionTitle title="Payment Plan" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            <Input label="Plan Name"    name="paymentPlanName" value={formData.paymentPlanName} onChange={handleChange} placeholder="60/40 Plan" />
            <Input label="Down Payment (AED)" name="downPayment" value={formData.downPayment} onChange={handleChange} type="number" />
          </div>

          {/* Installment Plan */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Installments (Month-based)</h3>
          {formData.installmentPlan.map((item, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 mb-3">
              <Input placeholder="Month (e.g. Jan 2025)" value={item.month}   onChange={(e) => handleInstallmentChange(i, "month", e.target.value)} />
              <Input placeholder="Percent (%)"            value={item.percent} onChange={(e) => handleInstallmentChange(i, "percent", e.target.value)} type="number" />
              {formData.installmentPlan.length > 1 && (
                <button type="button" onClick={() => removeInstallment(i)} className="text-sm text-red-500">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addInstallment} className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 mb-6">
            + Add Installment
          </button>

          {/* Payment Steps */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Steps (Label-based)</h3>
          {formData.paymentPlanSteps.map((step, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 mb-3">
              <Input placeholder="Label (e.g. On Booking)" value={step.label}   onChange={(e) => handleStepChange(i, "label", e.target.value)} />
              <Input placeholder="Percent (%)"             value={step.percent} onChange={(e) => handleStepChange(i, "percent", e.target.value)} type="number" />
              {formData.paymentPlanSteps.length > 1 && (
                <button type="button" onClick={() => removeStep(i)} className="text-sm text-red-500">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addStep} className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
            + Add Step
          </button>
        </section>

        {/* ── INVESTMENT INSIGHTS ── */}
        <section>
          <SectionTitle title="Investment Insights" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Select label="Rental Yield" name="rentalYield" value={formData.rentalYield} onChange={handleChange}
              options={[{ value:"good", label:"Good" }, { value:"average", label:"Average" }, { value:"low", label:"Low" }]} />
            <Select label="Price Trend" name="priceTrend" value={formData.priceTrend} onChange={handleChange}
              options={[{ value:"increasing", label:"Increasing" }, { value:"stable", label:"Stable" }, { value:"decreasing", label:"Decreasing" }]} />
            <Input label="Price Per Sq Ft (AED)" name="pricePerSqFt" value={formData.pricePerSqFt} onChange={handleChange} type="number" />
          </div>
        </section>

        {/* ── AGENT INFO ── */}
        <section>
          <SectionTitle title="Agent Information" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="Agent Name"     name="agentName"     value={formData.agentName}     onChange={handleChange} />
            <Input label="Agency"         name="agency"        value={formData.agency}        onChange={handleChange} />
            <Input label="Agent Phone"    name="agentPhone"    value={formData.agentPhone}    onChange={handleChange} />
            <Input label="Agent WhatsApp" name="agentWhatsapp" value={formData.agentWhatsapp} onChange={handleChange} />
            <Input label="Agent Email"    name="agentEmail"    value={formData.agentEmail}    onChange={handleChange} type="email" />
            <div className="flex items-center gap-3 mt-5">
              <input type="checkbox" name="isResponsiveBroker" checked={formData.isResponsiveBroker} onChange={handleChange} className="h-4 w-4" />
              <label className="text-sm font-medium text-gray-700">Responsive Broker</label>
            </div>
          </div>
        </section>

        {/* ── MEDIA ── */}
        <section>
          <SectionTitle title="Media" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <Input label="YouTube Video ID" name="youtubeVideoId" value={formData.youtubeVideoId} onChange={handleChange} placeholder="e.g. dQw4w9WgXcQ" />
            <Input label="Brochure URL (PDF)" name="brochureUrl"  value={formData.brochureUrl}   onChange={handleChange} placeholder="https://..." />
          </div>

          {/* Image Upload */}
          <div className="mt-3 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 bg-gray-50">
            <div className="text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
              <label className="mt-4 text-sm text-indigo-600 cursor-pointer font-medium">
                Upload Images
                <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 25MB each</p>
            </div>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img.preview} className="w-full h-32 object-cover rounded-lg shadow" alt="" />
                  <button type="button" onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded px-2 py-1 text-xs">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── INTERNAL (Admin Only) ── */}
        <section>
          <SectionTitle title="Internal Information" subtitle="Admin only — not shown publicly" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="Internal Listing ID"    name="internalListingId"   value={formData.internalListingId}   onChange={handleChange} />
            <Input label="Source Brokerage Name"  name="sourceBrokerageName" value={formData.sourceBrokerageName} onChange={handleChange} />
            <Input label="Listing Agent Name"     name="listingAgentName"    value={formData.listingAgentName}    onChange={handleChange} />
            <Input label="Listing Agent Phone"    name="listingAgentPhone"   value={formData.listingAgentPhone}   onChange={handleChange} />
            <Input label="Listing Agent Email"    name="listingAgentEmail"   value={formData.listingAgentEmail}   onChange={handleChange} type="email" />
            <Select label="Source Type" name="listingSourceType" value={formData.listingSourceType} onChange={handleChange}
              options={[{ value:"direct", label:"Direct" }, { value:"shared", label:"Shared" }, { value:"api", label:"API" }]} />
            <Input label="Valid Until" name="listingValidUntil" value={formData.listingValidUntil} onChange={handleChange} type="date" />
          </div>
        </section>

        {/* ── SUBMIT ── */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="button" onClick={() => navigate("/dashboard")}
            className="px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-60">
            {loading ? "Saving..." : "Create Listing"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ListingCreation;