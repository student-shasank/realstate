const styles = {
  pageWrapper: {
    maxWidth: '1290px',
    margin: '0 auto',
    padding: '24px 20px',
    fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    color: '#1A1E25',
  },
  breadcrumb: {
    fontSize: '13px',
    color: '#8A94B2',
    marginBottom: '15px',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '12px',
    height: '520px',
    marginBottom: '30px',
  },
  mainImageWrap: { 
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
  },
  fullImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    cursor: 'pointer',
  },
  sideImagesWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sideImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    flex: 1,
    borderRadius: '12px',
    transition: 'opacity 0.2s ease',
    cursor: 'pointer',
  },
  sideImgWithCount: { 
    flex: 1, 
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  photoCount: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  badgeOverlay: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    display: 'flex',
    gap: '8px',
    zIndex: 10,
  },
  truCheckBadge: {
    background: '#007BFF',
    color: '#fff',
    padding: '6px 12px',
    fontWeight: '600',
    borderRadius: '6px',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  offPlanBadge: {
    background: '#222',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  mainContent: { display: 'flex', gap: '48px', marginTop: '10px' },
  leftCol: { flex: 2 },
  sidebar: { flex: 1 },
  priceText: { 
    fontSize: '36px', 
    fontWeight: '800', 
    margin: 0, 
    color: '#01155E' 
  },
  headerRow: { display: 'flex', justifyContent: 'space-between' },
  listingTitle: { 
    fontSize: '20px', 
    color: '#4B5563', 
    marginTop: '8px',
    lineHeight: '1.5'
  },
  specRow: {
    display: 'flex',
    gap: '24px',
    marginTop: '20px',
    fontWeight: '600',
    color: '#1F2937',
  },
  sectionDivider: {
    height: '1px',
    background: '#E5E7EB',
    margin: '40px 0',
  },
  sectionHeading: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#01155E',
  },
  infoTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoRow: {
    display: 'grid',
    gridTemplateColumns: '150px 1fr 150px 1fr',
    borderBottom: '1px solid #F3F4F6',
    paddingBottom: '12px',
  },
  label: { color: '#6B7280', fontSize: '14px' },
  value: { fontWeight: '600', fontSize: '14px', color: '#111827' },
  amenityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '16px',
  },
  amenityItem: {
    background: '#F9FAFB',
    padding: '16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    border: '1px solid #F3F4F6',
  },
  agentCard: {
    border: '1px solid #E5E7EB',
    padding: '28px',
    borderRadius: '16px',
    position: 'sticky',
    top: '24px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#fff',
  },
  agentAvatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #F3F4F6',
  },
  agentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  btnPrimary: {
    width: '100%',
    padding: '14px',
    background: '#01155E',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '12px',
    transition: 'background 0.2s ease',
    ':hover': {
      background: '#254B86'
    }
  },
  btnWhatsapp: {
    width: '100%',
    padding: '14px',
    background: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    ':hover': {
      opacity: 0.9
    }
  },
  iconBtn: {
    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    
    // Sizing & Spacing
    padding: '8px 20px',
    minWidth: '100px',
    
    // Aesthetic
    backgroundColor: '#ffffff',
    color: '#333333',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif', // Use a clean font
    
    // Border & Corners
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    
    // Interaction
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.04)',
    outline: 'none',
  },
  // styles.js (Ensure these are in your object)

  mapSectionWrapper: {
    marginTop: "32px", 
    width: "100%",
  },
  sectionHeading: {
    fontSize: "1.25rem",  
    fontWeight: "600",
    marginBottom: "16px",
    color: "#111827",
  },
  mapSquareBox: {
    width: "100%",
    aspectRatio: "1 / 1", // This is the key for the square shape
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #E5E7EB", 
    backgroundColor: "#f9f9f9", // Helpful as a placeholder before map loads
  },

  // Add these effects for a "Premium" feel
  hoverEffect: {
    backgroundColor: '#fff',
    borderColor: '#ff4d6d', // Soft pink/red border on hover
    color: '#ff4d6d',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(255, 77, 109, 0.15)',
  },
  loading: { padding: '40px', textAlign: 'center' },
  error: { padding: '40px', color: 'red', textAlign: 'center' },
};

export default styles;
