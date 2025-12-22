import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../features/dashboard/listingSlice";
// Import the new ListingCard component
import ListingCard from "../Components/Card/listingCard"; 

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
    // You might want to remove this if you handle initial fetch elsewhere
    // or ensure your API uses a default page size (e.g., 20)
    dispatch(fetchListings(1)); 
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (loading) return;

    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchListings(newPage));
    }
  };

  // Grid style to display cards side-by-sideff  eee
  const listingsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Responsive grid
    gap: '20px',
    marginTop: '20px',
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

      {/* Listings Container using the Grid Style */}
      {!loading && listings.length > 0 && (
        <div style={listingsGridStyle}>
          {listings.map((item) => (
            // Use the new ListingCard for each item
            <ListingCard key={item._id} listing={item} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px", textAlign: 'center' }}>
          <button
            disabled={page === 1 || loading}
            onClick={() => handlePageChange(page - 1)}
            style={{ padding: '8px 15px', marginRight: '10px' }}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages || loading}
            onClick={() => handlePageChange(page + 1)}
            style={{ padding: '8px 15px', marginLeft: '10px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;