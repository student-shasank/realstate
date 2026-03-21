import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  fetchListingDetail,
  resetListingDetailState,
} from "../../features/dashboard/listingDetailSlice";
import styles from "./ListingDetail.styles";
import {
  addFavoriteLocal,
  removeFavoriteLocal,
  toggleFavorite,
} from "../../features/dashboard/favoriteligting/favoriteSlice";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { VITE_MAPBOX_TOKEN } from "../../Constant/constant";

const ListingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { listing, loading, error } = useSelector(
    (state) => state.listingDetail
  );

  // 🔐 login check
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // ✅ favorites = array of IDs
  const favorites = useSelector(
    (state) => state.favorites.favorites || []
  );

  const isFavorite = favorites.includes(listing?._id);

  // 📍 MAP
  useEffect(() => {
    if (!listing?.location?.coordinates?.coordinates) return;

    const [lng, lat] = listing.location.coordinates.coordinates;

    mapboxgl.accessToken = VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: "listing-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 14,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    return () => map.remove();
  }, [listing]);

  // 📦 FETCH LISTING
  useEffect(() => {
    dispatch(fetchListingDetail(id));
    return () => {
      dispatch(resetListingDetailState());
    };
  }, [dispatch, id]);

  // ❤️ SAVE / UNSAVE
  const handleFavorite = () => {
    if (!listing?._id) return;

    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    // ✅ instant UI (Redux)
    if (isFavorite) {
      dispatch(removeFavoriteLocal(listing._id));
    } else {
      dispatch(addFavoriteLocal(listing._id));
    }

    // ✅ backend sync
    dispatch(toggleFavorite(listing._id));
  };

  if (loading) return <div style={styles.loading}>Loading Listing...</div>;
  if (error) return <div style={styles.error}>{error}</div>;
  if (!listing) return null;

  return (
  <div className="mt-20">
    <div style={styles.pageWrapper}>
      <nav style={styles.breadcrumb}>
        Home {" > "} {listing.location?.city} {" > "}
        {listing.location?.community} {" > "}
        {listing.location?.subCommunity}
      </nav>

      <div style={styles.galleryGrid}>
        <div style={styles.mainImageWrap}>
          <img
            src="https://images.bayut.com/thumbnails/803707122-1066x800.webp"
            style={styles.fullImg}
            alt="Main"
          />
          <div style={styles.badgeOverlay}>
            <span style={styles.truCheckBadge}>✓ TruCheck™</span>
            <span style={styles.offPlanBadge}>
              {listing.completionStatus}
            </span>
          </div>
        </div>

        <div style={styles.sideImagesWrap}>
          <img
            src="https://images.bayut.com/thumbnails/751302219-1066x800.webp"
            style={styles.sideImg}
            alt="Side 1"
          />
          <div style={styles.sideImgWithCount}>
            <img
              src="https://images.bayut.com/thumbnails/751302218-1066x800.webp"
              style={styles.sideImg}
              alt="Side 2"
            />
            <div style={styles.photoCount}>
              📷 {listing.images?.length || 0}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftCol}>
          <div style={styles.headerRow}>
            <h1 style={styles.priceText}>
              {listing.currency} {listing.price?.toLocaleString()}
            </h1>

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

              <button style={styles.iconBtn}>➦ Share</button>
            </div>
          </div>

          <h2 style={styles.listingTitle}>{listing.title}</h2>

          <div style={styles.specRow}>
            <span>
              🛏️ <strong>{listing.bedrooms}</strong> Beds
            </span>
            <span>
              🛁 <strong>{listing.bathrooms}</strong> Baths
            </span>
            <span>
              📐{" "}
              <strong>
                {listing.builtUpArea?.toLocaleString()}
              </strong>{" "}
              sqft
            </span>
          </div>

          <div style={styles.sectionDivider} />

          <h3 style={styles.sectionHeading}>Property Information</h3>

          <div style={styles.infoTable}>
            <div style={styles.infoRow}>
              <span style={styles.label}>Type</span>
              <span style={styles.value}>{listing.type}</span>
              <span style={styles.label}>Furnishing</span>
              <span style={styles.value}>{listing.furnishing}</span>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.label}>Purpose</span>
              <span style={styles.value}>{listing.purpose}</span>
              <span style={styles.label}>Added on</span>
              <span style={styles.value}>
                {new Date(listing.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div style={styles.sectionDivider} />

          <h3 style={styles.sectionHeading}>Features / Amenities</h3>

          <div style={styles.amenityGrid}>
            {listing.features?.map((item, idx) => (
              <div key={idx} style={styles.amenityItem}>
                <span style={styles.amenityIcon}>✔</span> {item}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.agentCard}>
            <div style={styles.agentInfo}>
              <img
                src="https://images.bayut.com/thumbnails/764386701-800x600.webp"
                style={styles.agentAvatar}
                alt="Agent"
              />
              <div>
                <h4 style={styles.agentName}>
                  {listing.agent?.name}
                </h4>
                <p style={styles.agencyName}>
                  {listing.agent?.agency}
                </p>
              </div>
            </div>

            <button style={styles.btnPrimary}>Call Agent</button>
            <button style={styles.btnWhatsapp}>WhatsApp</button>

            <div style={styles.mapSectionWrapper}>
              <h3 style={styles.sectionHeading}>Location on Map</h3>
              <div id="listing-map" style={styles.mapSquareBox} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ListingDetail;
