import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ customLabel }) => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map technical URL segments to user-friendly display names
  const routeLabels = {
    listings: "All Properties",
    listing: "Property Detail",
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
    // If so, use a fallback since we don't have the property title here
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