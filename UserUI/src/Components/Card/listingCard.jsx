import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendListingPdf } from '../../features/dashboard/listingpdfSlice';
import { useNavigate } from "react-router-dom";
import getStyles from './ListingCard.styles';
import { sendListingEnquiry, resetEnquiryState } from "../../features/Enquiery/enquirySlice.js";
import { toast } from 'react-toastify';

const ListingCard = ({ listing }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  // Local loading state jo sirf IS card ko control karegi
  const [isLocalSending, setIsLocalSending] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Global states from Redux
  const { success: enquirySuccess, error: enquiryError } = useSelector((state) => state.enquiry);
  const { loading: pdfLoading, success: pdfSuccess, error: pdfError } = useSelector((state) => state.pdf);

  // Handle Connect Button Click
  const handleConnect = async (e) => {
    e.stopPropagation();
    setIsLocalSending(true); // Button ko turant "Sending..." kar do
    
    try {
      // Enquiry dispatch karein
      await dispatch(sendListingEnquiry({ listingId: listing._id })).unwrap();
      toast.success("Enquiry sent ✅");
    } catch (err) {
  toast.error(err || "Something went wrong");
    } finally {
      // OK click karne ke baad ya error aane par button normal kar do
      setIsLocalSending(false);
      dispatch(resetEnquiryState());
    }
  };

  const handleSendPdf = () => {
    if (!email) {
      toast.success('Please enter email');
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

  const styles = getStyles(isHovered);

  return (
    <div style={styles.card}>
      <div
        style={{ ...styles.imageContainer, cursor: "pointer" }}
        onClick={openDetails}
      >
        <img src="https://images.bayut.com/thumbnails/803707122-1066x800.webp" style={styles.image} alt="Property" />
        <div style={styles.badgeContainer}>
          <span style={styles.truCheck}>✓ TruCheck</span>
          <span style={styles.offPlan}>  {listing.completionStatus}</span>
        </div>
        <div style={styles.handoverBadge}>  Handover {listing.projectInfo?.handoverDate}</div>
      </div>

      <div style={styles.details}>
        <div style={styles.price}>{listing.currency} {listing.price?.toLocaleString()}</div>

        <div style={styles.featuresWrapper}>
          <span>🛏️ {listing.bedrooms}</span>
          <span>🛁 {listing.bathrooms}</span>
          <span>📐  {listing.builtUpArea} </span>

          <button
            style={styles.shortDownloadBtn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              setIsPopupOpen(true);
            }}
          >
            📩 PDF
          </button>
        </div>
        
        <h3
          style={{
            fontSize: "1.1em",
            fontWeight: "600",
            color: "#333",
            margin: "0 0 5px 0",
            cursor: "pointer",
          }}
          onClick={openDetails}
        >
          {listing.title}
        </h3>
        <p style={{ fontSize: '0.9em', color: '#888', margin: 0 }}>
          {listing.location?.community}, {listing.location?.city}
        </p>

        <div style={styles.agentSection}>
          <img 
            src="https://images.bayut.com/thumbnails/764386701-800x600.webp" 
            style={styles.agentImage} 
            alt="Agent" 
          />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.95em' }}>{listing.agent?.name}</div>
            <div style={{ fontSize: '0.8em', color: '#888' }}>{listing.agent?.agency}</div>
          </div>
          
          <button
            style={styles.connectBtn}
            disabled={isLocalSending}
            onClick={handleConnect} // Refactored function
          >
            {isLocalSending ? "Sending..." : "Connect"}
          </button>
        </div>
      </div>

      {isPopupOpen && ReactDOM.createPortal(
        <div style={styles.modalOverlay} onClick={() => setIsPopupOpen(false)}>
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            {pdfSuccess ? (
              <div>
                <div style={{fontSize: '3em', color: '#387373', marginBottom: '10px'}}>✅</div>
                <h3 style={{margin: '0 0 5px 0'}}>PDF Sent!</h3>
                <p style={{fontSize: '0.9em', color: '#666'}}>Check your inbox for the brochure.</p>
              </div>
            ) : (
              <>
                <h3 style={{ marginTop: 0, color: '#004c7d' }}>Send Brochure</h3>
                <p style={{ fontSize: '0.85em', color: '#666' }}>
                  Enter your Gmail to receive the full details.
                </p>

                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  style={{
                    width: '100%', padding: '12px', margin: '15px 0',
                    borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box'
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {pdfError && <p style={{color: 'red', fontSize: '0.75em'}}>{"Invalid email ID"}</p>}

                <button
                  onClick={handleSendPdf}
                  disabled={pdfLoading}
                  style={{
                    width: '100%', padding: '12px', background: '#387373', color: 'white',
                    border: 'none', borderRadius: '8px', fontWeight: 'bold',
                    cursor: pdfLoading ? 'not-allowed' : 'pointer', opacity: pdfLoading ? 0.6 : 1
                  }}
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