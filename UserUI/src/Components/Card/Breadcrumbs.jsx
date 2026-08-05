import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

// Normalize a completion value the same way Listings.jsx does, so
// "off-plan", "Off Plan", "OFF_PLAN", "offplan" (and similarly
// "ready" / "Ready" / "READY") are all treated the same, no matter
// exactly how it's spelled in the URL.
const normalizeCompletion = (value) =>
  (value || "").toString().toLowerCase().replace(/[-_\s]+/g, "");

// completionLabel: pass the property's own completion status when rendering
// the breadcrumb on the /listing/:id detail page, e.g. "Ready" or "Off-Plan".
// customLabel: pass the property's title for the last crumb (instead of the raw Mongo ID).
const Breadcrumbs = ({ customLabel, completionLabel }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const pathnames = location.pathname.split("/").filter((x) => x);

  // Dynamic label for the "listings" segment — reflects whichever
  // completion status (Ready / Off-Plan) is currently driving the
  // results, instead of always showing "All Properties".
  const normalizedQueryCompletion = normalizeCompletion(searchParams.get("completion"));
  const normalizedPropCompletion = normalizeCompletion(completionLabel);

  // On /listings, completion comes from the URL query param.
  // On /listing/:id, completion comes from the property's own data (prop).
  const effectiveCompletion = normalizedPropCompletion || normalizedQueryCompletion;

  const isReadyCompletion = effectiveCompletion === "ready";
  const isOffPlanCompletion = effectiveCompletion === "offplan";

  const getListingsLabel = () => {
    if (isReadyCompletion) return "Ready Properties";
    if (isOffPlanCompletion) return "Off-Plan Properties";
    return "All Properties";
  };

  // Map technical URL segments to user-friendly display names
  const routeLabels = {
    listings: getListingsLabel(),
    // "listing" (singular, detail page) also shows the completion-based
    // label so the trail reads: Home > Ready/Off-Plan Properties > Title
    listing: getListingsLabel(),
    contact: "Compare Properties",
    about: "About Yupland",
    "terms-of-use": "Terms of Use",
    "data-sources": "Data Sources",
    disclamer: "Disclaimer", // Matches the filename provided in context
    privacy: "Privacy Policy",
  };

  const formatLabel = (value) => {
    // 1. Check if we have a hardcoded label mapping
    if (routeLabels[value.toLowerCase()]) return routeLabels[value.toLowerCase()];

    // 2. Check if the value is a MongoDB ID (24 character hex string)
    // If so, show the property title if we have it
    if (/^[0-9a-fA-F]{24}$/.test(value)) {
      return customLabel || "Property Detail";
    }

    // 3. Fallback to standard slug formatting
    return decodeURI(value)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-[#E9EDF3] py-3.5 border-b border-[#D9E1F2]/30">
      <div className="max-w-[1290px] mx-auto px-4 md:px-6 flex items-center gap-2 text-[14px] font-medium overflow-x-auto whitespace-nowrap no-scrollbar">
        {/* Home */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[#01155E] hover:text-[#254B86] transition-colors shrink-0"
        >
          <Home size={15} />
          <span>Home</span>
        </Link>

        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = formatLabel(value);

          return (
            <div key={routeTo} className="flex items-center gap-2 shrink-0">
              <ChevronRight size={14} className="text-[#8A94B2] flex-shrink-0" />
              {isLast ? (
                <span className="text-[#01155E] font-bold truncate max-w-[200px] md:max-w-none" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link to={routeTo} className="text-[#01155E] hover:underline transition-colors">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;