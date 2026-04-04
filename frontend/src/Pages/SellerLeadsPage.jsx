import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveSellerLead,
  clearSelectedLead,
  fetchSellerLeads,
  rejectSellerLead,
  setSelectedLead,
} from "../features/sellerLeads/sellerLeadsSlice";

function SellerLeadsPage() {
  const dispatch = useDispatch();
  const { leads, loading, actionLoading, error, selectedLead } = useSelector(
    (state) => state.sellerLeads
  );

  const [activeTab, setActiveTab] = useState("all");
  const [approvingId, setApprovingId] = useState(null);
  const [showApprovePopup, setShowApprovePopup] = useState(false);

  // Sirf ek baar fetch — no auto refresh
  useEffect(() => {
    dispatch(fetchSellerLeads());
  }, [dispatch]);

  const filteredLeads = useMemo(() => {
    if (activeTab === "all") return leads;
    if (activeTab === "incomplete")
      return leads.filter((lead) => lead.leadStatus === "incomplete");
    if (activeTab === "complete")
      return leads.filter(
        (lead) =>
          lead.leadStatus === "complete" && lead.approvalStatus === "pending"
      );
    if (activeTab === "approved")
      return leads.filter((lead) => lead.approvalStatus === "approved");
    if (activeTab === "rejected")
      return leads.filter((lead) => lead.approvalStatus === "rejected");
    return leads;
  }, [activeTab, leads]);

 const handleApprove = async (id) => {
    if (approvingId === id) return;
    setApprovingId(id);
    
    const result = await dispatch(approveSellerLead(id));
    
    if (approveSellerLead.fulfilled.match(result)) {
      // ✅ Success hone par popup dikhao
      setShowApprovePopup(true);
      
      // ✅ Refresh data: Server se dubara leads mangwa lo
      dispatch(fetchSellerLeads());

      // Agar detail modal open hai, toh usey bhi band kar sakte hain
      dispatch(clearSelectedLead());
    }
    
    setApprovingId(null);
  };

 const handleReject = async (id) => {
  const result = await dispatch(rejectSellerLead(id));
  if (rejectSellerLead.fulfilled.match(result)) {
    dispatch(fetchSellerLeads()); // Re-fetch data
    dispatch(clearSelectedLead());
  }
};
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  const statusBadge = (value) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    if (value === "approved") return `${base} bg-green-100 text-green-700`;
    if (value === "rejected") return `${base} bg-red-100 text-red-700`;
    if (value === "complete") return `${base} bg-blue-100 text-blue-700`;
    return `${base} bg-yellow-100 text-yellow-700`;
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#01155E]">
              Seller Leads
            </h1>
            <p className="mt-2 text-sm text-[#67739E]">
              Review seller submissions and approve listings.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {[
            { key: "all", label: "All" },
            { key: "incomplete", label: "Incomplete" },
            { key: "complete", label: "Complete" },
            { key: "approved", label: "Approved" },
            { key: "rejected", label: "Rejected" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-[#01155E] text-white"
                  : "bg-white text-[#01155E] border border-[#D9E1F2]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            Loading seller leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            No seller leads found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filteredLeads.map((lead) => (
              <div
                key={lead._id}
                className="rounded-2xl bg-white p-5 shadow-sm border border-[#EEF2F8]"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#01155E]">
                      {lead.ownerName || "No Name"}
                    </h2>
                    <p className="mt-1 text-sm text-[#67739E]">
                      {lead.propertyLocation || "-"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#67739E]">
                      {formatDate(lead.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className={statusBadge(lead.leadStatus)}>
                    {lead.leadStatus}
                  </span>
                  <span className={statusBadge(lead.approvalStatus)}>
                    {lead.approvalStatus}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-[#01155E]">
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {lead.contactNumber || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {lead.email || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Property Type:</span>{" "}
                    {lead.propertyType || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Asking Price:</span>{" "}
                    {lead.askingPrice ? `AED ${lead.askingPrice}` : "-"}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => dispatch(setSelectedLead(lead))}
                    className="rounded-xl border border-[#D9E1F2] px-4 py-2 text-sm font-medium text-[#01155E] hover:bg-[#F7F9FC]"
                  >
                    View Details
                  </button>

                  {lead.approvalStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(lead._id)}
                        disabled={approvingId === lead._id}
                        className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                      >
                        {approvingId === lead._id
                          ? "Approving..."
                          : "Approve & Create Listing"}
                      </button>

                      <button
                        onClick={() => handleReject(lead._id)}
                        disabled={actionLoading}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* APPROVE POPUP */}
        {showApprovePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-[320px] text-center">
              <h3 className="text-lg font-semibold text-[#01155E]">
                Lead Approved
              </h3>
              <p className="text-sm text-[#67739E] mt-2">
                Listing created successfully.
              </p>
              <button
                onClick={() => setShowApprovePopup(false)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#01155E]">
                  Seller Lead Details
                </h2>
                <button
                  onClick={() => dispatch(clearSelectedLead())}
                  className="rounded-lg border border-[#D9E1F2] px-4 py-2 text-sm text-[#01155E]"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-[#F7F9FC] p-4">
                  <h3 className="mb-3 text-lg font-semibold text-[#01155E]">
                    Contact Info
                  </h3>
                  <div className="space-y-2 text-sm text-[#01155E]">
                    <p><span className="font-medium">Owner:</span> {selectedLead.ownerName || "-"}</p>
                    <p><span className="font-medium">Phone:</span> {selectedLead.contactNumber || "-"}</p>
                    <p><span className="font-medium">WhatsApp:</span> {selectedLead.whatsappNumber || "-"}</p>
                    <p><span className="font-medium">Email:</span> {selectedLead.email || "-"}</p>
                    <p><span className="font-medium">Location:</span> {selectedLead.propertyLocation || "-"}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#F7F9FC] p-4">
                  <h3 className="mb-3 text-lg font-semibold text-[#01155E]">
                    Property Info
                  </h3>
                  <div className="space-y-2 text-sm text-[#01155E]">
                    <p><span className="font-medium">Type:</span> {selectedLead.propertyType || "-"}</p>
                    <p><span className="font-medium">Bedrooms:</span> {selectedLead.bedrooms || "-"}</p>
                    <p><span className="font-medium">Completion:</span> {selectedLead.completionStatus || "-"}</p>
                    <p><span className="font-medium">Community:</span> {selectedLead.community || "-"}</p>
                    <p><span className="font-medium">Project:</span> {selectedLead.projectName || "-"}</p>
                    <p><span className="font-medium">Unit:</span> {selectedLead.unitNumber || "-"}</p>
                    <p><span className="font-medium">Size:</span> {selectedLead.size || "-"}</p>
                    <p><span className="font-medium">Price:</span> {selectedLead.askingPrice ? `AED ${selectedLead.askingPrice}` : "-"}</p>
                    <p><span className="font-medium">Ownership:</span> {selectedLead.ownershipType || "-"}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#F7F9FC] p-4 md:col-span-2">
                  <h3 className="mb-3 text-lg font-semibold text-[#01155E]">
                    Seller Intent
                  </h3>
                  <div className="grid grid-cols-1 gap-2 text-sm text-[#01155E] md:grid-cols-2">
                    <p><span className="font-medium">Timeline:</span> {selectedLead.sellTimeline || "-"}</p>
                    <p><span className="font-medium">Negotiable:</span> {selectedLead.negotiable || "-"}</p>
                    <p><span className="font-medium">Reason:</span> {selectedLead.reasonForSelling || "-"}</p>
                    <p><span className="font-medium">Other Reason:</span> {selectedLead.reasonForSellingOther || "-"}</p>
                    <p><span className="font-medium">Has Agent:</span> {selectedLead.hasAgent || "-"}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#F7F9FC] p-4 md:col-span-2">
                  <h3 className="mb-3 text-lg font-semibold text-[#01155E]">
                    Additional Notes
                  </h3>
                  <p className="text-sm text-[#01155E]">
                    {selectedLead.additionalNotes || "-"}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F7F9FC] p-4 md:col-span-2">
                  <h3 className="mb-3 text-lg font-semibold text-[#01155E]">
                    Images
                  </h3>
                  {selectedLead.images?.length ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {selectedLead.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`lead-${idx}`}
                          className="h-32 w-full rounded-xl object-cover"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#67739E]">No images uploaded.</p>
                  )}
                </div>

                <div className="rounded-xl bg-[#F7F9FC] p-4 md:col-span-2">
                  <h3 className="mb-3 text-lg font-semibold text-[#01155E]">
                    Videos
                  </h3>
                  {selectedLead.videos?.length ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {selectedLead.videos.map((video, idx) => (
                        <video
                          key={idx}
                          src={video}
                          controls
                          className="w-full rounded-xl"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#67739E]">No videos uploaded.</p>
                  )}
                </div>
              </div>

              {selectedLead.approvalStatus === "pending" && (
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button
                    onClick={() => handleReject(selectedLead._id)}
                    disabled={actionLoading}
                    className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedLead._id)}
                    disabled={actionLoading}
                    className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                  >
                    Approve & Create Listing
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerLeadsPage;