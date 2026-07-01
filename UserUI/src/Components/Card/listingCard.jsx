import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendListingPdf } from '../../features/dashboard/listingpdfSlice';
import heartIcon from "../../assets/like.svg"
import callIcon from '../../assets/Phone2.svg';
import whatsappIcon from '../../assets/whatsap.png';
import shareIcon from '../../assets/Share3.svg'
import listingimage from '../../assets/ListingCard.jpg'
import Icon1 from '../../assets/icon1.png'
import Icon2 from '../../assets/icon2.png'
import Icon3 from '../../assets/icon3.png'
import Icon4 from '../../assets/icon4.png'
import Icon5 from '../../assets/icon5.png'
import { useNavigate } from "react-router-dom";
import { sendListingEnquiry, resetEnquiryState } from "../../features/Enquiery/enquirySlice.js";
import { toast } from 'react-toastify';
import { fetchListingDetail } from '../../features/dashboard/listingDetailSlice';
import { extractAllImages } from '../../Components/utils/imageExtractor';

import {
  addFavoriteLocal,
  removeFavoriteLocal,
  toggleFavorite,
} from "../../features/dashboard/favoriteligting/favoriteSlice.jsx";


// Note: Ensure General Sans font is imported in your global CSS
const ListingCard = ({ listing, onRequireLogin }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLocalSending, setIsLocalSending] = useState(false);

  // NEW: hover carousel states
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success: pdfSuccess, loading: pdfLoading, error: pdfError } = useSelector((state) => state.pdf);
  const { listing: detailedListing } = useSelector((state) => state.listingDetail);

  // NOTE: adjust this path to match your actual auth slice
  // e.g. state.auth.user, state.userProfile.data, etc.
  const currentUser = useSelector((state) => state.auth?.user);

  const socialActions = [
    { id: 'like', icon: heartIcon, alt: 'Like' },
    { id: 'call', icon: callIcon, alt: 'Call' },
    { id: 'whatsapp', icon: whatsappIcon, alt: 'WhatsApp' },
    { id: 'share', icon: shareIcon, alt: 'Share' }
  ];

  const currentId = listing?._id || listing?.id;
  const cardId = listing.id;

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const favorites = useSelector(
    (state) => state.favorites.favorites || []
  );
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

  // Fallback gallery images
  const fallbackGalleryImages = listing?.feature_image
    ? [listing.feature_image]
    : [listingimage];

  // Display logic: Use carousel images if available, else fallback
  const displayImages = carouselImages.length > 0 ? carouselImages : fallbackGalleryImages;

  /**
   * Safe image URL handler (supports various image formats)
   */
  const getSafeImageUrl = (url) => {
    if (!url) return listingimage;
    if (typeof url !== 'string') {
      if (url?.url) return url.url;
      if (url?.secure_url) return url.secure_url;
      if (url?.imageUrl) return url.imageUrl;
      return listingimage;
    }
    return url;
  };

  /**
   * Fetch all images when card is hovered using cardId
   * Only fetches once per card (caches result)
   */
  const handleImageMouseEnter = async () => {
    setIsImageHovered(true);

    // Only fetch if we don't already have carousel images
    if (carouselImages.length === 0 && !isLoadingImages) {
      setIsLoadingImages(true);
      try {
        const result = await dispatch(fetchListingDetail(Number(cardId))).unwrap();

        if (result) {
          const imageData = extractAllImages(result);
          setCarouselImages(imageData.allImages);
          console.log(`Loaded ${imageData.allImages.length} images for listing ${cardId}`);
        }
      } catch (error) {
        console.error('Error fetching listing images:', error);
        setCarouselImages(fallbackGalleryImages);
        toast.error('Failed to load images');
      } finally {
        setIsLoadingImages(false);
      }
    }
  };

  /**
   * Reset carousel when mouse leaves
   */
  const handleImageMouseLeave = () => {
    setIsImageHovered(false);
    setActiveImageIndex(0);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
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

  if (!storedUser?.name || !storedUser?.email) {
    toast.error("Please complete your profile (name, email) before connecting");
    return;
  }

  setIsLocalSending(true);

  try {
    await dispatch(
      sendListingEnquiry({
        listingId: listing._id, // Mongo _id specifically, not the numeric id
        name: storedUser.name,
        email: storedUser.email,
        phone: storedUser.phone || "-",
        requestType: "availability",
      })
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
      toast.error('Please enter email');
      return;
    }

    dispatch(sendListingPdf({ listingId: currentId, email, phone }));
  };

  useEffect(() => {
    if (pdfSuccess && isPopupOpen) {
      const timer = setTimeout(() => {
        setIsPopupOpen(false);
        setEmail('');
        setPhone('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [pdfSuccess, isPopupOpen]);

  // Reset carousel when listing changes
  useEffect(() => {
    setActiveImageIndex(0);
    setCarouselImages([]);
    setIsImageHovered(false);
  }, [currentId]);

  const openDetails = () => {
    navigate(`/listing/${listing.id}`);
  };

  const getHandover = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 1–12
    const year = date.getFullYear();

    let quarter = "";

    if (month <= 3) quarter = "Q1";
    else if (month <= 6) quarter = "Q2";
    else if (month <= 9) quarter = "Q3";
    else quarter = "Q4";

    return `${quarter} ${year}`;
  };

  return (
    <div className="w-[1290px] h-[273px] bg-white border border-[#D9E1F2] rounded-[10px] flex overflow-hidden font-['General_Sans'] shadow-sm mb-6 transition-all duration-300 hover:border-[#2F6BFF] hover:shadow-[0_8px_24px_rgba(1,21,94,0.10)]">

      {/* LEFT: IMAGE SECTION */}
      <div
        className="relative w-[450px] h-full cursor-pointer flex-shrink-0 overflow-hidden"
        onClick={openDetails}
        onMouseEnter={handleImageMouseEnter}
        onMouseLeave={handleImageMouseLeave}
      >
        <img
          src={getSafeImageUrl(displayImages[activeImageIndex])}
          alt={listing.title}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-[6px] text-[#01155E] text-[14px] leading-[150%] capitalize z-20">
          <span className="font-semibold">
            {["announced","eoi","start of sales","on sale","out of stock"]
              .includes(listing?.status?.toLowerCase())
              ? "Off-plan"
              : listing?.status}
          </span>
          <span className="mx-1 text-gray-300">|</span>
          <span className="font-normal">Sell</span>
        </div>
        {listing?.isFeatured && (
          <div className="absolute top-4 right-4 bg-[#FFC107] text-[#01155E] px-3 py-1 rounded-[6px] text-[14px] font-semibold z-20 shadow-sm">
            Featured Project
          </div>
        )}

        {/* Loading Spinner */}
        {isLoadingImages && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-30">
            <div className="w-8 h-8 border-3 border-white border-t-[#01155E] rounded-full animate-spin"></div>
          </div>
        )}

        {/* Carousel Arrows on Hover */}
        {isImageHovered && displayImages.length > 1 && !isLoadingImages && (
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
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
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
                className={`w-[8px] h-[8px] rounded-full transition-all duration-300 ${activeImageIndex === index
                  ? 'bg-white'
                  : 'bg-white/45'
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: CONTENT SECTION */}
      <div
        className={`flex-1 p-[30px] flex flex-col justify-between ${listing?.isFeatured ? "bg-[#E9EEF6]" : "bg-white"
          }`}
      >


        {/* Row 1: Title and Icon Buttons */}
        <div className="flex justify-between items-start">
          <div>
            <h2
              className="text-[#01155E] text-[24px] font-semibold leading-[125%] capitalize cursor-pointer"
              onClick={openDetails}
            >
              {listing.title || 'High-Rise Townhouse'}
            </h2>

            {/* Row 2: Location and Builder */}
            <div className="flex items-center gap-6 mt-2">
              {/* Location Section */}
              <div className="flex items-center gap-2 text-[#67739E] text-[18px] font-normal leading-[160%]">
                <img src={Icon5} alt="Location" className="w-5 h-5 object-contain" />
                <span>
                  {[
                    listing?.district_name,
                    listing?.city_name
                  ].filter(Boolean).join(", ") || "N/A"}
                </span>
              </div>

              {/* Builder Section */}
              <div className="flex items-center gap-2 text-[#67739E] text-[18px] font-normal leading-[160%]">
                <img src={Icon4} alt="Builder" className="w-5 h-5 object-contain" />
                <span>{listing.developer_name || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Social/Action Icons */}

          <div className="flex gap-3">
            {socialActions.map((btn) => {
              const isLikeBtn = btn.id === "like";

              return (
                <button
                  key={btn.id}
                  onClick={isLikeBtn ? handleFavorite : (e) => e.stopPropagation()}
                  className={`group w-10 h-10 rounded-full flex items-center justify-center transition-colors ${listing?.isFeatured
                    ? "bg-white hover:bg-[#01155E]"
                    : "bg-[#E2E8F0] hover:bg-[#01155E]"
                    }`}
                >
                 {isLikeBtn ? (
  isFavorite ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff0000">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ) : (
    <img src={btn.icon} alt={btn.alt} className="w-5 h-5 object-contain group-hover:brightness-0 group-hover:invert" />
  )
) : (
  <img
    src={btn.icon}
    alt={btn.alt}
    className={`w-5 h-5 object-contain transition-all duration-300 ${
      btn.id !== "whatsapp" ? "group-hover:brightness-0 group-hover:invert" : ""
    }`}
  />
)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Features */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-[#67739E]">
            <img src={Icon3} alt="bed" className="w-5 h-5" />
            <span className="text-[18px] font-medium">
             {listing.beds || "N/A"}
            </span>
          </div>

          <div className="h-6 w-[1px] bg-[#D9E1F2]"></div>

          <div className="flex items-center gap-2 text-[#67739E]">
            <img src={Icon2} alt="bath" className="w-5 h-5" />
            <span className="text-[18px] font-medium">
            {listing.baths || "N/A"}
            </span>
          </div>

          <div className="h-6 w-[1px] bg-[#D9E1F2]"></div>

          <div className="flex items-center gap-2 text-[#67739E]">
            <img src={Icon1} alt="area" className="w-5 h-5" />
            <span className="text-[18px] font-medium">
              {listing.max_area?.toLocaleString()} sqft
            </span>
          </div>
          <div className="h-6 w-[1px] bg-[#D9E1F2]"></div>
          <div className="flex items-center gap-2 text-[#67739E]">
            <img src={Icon4} alt="handover" className="w-5 h-5" />
            <span className="text-[18px] font-medium">
            {getHandover(listing?.expected_delivery_date)}
            </span>
          </div>

          {/* Internal Logic: PDF Trigger */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsPopupOpen(true); }}
            className="ml-auto text-[14px] text-[#01155E] font-semibold underline underline-offset-4"
          >
            Download PDF
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#D9E1F2] my-4"></div>

        {/* Bottom Row: Price and View Button */}
        <div className="flex justify-between items-center">
          <div className="text-[#01155E] text-[18px] font-semibold leading-[125%]">
  {listing?.propertyStatus?.toLowerCase() === "offplan" ? (
    <>
      <span className="text-[24px] font-semibold mr-1">
        Starting at
      </span>
      <span className='text-[24px] mr-2'>
        {listing.currency?.toUpperCase()}
      </span>
      <span className="text-[32px] ">
        {listing.min_price?.toLocaleString() || "10,00,239"}
      </span>
    </>
  ) : (
    <>
      <span className='text-[24px] mr-2'>
        {listing.currency?.toUpperCase()}
      </span>
      <span className="text-[32px] ">
        {listing.min_price?.toLocaleString() || "10,00,239"}
      </span>
    </>
  )}
</div>

          <div className="flex gap-3">
            <button
              onClick={handleConnect}
              disabled={isLocalSending}
              className="px-6 py-2 text-[#01155E] font-semibold border border-[#01155E] rounded-[10px]  transition-colors hover:bg-[#01155E] hover:text-[#ffff] bg-[#ffff]"
            >
              {isLocalSending ? "Connecting..." : "Connect"}
            </button>
            <button
              onClick={openDetails}
              className="w-[135px] h-[48px] bg-white border border-[#01155E] rounded-[10px] text-[#01155E] text-[16px] font-semibold leading-[150%] hover:bg-[#01155E] hover:text-[#ffff] transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PORTAL (Kept original logic) */}
      {isPopupOpen && ReactDOM.createPortal(
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {pdfSuccess ? (
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[#01155E] mb-2">PDF Sent!</h3>
                <p className="text-[#67739E]">Check your inbox for the brochure.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#01155E] mb-2">Send Brochure</h3>
                <p className="text-[#67739E] text-sm mb-6">Enter your email to receive full details.</p>
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
                {pdfError && <p className="text-red-500 text-xs mb-4">Invalid email ID</p>}
                <button
                  onClick={handleSendPdf}
                  disabled={pdfLoading}
                  className="w-full py-3 bg-[#01155E] text-white rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {pdfLoading ? 'Sending...' : 'Send PDF Now'}
                </button>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ListingCard;