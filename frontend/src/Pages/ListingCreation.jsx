// ListingCreation.jsx
//
// ⚠️ SCHEMA-MATCH NOTE (read this before wiring up the backend):
// This form's submit payload is built to match the OFF-PLAN document shape
// you shared (the "Park Five" example) field-for-field, so that a listing
// created here from the admin panel lands in the same collection/shape as
// an off-plan project — except it is always published as a **Ready**
// listing. Two fields carry that distinction and are FORCED at submit time
// no matter what the UI shows:
//
//   1. project_status -> "Ready"
//      (For off-plan docs this field holds a sales-stage string, e.g.
//       "On Sale" / "Announced" / "EOI" / "Start of Sales" / "Sold Out".
//       For Ready listings it is simply the literal string "Ready" — this
//       is what the detail page badge / mapper reads.)
//
//   2. status -> "Ready"
//      (Your example doc has a ROOT-LEVEL `status: "Off-Plan"` field,
//       separate from project_status. I'm inferring this is the coarse
//       category flag that separates "Off-Plan" vs "Ready" documents in
//       the collection — e.g. for routing/filtering which listings page a
//       doc appears on. I did NOT get explicit confirmation this field is
//       used that way, so please verify against your backend model before
//       relying on it.)
//
// A few fields in the example are backend/DB generated and are
// intentionally NOT sent from the client: _id, id, __v, createdAt,
// updatedAt, format_created_at, format_updated_at, node_id, qr_code,
// qr_code_ext, public_url, off_plan_link, offer_link, all_images (built
// server-side from the uploaded category files — see the Media section).
//
// One more ambiguity worth flagging: the example's ROOT `propertyStatus`
// is `"pending"` (looks like a moderation/workflow flag), while this form
// already sends a *different* `propertyStatus: "active"` for the existing
// detail-page mapper (availability-style flag). I kept the existing
// "active" behavior since the banner promises listings "go live
// automatically" — but if `propertyStatus` at the root is actually a
// moderation gate on your backend, you may want to leave it unset here
// and let the backend set it instead.

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
  // These are locked at submit time — kept here only so the UI badge /
  // preview has a sane default value to show.
  completionStatus: "ready",
  propertyStatus: "active",
  listingStatus: "new launch",
  availability: "available",
  furnishing: "Semi-Furnished",

  bedrooms: "1",
  bathrooms: "2",
  garage: "1",
  rooms: "3",
  builtUpArea: "674",
  totalBuildingArea: "1623",
  plotArea: "0",

  developer: "DAMAC Properties",
  developerId: "",
  developerAddress: "",
  developerEmail: "",
  developerPhone: "",
  developerWebsite: "",
  developerDescription: "",
  ownership: "freehold",

  yearBuilt: "2026",
  handoverDate: "Q3 2029",
  expectedCompletionDate: "2029-09-30",
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
  salesLanguages: "English",
  salesRole: "Sales Manager",
  salesMessage: "",
  salesUseWhatsappApi: false,
  salesWhatsappApiEnabled: false,
  salesCompanyWhatsappUrl: "",

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
  
