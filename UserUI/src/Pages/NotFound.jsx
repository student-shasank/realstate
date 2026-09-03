import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-[#01155E]/10 flex items-center justify-center">
            <SearchX className="w-12 h-12 text-[#01155E]" strokeWidth={1.5} />
          </div>
        </div>

        {/* 404 Number */}
        <h1 className="text-7xl md:text-8xl font-extrabold text-[#01155E] leading-none mb-2 tracking-tight">
          404
        </h1>

        {/* Underline accent - matches "Market Insights" heading style */}
        <div className="w-16 h-1 bg-[#01155E] mx-auto mb-6 rounded-full"></div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-base md:text-lg mb-10 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or may have been
          moved. Let's get you back on track.
        </p>

        {/* CTA Button - matches "Read More.." button style */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#01155E] hover:bg-[#01155E]/90 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;