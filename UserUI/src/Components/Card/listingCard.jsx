import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendListingPdf } from "../../features/dashboard/listingpdfSlice";
import heartIcon from "../../assets/like.svg";
import callIcon from "../../assets/phone5.png";
import whatsappIcon from "../../assets/whatsap.png";
import shareIcon from "../../assets/share5.png";
import listingimage from "../../assets/ListingCard.jpg";
import Icon1 from "../../assets/icon1.png";
import Icon2 from "../../assets/icon2.png";
import Icon3 from "../../assets/icon3.png";
import Icon4 from "../../assets/icon4.png";
import Icon5 from "../../assets/icon5.png";
import { useNavigate } from "react-router-dom";
import {
  sendListingEnquiry,
  resetEnquiryState,
} from "../../features/Enquiery/enquirySlice.js";
import { toast } from "react-toastify";
import {
  addFavoriteLocal,
  removeFavoriteLocal,
  toggleFavorite,
} from "../../features/dashboard/favoriteligting/favoriteSlice.jsx";
import { formatNumber } from "../../Components/utils/formatCurrency.js";

const ListingCard = ({ listing, onRequireLogin }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLocalSending, setIsLocalSending] = useState(false);

  // Call / Contact Us popup
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);

  // Hover carousel states
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    success: pdfSuccess,
    loading: pdfLoading,
    error: pdfError,
  } = useSelector((state) => state.pdf);

  const currentUser = useSelector((state) => state.auth?.user);

  const socialActions = [
    { id: "like", icon: heartIcon, alt: "Like" },
    { id: "call", icon: callIcon, alt: "Call" },
    { id: "whatsapp", icon: whatsappIcon, alt: "WhatsApp" },
    { id: "share", icon: shareIcon, alt: "Share" },
  ];

  const currentId = listing?._id || listing?.id;
  const cardId = listing?.id;

  // ============================================================
  // NORMALIZATION LAYER
  // Backend documents come in two different shapes:
  //   Type A (aggregated project docs) -> project_status, price_start,
  //   district_data/city_data, area_end, expected_completion_date
  //   Type B (flattened listing docs)  -> status, min_price,
  //   district_name/city_name, max_area, expected_delivery_date
  // Normalize both here once so the rest of the component always
  // reads from a single consistent set of values. Nothing else in
  // the component (design, handlers, popups) has been changed.
  // ============================================================
  const rawStatus = listing?.status || listing?.project_status || "";
  const listingStatus = rawStatus.toString().toLowerCase();

  const isOffPlan = [
  "off-plan",
  "offplan",
  "announced",
  "eoi",
  "start of sales",
  "on sale",
].includes(listingStatus);

  // Share the listing — uses native Share sheet (mobile/supported browsers)
