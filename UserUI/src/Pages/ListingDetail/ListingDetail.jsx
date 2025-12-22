import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchListingDetail,
  resetListingDetailState,
} from "../../features/dashboard/listingDetailSlice";
import styles from './ListingDetail.styles';

const ListingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { listing, loading, error } = useSelector((state) => state.listingDetail);

  useEffect(() => {
    dispatch(fetchListingDetail(id));
    return () => { dispatch(resetListingDetailState()); };
  }, [dispatch, id]);

  if (loading) return <div style={styles.loading}>Loading Listing...</div>;
  if (error) return <div style={styles.error}>{error}</div>;
  if (!listing) return null;

  return (
    <div style={styles.pageWrapper}>
      {/* 1. FIXED BREADCRUMBS */}
      <nav style={styles.breadcrumb}>
        Home {' > '} {listing.location?.city} {' > '} {listing.location?.community} {' > '} {listing.location?.subCommunity}
      </nav>

      {/* 2. IMAGE GALLERY (Grid) */}
      <div style={styles.galleryGrid}>
        <div style={styles.mainImageWrap}>
          <img src="https://images.bayut.com/thumbnails/803707122-1066x800.webp" style={styles.fullImg} alt="Main" />
          <div style={styles.badgeOverlay}>
            <span style={styles.truCheckBadge}>✓ TruCheck™</span>
            <span style={styles.offPlanBadge}>{listing.completionStatus}</span>
          </div>
        </div>
        <div style={styles.sideImagesWrap}>
          <img src="https://images.bayut.com/thumbnails/751302219-1066x800.webp"style={styles.sideImg} alt="Side 1" />
          <div style={styles.sideImgWithCount}>
            <img src="https://images.bayut.com/thumbnails/751302218-1066x800.webp" style={styles.sideImg} alt="Side 2" />
            <div style={styles.photoCount}>📷 {listing.images?.length || 0}</div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftCol}>
          <div style={styles.headerRow}>
            <h1 style={styles.priceText}>{listing.currency} {listing.price?.toLocaleString()}</h1>
            <div style={styles.actionBtns}>
              <button style={styles.iconBtn}>♡ Save</button>
              <button style={styles.iconBtn}>➦ Share</button>
            </div>
          </div>

          <h2 style={styles.listingTitle}>{listing.title}</h2>
          <div style={styles.specRow}>
            <span>🛏️ <strong>{listing.bedrooms}</strong> Beds</span>
            <span>🛁 <strong>{listing.bathrooms}</strong> Baths</span>
            <span>📐 <strong>{listing.builtUpArea?.toLocaleString()}</strong> sqft</span>
          </div>

          <div style={styles.sectionDivider} />

          {/* 3. PROPERTY INFORMATION (Reference Table) */}
          <h3 style={styles.sectionHeading}>Property Information</h3>
          <div style={styles.infoTable}>
            <div style={styles.infoRow}>
              <span style={styles.label}>Type</span><span style={styles.value}>{listing.type}</span>
              <span style={styles.label}>Furnishing</span><span style={styles.value}>{listing.furnishing}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Purpose</span><span style={styles.value}>{listing.purpose}</span>
              <span style={styles.label}>Added on</span><span style={styles.value}>{new Date(listing.createdAt).toLocaleDateString()}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Completion</span><span style={styles.value}>{listing.completionStatus}</span>
              <span style={styles.label}>Handover Date</span><span style={styles.value}>{listing.projectInfo?.handoverDate}</span>
            </div>
          </div>

          <div style={styles.sectionDivider} />

          {/* 4. VALIDATED INFORMATION (Emaar Style) */}
          <h3 style={styles.sectionHeading}>Validated Information ✓</h3>
          <div style={styles.infoTable}>
            <div style={styles.infoRow}>
              <span style={styles.label}>Ownership</span><span style={styles.value}>{listing.validatedInfo?.ownership}</span>
              <span style={styles.label}>Built-up Area</span><span style={styles.value}>{listing.validatedInfo?.builtUpArea?.toLocaleString()} sqft</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Plot Area</span><span style={styles.value}>{listing.validatedInfo?.plotArea?.toLocaleString()} sqft</span>
              <span style={styles.label}>Usage</span><span style={styles.value}>{listing.validatedInfo?.usage}</span>
            </div>
          </div>

          <div style={styles.sectionDivider} />

          {/* 5. AMENITIES BOXES */}
          <h3 style={styles.sectionHeading}>Features / Amenities</h3>
          <div style={styles.amenityGrid}>
            {listing.features?.map((item, idx) => (
              <div key={idx} style={styles.amenityItem}>
                <span style={styles.amenityIcon}>✔</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <div style={styles.agentCard}>
            <div style={styles.agentInfo}>
              <img src="https://images.bayut.com/thumbnails/764386701-800x600.webp" style={styles.agentAvatar} alt="Agent" />
              <div>
                <h4 style={styles.agentName}>{listing.agent?.name}</h4>
                <p style={styles.agencyName}>{listing.agent?.agency}</p> 
              </div>
            </div>
            <button style={styles.btnPrimary}>Call Agent</button>
            <button style={styles.btnWhatsapp}>WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ... Styles remain the same as previous response ...
// const styles = {
//   pageWrapper: { maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
//   breadcrumb: { fontSize: '13px', color: '#0078c1', marginBottom: '15px' },
//   galleryGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', height: '480px', marginBottom: '30px' },
//   mainImageWrap: { position: 'relative' },
//   fullImg: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px 0 0 8px' },
//   sideImagesWrap: { display: 'flex', flexDirection: 'column', gap: '8px' },
//   sideImg: { width: '100%', height: '100%', objectFit: 'cover', flex: 1, borderRadius: '0 8px 0 0' },
//   sideImgWithCount: { flex: 1, position: 'relative' },
//   photoCount: { position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '5px 10px', borderRadius: '4px' },
//   badgeOverlay: { position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' },
//   truCheckBadge: { background: '#fff', padding: '5px 10px', fontWeight: 'bold', borderRadius: '4px', fontSize: '12px' },
//   offPlanBadge: { background: '#000', color: '#fff', padding: '5px 10px', borderRadius: '4px', fontSize: '12px' },
//   mainContent: { display: 'flex', gap: '40px' },
//   leftCol: { flex: 2 },
//   sidebar: { flex: 1 },
//   priceText: { fontSize: '32px', fontWeight: 'bold', margin: 0 },
//   headerRow: { display: 'flex', justifyContent: 'space-between' },
//   listingTitle: { fontSize: '18px', color: '#555', marginTop: '10px' },
//   specRow: { display: 'flex', gap: '20px', marginTop: '15px', fontWeight: 'bold' },
//   sectionDivider: { height: '1px', background: '#eee', margin: '30px 0' },
//   sectionHeading: { fontSize: '20px', marginBottom: '20px' },
//   infoTable: { display: 'flex', flexDirection: 'column', gap: '15px' },
//   infoRow: { display: 'grid', gridTemplateColumns: '150px 1fr 150px 1fr', borderBottom: '1px solid #f5f5f5', paddingBottom: '10px' },
//   label: { color: '#888', fontSize: '14px' },
//   value: { fontWeight: 'bold', fontSize: '14px' },
//   amenityGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' },
//   amenityItem: { background: '#f8f8f8', padding: '15px', borderRadius: '8px', fontSize: '13px' },
//   agentCard: { border: '1px solid #eee', padding: '25px', borderRadius: '12px', sticky: 'top', position: 'sticky', top: '20px' },
//   agentAvatar: { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' },
//   agentInfo: { display: 'flex', gap: '15px', marginBottom: '20px' },
//   btnPrimary: { width: '100%', padding: '12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '10px' },
//   btnWhatsapp: { width: '100%', padding: '12px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
// };

export default ListingDetail;