project_status: "On Sale ",
  projectCompletion: "35%",
  projectDeveloper: "DAMAC Properties",
  lastInspected: "2026-08-11",

  location: "Damac Hills, Dubai",
  subCommunity: "Damac District",
  districtId: "",
  city: "Dubai",
  cityId: "",
  country: "United Arab Emirates",
  countryId: "",
  emirates: "Dubai",
  // 📍 Map coordinates — required for the "Location Map" / "View on Map"
  // section on the detail page. Without these, the map falls back to
  // a default [0,0] location.
  latitude: "25.016215647218267",
  longitude: "55.25445375316675",
  mapImageUrl: "",

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
  onBookingPercent: "5",
  onConstructionPercent: "55",
  onHandoverPercent: "40",
  postHandoverPercent: "",
  timelineQuarter: "Q3 2029",

  rentalYield: "good",
  priceTrend: "increasing",
  pricePerSqFt: "1840",

  // ── Featured placement flags (off-plan schema's `featured` object) ──
  featured: {
    banner: false,
    topListing: false,
    search: true,
    crmHome: false,
    leadShare: false,
    realtorsIn: false,
  },

  // ── SEO / misc off-plan-schema fields ──
  metaTitle: "",
  metaDescription: "",
  featureImageAltText: "",
  websiteLinks: "",
  companyProjectId: "",
  commissionPercentage: "5",
  commissionPercentageMax: "6",
  priceUponRequest: false,
  inventoryOnRequest: false,
  inventoryStatus: true,
  noRealInventory: false,
  totalPropertiesOverride: "",

  unitTypes: [
    { bedrooms: "1", baths: "1", sqFt: "674", highestSqFt: "674", startingPrice: "1222000", highestPrice: "1222000", availableUnits: "5", totalUnits: "10", availability: "available" },
    { bedrooms: "2", baths: "2", sqFt: "1017", highestSqFt: "1017", startingPrice: "1797000", highestPrice: "1797000", availableUnits: "3", totalUnits: "8", availability: "available" }
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

  facilities: [
    { name: "Organic Pool", description: "" },
    { name: "Padel Courts", description: "" },
    { name: "Gym & AI Training Lab", description: "" },
  ],

  nearbyLocations: [
    { name: "", area: "", distance: "" },
  ],

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

// ── Schema-mapping helpers ──────────────────────────────────────
const bedroomLabel = (b) => {
  const s = String(b ?? "").trim();
  if (s === "0" || s.toLowerCase() === "studio") return "Studio";
  return s ? `${s} BR` : "";
};

const toMoney = (n) => {
  const num = Number(n);
  return Number.isNaN(num) ? undefined : num.toFixed(2);
};

const inferMilestoneType = (label = "") => {
  const l = label.toLowerCase();
  if (l.includes("book")) return "on_booking";
  if (l.includes("handover") || l.includes("completion")) return "on_handover";
  return "during_construction";
};

// ── Main Component ────────────────────────────────────────────
function ListingCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.listing);

  const [formData, setFormData] = useState(initialForm);

  // Categorized gallery images — matches off-plan schema's `images` object
  // ({ feature, interior[], exterior[], general[], lobby[] }), which the
  // backend also flattens into the `all_images` array used by the
  // listings grid + detail page.
  const [categorizedImages, setCategorizedImages] = useState({
    feature: null,
    interior: [],
    exterior: [],
    general: [],
    lobby: [],
  });

  const [videoFiles, setVideoFiles] = useState([]);
  const [agentProfileImage, setAgentProfileImage] = useState(null);
  const [communityImage, setCommunityImage] = useState(null);
  const [developerImage, setDeveloperImage] = useState(null);
  const [facilityImages, setFacilityImages] = useState({}); // index -> {file, preview}
  const [unitTypeImages, setUnitTypeImages] = useState({}); // index -> {file, preview}
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

  const handleFeaturedChange = (key) => (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, featured: { ...prev.featured, [key]: checked } }));
  };

  // 🖼️ Categorized gallery images
  const handleCategoryImageUpload = (category) => (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    if (category === "feature") {
      if (mapped[0]) setCategorizedImages((prev) => ({ ...prev, feature: mapped[0] }));
    } else {
      setCategorizedImages((prev) => ({ ...prev, [category]: [...prev[category], ...mapped] }));
    }
  };
  const removeCategoryImage = (category, index) => {
    if (category === "feature") {
      setCategorizedImages((prev) => ({ ...prev, feature: null }));
      return;
    }
    setCategorizedImages((prev) => ({ ...prev, [category]: prev[category].filter((_, i) => i !== index) }));
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

  // 🏢 Developer logo (single file)
  const handleDeveloperImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setDeveloperImage({ file, preview: URL.createObjectURL(file) });
  };
  const removeDeveloperImage = () => setDeveloperImage(null);

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

  // Payment Plan Steps (also drives new_payment_plans.milestones)
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
    setFormData((prev) => ({
      ...prev,
      unitTypes: [
        ...prev.unitTypes,
        { bedrooms: "", baths: "", sqFt: "", highestSqFt: "", startingPrice: "", highestPrice: "", availableUnits: "", totalUnits: "", availability: "available" },
      ],
    }));
  const removeUnitType = (i) => {
    setFormData((prev) => ({ ...prev, unitTypes: prev.unitTypes.filter((_, idx) => idx !== i) }));
    setUnitTypeImages((prev) => {
      const { [i]: _drop, ...rest } = prev;
      return rest;
    });
  };
  const handleUnitTypeImageUpload = (index) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUnitTypeImages((prev) => ({ ...prev, [index]: { file, preview: URL.createObjectURL(file) } }));
  };

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

  // Facilities (off-plan schema's `facilities` + `amenities_and_features`)
  const handleFacilityChange = (index, field, value) => {
    const updated = [...formData.facilities];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, facilities: updated }));
  };
  const addFacility = () =>
    setFormData((prev) => ({ ...prev, facilities: [...prev.facilities, { name: "", description: "" }] }));
  const removeFacility = (i) => {
    setFormData((prev) => ({ ...prev, facilities: prev.facilities.filter((_, idx) => idx !== i) }));
    setFacilityImages((prev) => {
      const { [i]: _drop, ...rest } = prev;
      return rest;
    });
  };
  const handleFacilityImageUpload = (index) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFacilityImages((prev) => ({ ...prev, [index]: { file, preview: URL.createObjectURL(file) } }));
  };

  // Nearby Locations
  const handleNearbyChange = (index, field, value) => {
    const updated = [...formData.nearbyLocations];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, nearbyLocations: updated }));
  };
  const addNearby = () =>
    setFormData((prev) => ({ ...prev, nearbyLocations: [...prev.nearbyLocations, { name: "", area: "", distance: "" }] }));
  const removeNearby = (i) =>
    setFormData((prev) => ({ ...prev, nearbyLocations: prev.nearbyLocations.filter((_, idx) => idx !== i) }));

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
    //
    // `status` at the root is forced the same way — see the schema-match
    // note at the top of this file for why.
    const FORCED_STATUS = {
      status: "Ready",              // root-level Off-Plan vs Ready flag (inferred — verify on backend)
      project_status: "Ready",      // <-- what the detail page badge actually reads
      completionStatus: "ready",
      propertyStatus: "active",
      availability: "available",
    };

    // Derive the off-plan-schema "beds" / "baths" comma lists (e.g. "0,1,2,3")
    // from the unit types the user entered, so search/filter code that
    // expects the off-plan document shape also works for Ready listings.
    const bedsString =
      formData.unitTypes.length > 0
        ? [...new Set(formData.unitTypes.map((u) => u.bedrooms).filter(Boolean))].join(",")
        : formData.bedrooms;

    const bathsString =
      formData.unitTypes.some((u) => u.baths)
        ? [...new Set(formData.unitTypes.map((u) => u.baths).filter(Boolean))].join(",")
        : formData.bathrooms;

    // price_start / price_end / area_start / area_end — mirrors how the
    // off-plan doc derives its top-level range fields from typical_units.
    const startingPrices = formData.unitTypes.map((u) => Number(u.startingPrice)).filter((n) => !Number.isNaN(n));
    const highestPrices = formData.unitTypes.map((u) => Number(u.highestPrice || u.startingPrice)).filter((n) => !Number.isNaN(n));
    const lowAreas = formData.unitTypes.map((u) => Number(u.sqFt)).filter((n) => !Number.isNaN(n));
    const highAreas = formData.unitTypes.map((u) => Number(u.highestSqFt || u.sqFt)).filter((n) => !Number.isNaN(n));

    const price_start = startingPrices.length ? toMoney(Math.min(...startingPrices)) : toMoney(formData.price);
    const price_end = highestPrices.length ? toMoney(Math.max(...highestPrices)) : toMoney(formData.price);
    const area_start = lowAreas.length ? String(Math.min(...lowAreas)) : formData.builtUpArea;
    const area_end = highAreas.length ? String(Math.max(...highAreas)) : formData.totalBuildingArea;

    // parkings / parking_json — combined-bedroom-label key, same shape as
    // the off-plan doc: { "2 BR,1 BR,Studio": "1 parking" }
    const bedroomLabels = [...new Set(formData.unitTypes.map((u) => bedroomLabel(u.bedrooms)).filter(Boolean))];
    const parkingEntry = {
      title: "parkings",
      data: [{ [bedroomLabels.join(",") || bedroomLabel(formData.bedrooms)]: `${formData.totalParkingSpaces} parking` }],
    };

    const combinedProjectLocation = [formData.subCommunity, formData.city].filter(Boolean).join(", ");
    // Root-level `location` string — matches the off-plan doc's flat
    // "Title - City - Country" pattern (distinct from the nested
    // location.address object kept below for the detail-page mapper).
    const flatLocation = [formData.title, formData.city, formData.country].filter(Boolean).join(" - ");

    const mapUrl =
      formData.latitude && formData.longitude
        ? `https://www.google.com/maps?q=${formData.latitude},${formData.longitude}&z=15`
        : undefined;

    const payload = {
      // ── Basic info ────────────────────────────────────────────
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
      status: FORCED_STATUS.status,
      project_status: FORCED_STATUS.project_status,
      project_completed: true,
      completionStatus: FORCED_STATUS.completionStatus,
      propertyStatus: FORCED_STATUS.propertyStatus,
      listingStatus: formData.listingStatus,
      availability: FORCED_STATUS.availability,

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
      developer_id: formData.developerId || undefined,
      developer_address: formData.developerAddress,
      developer_description: formData.developerDescription,
      developer_email: formData.developerEmail,
      developer_phone: formData.developerPhone,
      developer_website: formData.developerWebsite,
      developer_working_time: [],
      // developer_image itself is sent as a file (see fd.append below);
      // backend falls back to this if no file is uploaded.
      ownership: formData.ownership,
      usage: formData.usage,

      yearBuilt: formData.yearBuilt,
      handoverDate: formData.handoverDate,
      expected_completion_date: formData.expectedCompletionDate || formData.handoverDate,
      listingDate: formData.listingDate,
      addedOn: formData.addedOn,
      created_at: formData.listingDate, // off-plan-schema alias

      description: formData.description,
      features: formData.features ? formData.features.split(",").map((f) => f.trim()).filter(Boolean) : [],

      youtubeVideoId: formData.youtubeVideoId,
      youtube_links: formData.youtubeVideoId ? [formData.youtubeVideoId] : [],
      brochureUrl: formData.brochureUrl,
      pdf_url: formData.brochureUrl || null,

      // ── Off-plan-schema flat/root fields ─────────────────────
      adm_number: formData.permitNumber,
      area_start,
      area_end,
      area_size: "sqft",
      baths: bathsString,
      beds: bedsString,
      broker_info_json: null,
      buildings:
        formData.type.toLowerCase() === "apartment" && formData.buildingName
          ? [
              {
                name: formData.buildingName,
                year_of_completion: formData.yearOfCompletion,
                total_floors: formData.totalFloors,
                swimming_pools: formData.swimmingPools,
                elevators: formData.elevators,
                total_parking_spaces: formData.totalParkingSpaces,
              },
            ]
          : [],
      city_data: { id: formData.cityId || undefined, name: formData.city },
      commission_percentage: formData.commissionPercentage,
      commission_percentage_max: formData.commissionPercentageMax,
      company_project_id: formData.companyProjectId || null,
      country_data: { id: formData.countryId || undefined, name: formData.country },
      developers_data: [
        {
          id: formData.developerId || undefined,
          type: "Developer",
          is_custom_developer: !formData.developerId,
          name: formData.developer,
          email: formData.developerEmail,
          website: formData.developerWebsite,
          address: formData.developerAddress,
          working_time: [],
          description: formData.developerDescription,
        },
      ],
      district_data: [{ id: formData.districtId || undefined, name: formData.subCommunity || formData.location }],
      district_name: formData.subCommunity || formData.location,
      feature_image_alt_text: formData.featureImageAltText || null,
      featured: {
        banner: formData.featured.banner,
        top_listing: formData.featured.topListing,
        search: formData.featured.search,
        crm_home: formData.featured.crmHome,
        lead_share: formData.featured.leadShare,
        realtors_in: formData.featured.realtorsIn,
      },
      has_property: true,
      inventory_json: null,
      inventory_on_request: formData.inventoryOnRequest,
      inventory_status: formData.inventoryStatus,
      is_featured: Object.values(formData.featured).some(Boolean),
      latlong: formData.latitude && formData.longitude ? `${formData.latitude},${formData.longitude}` : undefined,
      location: flatLocation,
      map_img: formData.mapImageUrl || null,
      map_url: mapUrl || null,
      meta_description: formData.metaDescription || null,
      meta_title: formData.metaTitle || null,
      nearby_locations: formData.nearbyLocations
        .filter((n) => n.name)
        .map((n) => ({ name: n.name, area: n.area || null, distance: n.distance })),
      no_real_inventory: formData.noRealInventory,
      off_plan_link: null,
      offer_link: null,
      pdf_url_alias: undefined, // (no-op placeholder removed below)
      price_end,
      price_start,
      price_upon_request: formData.priceUponRequest,
      project_city: formData.city,
      project_location: combinedProjectLocation,
      public: true,
      public_url: null,
      qr_code: null,
      qr_code_ext: null,
      resale_units: [],
      total_properties: formData.totalPropertiesOverride || String(formData.unitTypes.length),
      types: formData.type,
      property_types: [formData.type],
      website: formData.websiteLinks ? formData.websiteLinks.split(",").map((w) => w.trim()).filter(Boolean) : [],

      // facilities + amenities_and_features (names index-map to the
      // facilities_image_{i} files appended below)
      amenities_and_features: {
        amenities: [],
        features_names: formData.facilities.map((f) => f.name).filter(Boolean),
      },
      facilities: formData.facilities
        .filter((f) => f.name)
        .map((f) => ({ name: f.name, description: f.description || null })),

      // typical_units / new_payment_plans / parkings / sales_executives /
      // attachments mirror the off-plan doc shape 1:1.
      typical_units: formData.unitTypes.map((ut) => ({
        bedroom: ut.bedrooms,
        lowest_price: toMoney(ut.startingPrice),
        highest_price: toMoney(ut.highestPrice || ut.startingPrice),
        display_currency: formData.currency,
        area_size: "sqft",
        lowest_area: ut.sqFt,
        highest_area: ut.highestSqFt || ut.sqFt,
        property_types: formData.type,
        entry_type: "manual",
        available_units: Number(ut.availableUnits) || 0,
        total_units: Number(ut.totalUnits) || 0,
        // per-unit-type image sent as unitType_image_{i} (see fd.append below)
      })),
      new_payment_plans: [
        {
          title: formData.paymentPlanName,
          predicted_completion_at: formData.expectedCompletionDate ? `${formData.expectedCompletionDate} 00:00:00` : null,
          updated_at: formData.listingDate,
          info: {
            on_booking_percent: formData.onBookingPercent || null,
            on_booking_fix: null,
            on_booking_fix_m2: null,
            on_booking_payments_count: null,
            on_construction_percent: formData.onConstructionPercent || null,
            on_construction_fix: null,
            on_construction_fix_m2: null,
            on_construction_payments_count: null,
            on_handover_percent: formData.onHandoverPercent || null,
            on_handover_fix: null,
            on_handover_fix_m2: null,
            on_handover_payments_count: null,
            post_handover_percent: formData.postHandoverPercent || null,
            post_handover_fix: null,
            post_handover_fix_m2: null,
            on_post_handover_payments_count: null,
            period_after_handover: null,
          },
          fees: [
            { type: "pre_booking_fees", amount: null, percent: null },
            { type: "on_booking_fees", amount: null, percent: null },
            { type: "down_payment_fees", amount: null, percent: null },
            { type: "during_construction_fees", amount: null, percent: null },
            { type: "on_handover_fees", amount: null, percent: null },
            { type: "after_handover_fees", amount: null, percent: null },
          ],
          milestones: formData.paymentPlanSteps.map((s) => ({
            milestone: s.label,
            milestone_title: s.label,
            milestone_type: inferMilestoneType(s.label),
            percentage: `${s.percent}%`,
            date: null,
            items: [],
          })),
          heading_percentages: {
            "On Booking": `${formData.onBookingPercent}%`,
            "On Construction": `${formData.onConstructionPercent}%`,
            "On Handover": `${formData.onHandoverPercent}%`,
          },
          timeline_quarter: formData.timelineQuarter,
          milestone_quarters: [],
          conditions: null,
          custom_conditions: [],
        },
      ],
      parkings: [parkingEntry],
      parking_json: [parkingEntry],
      sales_executives: [
        {
          name: formData.agentName,
          email: formData.agentEmail,
          phone: formData.agentPhone,
          languages: formData.salesLanguages,
          role: formData.salesRole,
          message:
            formData.salesMessage ||
            `Hello, ${formData.agentName}\nI would like to get details of the project.\n\nProject: ${formData.title}\nDeveloper: ${formData.developer}`,
          useWhatsappBusinessApi: formData.salesUseWhatsappApi,
          whatsappApiEnabled: formData.salesWhatsappApiEnabled,
          companyWhatsappUrl: formData.salesCompanyWhatsappUrl || null,
          // image is filled in by the backend from the uploaded "agentProfile" file
        },
      ],
      attachments: formData.brochureUrl
        ? [{ attachment_title: "Brochure", attachment_url: formData.brochureUrl, file_type: "brochure" }]
        : [],

      // ── Structured objects (richer than off-plan schema) ────
      // The existing detail-page mapper prefers these when present, so
      // all the extra detail this form collects (agency, whatsapp,
      // totalFloors, elevators, rentalYield, priceTrend, pricePerSqFt,
      // availability per unit, etc.) still shows up on the detail page.
      agent: {
        name: formData.agentName,
        agency: formData.agency,
        phone: formData.agentPhone,
        whatsapp: formData.agentWhatsapp,
        email: formData.agentEmail,
        isResponsiveBroker: formData.isResponsiveBroker,
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
        status: "Ready",
        completion: formData.projectCompletion,
        developer: formData.projectDeveloper,
        lastInspected: formData.lastInspected,
      },

      location_detail: {
        address: formData.location,
        subCommunity: formData.subCommunity,
        city: formData.city,
        country: formData.country,
        emirates: formData.emirates,
        // 📍 GeoJSON coordinates for the map — [longitude, latitude] order.
        coordinates:
          formData.latitude && formData.longitude
            ? { type: "Point", coordinates: [Number(formData.longitude), Number(formData.latitude)] }
            : undefined,
      },

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

    delete payload.pdf_url_alias;

    fd.append("data", JSON.stringify(payload));

    // ── Categorized gallery images ──
    // ⚠️ IMPORTANT (backend contract): after upload, save these under an
    // `images` object shaped exactly like the off-plan doc:
    //   { feature: url, interior: [...], exterior: [...], general: [...], lobby: [...] }
    // AND flatten all of them into `all_images` (flat array of URL
    // strings, feature first) — that's the field the listings grid card
    // (photo-count badge + carousel) and the detail page mapper read.
    if (categorizedImages.feature?.file) {
      fd.append("images_feature", categorizedImages.feature.file);
    }
    ["interior", "exterior", "general", "lobby"].forEach((cat) => {
      categorizedImages[cat].forEach((img) => fd.append(`images_${cat}`, img.file));
    });

    // Gallery videos
    (formData.videos || []).forEach((file) => {
      fd.append("videos", file);
    });

    // Single agent profile photo
    if (agentProfileImage?.file) fd.append("agentProfile", agentProfileImage.file);

    // Single community image
    if (communityImage?.file) fd.append("communityImage", communityImage.file);

    // Developer logo
    if (developerImage?.file) fd.append("developerImage", developerImage.file);

    // Facility images — indexed so the backend can map facilities_image_{i}
    // back onto payload.facilities[i]
    Object.entries(facilityImages).forEach(([index, img]) => {
      if (img?.file) fd.append(`facilities_image_${index}`, img.file);
    });

    // Unit type images — indexed so the backend can map unitType_image_{i}
    // back onto payload.typical_units[i]
    Object.entries(unitTypeImages).forEach(([index, img]) => {
      if (img?.file) fd.append(`unitType_image_${index}`, img.file);
    });

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
                Every listing created here goes live automatically as an active, available "Ready" listing —
                using the same document shape as your off-plan listings.
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

            <Input label="Price Per Sq Ft (AED)" name="pricePerSqFt" value={formData.pricePerSqFt} onChange={handleChange} type="number" className="sm:col-span-2" />
            <Input label="Commission %" name="commissionPercentage" value={formData.commissionPercentage} onChange={handleChange} type="number" className="sm:col-span-2" />
            <Input label="Commission % (Max)" name="commissionPercentageMax" value={formData.commissionPercentageMax} onChange={handleChange} type="number" className="sm:col-span-2" />

            <div className="sm:col-span-6 flex items-center gap-3">
              <input type="checkbox" name="priceUponRequest" checked={formData.priceUponRequest} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" />
              <label className="text-sm font-medium text-gray-700">Price Upon Request</label>
            </div>
          </div>
        </section>

        {/* ── FEATURED PLACEMENT ── */}
        <section>
          <SectionTitle title="Featured Placement" subtitle={`Maps to the off-plan schema's "featured" object`} />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              ["banner", "Homepage Banner"],
              ["topListing", "Top Listing"],
              ["search", "Featured in Search"],
              ["crmHome", "CRM Home"],
              ["leadShare", "Lead Share"],
              ["realtorsIn", "Realtors.in"],
            ].map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <input type="checkbox" checked={formData.featured[key]} onChange={handleFeaturedChange(key)} className="h-4 w-4 rounded border-gray-300" />
                <label className="text-sm text-gray-700">{label}</label>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            is_featured is derived automatically (true if any box above is checked).
          </p>
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
            <Input label="Handover Date (display)" name="handoverDate" value={formData.handoverDate}      onChange={handleChange} placeholder="Q4 2027" />
            <Input label="Expected Completion Date" name="expectedCompletionDate" value={formData.expectedCompletionDate} onChange={handleChange} type="date" />
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
                placeholder="Describe the property... (HTML tags like <h3>/<p> are supported, matching the off-plan doc's rich description)"
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <Input label="Features (comma separated)" name="features" value={formData.features} onChange={handleChange}
              placeholder="Pool, Garden, Gym, BBQ Area" />
          </div>
        </section>

        {/* ── FACILITIES / AMENITIES ── */}
        <section>
          <SectionTitle title="Facilities / Amenities" subtitle="Maps to facilities[] + amenities_and_features.features_names[]" />
          {formData.facilities.map((f, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4 p-4 border rounded-lg bg-gray-50">
              <Input label="Name" value={f.name} onChange={(e) => handleFacilityChange(i, "name", e.target.value)} placeholder="Padel Courts" />
              <Input label="Description (optional)" value={f.description} onChange={(e) => handleFacilityChange(i, "description", e.target.value)} className="sm:col-span-2" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image (optional)</label>
                {facilityImages[i] ? (
                  <div className="relative w-24">
                    <img src={facilityImages[i].preview} className="w-24 h-16 object-cover rounded" alt="" />
                  </div>
                ) : (
                  <label className="flex items-center justify-center w-24 h-16 border border-dashed border-gray-400 rounded cursor-pointer text-xs text-indigo-600 bg-white">
                    Upload
                    <input type="file" className="hidden" onChange={handleFacilityImageUpload(i)} accept="image/*" />
                  </label>
                )}
                {formData.facilities.length > 1 && (
                  <button type="button" onClick={() => removeFacility(i)} className="mt-2 text-xs text-red-500 hover:underline block">Remove</button>
                )}
              </div>
            </div>
          ))}
          <button type="button" onClick={addFacility} className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
            + Add Facility
          </button>
        </section>

        {/* ── DEVELOPER / OWNERSHIP ── */}
        <section>
          <SectionTitle title="Developer & Ownership" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="Developer Name" name="developer"  value={formData.developer}  onChange={handleChange} />
            <Input label="Developer ID (if existing)" name="developerId" value={formData.developerId} onChange={handleChange} placeholder="Leave blank for a custom developer" />
            <Select label="Ownership"  name="ownership"  value={formData.ownership}  onChange={handleChange}
              options={["freehold","leasehold"]} />
            <Select label="Usage"      name="usage"      value={formData.usage}      onChange={handleChange}
              options={["residential","commercial"]} />
            <Input label="Developer Phone" name="developerPhone" value={formData.developerPhone} onChange={handleChange} />
            <Input label="Developer Email" name="developerEmail" value={formData.developerEmail} onChange={handleChange} type="email" />
            <Input label="Developer Website" name="developerWebsite" value={formData.developerWebsite} onChange={handleChange} className="sm:col-span-2" />
            <Input label="Developer Address" name="developerAddress" value={formData.developerAddress} onChange={handleChange} className="sm:col-span-3" />
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Developer Description</label>
              <textarea name="developerDescription" value={formData.developerDescription} onChange={handleChange} rows={3}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Developer Logo</label>
              {developerImage ? (
                <div className="relative w-28">
                  <img src={developerImage.preview} className="w-28 h-20 object-cover rounded-lg shadow" alt="Developer" />
                  <button type="button" onClick={removeDeveloperImage}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded px-1.5 py-0.5 text-xs">✕</button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-28 h-20 border border-dashed border-gray-400 rounded-lg cursor-pointer text-xs text-indigo-600 bg-gray-50">
                  Upload Logo
                  <input type="file" className="hidden" onChange={handleDeveloperImageUpload} accept="image/*" />
                </label>
              )}
            </div>
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
            <Input label="District ID (optional)" name="districtId" value={formData.districtId} onChange={handleChange} className="sm:col-span-2" />
            <Input label="City"            name="city"         value={formData.city}         onChange={handleChange} placeholder="Dubai" className="sm:col-span-2" />
            <Input label="City ID (optional)" name="cityId"    value={formData.cityId}       onChange={handleChange} className="sm:col-span-2" />
            <Input label="Country"         name="country"      value={formData.country}      onChange={handleChange} placeholder="UAE" className="sm:col-span-2" />
            <Input label="Country ID (optional)" name="countryId" value={formData.countryId} onChange={handleChange} className="sm:col-span-2" />
            <Input label="Emirates"        name="emirates"     value={formData.emirates}     onChange={handleChange} placeholder="Dubai" className="sm:col-span-2" />

            {/* 📍 Map coordinates */}
            <Input label="Latitude"  name="latitude"  value={formData.latitude}  onChange={handleChange} placeholder="25.016215" className="sm:col-span-3" />
            <Input label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="55.254453" className="sm:col-span-3" />
            <Input label="Static Map Image URL (optional)" name="mapImageUrl" value={formData.mapImageUrl} onChange={handleChange} className="sm:col-span-6" />

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

        {/* ── NEARBY LOCATIONS ── */}
        <section>
          <SectionTitle title="Nearby Locations" subtitle="Maps to nearby_locations[]" />
          {formData.nearbyLocations.map((n, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-3">
              <Input placeholder="Name (e.g. City Centre Me'aisem)" value={n.name} onChange={(e) => handleNearbyChange(i, "name", e.target.value)} className="sm:col-span-2" />
              <Input placeholder="Area (optional)" value={n.area} onChange={(e) => handleNearbyChange(i, "area", e.target.value)} />
              <Input placeholder="Distance (e.g. 1.1 KM)" value={n.distance} onChange={(e) => handleNearbyChange(i, "distance", e.target.value)} />
              {formData.nearbyLocations.length > 1 && (
                <button type="button" onClick={() => removeNearby(i)} className="text-xs text-red-500 hover:underline text-left">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addNearby} className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
            + Add Nearby Location
          </button>
        </section>

        {/* ── PROJECT INFO ── */}
        <section>
          <SectionTitle title="Project Information" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="Project Name"       name="projectName"       value={formData.projectName}       onChange={handleChange} />
            <Input label="Project Developer"  name="projectDeveloper"  value={formData.projectDeveloper}  onChange={handleChange} />
            <Input label="Project Completion" name="projectCompletion" value={formData.projectCompletion} onChange={handleChange} placeholder="100%" />
            <Select label="
project_status (internal)" name="
project_status" value={formData.
project_status} onChange={handleChange}
              options={[{ value:"On Sale", label:"On Sale" }, { value:"Announced", label:"Announced" }]} />
            <Input label="Last Inspected" name="lastInspected" value={formData.lastInspected} onChange={handleChange} type="date" />
            <Input label="Total Properties (override, optional)" name="totalPropertiesOverride" value={formData.totalPropertiesOverride} onChange={handleChange} type="number" placeholder="Defaults to number of unit types" />
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
            <SectionTitle title="Building Information" subtitle="Only applicable for Apartments — also feeds the root buildings[] array" />
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
            <SectionTitle title="Unit Types" subtitle="Maps to typical_units[] — drives price_start/price_end and area_start/area_end too" />
            {formData.unitTypes.map((ut, i) => (
              <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4 p-4 border rounded-lg bg-gray-50">
                <Input label="Bedrooms"      value={ut.bedrooms}      onChange={(e) => handleUnitTypeChange(i, "bedrooms", e.target.value)} placeholder="1 (or 0 for Studio)" />
                <Input label="Baths"         value={ut.baths}         onChange={(e) => handleUnitTypeChange(i, "baths", e.target.value)} type="number" />
                <Input label="Sq Ft (lowest)" value={ut.sqFt}         onChange={(e) => handleUnitTypeChange(i, "sqFt", e.target.value)} type="number" />
                <Input label="Sq Ft (highest)" value={ut.highestSqFt} onChange={(e) => handleUnitTypeChange(i, "highestSqFt", e.target.value)} type="number" />
                <Input label="Price (lowest)" value={ut.startingPrice} onChange={(e) => handleUnitTypeChange(i, "startingPrice", e.target.value)} type="number" />
                <Input label="Price (highest)" value={ut.highestPrice} onChange={(e) => handleUnitTypeChange(i, "highestPrice", e.target.value)} type="number" />
                <Input label="Available Units" value={ut.availableUnits} onChange={(e) => handleUnitTypeChange(i, "availableUnits", e.target.value)} type="number" />
                <Input label="Total Units"    value={ut.totalUnits}   onChange={(e) => handleUnitTypeChange(i, "totalUnits", e.target.value)} type="number" />
                <Select label="Availability" value={ut.availability}
                  onChange={(e) => handleUnitTypeChange(i, "availability", e.target.value)}
                  options={[{ value:"available", label:"Available" }, { value:"unavailable", label:"Unavailable" }, { value:"sold out", label:"Sold Out" }]} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Image</label>
                  {unitTypeImages[i] ? (
                    <img src={unitTypeImages[i].preview} className="w-20 h-14 object-cover rounded" alt="" />
                  ) : (
                    <label className="flex items-center justify-center w-20 h-14 border border-dashed border-gray-400 rounded cursor-pointer text-xs text-indigo-600 bg-white">
                      Upload
                      <input type="file" className="hidden" onChange={handleUnitTypeImageUpload(i)} accept="image/*" />
                    </label>
                  )}
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
          <SectionTitle title="Payment Plan" subtitle="Maps to new_payment_plans[0] (info %, milestones, heading_percentages, timeline_quarter)" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            <Input label="Plan Name"    name="paymentPlanName" value={formData.paymentPlanName} onChange={handleChange} placeholder="60/40 Plan" />
            <Input label="Down Payment (AED)" name="downPayment" value={formData.downPayment} onChange={handleChange} type="number" />
            <Input label="Timeline Quarter" name="timelineQuarter" value={formData.timelineQuarter} onChange={handleChange} placeholder="Q4 2027" />
            <Input label="On Booking %" name="onBookingPercent" value={formData.onBookingPercent} onChange={handleChange} type="number" />
            <Input label="On Construction %" name="onConstructionPercent" value={formData.onConstructionPercent} onChange={handleChange} type="number" />
            <Input label="On Handover %" name="onHandoverPercent" value={formData.onHandoverPercent} onChange={handleChange} type="number" />
            <Input label="Post Handover % (optional)" name="postHandoverPercent" value={formData.postHandoverPercent} onChange={handleChange} type="number" />
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

          {/* Payment Steps -> new_payment_plans[0].milestones */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Steps / Milestones (Label-based)</h3>
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
          </div>
        </section>

        {/* ── INVENTORY FLAGS ── */}
        <section>
          <SectionTitle title="Inventory" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="inventoryStatus" checked={formData.inventoryStatus} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" />
              <label className="text-sm text-gray-700">Inventory Available</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="inventoryOnRequest" checked={formData.inventoryOnRequest} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" />
              <label className="text-sm text-gray-700">Inventory On Request</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="noRealInventory" checked={formData.noRealInventory} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" />
              <label className="text-sm text-gray-700">No Real Inventory</label>
            </div>
          </div>
        </section>

        {/* ── AGENT INFO ── */}
        <section>
          <SectionTitle title="Agent Information" subtitle="Maps to sales_executives[0]" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input label="Agent Name"     name="agentName"     value={formData.agentName}     onChange={handleChange} />
            <Input label="Agency"         name="agency"        value={formData.agency}        onChange={handleChange} />
            <Input label="Agent Phone"    name="agentPhone"    value={formData.agentPhone}    onChange={handleChange} />
            <Input label="Agent WhatsApp" name="agentWhatsapp" value={formData.agentWhatsapp} onChange={handleChange} />
            <Input label="Agent Email"    name="agentEmail"    value={formData.agentEmail}    onChange={handleChange} type="email" />
            <Input label="Languages (comma separated)" name="salesLanguages" value={formData.salesLanguages} onChange={handleChange} placeholder="Arabic,English" />
            <Input label="Role" name="salesRole" value={formData.salesRole} onChange={handleChange} placeholder="Sales Manager" />
            <Input label="Company WhatsApp URL (optional)" name="salesCompanyWhatsappUrl" value={formData.salesCompanyWhatsappUrl} onChange={handleChange} />
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Message Template (optional)</label>
              <textarea name="salesMessage" value={formData.salesMessage} onChange={handleChange} rows={3}
                placeholder="Auto-generated if left blank"
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="isResponsiveBroker" checked={formData.isResponsiveBroker} onChange={handleChange} className="h-4 w-4" />
              <label className="text-sm font-medium text-gray-700">Responsive Broker</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="salesUseWhatsappApi" checked={formData.salesUseWhatsappApi} onChange={handleChange} className="h-4 w-4" />
              <label className="text-sm font-medium text-gray-700">Use WhatsApp Business API</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" name="salesWhatsappApiEnabled" checked={formData.salesWhatsappApiEnabled} onChange={handleChange} className="h-4 w-4" />
              <label className="text-sm font-medium text-gray-700">WhatsApp API Enabled</label>
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
          <SectionTitle title="Media" subtitle={`Categorized to match the off-plan schema's "images" object`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <Input label="YouTube Video ID" name="youtubeVideoId" value={formData.youtubeVideoId} onChange={handleChange} placeholder="e.g. dQw4w9WgXcQ" />
            <Input label="Brochure URL (PDF)" name="brochureUrl"  value={formData.brochureUrl}   onChange={handleChange} placeholder="https://..." />
            <Input label="Feature Image Alt Text" name="featureImageAltText" value={formData.featureImageAltText} onChange={handleChange} className="sm:col-span-2" />
          </div>

          {/* Feature (cover) image — single */}
          <label className="block text-sm font-medium text-gray-700 mb-2">Feature / Cover Image</label>
          {categorizedImages.feature ? (
            <div className="relative w-48 mb-6">
              <img src={categorizedImages.feature.preview} className="w-full h-32 object-cover rounded-lg shadow" alt="Feature" />
              <button type="button" onClick={() => removeCategoryImage("feature")}
                className="absolute top-2 right-2 bg-black/60 text-white rounded px-2 py-1 text-xs">Remove</button>
            </div>
          ) : (
            <label className="flex items-center justify-center w-48 h-32 border border-dashed border-gray-400 rounded-lg cursor-pointer text-sm text-indigo-600 bg-gray-50 hover:bg-gray-100 mb-6">
              Upload Feature Image
              <input type="file" className="hidden" onChange={handleCategoryImageUpload("feature")} accept="image/*" />
            </label>
          )}

          {/* Interior / Exterior / General / Lobby */}
          {[
            ["interior", "Interior Images", PhotoIcon],
            ["exterior", "Exterior Images", PhotoIcon],
            ["general", "General Images", PhotoIcon],
            ["lobby", "Lobby Images", PhotoIcon],
          ].map(([cat, label]) => (
            <div key={cat} className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
              <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-8 bg-gray-50">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-10 w-10 text-gray-300" />
                  <label className="mt-3 text-sm text-indigo-600 cursor-pointer font-medium">
                    Upload {label}
                    <input type="file" multiple className="hidden" onChange={handleCategoryImageUpload(cat)} accept="image/*" />
                  </label>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 25MB each</p>
                </div>
              </div>
              {categorizedImages[cat].length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {categorizedImages[cat].map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img.preview} className="w-full h-28 object-cover rounded-lg shadow" alt="" />
                      <button type="button" onClick={() => removeCategoryImage(cat, index)}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded px-2 py-1 text-xs">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Video Upload */}
          <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Videos (optional)</label>
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

        {/* ── SEO ── */}
        <section>
          <SectionTitle title="SEO & Links" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Meta Title" name="metaTitle" value={formData.metaTitle} onChange={handleChange} />
            <Input label="Meta Description" name="metaDescription" value={formData.metaDescription} onChange={handleChange} />
            <Input label="Website Links (comma separated)" name="websiteLinks" value={formData.websiteLinks} onChange={handleChange} className="sm:col-span-2" />
            <Input label="Company Project ID (optional)" name="companyProjectId" value={formData.companyProjectId} onChange={handleChange} />
          </div>
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

