const styles = {
  pageWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  breadcrumb: {
    fontSize: '13px',
    color: '#0078c1',
    marginBottom: '15px',
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '8px',
    height: '480px',
    marginBottom: '30px',
  },
  mainImageWrap: { position: 'relative' },
  fullImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px 0 0 8px',
  },
  sideImagesWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sideImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    flex: 1,
    borderRadius: '0 8px 0 0',
  },
  sideImgWithCount: { flex: 1, position: 'relative' },
  photoCount: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '4px',
  },
  badgeOverlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'flex',
    gap: '10px',
  },
  truCheckBadge: {
    background: '#fff',
    padding: '5px 10px',
    fontWeight: 'bold',
    borderRadius: '4px',
    fontSize: '12px',
  },
  offPlanBadge: {
    background: '#000',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  mainContent: { display: 'flex', gap: '40px' },
  leftCol: { flex: 2 },
  sidebar: { flex: 1 },
  priceText: { fontSize: '32px', fontWeight: 'bold', margin: 0 },
  headerRow: { display: 'flex', justifyContent: 'space-between' },
  listingTitle: { fontSize: '18px', color: '#555', marginTop: '10px' },
  specRow: {
    display: 'flex',
    gap: '20px',
    marginTop: '15px',
    fontWeight: 'bold',
  },
  sectionDivider: {
    height: '1px',
    background: '#eee',
    margin: '30px 0',
  },
  sectionHeading: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  infoTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  infoRow: {
    display: 'grid',
    gridTemplateColumns: '150px 1fr 150px 1fr',
    borderBottom: '1px solid #f5f5f5',
    paddingBottom: '10px',
  },
  label: { color: '#888', fontSize: '14px' },
  value: { fontWeight: 'bold', fontSize: '14px' },
  amenityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '15px',
  },
  amenityItem: {
    background: '#f8f8f8',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '13px',
  },
  agentCard: {
    border: '1px solid #eee',
    padding: '25px',
    borderRadius: '12px',
    position: 'sticky',
    top: '20px',
  },
  agentAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  agentInfo: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  btnPrimary: {
    width: '100%',
    padding: '12px',
    background: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  btnWhatsapp: {
    width: '100%',
    padding: '12px',
    background: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
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
