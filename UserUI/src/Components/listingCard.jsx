import React from 'react';

// =========================================================
// === 1. ListingCard Styles (Refined to match the image) ===
// =========================================================
const cardStyle = {
  // Base Card Look
  border: '1px solid #e0e0e0', 
  borderRadius: '8px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', // Subtle, professional shadow
  maxWidth: '350px',
  backgroundColor: '#fff',
};

const imageContainerStyle = {
  height: '220px', 
  position: 'relative',
  overflow: 'hidden',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const detailsStyle = {
  padding: '15px',
  flexGrow: 1, 
};

// Price and Currency Style
const priceWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '1.6em',
    fontWeight: '700',
    color: '#004c7d', // Deep blue color 
};

// --- Feature/Icon Styles ---
const featuresWrapperStyle = {
  display: 'flex',
  gap: '15px',
  fontSize: '1em',
  color: '#555',
  marginBottom: '15px',
  paddingBottom: '10px',
  borderBottom: '1px solid #f0f0f0',
};

const featureItemStyle = {
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
};

// --- Badge Styles ---
const badgeBaseStyle = {
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75em',
  fontWeight: '600',
  marginRight: '8px',
  display: 'inline-block',
};

const truCheckStyle = {
  ...badgeBaseStyle,
  backgroundColor: '#007bff', // Blue
  color: 'white',
};

const offPlanStyle = {
  ...badgeBaseStyle,
  backgroundColor: '#ffc107', // Yellow/Orange
  color: '#333',
};

const badgeContainerStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    display: 'flex',
    zIndex: 10,
};

const handoverBadgeStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    backgroundColor: '#387373', // Dark Teal/Green background (matches the image element)
    color: 'white',
    padding: '8px 12px',
    fontSize: '0.85em',
    fontWeight: '600',
    borderTopRightRadius: '8px',
};

// --- Agent Info Styles ---
const agentSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '15px',
  paddingTop: '15px',
  borderTop: '1px solid #eee',
  // No borderBottom needed since there are no buttons below it
};

const agentImageStyle = {
  width: '45px', 
  height: '45px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '12px',
};


// =========================================================
// === 2. ListingCard Component Implementation =============
// =========================================================

const ListingCard = ({ listing }) => {
  const mainImage = listing.images && listing.images.length > 0 
                    ? listing.images[0] 
                    : 'https://via.placeholder.com/350x220?text=Image+Unavailable';

  const agentProfileImage = listing.agent?.profileImage || 'https://via.placeholder.com/45?text=A';
  
  const { 
    title = 'Property Listing', 
    price = 0, 
    currency = 'AED', 
    bedrooms, 
    bathrooms, 
    builtUpArea, 
    location,
    projectInfo,
  } = listing;

  const area = builtUpArea ? `${builtUpArea.toLocaleString()}` : 'N/A';
  const beds = bedrooms !== null && bedrooms !== undefined ? `${bedrooms}` : 'N/A';
  const baths = bathrooms !== null && bathrooms !== undefined ? `${bathrooms}` : 'N/A';
  const community = location?.community || 'Dubai';
  const handoverDate = projectInfo?.handoverDate;
  
  // Example Logic for Badges (replace with your actual data flags)
  const isTruChecked = true; 
  const isOffPlan = listing.completionStatus !== 'Completed';


  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        <img src="https://images.bayut.com/thumbnails/803707122-1066x800.webp" alt={title} style={imageStyle} />
        
        {/* Badges - Top Left */}
        <div style={badgeContainerStyle}>
            {isTruChecked && <span style={truCheckStyle}>✅ TruCheck</span>}
            {isOffPlan && <span style={offPlanStyle}>🚧 Off Plan</span>}
        </div>

        {/* Handover Date Badge - Bottom Left */}
        {handoverDate && (
            <div style={handoverBadgeStyle}>
                Handover Q3 {new Date(handoverDate).getFullYear()}
            </div>
        )}
      </div>
      
      <div style={detailsStyle}>
        {/* Price Section */}
        <div style={priceWrapperStyle}>
          {currency} {price.toLocaleString()}
        </div>
        
        {/* Features Row */}
        <div style={featuresWrapperStyle}>
            <div style={featureItemStyle}>
                <span role="img" aria-label="Bed Icon" style={{marginRight: '5px'}}>🛏️</span> {beds}
            </div>
            <div style={featureItemStyle}>
                <span role="img" aria-label="Bath Icon" style={{marginRight: '5px'}}>🛁</span> {baths}
            </div>
            <div style={featureItemStyle}>
                <span role="img" aria-label="Area Icon" style={{marginRight: '5px'}}>📐</span> {area} sqft
            </div>
        </div>

        {/* Title/Sub-Title */}
        <div style={{fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '5px'}}>
          {title}
        </div>
        
        {/* Community/Location */}
        <p style={{ fontSize: '0.9em', color: '#888', marginBottom: '10px' }}>
          {community}, {location?.city || 'UAE'}
        </p>

        {/* Agent Info */}
        {listing.agent && (
          <div style={agentSectionStyle}>
            <img 
              src="https://images.bayut.com/thumbnails/764386701-800x600.webp" 
              alt={listing.agent.name} 
              style={agentImageStyle} 
            />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '0.95em' }}>{listing.agent.name}</div>
              <div style={{ fontSize: '0.8em', color: '#888' }}>{listing.agent.agency}</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Action Buttons section removed */}

    </div>
  );
};

export default ListingCard;