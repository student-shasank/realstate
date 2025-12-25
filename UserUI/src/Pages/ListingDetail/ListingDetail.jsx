import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation  } from "react-router-dom";
import {
  fetchListingDetail,
  resetListingDetailState,
} from "../../features/dashboard/listingDetailSlice";
import styles from './ListingDetail.styles';
import { toggleFavorite } from "../../features/dashboard/favoriteligting/favoriteSlice";


const ListingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { listing, loading, error } = useSelector((state) => state.listingDetail);

  useEffect(() => {
    dispatch(fetchListingDetail(id));
    return () => { dispatch(resetListingDetailState()); };
  }, [dispatch, id]);

const { favorites = [], loading: favLoading } = useSelector(
  (state) => state.favorites || {}
);

 const isFavorite = favorites.includes(listing?._id);

// const isFavorite = favorites?.includes(listing?._id);

const handleFavorite = () => {
  if (!listing?._id) return;

  // 🚫 User not logged in → go to login
  if (!isLoggedIn) {
    navigate("/login", {
      state: { from: location.pathname },
    });
    return;
  }

  // ✅ Logged in → toggle favorite
  dispatch(toggleFavorite(listing._id));
};


const navigate = useNavigate();
const location = useLocation();

// 🔐 login check
const isLoggedIn = Boolean(localStorage.getItem("token"));


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
                  <button
      onClick={handleFavorite}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        backgroundColor: isFavorite ? "#ffe6e6" : "#fff",
        color: isFavorite ? "red" : "#333",
        cursor: "pointer",
      }}
    >
      {isFavorite ? "❤️ Saved" : "♡ Save"}
    </button>
      {/* <button
  style={{
    ...styles.iconBtn,
    backgroundColor: isFavorite ? "#e11d48" : "#fff",
    color: isFavorite ? "#fff" : "#e11d48",
    opacity: favLoading ? 0.6 : 1,
    cursor: favLoading ? "not-allowed" : "pointer",
  }}
  disabled={favLoading}
  onClick={handleFavorite}
>
  {favLoading
    ? "Saving..."
    : isFavorite
    ? "❤️ Saved"
    : "♡ Save"}
</button> */}


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



export default ListingDetail;