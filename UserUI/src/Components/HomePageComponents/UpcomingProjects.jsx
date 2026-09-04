import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { fetchProjects } from "../../features/dashboard/searchSlice.jsx";

import upcommingproject1 from "../../assets/upcommingproject1.jpg";
import imageurl from "../../assets/underline.png";
import { formatNumber } from "../utils/formatCurrency.js";

const UpcomingProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const { projects, loading } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(
      fetchProjects({
        completion: "Off-Plan",
        propertyType: "",
        beds: "",
        baths: "",
        location: "",
      })
    );
  }, [dispatch]);

  // ----------------------------------------
  // SAFE LOCATION FORMATTER
  // ----------------------------------------
  const getProjectLocation = (location, districtData, cityData, projectCity) => {
    if (typeof location === "string" && location.trim()) {
      return location;
    }

    if (location && typeof location === "object") {
      return (
        [
          location?.subCommunity,
          location?.city,
          location?.emirates,
        ]
          .filter(Boolean)
          .join(", ") ||
        location?.address ||
        districtData?.[0]?.name ||
        cityData?.name ||
        projectCity ||
        "Dubai"
      );
    }

    return districtData?.[0]?.name || cityData?.name || projectCity || "Dubai";
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;

      const scrollAmount =
        window.innerWidth >= 1024 ? 362.4 : window.innerWidth * 0.9;

      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  // ----------------------------------------
  // NAVIGATE TO DETAIL PAGE USING MONGO _id
  // ----------------------------------------
  const goToDetail = (project) => {
    if (!project?._id) return;
    navigate(`/listing/${project._id}`);
  };

  return (
    <section className="w-full bg-white py-12 lg:py-16 flex flex-col items-center overflow-hidden">
      {/* HEADER */}
      <div className="w-full max-w-[1200px] px-5 lg:px-0 mb-8 lg:mb-10">
        <h2
          className="text-[#001A54] text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-3 inline-block pb-2 leading-tight"
          style={{
            fontFamily: "Archivo, sans-serif",
            backgroundImage: `url(${imageurl})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 90%",
            backgroundSize: "457px 6px",
          }}
        >
          New Launches
        </h2>

        <p className="text-[#67739E] text-[16px] md:text-[18px] leading-relaxed max-w-[1200px]">
          Discover Dubai’s newest launches with expert guidance to secure the
          best prices and the most desirable units.
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative flex items-center justify-between w-full max-w-[1440px] px-3 sm:px-5 lg:px-12">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex p-2 rounded-full border border-gray-300 text-[#001A54] hover:bg-gray-100 z-10 bg-white"
        >
          <ChevronLeft size={20} />
        </button>

        {/* CARDS */}
        <div
          ref={scrollRef}
          className="
            flex gap-4 overflow-x-auto lg:overflow-hidden
            scroll-smooth w-full
            scrollbar-hide
          "
          style={{
            width: window.innerWidth >= 1024 ? "1071.2px" : "100%",
            minHeight: window.innerWidth >= 1024 ? "508px" : "auto",
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center w-full py-20">
              <p className="text-[#001A54] font-medium">
                Loading Off-Plan Projects...
              </p>
            </div>
          ) : projects?.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="
                  bg-[#F8F9FA] rounded-[24px]
                  flex flex-col border border-gray-100
                  shadow-sm overflow-hidden shrink-0
                  w-[88vw]
                  sm:w-[70vw]
                  md:w-[48vw]
                  lg:w-[346.4px]
                "
                style={{
                  height: window.innerWidth >= 1024 ? "508px" : "auto",
                  padding: "8px",
                  gap: "16px",
                }}
              >
                {/* IMAGE */}
                <div
                  onClick={() => goToDetail(project)}
                  className="w-full h-[220px] md:h-[250px] lg:h-[280px] rounded-[20px] overflow-hidden shrink-0 cursor-pointer"
                >
                  <img
                    src={
                      project.images?.feature ||
                      project.feature_image ||
                      upcommingproject1
                    }
                    alt={
                      project.feature_image_alt_text ||
                      project.title ||
                      "Upcoming Project"
                    }
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col px-3 h-full justify-between pb-3">
                  <div className="flex flex-col gap-2">
                    {/* LOCATION */}
                    <div className="flex items-center gap-1 text-[#01155E] text-[16px] md:text-[18px]">
                      <MapPin size={14} />

                      <span className="text-[#03144e99] truncate">
                        {getProjectLocation(
                          project?.location,
                          project?.district_data,
                          project?.city_data,
                          project?.project_city
                        )}
                      </span>
                    </div>

                    {/* PROPERTY CATEGORY */}
                    <p className="text-[#001A54] text-[15px] md:text-[16px] font-medium">
                      {Array.isArray(project?.property_types)
                        ? project.property_types.join(", ")
                        : project?.property_types ||
                          project?.property_category ||
                          "Property"}
                    </p>

                    {/* TITLE */}
                    <h3
                      onClick={() => goToDetail(project)}
                      className="text-[#001A54] text-[18px] md:text-[20px] font-medium leading-tight line-clamp-2 cursor-pointer"
                    >
                      {project?.title || "Upcoming Project"}
                    </h3>
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center gap-3">
                    {/* PRICE */}
                   <span className="text-[#001A54] text-[16px] md:text-[20px] font-bold">
  {project?.price_start || project?.min_price ? (
    <>
      <span className="mr-1">
        {(project?.currency || "AED").toUpperCase()}
      </span>
      {formatNumber(project.price_start || project.min_price)}
    </>
  ) : (
    "Price on Request"
  )}
</span>

                    <button
                      onClick={() => goToDetail(project)}
                      className="bg-[#001A54] text-white px-4 md:px-6 py-2 rounded-[8px] font-bold text-[13px] md:text-sm whitespace-nowrap"
                    >
                      Discover
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full py-20">
              <p className="text-[#001A54] font-medium">
                No upcoming projects found.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex p-2 rounded-full border border-gray-300 text-[#001A54] hover:bg-gray-100 z-10 bg-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default UpcomingProjects;