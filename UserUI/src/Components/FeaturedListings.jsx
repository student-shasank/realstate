import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/dashboard/searchSlice";
import ListingCard from "../Components/listingCard";

const FeaturedListings = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(
      fetchProjects({
        location: "Dubai",
        limit: 6,
      })
    );
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Heading */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-gray-900">
          New Projects in Dubai
        </h3>
      </div>

      {/* Cards */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {loading && <p>Loading...</p>}

      {!loading &&
  projects?.data?.map((item) => (
    <div key={item._id} className="min-w-[300px]">
      <ListingCard listing={item} />
    </div>
  ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-6">
        <button className="px-6 py-3 rounded-lg bg-green-50 text-green-700 font-semibold hover:bg-green-100">
          View all new projects in Dubai
        </button>
      </div>
    </div>
  );
};

export default FeaturedListings;
