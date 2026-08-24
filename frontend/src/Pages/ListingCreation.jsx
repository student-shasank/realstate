// ListingCreation.jsx
import React, { useState, useEffect } from "react";
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { createListing, resetListingState } from "../features/dashboard/listingSlice";
import { useNavigate } from "react-router-dom";
import { fetchCommunities } from "../features/communitySlice";
import { CheckCircle2 } from "lucide-react";

// Every field below is pre-filled with SAMPLE data (based on a real
// Damac District Tower A style listing) purely so it's obvious what
// kind of value each field expects. Clear the field / overwrite it
// with your own data before submitting — this is a guide, not a
// requirement to use these exact values.
const initialForm = {
  title: "Damac District Tower A",
  referenceNo: "REF-2520-DXB",
  price: "1240000",
  currency: "AED",
  serviceCharges: "18",
  community: "",

  type: "Apartment",
  purpose: "sell",
  // These are locked to "Ready" at submit time — kept here only
  // so the UI badge / preview has a sane default value to show.
  completionStatus: "ready",
  propertyStatus: "active",
  listingStatus: "new launch",
  availability: "available",
  isFeatured: true,
  furnishing: "Semi-Furnished",

  bedrooms: "1",
  bathrooms: "2",
  garage: "1",
  rooms: "3",
  builtUpArea: "674",
  totalBuildingArea: "1623",
  plotArea: "0",

  developer: "DAMAC Properties",
  ownership: "freehold",

  yearBuilt: "2026",
  handoverDate: "Q3 2029",
  listingDate: "2026-08-20",
  addedOn: "2026-08-20",

  description:
    "DAMAC District is an exceptional residential project within the iconic DAMAC Hills community, offering 1 and 2 bedroom apartments that blend modern living with refined elegance. Every residence is designed to capture breathtaking views of lush greens, serene waters, and a vibrant world-class community.",
  features: "Organic Pool, Padel Courts, Gym & AI Training Lab, BBQ Stations, Kids Playground, Indoor Golf Simulator",

  youtubeVideoId: "",
  brochureUrl: "https://files.remapp.ae/rem-offplan-v3/project-files/1770900885069-aab1c003e67ab1b1.pdf",

  agentName: "Divyansh Chitkara",
  agency: "Yupland Real Estate",
  agentPhone: "+971505773767",
  agentWhatsapp: "+971505773767",
  agentEmail: "divyansh@yupland.com",
  isResponsiveBroker: true,

  internalListingId: "INT-2520",
  sourceBrokerageName: "DAMAC Properties",
  listingAgentName: "Rushana Daminova",
  listingAgentPhone: "+971551171009",
  listingAgentEmail: "rushana.daminova@damacgroup.com",
  listingSourceType: "direct",
  listingValidUntil: "2027-08-20",

  validatedBuiltUpArea: "674",
  validatedPlotArea: "0",
  usage: "residential",

  projectName: "Damac District Tower A",
  projectStatus: "active",
  projectCompletion: "35%",
  projectDeveloper: "DAMAC Properties",
  lastInspected: "2026-08-11",

  location: "Damac Hills, Dubai",
  subCommunity: "Damac District",
  city: "Dubai",
  country: "United Arab Emirates",
  emirates: "Dubai",
  // 📍 Map coordinates — required for the "Location Map" / "View on Map"
  // section on the detail page. Without these, the map falls back to
  // a default [0,0] location.
  latitude: "25.016215647218267",
  longitude: "55.25445375316675",

  buildingName: "Damac District Tower A",
  yearOfCompletion: "2029",
  totalFloors: "25",
  swimmingPools: "available",
  totalParkingSpaces: "1",
  elevators: "available",

  // 🛡️ Regulatory Information — shown on the detail page's
  // "Regulatory Information" card (Permit Number / Zone / RERA / BRN / QR).
  permitNumber: "DAMAC-2520-DXB",
  zoneName: "Damac Hills",
  rera: "Approved",
  brn: "Approved",
  registeredAgency: "Yupland Real Estate",

  paymentPlanName: "5/55/40 Payment Plan",
  downPayment: "62000",

  rentalYield: "good",
  priceTrend: "increasing",
  pricePerSqFt: "1840",

  unitTypes: [
    { bedrooms: "1", sqFt: "674", startingPrice: "1222000", availability: "available" },
    { bedrooms: "2", sqFt: "1017", startingPrice: "1797000", availability: "available" }
  ],

  floorPlans: [
    { bedrooms: "1 Bedroom", sqFt: "674", startingPrice: "1222000", description: "Open-plan living with balcony and built-in wardrobes" },
    { bedrooms: "2 Bedroom", sqFt: "1017", startingPrice: "1797000", description: "Corner unit with dual balconies and community views" }
  ],

  installmentPlan: [
    { month: "On Booking", percent: "5" },
    { month: "1 month after booking", percent: "10" },
    { month: "On Completion", percent: "40" }
  ],

  paymentPlanSteps: [
    { label: "On Booking", percent: "5" },
    { label: "During Construction", percent: "55" },
    { label: "On Completion", percent: "40" }
  ],

  images: [],
  videos: [],
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
  const [videoFiles, setVideoFiles] = useState([]);
  const [agentProfileImage, setAgentProfileImage] = useState(null);
  const [communityImage, setCommunityImage] = useState(null);
  const { communities } = useSelector((state) => state.community);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert("Listing created successfully! It is now live as a Ready listing.");
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

  // 🎬 Video uploads (actual video files — separate from youtubeVideoId)
  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setVideoFiles((prev) => [...prev, ...mapped]);
    setFormData((prev) => ({ ...prev, videos: [...(prev.videos || []), ...files] }));
  };

  const removeVideo = (index) => {
    setVideoFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({ ...prev, videos: prev.videos.filter((_, i) => i !== index) }));
  };

  // 👤 Agent profile photo (single file)
  const handleAgentProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAgentProfileImage({ file, preview: URL.createObjectURL(file) });
  };
  const removeAgentProfileImage = () => setAgentProfileImage(null);

  // 🏘️ Community image (single file)
  const handleCommunityImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCommunityImage({ file, preview: URL.createObjectURL(file) });
  };
  const removeCommunityImage = () => setCommunityImage(null);

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

    // 🔒 IMPORTANT: Every listing created from this page is forced to
    // "Ready" status, regardless of any UI value, so it always shows
    // up as a Ready listing on the storefront / detail page.
    //
    // ⚠️ THE ACTUAL BADGE ON THE DETAIL PAGE IS DRIVEN BY `project_status`,
    // NOT `completionStatus` — mapPropertyDetailData.js reads:
    //     const completionStatus = apiData.project_status || "Off-Plan";
    // so `project_status` MUST be sent, or every listing silently renders
    // as "Off-Plan" no matter what completionStatus/propertyStatus say.
    const FORCED_STATUS = {
      project_status: "Ready",      // <-- what the detail page actually reads
      completionStatus: "ready",
      propertyStatus: "active",
      availability: "available",
    };

    // Derive the off-plan-schema "beds" comma list (e.g. "1,2") from the
    // unit types the user entered, so search/filter code that expects the
    // off-plan `beds` string format also works for Ready listings.
    const bedsString =
      formData.unitTypes && formData.unitTypes.length > 0
        ? [...new Set(formData.unitTypes.map((u) => u.bedrooms).filter(Boolean))].join(",")
        : formData.bedrooms;

    const combinedProjectLocation = [formData.subCommunity, formData.city]
      .filter(Boolean)
      .join(", ");

    const payload = {
      // ── Basic info (kept as-is) ──────────────────────────────
      title: formData.title,
      referenceNo: formData.referenceNo,
      slug: formData.referenceNo
        ? formData.referenceNo.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : undefined,
      price: formData.price,
      currency: formData.currency,
      serviceCharges: formData.serviceCharges,
      community: formData.community,

      type: formData.type,
      purpose: formData.purpose, // buy/sell — NOT the same as detail page's usage-based "purpose"

      // forced values win over whatever was in formData
      project_status: FORCED_STATUS.project_status,
      completionStatus: FORCED_STATUS.completionStatus,
      propertyStatus: FORCED_STATUS.propertyStatus,
      listingStatus: formData.listingStatus,
      availability: FORCED_STATUS.availability,

      isFeatured: formData.isFeatured,
      furnishing: formData.furnishing,

      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      garage: formData.garage,
      rooms: formData.rooms,
      builtUpArea: formData.builtUpArea,
      totalBuildingArea: formData.totalBuildingArea,
      plotArea: formData.plotArea,

      developer: formData.developer,
      developer_name: formData.developer, // off-plan-schema alias
      ownership: formData.ownership,
      usage: formData.usage,

      yearBuilt: formData.yearBuilt,
      handoverDate: formData.handoverDate,
      expected_completion_date: formData.handoverDate, // off-plan-schema alias
      listingDate: formData.listingDate,
      addedOn: formData.addedOn,
      created_at: formData.listingDate, // off-plan-schema alias

      description: formData.description,
      features: formData.features ? formData.features.split(",").map((f) => f.trim()).filter(Boolean) : [],

      youtubeVideoId: formData.youtubeVideoId,
      brochureUrl: formData.brochureUrl,

      // ── Off-plan-schema flat fields ──────────────────────────
      // These exist so search/filter/listing-grid code that queries the
      // off-plan document shape (beds, price_start, area_start, city_name,
      // district_name, latlong, adm_number ...) also finds Ready listings,
      // and so the mapper's fallback branches have real data even if the
      // structured objects below were ever stripped by the backend.
      beds: bedsString,
      baths: formData.bathrooms,
      price_start: formData.price,
      price_end: formData.price,
      area_start: formData.builtUpArea,
      area_end: formData.totalBuildingArea,
      is_featured: formData.isFeatured,
      adm_number: formData.permitNumber,
      latlong: formData.latitude && formData.longitude ? `${formData.latitude},${formData.longitude}` : undefined,
      project_location: combinedProjectLocation,
      district_name: formData.subCommunity || formData.location,
      district_data: [{ name: formData.subCommunity || formData.location }],
      city_name: formData.city,
      city_data: { name: formData.city },
      country_data: { name: formData.country },
      total_properties: formData.unitTypes.length,
      types: formData.type,
      property_types: [formData.type],

      // typical_units / new_payment_plans / parkings / sales_executives / attachments
      // mirror the off-plan doc shape 1:1 so the mapper's derive-from-raw
      // fallback path works even without the structured objects below.
      typical_units: formData.unitTypes.map((ut) => ({
        bedroom: ut.bedrooms,
        lowest_area: ut.sqFt,
        highest_area: ut.sqFt,
        lowest_price: ut.startingPrice,
      })),
      new_payment_plans: [
        {
          title: formData.paymentPlanName,
          milestones: formData.paymentPlanSteps.map((s) => ({
            milestone_title: s.label,
            percentage: `${s.percent}%`,
          })),
        },
      ],
      parkings: [
        {
          title: "parkings",
          data: [{ [`${formData.bedrooms} BR`]: `${formData.totalParkingSpaces} parking` }],
        },
      ],
      sales_executives: [
        {
          name: formData.agentName,
          email: formData.agentEmail,
          phone: formData.agentPhone,
          // image is filled in by the backend from the uploaded "agentProfile" file
        },
      ],
      attachments: formData.brochureUrl
        ? [{ attachment_title: "Brochure", attachment_url: formData.brochureUrl, file_type: "other" }]
        : [],

      // ── Structured objects (richer than off-plan schema) ────
      // The mapper prefers these when present, so all the extra detail
      // this form collects (agency, whatsapp, totalFloors, elevators,
      // rentalYield, priceTrend, pricePerSqFt, availability per unit, etc.)
      // actually shows up on the detail page instead of being dropped.
      agent: {
        name: formData.agentName,
        agency: formData.agency,
        phone: formData.agentPhone,
        whatsapp: formData.agentWhatsapp,
        email: formData.agentEmail,
        isResponsiveBroker: formData.isResponsiveBroker,
        // profileImage itself is sent as a file (see fd.append below);
        // backend falls back to this if no file is uploaded.
      },

      internal: {
        internalListingId: formData.internalListingId,
        sourceBrokerageName: formData.sourceBrokerageName,
        listingAgentName: formData.listingAgentName,
        listingAgentPhone: formData.listingAgentPhone,
        listingAgentEmail: formData.listingAgentEmail,
        listingSourceType: formData.listingSourceType,
        listingValidUntil: formData.listingValidUntil,
      },

      validatedInfo: {
        ownership: formData.ownership,
        builtUpArea: formData.validatedBuiltUpArea,
        plotArea: formData.validatedPlotArea,
        usage: formData.usage,
        developer: formData.developer,
      },

      projectInfo: {
        name: formData.projectName,
        status: formData.projectStatus,
        completion: formData.projectCompletion,
        developer: formData.projectDeveloper,
        lastInspected: formData.lastInspected,
      },

      location: {
        address: formData.location,
        subCommunity: formData.subCommunity,
        city: formData.city,
        country: formData.country,
        emirates: formData.emirates,
        // 📍 GeoJSON coordinates for the map — [longitude, latitude] order.
        // Without this, the detail page's map defaults to [0,0].
        coordinates:
          formData.latitude && formData.longitude
            ? {
                type: "Point",
                coordinates: [Number(formData.longitude), Number(formData.latitude)],
              }
            : undefined,
        // communityImage itself is sent as a file (see fd.append below);
        // backend falls back to this if no file is uploaded.
      },

      // 🛡️ Regulatory Information — shown in the detail page's
      // "Regulatory Information" card (Permit Number / Zone / RERA / BRN / QR code).
      regulatoryInfo: {
        permitNumber: formData.permitNumber,
        zoneName: formData.zoneName,
        rera: formData.rera,
        brn: formData.brn,
        registeredAgency: formData.registeredAgency,
      },

      buildingInfo: {
        buildingName: formData.buildingName,
        yearOfCompletion: formData.yearOfCompletion,
        totalFloors: formData.totalFloors,
        swimmingPools: formData.swimmingPools,
        totalParkingSpaces: formData.totalParkingSpaces,
        totalBuildingArea: formData.totalBuildingArea,
        elevators: formData.elevators,
      },

      unitTypes: formData.unitTypes,
      floorPlans: formData.floorPlans,

      paymentPlan: {
        planName: formData.paymentPlanName,
        downPayment: formData.downPayment,
        installmentPlan: formData.installmentPlan,
        steps: formData.paymentPlanSteps,
      },

      investmentInsights: {
        rentalYield: formData.rentalYield,
        priceTrend: formData.priceTrend,
        pricePerSqFt: formData.pricePerSqFt,
      },
    };

    fd.append("data", JSON.stringify(payload));

    // Gallery images
    // ⚠️ IMPORTANT (backend contract): after these files are uploaded, the
    // resulting URLs must be saved on the listing under `all_images`
    // (flat array of URL strings) — the SAME field name off-plan projects
    // use. Both the listings grid card (photo-count badge + carousel) and
    // the detail page mapper read `all_images` directly. If the backend
    // instead saves them only under something like `images`/`gallery`,
    // Ready listings will publish with no visible photos even though the
    // upload itself succeeded.
    (formData.images || []).forEach((file) => {
      fd.append("images", file);
    });

    // Gallery videos
    (formData.videos || []).forEach((file) => {
      fd.append("videos", file);
    });

    // Single agent profile photo
    if (agentProfileImage?.file) {
      fd.append("agentProfile", agentProfileImage.file);
    }

    // Single community image
    if (communityImage?.file) {
      fd.append("communityImage", communityImage.file);
    }

    dispatch(createListing(fd));
  };

  const isApartment = formData.type.toLowerCase() === "apartment";

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-12 w-full max-w-5xl bg-white p-8 rounded-2xl shadow-lg">

        {/* ── HEADER / STATUS BANNER ── */}
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" size={22} />
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                This listing will be published with status: Ready
              </p>
              <p className="text-xs text-emerald-700/80 mt-0.5">
                Every listing created here goes live automatically as an active, available "Ready" listing.
              </p>
            </div>
          </div>
          <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
            Ready
          </span>
        </div>

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

            <Select label="Listing Status" name="listingStatus" value={formData.listingStatus} onChange={handleChange}
              options={[{ value:"resale", label:"Resale" }, { value:"new launch", label:"New Launch" }, { value:"secondary", label:"Secondary" }]} className="sm:col-span-2" />

            <Select label="Furnishing" name="furnishing" value={formData.furnishing} onChange={handleChange}
              options={["Furnished","Unfurnished","Semi-Furnished"]} className="sm:col-span-2" />

            <Input label="Service Charges (AED/sqft)" name="serviceCharges" value={formData.serviceCharges} onChange={handleChange} type="number" className="sm:col-span-2" />

            <div className="sm:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" />
                <label className="text-sm font-medium text-gray-700">Mark as Featured</label>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Completion status, property status &amp; availability are auto-set to "Ready" / "Active" / "Available" on publish.
              </div>
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
          <SectionTitle title="Location" subtitle="Coordinates are used for the Location Map / View on Map feature" />
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">
            <Input label="Address / Area"  name="location"     value={formData.location}     onChange={handleChange} placeholder="Palm Jumeirah" className="sm:col-span-6" />

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Community</label>
              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Community</option>
                {communities?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.slug}
                  </option>
                ))}
              </select>
            </div>

            <Input label="Sub Community"   name="subCommunity" value={formData.subCommunity} onChange={handleChange} placeholder="West Crescent" className="sm:col-span-3" />
            <Input label="City"            name="city"         value={formData.city}         onChange={handleChange} placeholder="Dubai" className="sm:col-span-2" />
            <Input label="Country"         name="country"      value={formData.country}      onChange={handleChange} placeholder="UAE" className="sm:col-span-2" />
            <Input label="Emirates"        name="emirates"     value={formData.emirates}     onChange={handleChange} placeholder="Dubai" className="sm:col-span-2" />

            {/* 📍 Map coordinates */}
            <Input label="Latitude"  name="latitude"  value={formData.latitude}  onChange={handleChange} placeholder="25.016215" className="sm:col-span-3" />
            <Input label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="55.254453" className="sm:col-span-3" />

            {/* 🏘️ Community image */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Community Image</label>
              {communityImage ? (
                <div className="relative w-48">
                  <img src={communityImage.preview} className="w-full h-32 object-cover rounded-lg shadow" alt="Community" />
                  <button type="button" onClick={removeCommunityImage}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded px-2 py-1 text-xs">
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-48 h-32 border border-dashed border-gray-400 rounded-lg cursor-pointer text-sm text-indigo-600 bg-gray-50 hover:bg-gray-100">
                  Upload Community Image
                  <input type="file" className="hidden" onChange={handleCommunityImageUpload} accept="image/*" />
                </label>
              )}
            </div>
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

        {/* ── REGULATORY INFORMATION ── */}
        <section>
          <SectionTitle title="Regulatory Information" subtitle="Shown on the detail page as Permit / Zone / RERA / BRN card + QR code" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="Permit Number"      name="permitNumber"      value={formData.permitNumber}      onChange={handleChange} placeholder="DAMAC-2520-DXB" />
            <Input label="Zone Name"          name="zoneName"          value={formData.zoneName}          onChange={handleChange} placeholder="Damac Hills" />
            <Select label="RERA"              name="rera"              value={formData.rera}              onChange={handleChange}
              options={[{ value:"Approved", label:"Approved" }, { value:"Pending", label:"Pending" }]} />
            <Select label="BRN"               name="brn"               value={formData.brn}               onChange={handleChange}
              options={[{ value:"Approved", label:"Approved" }, { value:"Pending", label:"Pending" }]} />
            <Input label="Registered Agency"  name="registeredAgency"  value={formData.registeredAgency}  onChange={handleChange} placeholder="Yupland Real Estate" className="sm:col-span-1" />
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

            {/* 👤 Agent profile photo */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Agent Profile Photo</label>
              {agentProfileImage ? (
                <div className="relative w-28">
                  <img src={agentProfileImage.preview} className="w-28 h-28 object-cover rounded-full shadow" alt="Agent" />
                  <button type="button" onClick={removeAgentProfileImage}
                    className="absolute -top-1 -right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-28 h-28 border border-dashed border-gray-400 rounded-full cursor-pointer text-xs text-indigo-600 bg-gray-50 hover:bg-gray-100 text-center px-2">
                  Upload Photo
                  <input type="file" className="hidden" onChange={handleAgentProfileUpload} accept="image/*" />
                </label>
              )}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
          <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 bg-gray-50">
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

          {/* Video Upload */}
          <label className="block text-sm font-medium text-gray-700 mb-2 mt-8">Gallery Videos (optional)</label>
          <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 bg-gray-50">
            <div className="text-center">
              <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-300" />
              <label className="mt-4 text-sm text-indigo-600 cursor-pointer font-medium">
                Upload Videos
                <input type="file" multiple className="hidden" onChange={handleVideoUpload} accept="video/*" />
              </label>
              <p className="text-xs text-gray-400 mt-1">MP4, MOV up to 100MB each</p>
            </div>
          </div>

          {videoFiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {videoFiles.map((vid, index) => (
                <div key={index} className="relative">
                  <video src={vid.preview} className="w-full h-32 object-cover rounded-lg shadow" controls />
                  <button type="button" onClick={() => removeVideo(index)}
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
            {loading ? "Saving..." : "Create Listing (Ready)"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ListingCreation;