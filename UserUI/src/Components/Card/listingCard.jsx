import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // 1. Import ReactDOM for Portal
import { useDispatch, useSelector } from 'react-redux';
import { sendListingPdf } from '../../features/dashboard/listingpdfSlice';
import { useNavigate } from "react-router-dom";
import getStyles from './ListingCard.styles';

const ListingCard = ({ listing }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { loading, success, error } = useSelector(
    (state) => state.pdf
  );

  const handleSendPdf = () => {
    if (!email) {
      alert('Please enter email');
      return;
    }
    dispatch(sendListingPdf({ listingId: listing._id, email: email }));
  };

  useEffect(() => {
    if (success && isPopupOpen) {
      const timer = setTimeout(() => {
        setIsPopupOpen(false);
        setEmail('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, isPopupOpen]);


  const openDetails = () => {
  navigate(`/listing/${listing._id}`);
};


  // const styles = {
  //   card: {
  //     border: '1px solid #e0e0e0',
  //     borderRadius: '8px',
  //     display: 'flex',
  //     flexDirection: 'column',
  //     overflow: 'hidden',
  //     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  //     maxWidth: '350px',
  //     backgroundColor: '#fff',
  //     fontFamily: 'Arial, sans-serif',
  //   },
  //   imageContainer: {
  //     height: '220px',
  //     position: 'relative',
  //     overflow: 'hidden',
  //   },
  //   image: { width: '100%', height: '100%', objectFit: 'cover' },
  //   badgeContainer: {
  //     position: 'absolute',
  //     top: '10px',
  //     left: '10px',
  //     display: 'flex',
  //     gap: '8px',
  //     zIndex: 10,
  //   },
  //   truCheck: {
  //     backgroundColor: '#007bff',
  //     color: 'white',
  //     padding: '4px 8px',
  //     borderRadius: '4px',
  //     fontSize: '0.75em',
  //     fontWeight: '600',
  //   },
  //   offPlan: {
  //     backgroundColor: '#ffc107',
  //     color: '#333',
  //     padding: '4px 8px',
  //     borderRadius: '4px',
  //     fontSize: '0.75em',
  //     fontWeight: '600',
  //   },
  //   handoverBadge: {
  //     position: 'absolute',
  //     bottom: '0',
  //     left: '0',
  //     backgroundColor: '#387373',
  //     color: 'white',
  //     padding: '8px 12px',
  //     fontSize: '0.85em',
  //     fontWeight: '600',
  //     borderTopRightRadius: '8px',
  //   },
  //   details: { padding: '15px' },
  //   price: { 
  //     fontSize: '1.6em', 
  //     fontWeight: '700', 
  //     color: '#004c7d', 
  //     marginBottom: '10px' 
  //   },
  //   featuresWrapper: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     gap: '15px',
  //     fontSize: '1em',
  //     color: '#555',
  //     marginBottom: '15px',
  //     paddingBottom: '10px',
  //     borderBottom: '1px solid #f0f0f0',
  //   },
  //   shortDownloadBtn: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     gap: '4px',
  //     padding: '5px 10px',
  //     backgroundColor: isHovered ? '#003a61' : '#004c7d',
  //     color: 'white',
  //     border: 'none',
  //     borderRadius: '4px',
  //     cursor: 'pointer',
  //     fontSize: '0.8em',
  //     fontWeight: '600',
  //     marginLeft: 'auto',
  //     transition: '0.2s',
  //   },
  //   agentSection: {
  //     display: 'flex',
  //     alignItems: 'center',
  //     marginTop: '15px',
  //     paddingTop: '15px',
  //     borderTop: '1px solid #eee',
  //   },
  //   agentImage: {
  //     width: '45px',
  //     height: '45px',
  //     borderRadius: '50%',
  //     marginRight: '12px',
  //     objectFit: 'cover',
  //   },
  //   // MODAL STYLES (COVER ENTIRE SCREEN)
  //   modalOverlay: {
  //     position: 'fixed',
  //     top: 0, left: 0, right: 0, bottom: 0,
  //     backgroundColor: 'rgba(0,0,0,0.5)', // Darken background
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     zIndex: 9999, // Very high z-index
  //     backdropFilter: 'blur(8px)', // Blur the whole background
  //   },
  //   popup: {
  //     backgroundColor: 'white',
  //     padding: '30px',
  //     borderRadius: '16px',
  //     width: '350px',
  //     textAlign: 'center',
  //     boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  //   }

 // };
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
            // onClick={() => setIsPopupOpen(true)}
            onClick={(e) => {
  e.stopPropagation(); // ⛔ stop navigation
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

        {/* <h3 style={{fontSize: '1.1em', fontWeight: '600', color: '#333', margin: '0 0 5px 0'}}> */}
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
        </div>
      </div>

      {/* 2. Wrap the popup in a Portal */}
      {isPopupOpen && ReactDOM.createPortal(
        <div style={styles.modalOverlay} onClick={() => setIsPopupOpen(false)}>
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            {success ? (
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

                {error && <p style={{color: 'red', fontSize: '0.75em'}}>{"Invalid email ID"}</p>}

                <button
                  onClick={handleSendPdf}
                  disabled={loading}
                  style={{
                    width: '100%', padding: '12px', background: '#387373', color: 'white',
                    border: 'none', borderRadius: '8px', fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1
                  }}
                >
                  {loading ? 'Sending...' : 'Send PDF Now'}
                </button>
              </>
            )}
          </div>
        </div>,
        document.body // This renders the popup at the root level
      )}
    </div>
  );
};

export default ListingCard;