// src/pages/Listings.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../features/dashboard/listingSlice";

const Listings = () => {
  const dispatch = useDispatch();

  const {
    listings,
    page,
    totalPages,
    loading,
    error,
    success,
  } = useSelector((state) => state.listings);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchListings(1));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (loading) return;

    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchListings(newPage));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Listings</h2>

      {/* Loading */}
      {loading && <p>Loading listings...</p>}

      {/* Error */}
      {!loading && error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {/* Empty State */}
      {!loading && success && listings.length === 0 && (
        <p>No listings found.</p>
      )}

      {/* Listings */}
      {!loading &&
        listings.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{item.title}</h4>

            {item.description && <p>{item.description}</p>}

            <p>
              <strong>Price:</strong> {item.currency || "AED"} {item.price}
            </p>
          </div>
        ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px" }}>
          <button
            disabled={page === 1 || loading}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages || loading}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;
