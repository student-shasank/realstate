import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendListingPdf } from '../../features/dashboard/listingpdfSlice';
import heartIcon from "../../assets/likeicon.png"
import callIcon from '../../assets/phoneicon.png';
import whatsappIcon from '../../assets/whatsappicon.png';
import shareIcon from '../../assets/shareicon.png'
import listingimage from '../../assets/listingcard.jpg'
import Icon1 from '../../assets/icon1.png'
import Icon2 from '../../assets/icon2.png'
import Icon3 from '../../assets/icon3.png'
import Icon4 from '../../assets/icon4.png'
import Icon5 from '../../assets/icon5.png'
import { useNavigate } from "react-router-dom";
import { sendListingEnquiry, resetEnquiryState } from "../../features/Enquiery/enquirySlice.js";
import { toast } from 'react-toastify';

// Note: Ensure General Sans font is imported in your global CSS
const ListingCard = ({ listing }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLocalSending, setIsLocalSending] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success: pdfSuccess, loading: pdfLoading, error: pdfError } = useSelector((state) => state.pdf);
  const socialActions = [
    { id: 'like', icon: heartIcon, alt: 'Like' },
    { id: 'call', icon: callIcon, alt: 'Call' },
    { id: 'whatsapp', icon: whatsappIcon, alt: 'WhatsApp' },
    { id: 'share', icon: shareIcon, alt: 'Share' }
  ];

  const handleConnect = async (e) => {
    e.stopPropagation();
    setIsLocalSending(true);
    try {
      await dispatch(sendListingEnquiry({ listingId: listing._id })).unwrap();
      toast.success("Enquiry sent ✅");
    } catch (err) {
      toast.error(err || "Something went wrong");
    } finally {
      setIsLocalSending(false);
      dispatch(resetEnquiryState());
    }
  };

  const handleSendPdf = () => {
    if (!email) {
      toast.error('Please enter email');
      return;
    }
    dispatch(sendListingPdf({ listingId: listing._id, email: email }));
  };

  useEffect(() => {
    if (pdfSuccess && isPopupOpen) {
      const timer = setTimeout(() => {
        setIsPopupOpen(false);
        setEmail('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [pdfSuccess, isPopupOpen]);

  const openDetails = () => {
    navigate(`/listing/${listing._id}`);
  };

  return (
    <div className="w-[1290px] h-[273px] bg-white border border-[#D9E1F2] rounded-[10px] flex overflow-hidden font-['General_Sans'] shadow-sm mb-6">
      
      {/* LEFT: IMAGE SECTION */}
      <div 
        className="relative w-[450px] h-full cursor-pointer flex-shrink-0"
        onClick={openDetails}
      >
        <img 
          src={listingimage } 
          alt={listing.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-[6px] text-[#01155E] text-[14px] leading-[150%] capitalize">
          <span className="font-semibold">{listing.completionStatus }</span>
          <span className="mx-1 text-gray-300">|</span>
          <span className="font-normal">Resale</span>
        </div>

        {/* Image Count Badge */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded flex items-center gap-1.5 text-[12px]">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{listing.images?.length || 10}</span>
        </div>
      </div>

      {/* RIGHT: CONTENT SECTION */}
      <div className="flex-1 p-[30px] flex flex-col justify-between">
        
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
      {listing.location?.community}, {listing.location?.city || 'Ontario, Canada'}
    </span>
  </div>

  {/* Builder Section */}
  <div className="flex items-center gap-2 text-[#67739E] text-[18px] font-normal leading-[160%]">
    {/* Swapping the office emoji for your builder icon */}
    <img src={Icon4} alt="Builder" className="w-5 h-5 object-contain" />
    <span>{listing.developer || 'Zara Builders'}</span>
  </div>
</div>
          </div>

          {/* Social/Action Icons */}
         <div className="flex gap-3">
            {socialActions.map((btn) => (
              <button 
                key={btn.id}
                className="w-10 h-10 rounded-full  flex items-center justify-center hover:bg-[#E2E8F0] transition-colors"
              >
                <img src={btn.icon} alt={btn.alt} className="w-8 h-8 object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Features */}
        <div className="flex items-center gap-6 mt-4">
         <div className="flex items-center gap-2 text-[#67739E]">
  <img src={Icon3} alt="bed" className="w-5 h-5" />
  <span className="text-[18px] font-medium">
    {listing.bedrooms || 41}
  </span>
</div>

<div className="h-6 w-[1px] bg-[#D9E1F2]"></div>

<div className="flex items-center gap-2 text-[#67739E]">
  <img src={Icon2} alt="bath" className="w-5 h-5" />
  <span className="text-[18px] font-medium">
    {listing.bathrooms || 32}
  </span>
</div>

<div className="h-6 w-[1px] bg-[#D9E1F2]"></div>

<div className="flex items-center gap-2 text-[#67739E]">
  <img src={Icon1} alt="area" className="w-5 h-5" />
  <span className="text-[18px] font-medium">
    {listing.builtUpArea?.toLocaleString() || "122,280"} sqft
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
          {listing.currency } <span className='text-[24px]'>{listing.price?.toLocaleString() || '10,00,239'}</span> 
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleConnect}
              disabled={isLocalSending}
              className="px-6 py-2 text-[#01155E] font-semibold border border-[#01155E] rounded-[10px] hover:bg-gray-50 transition-colors"
            >
              {isLocalSending ? "Connecting..." : "Connect"}
            </button>
            <button 
              onClick={openDetails}
              className="w-[135px] h-[48px] bg-white border border-[#01155E] rounded-[10px] text-[#01155E] text-[16px] font-semibold leading-[150%] hover:bg-[#F8FAFF] transition-colors"
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