// and falls back to copying the link to clipboard otherwise.
const handleShareClick = async (e) => {
  e.stopPropagation();

  const listingUrl = listing?._id
    ? `${window.location.origin}/listing/${listing._id}`
    : window.location.href;

  const shareData = {
    title: listing?.title || "Yupland Listing",
    text: `Check out this property on Yupland: ${listing?.title || ""}`,
    url: listingUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(listingUrl);
      toast.success("Link copied to clipboard");
    } else {
      // Very old browser fallback
      const tempInput = document.createElement("input");
      tempInput.value = listingUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      toast.success("Link copied to clipboard");
    }
  } catch (err) {
    // AbortError = user cancelled the native share sheet — ignore it
    if (err?.name !== "AbortError") {
      toast.error("Unable to share right now");
    }
  }
};

  // Out of Stock should ONLY be driven by project_status specifically
  // (not the merged status/rawStatus used elsewhere).
  // project_status === "Sold Out" is what actually marks it out of stock.
  const isOutOfStock =
    (listing?.project_status || "").toString().trim().toLowerCase() ===
    "sold out";

  const listingPrice =
    listing?.min_price !== undefined && listing?.min_price !== null
      ? listing.min_price
      : listing?.price_start;

  const listingArea =
    listing?.max_area !== undefined && listing?.max_area !== null
      ? listing.max_area
      : listing?.area_end;

  const listingDistrict =
    listing?.district_name || listing?.district_data?.[0]?.name || "";

  const listingCity = listing?.city_name || listing?.city_data?.name || "";

  const listingHandoverDate =
    listing?.expected_delivery_date || listing?.expected_completion_date;

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const favorites = useSelector((state) => state.favorites.favorites || []);
  const isFavorite = favorites.includes(currentId);

  const handleFavorite = (e) => {
    e.stopPropagation();

    if (!currentId) return;

    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }

    if (isFavorite) {
      dispatch(removeFavoriteLocal(currentId));
    } else {
      dispatch(addFavoriteLocal(currentId));
    }

    dispatch(toggleFavorite(currentId));
  };

  const handleCallClick = (e) => {
    e.stopPropagation();
    setIsCallPopupOpen(true);
  };

  // Contact details shown in the "Contact Us" popup — same pattern as PropertyDetail
  const agentName = "Divyansh Chitkara";

  // Primary agent phone
  const agentPhoneRaw = "+971 505 773767";
  const agentPhoneDial = agentPhoneRaw.replace(/[^\d+]/g, "");

  // Secondary agent phone
  const agentPhoneRaw2 = "+1 437 328 8508";
  const agentPhoneDial2 = agentPhoneRaw2.replace(/[^\d+]/g, "");

  const agencyName = listing?.developer_name || listing?.agency_name || "N/A";

  // Fallback gallery images (agar all_images khali ho)
  const fallbackGalleryImages = listing?.feature_image
    ? [listing.feature_image]
    : listing?.images?.length > 0
      ? listing.images
      : listing?.images?.feature
        ? [listing.images.feature]
        : [listingimage];

  // ============================================================
  // Ab images MongoDB se listing object ke saath hi aa jaati hain
  // (listing.all_images), isliye hover par detail API call karne
  // ki zaroorat nahi — seedha yahin se le lete hain.
  // ============================================================
  const galleryImages =
    Array.isArray(listing?.all_images) && listing.all_images.length > 0
      ? listing.all_images
      : fallbackGalleryImages;

  const displayImages =
    carouselImages.length > 0 ? carouselImages : galleryImages;

  const getSafeImageUrl = (url) => {
    if (!url) return listingimage;
    if (typeof url !== "string") {
      if (url?.url) return url.url;
      if (url?.secure_url) return url.secure_url;
      if (url?.imageUrl) return url.imageUrl;
      return listingimage;
    }
    return url;
  };

  const handleImageMouseEnter = () => {
    setIsImageHovered(true);

    if (carouselImages.length > 0) return;

    // Images already listing object me maujood hain, bas set kar do
    setCarouselImages(galleryImages);
  };

  const handleImageMouseLeave = () => {
    setIsImageHovered(false);
    setActiveImageIndex(0);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleDotClick = (e, index) => {
    e.stopPropagation();
    setActiveImageIndex(index);
  };

  const handleConnect = async (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }

    if (!listing?._id) {
      toast.error("Something went wrong, please refresh and try again");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    if (!storedUser?.firstName || !storedUser?.email) {
      toast.error(
        "Please complete your profile (name, email) before connecting",
      );
      return;
    }

    setIsLocalSending(true);

    try {
      await dispatch(
        sendListingEnquiry({
          listingId: listing._id,
          name: storedUser.firstName,
          email: storedUser.email,
          phone: storedUser.phone || "-",
          requestType: "availability",
        }),
      ).unwrap();
      toast.success("Enquiry sent ✅");
    } catch (err) {
      toast.error(err || "Something went wrong");
    } finally {
      setIsLocalSending(false);
      dispatch(resetEnquiryState());
    }
  };

  const handleSendPdf = () => {
    if (!email || !phone) {
      toast.error("Please enter email");
      return;
    }

    dispatch(sendListingPdf({ listingId: currentId, email, phone }));
  };

  // Opens WhatsApp with a predefined, professional message pre-filled —
  // same message format/pattern as PropertyDetail's handleWhatsAppClick
  const handleWhatsAppClick = (e) => {
    e.stopPropagation();

    const whatsappNumber = agentPhoneDial.replace(/^\+/, "");

    if (!whatsappNumber) {
      toast.error("Contact number not available");
      return;
    }

    const listingUrl = listing?._id
      ? `${window.location.origin}/listing/${listing._id}`
      : window.location.href;

    const message =
      `Hi Divyansh,\n\n` +
      `I'm reaching out regarding the following property on Yupland.\n\n` +
      `Project: ${listing?.title || "N/A"}\n` +
      `Developer: ${listing?.developer_name || "N/A"}\n\n` +
      `Listing ID: ${currentId || "N/A"}\n` +
      `Listing: ${listingUrl}\n\n` +
      `I look forward to discussing this property with you.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (pdfSuccess && isPopupOpen) {
      const timer = setTimeout(() => {
        setIsPopupOpen(false);
        setEmail("");
        setPhone("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [pdfSuccess, isPopupOpen]);

  useEffect(() => {
    setActiveImageIndex(0);
    setCarouselImages([]);
    setIsImageHovered(false);
  }, [currentId]);

  const openDetails = () => {
    if (listing?._id) {
      navigate(`/listing/${listing._id}`);
    }
  };

  const getHandover = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let quarter = "";

    if (month <= 3) quarter = "Q1";
    else if (month <= 6) quarter = "Q2";
    else if (month <= 9) quarter = "Q3";
    else quarter = "Q4";

    return `${quarter} ${year}`;
  };

  return (
    <div className="w-full lg:w-[1290px] h-auto lg:h-[273px] bg-white border border-[#D9E1F2] rounded-[10px] flex flex-col lg:flex-row overflow-hidden font-['General_Sans'] shadow-sm mb-6 transition-all duration-300 hover:border-[#2F6BFF] hover:shadow-[0_8px_24px_rgba(1,21,94,0.10)]">
      {/* LEFT: IMAGE SECTION */}
      <div
        className="relative w-full lg:w-[450px] h-60 sm:h-72 lg:h-full cursor-pointer flex-shrink-0 overflow-hidden"
        onClick={openDetails}
        onMouseEnter={handleImageMouseEnter}
        onMouseLeave={handleImageMouseLeave}
      >
        <img
          src={getSafeImageUrl(displayImages[activeImageIndex])}
          alt={listing?.title || "Listing image"}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-[6px] text-[#01155E] text-[14px] leading-[150%] capitalize z-20">
          <span className="font-semibold">
            {isOffPlan ? "Off-Plan" : rawStatus || "N/A"}
          </span>
        </div>
        {listing?.isFeatured && (
          <div className="absolute top-4 right-4 bg-[#FFC107] text-[#01155E] px-3 py-1 rounded-[6px] text-[14px] font-semibold z-20 shadow-sm">
            Featured Project
          </div>
        )}

        {/* Carousel Arrows on Hover */}
        {isImageHovered && displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white text-[#01155E] shadow-[0_4px_20px_rgba(0,0,0,0.18)] flex items-center justify-center transition-all duration-300 hover:scale-105"
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white text-[#01155E] shadow-[0_4px_20px_rgba(0,0,0,0.18)] flex items-center justify-center transition-all duration-300 hover:scale-105"
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Count Badge */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded flex items-center gap-1.5 text-[12px] z-20">
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{displayImages.length || 1}</span>
        </div>

        {/* Bottom Dots */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {displayImages.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(e, index)}
                className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${
                  activeImageIndex === index ? "bg-white" : "bg-white/45"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: CONTENT SECTION */}
      <div
        className={`flex-1 p-5 lg:p-[24px] flex flex-col justify-between ${
          listing?.isFeatured ? "bg-[#E9EEF6]" : "bg-white"
        }`}
      >
        {/* Row 1: Title and Icon Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-2">
          <div className="flex-1 min-w-0 pr-2">
            <h2
              className="text-[#01155E] text-[20px] sm:text-[24px] font-semibold leading-[125%] capitalize cursor-pointer"
              onClick={openDetails}
            >
              {listing?.title || "High-Rise Townhouse"}
            </h2>

            {/* Row 2: Location and Builder (Dynamic 2-line Wrapping like screenshot) */}
            <div className="flex flex-wrap items-start gap-4 sm:gap-6 mt-2">
              {/* Location Section */}
              <div className="flex items-start gap-2 text-[#67739E] text-[15px] sm:text-[18px] font-normal leading-[130%] sm:leading-[140%] max-w-[220px] sm:max-w-[260px]">
                <img
                  src={Icon5}
                  alt="Location"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0 mt-0.5"
                />
                <span className="break-words">
                  {[listingDistrict, listingCity].filter(Boolean).join(", ") ||
                    "N/A"}
                </span>
              </div>

              {/* Builder Section */}
              <div className="flex items-start gap-2 text-[#67739E] text-[15px] sm:text-[18px] font-normal leading-[130%] sm:leading-[140%] max-w-[200px] sm:max-w-[240px]">
                <img
                  src={Icon4}
                  alt="Builder"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain flex-shrink-0 mt-0.5"
                />
                <span className="break-words">
                  {listing?.developer_name || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Social/Action Icons */}
          <div className="flex gap-3 flex-shrink-0 self-start">
           {socialActions.map((btn) => {
  const isLikeBtn = btn.id === "like";
  const isCallBtn = btn.id === "call";

  return (
    <button
      key={btn.id}
      onClick={
  isLikeBtn
    ? handleFavorite
    : isCallBtn
      ? handleCallClick
      : btn.id === "whatsapp"
        ? handleWhatsAppClick
        : btn.id === "share"
          ? handleShareClick
          : (e) => e.stopPropagation()
}
      className={`group w-10 h-10 rounded-full border-2 border-transparent flex items-center justify-center transition-all duration-300 ${
        listing?.isFeatured ? "bg-white" : "bg-[#E2E8F0]"
      } hover:border-[#01155E] hover:bg-white`}
    >
      {isLikeBtn ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isFavorite ? "#01155E" : "none"}
          stroke="#01155E"
          strokeWidth="1.8"
          className="transition-all duration-200"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <img
          src={btn.icon}
          alt={btn.alt}
          className="w-5 h-5 object-contain transition-all duration-300"
        />
      )}
    </button>
  );
})}
        
          </div>
        </div>

        {/* Row 3: Features */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-3 sm:mt-4">
          <div className="flex items-center gap-2 text-[#67739E]">
            <img src={Icon3} alt="bed" className="w-5 h-5" />
            <span className="text-[16px] sm:text-[18px] font-medium">
              {listing?.beds
                ? listing.beds
                    .toString()
                    .split(",")
                    .map((b) => (b.trim() === "0" ? "Studio" : b.trim()))
                    .join(", ")
                : "N/A"}
            </span>
          </div>

          <div className="h-6 w-[1px] bg-[#D9E1F2]"></div>

          <div className="flex items-center gap-2 text-[#67739E]">
            <img src={Icon2} alt="bath" className="w-5 h-5" />
            <span className="text-[16px] sm:text-[18px] font-medium">
              Enquire
            </span>
          </div>

          <div className="h-6 w-[1px] bg-[#D9E1F2]"></div>

          <div className="flex items-center gap-2 text-[#67739E]">
            <img src={Icon1} alt="area" className="w-5 h-5" />
            <span className="text-[16px] sm:text-[18px] font-medium">
              {listingArea ? Number(listingArea).toLocaleString() : "N/A"} sqft
            </span>
          </div>

          <div className="h-6 w-[1px] bg-[#D9E1F2]"></div>

          <div className="flex items-center gap-2 text-[#67739E]">
            <img src={Icon4} alt="handover" className="w-5 h-5" />
            <span className="text-[16px] sm:text-[18px] font-medium">
              {getHandover(listingHandoverDate)}
            </span>
          </div>

          {/* Download PDF Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPopupOpen(true);
            }}
            className="sm:ml-auto text-[14px] text-[#01155E] font-semibold underline underline-offset-4 cursor-pointer"
          >
            Download PDF
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#D9E1F2] my-3 sm:my-4"></div>

        {/* Bottom Row: Price and View Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="text-[#01155E] text-[18px] font-semibold leading-[125%]">
         {isOutOfStock ? (
  <span className="text-[24px] sm:text-[28px] font-semibold text-red-600">
    Out of Stock
  </span>
) : listingStatus === "announced" &&
  (!listingPrice || Number(listingPrice) <= 0) ? (
  <span className="text-[24px] sm:text-[28px] font-semibold text-[#01155E]">
    Coming Soon
  </span>
) : isOffPlan ? (
  <>
    <span className="text-[20px] sm:text-[24px] font-semibold mr-1">
      Starting at
    </span>

    <span className="text-[20px] sm:text-[24px] mr-2">
      {listing?.currency?.toUpperCase()}
    </span>

    <span className="text-[26px] sm:text-[32px]">
      {formatNumber(listingPrice)}
    </span>
  </>
) : (
  <>
    <span className="text-[20px] sm:text-[24px] mr-2">
      {listing?.currency?.toUpperCase()}
    </span>

    <span className="text-[26px] sm:text-[32px]">
      {listingPrice ? Number(listingPrice).toLocaleString() : "N/A"}
    </span>
  </>
)}
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleConnect}
              disabled={isLocalSending}
              className="flex-1 sm:flex-none px-6 py-2 text-[#01155E] font-semibold border border-[#01155E] rounded-[10px] transition-colors hover:bg-[#01155E] hover:text-[#ffff] bg-[#ffff]"
            >
              {isLocalSending ? "Connecting..." : "Connect"}
            </button>
            <button
              onClick={openDetails}
              className="flex-1 sm:flex-none w-full sm:w-[135px] h-[48px] bg-white border border-[#01155E] rounded-[10px] text-[#01155E] text-[16px] font-semibold leading-[150%] hover:bg-[#01155E] hover:text-[#ffff] transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* CALL / CONTACT US MODAL — same pattern as PropertyDetail */}
      {isCallPopupOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsCallPopupOpen(false)}
          >
            <div
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCallPopupOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#67739E] hover:text-[#01155E] transition-colors"
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="text-xl sm:text-2xl font-bold text-[#01155E] text-center mb-4">
                Contact Us
              </h3>

              {/* Property Details */}
              <div className="text-center pb-5 mb-5 border-b border-[#D9E1F2]">
                <p className="text-[#01155E] font-semibold text-[16px] sm:text-[18px] capitalize">
                  {listing?.title || "Property Name N/A"}
                </p>
                <p className="text-[#67739E] text-[13px] sm:text-[14px] mt-1">
                  by{" "}
                  <span className="text-[#01155E] font-semibold">
                    {agencyName}
                  </span>
                </p>
              </div>

              {/* Phone Rows — primary + secondary number */}
              <div className="flex flex-col items-center gap-3 pb-5 mb-5 border-b border-[#D9E1F2]">
                <div className="flex items-center justify-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#22c55e"
                    >
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                    </svg>
                  </div>
                  <a
                    href={`tel:${agentPhoneDial}`}
                    className="text-[#01155E] text-[18px] sm:text-[20px] font-semibold hover:underline"
                  >
                    {agentPhoneRaw}
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#22c55e"
                    >
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                    </svg>
                  </div>
                  <a
                    href={`tel:${agentPhoneDial2}`}
                    className="text-[#01155E] text-[18px] sm:text-[20px] font-semibold hover:underline"
                  >
                    {agentPhoneRaw2}
                  </a>
                </div>
              </div>

              {/* Agent Name */}
              <div className="text-center pb-5 mb-5 border-b border-[#D9E1F2]">
                <p className="text-[#67739E] text-[14px] sm:text-[15px]">
                  Broker:{" "}
                  <span className="text-[#01155E] font-semibold">
                    {agentName}
                  </span>
                </p>
              </div>

              {/* Property Reference */}
              {currentId && (
                <div className="text-center">
                  <p className="text-[#67739E] text-[12px] sm:text-[13px] leading-[150%]">
                    Please quote property reference
                    <br />
                    <span className="font-semibold text-[#01155E]">
                      Yupland - {currentId}
                    </span>{" "}
                    when calling us.
                  </p>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}

      {/* MODAL PORTAL */}
      {isPopupOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          >
            <div
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {pdfSuccess ? (
                <div className="text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-[#01155E] mb-2">
                    PDF Sent!
                  </h3>
                  <p className="text-[#67739E]">
                    Check your inbox for the brochure.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-[#01155E] mb-2">
                    Send Brochure
                  </h3>
                  <p className="text-[#67739E] text-sm mb-6">
                    Enter your email to receive full details.
                  </p>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    className="w-full p-3 border border-[#D9E1F2] rounded-lg mb-4 focus:ring-2 focus:ring-[#01155E] outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full p-3 border border-[#D9E1F2] rounded-lg mb-4 focus:ring-2 focus:ring-[#01155E] outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {pdfError && (
                    <p className="text-red-500 text-xs mb-4">
                      Invalid email ID
                    </p>
                  )}
                  <button
                    onClick={handleSendPdf}
                    disabled={pdfLoading}
                    className="w-full py-3 bg-[#01155E] text-white rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {pdfLoading ? "Sending..." : "Send PDF Now"}
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ListingCard;