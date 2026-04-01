import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { Links, NavLink } from "react-router-dom";
 import { Link } from "react-router-dom";
import {
  fetchDashboard,
  updateListingStatus,
  updateListingAvailability,
  updateListingFeatured,
} from "../features/dashboard/dashboardSlice";


// Filter tabs
const TABS = {
  ALL: "All",
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

// Availability options
const AVAILABILITY = {
  AVAILABLE: "Available",
  NOT_AVAILABLE: "Unavailable",
};

function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);

  // Status update state
  const [editStatusId, setEditStatusId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Availability update state
  const [editAvailabilityId, setEditAvailabilityId] = useState(null);
  const [newAvailability, setNewAvailability] = useState("");

  const [activeTab, setActiveTab] = useState(TABS.ALL);

  const [editFeaturedId, setEditFeaturedId] = useState(null);
const [newFeatured, setNewFeatured] = useState("");



  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const filteredListings = useMemo(() => {
    if (!data || !Array.isArray(data.listings)) return [];
    if (activeTab === TABS.ALL) return data.listings;
    return data.listings.filter(
      (item) => item.completionStatus === activeTab
    );
  }, [data, activeTab]);

  const getStatusColor = (status) => {
    if (status === TABS.APPROVED) return "bg-green-100 text-green-700";
    if (status === TABS.REJECTED) return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getAvailabilityColor = (availability) => {
    if (availability === AVAILABILITY.AVAILABLE)
      return "bg-blue-100 text-blue-700";
    return "bg-gray-200 text-gray-700";
  };

  if (loading) return <h2 className="text-center">Loading...</h2>;
  if (error) return <h3 className="text-red-500 text-center">{error}</h3>;
  if (!data?.listings)
    return <p className="text-center mt-6">No listings found</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
  <h2 className="text-3xl font-bold">Admin Dashboard</h2>

  <div className="flex items-center gap-3">
    <Link
      to="/seller-leads"
      className="bg-[#01155E] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
    >
      View Seller Leads
    </Link>

    <Link
      to="/listingcreation"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
    >
      + Create Listing
    </Link>
  </div>
</div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b">
        {Object.values(TABS).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 ${
              activeTab === tab
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredListings.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            {/* Image */}
            {item.images?.length > 0 && (
              <img
                src={item.images[0]}
                className="w-full h-56 object-cover rounded-lg mb-4"
                alt=""
              />
            )}

            {/* Title & Price */}
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">{item.title}</h3>
              <span className="text-green-600 font-bold">
                {item.currency} {item.price.toLocaleString()}
              </span>
            </div>

            {/* Status & Availability */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  item.completionStatus
                )}`}
              >
                {item.completionStatus}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getAvailabilityColor(
                  item.availability
                )}`}
              >
                {item.availability || AVAILABILITY.NOT_AVAILABLE}
              </span>

              <button
                className="text-blue-600 text-sm"
                onClick={() => {
                  setEditStatusId(item._id);
                  setNewStatus(item.completionStatus);
                }}
              >
                Update Status
              </button>

              <button
                className="text-purple-600 text-sm"
                onClick={() => {
                  setEditAvailabilityId(item._id);
                  setNewAvailability(item.availability);
                }}
              >
                Update Availability
              </button>

              
            </div>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
  {item.isFeatured ? "Featured" : "Not Featured"}
</span>

<button
  className="text-pink-600 text-sm pt-5"
  onClick={() => {
    setEditFeaturedId(item._id);
    setNewFeatured(item.isFeatured ? "true" : "false");
  }}
>
  Mark Featured
</button>

{editFeaturedId === item._id && (
  <div className="mt-3 flex gap-3">
    <select
      className="border px-3 py-2 rounded"
      value={newFeatured}
      onChange={(e) => setNewFeatured(e.target.value)}
    >
      <option value="true">Featured</option>
      <option value="false">Not Featured</option>
    </select>

    <button
      className="bg-pink-600 text-white px-4 rounded"
      onClick={() => {
        dispatch(
          updateListingFeatured({
            id: item._id,
            isFeatured: newFeatured === "true",
          })
        );
        setEditFeaturedId(null);
      }}
    >
      Save
    </button>
  </div>
)}
            
               
            {/* Status Update */}
            {editStatusId === item._id && (
              <div className="mt-3 flex gap-3">
                <select
                  className="border px-3 py-2 rounded"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value={TABS.PENDING}>Pending</option>
                  <option value={TABS.APPROVED}>Approved</option>
                  <option value={TABS.REJECTED}>Rejected</option>
                </select>
                <button
                  className="bg-blue-600 text-white px-4 rounded"
                  onClick={() => {
                    dispatch(
                      updateListingStatus({
                        id: item._id,
                        status: newStatus,
                      })
                    );
                    setEditStatusId(null);
                  }}
                >
                  Save
                </button>
              </div>
            )}




            {/* Availability Update */}
            {editAvailabilityId === item._id && (
              <div className="mt-3 flex gap-3">
                <select
                  className="border px-3 py-2 rounded"
                  value={newAvailability}
                  onChange={(e) => setNewAvailability(e.target.value)}
                >
                  <option value={AVAILABILITY.AVAILABLE}>Available</option>
                  <option value={AVAILABILITY.NOT_AVAILABLE}>
                    Not Available
                  </option>
                </select>
                <button
                  className="bg-purple-600 text-white px-4 rounded"
                  onClick={() => {
                    dispatch(
                      updateListingAvailability({
                        id: item._id,
                        availability: newAvailability,
                      })
                    );
                    setEditAvailabilityId(null);
                  }}
                >
                  Save
                </button>
              </div>
            )}
           

            {/* Rooms */}
            <p className="mt-3 text-gray-600">
              Bedrooms: <b>{item.bedrooms}</b> | Bathrooms:{" "}
              <b>{item.bathrooms}</b>
            </p>

            {/* Features */}
            {item.features?.length > 0 && (
              <>
                <h4 className="mt-3 font-semibold">Features:</h4>
                <ul className="list-disc pl-5">
                  {item.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Payment Plan */}
            {item.paymentPlan && (
              <>
                <h4 className="mt-3 font-semibold">Payment Plan:</h4>
                {item.paymentPlan.downPayment && (
                  <p>Down Payment: {item.paymentPlan.downPayment}%</p>
                )}
                {item.paymentPlan.installmentPlan?.length > 0 && (
                  <ul className="list-disc pl-5">
                    {item.paymentPlan.installmentPlan.map((p, i) => (
                      <li key={i}>
                        {p.month} – <b>{p.percent}%</b>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Agent */}
            {item.agent && (
              <>
                <h4 className="mt-3 font-semibold">Agent:</h4>
                <p>
                  {item.agent.name} ({item.agent.agency})
                </p>
                <p>Phone: {item.agent.phone}</p>
              </>
            )}

            {/* Location */}
            {item.location && (
              <>
                <h4 className="mt-3 font-semibold">Location:</h4>
                <p>City: {item.location.city}</p>
                <p>Community: {item.location.community}</p>
                {item.location.subCommunity && (
                  <p>Sub-Community: {item.location.subCommunity}</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
