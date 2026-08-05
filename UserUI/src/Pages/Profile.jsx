import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingByIdThunk } from "../features/dashboard/fetchListingById.jsx";
import { updateUser, resetUpdateUser } from "../features/Authentation/updateUserSlice.js";
import { useNavigate } from "react-router-dom";
import ListingCard from "../Components/Card/ListingCard.jsx";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const MailIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#67739E" strokeWidth="1.8" />
    <path d="M3 9l9 5 9-5" stroke="#67739E" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <path
      d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1H7.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.01l-2.2 2.22z"
      stroke="#67739E"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#67739E" strokeWidth="1.8" />
    <path d="M8 11V7a4 4 0 118 0v4" stroke="#67739E" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "#ff0000" : "none"}
    stroke={filled ? "#ff0000" : "#67739E"}
    strokeWidth="2"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path
      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ── Password Change Modal ──────────────────────────────────────────────────────
const PasswordModal = ({ onClose }) => {
  const storedUser = getStoredUser();

  const [form, setForm] = useState({
    current: storedUser.password || "", // pre-fill old password if it exists in localStorage
    newPass: "",
    confirm: "",
  });
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl font-['General_Sans']"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[22px] font-bold text-[#01155E]">Change Password</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E9EEF6] flex items-center justify-center text-[#67739E] hover:bg-[#D9E1F2] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {["current", "newPass", "confirm"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-[#01155E] text-[14px] font-semibold mb-1.5">
              {field === "current"
                ? "Current Password"
                : field === "newPass"
                ? "New Password"
                : "Confirm New Password"}
            </label>
            <div className="relative">
              <input
                type={show[field] ? "text" : "password"}
                placeholder="••••••••"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full p-3 pr-10 border border-[#D9E1F2] rounded-[10px] text-[#01155E] text-[15px] focus:ring-2 focus:ring-[#01155E] focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, [field]: !show[field] })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#67739E] hover:text-[#01155E] transition-colors"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  {show[field] ? (
                    <>
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <line
                        x1="1"
                        y1="1"
                        x2="23"
                        y2="23"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[#D9E1F2] text-[#67739E] rounded-[10px] font-semibold text-[15px] hover:bg-[#E9EEF6] transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 bg-[#01155E] text-white rounded-[10px] font-semibold text-[15px] hover:opacity-90 transition-opacity">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Profile Page ──────────────────────────────────────────────────────────
export default function Profile() {
  const [activeTab, setActiveTab] = useState("favorites");
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const storedUser = getStoredUser();
  const [user, setUser] = useState({
    name: storedUser.name || storedUser.username || "User",
    email: storedUser.email || "",
    phone: storedUser.phone || storedUser.phoneNumber || "",
    joinDate: storedUser.createdAt
      ? new Date(storedUser.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "",
  });
  const [editForm, setEditForm] = useState({ name: user.name, phone: user.phone });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ── Redux state — updateUser
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector(
    (state) => state.updateUser
  );

  // ── Favorites
  const favoriteIds = useSelector((state) => state.favorites.favorites || []);
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [favLoading, setFavLoading] = useState(false);

  // ── Fetch favorites
  useEffect(() => {
    let isMounted = true;
    if (favoriteIds.length === 0) {
      setFavoriteListings([]);
      return;
    }
    const fetchAll = async () => {
      setFavLoading(true);
      try {
        const results = await Promise.all(
          favoriteIds.map((id) => dispatch(fetchListingByIdThunk(id)).unwrap())
        );

        if (isMounted) {
          setFavoriteListings(results);
        }
      } catch (err) {
        console.error("Failed to fetch favorite listings:", err);
      } finally {
        if (isMounted) setFavLoading(false);
      }
    };
    fetchAll();

    return () => {
      isMounted = false;
    };
  }, [dispatch, favoriteIds]);

  // ── updateUser success handler
  useEffect(() => {
    if (updateSuccess) {
      // UI update
      setUser((prev) => ({ ...prev, name: editForm.name, phone: editForm.phone }));
      setEditMode(false);

      // localStorage sync
      const stored = getStoredUser();
      localStorage.setItem(
        "user",
        JSON.stringify({ ...stored, name: editForm.name, phone: editForm.phone })
      );

      dispatch(resetUpdateUser());
    }
  }, [updateSuccess, dispatch, editForm]);

  // ── Save handler — dispatch to Redux
  const handleSaveEdit = () => {
    const stored = getStoredUser();
    const userId = stored._id || stored.id;

    if (!userId) {
      console.error("User ID nahi mila localStorage mein");
      return;
    }

    dispatch(
      updateUser({
        id: userId,
        formData: {
          name: editForm.name,
          phone: editForm.phone,
        },
      })
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F7FC] font-['General_Sans'] mt-10">
      <div className="w-full max-w-[1440px] mx-auto px-[120px] py-8">
        {/* ── PROFILE HEADER CARD ── */}
        <div className="bg-white rounded-[16px] border border-[#D9E1F2] shadow-sm overflow-hidden mb-6 mt-30 max-w-[1200px]">
          <div className="px-8 pb-6 mt-10">
            {/* Avatar row */}
            <div className="flex items-end justify-between -mt-7 mb-4">
              <div className="flex items-end gap-5">
  <div className="w-[64px] h-[64px] rounded-full bg-[#01155E] border-4 border-white shadow-lg flex items-center justify-center text-white text-[26px] font-bold flex-shrink-0">
    {user.name.charAt(0)}
  </div>

  <div className="pb-1">
    {editMode ? (
      <input
        value={editForm.name}
        onChange={(e) =>
          setEditForm({ ...editForm, name: e.target.value })
        }
        className="text-[22px] font-bold text-[#01155E] border-b-2 border-[#2F6BFF] outline-none bg-transparent w-[280px]"
      />
    ) : (
      <h1 className="text-[22px] font-bold text-[#01155E]">
        {user.name}
      </h1>
    )}

    <p className="text-[#67739E] text-[14px]">
      Member since {user.joinDate || "N/A"}
    </p>
  </div>
</div>

              {/* Edit buttons */}
              <div className="flex gap-2 pb-1">
                {editMode ? (
                  <>
                    {updateError && (
                      <p className="text-red-500 text-[13px] self-center mr-2">{updateError}</p>
                    )}
                    <button
                      onClick={() => {
                        setEditMode(false);
                        dispatch(resetUpdateUser());
                      }}
                      disabled={updateLoading}
                      className="px-4 py-2 border border-[#D9E1F2] text-[#67739E] text-[14px] font-semibold rounded-[10px] hover:bg-[#E9EEF6] transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      disabled={updateLoading}
                      className="px-4 py-2 bg-[#01155E] text-white text-[14px] font-semibold rounded-[10px] hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
                    >
                      {updateLoading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#01155E] text-[#01155E] text-[14px] font-semibold rounded-[10px] hover:bg-[#01155E] hover:text-white transition-colors"
                  >
                    <EditIcon />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Email */}
              <div className="flex items-center gap-3 p-4 bg-[#F4F7FC] rounded-[10px]">
                <div className="w-9 h-9 rounded-full bg-white border border-[#D9E1F2] flex items-center justify-center flex-shrink-0">
                  <MailIcon />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[#67739E] text-[11px] font-medium uppercase tracking-wide">
                    Email
                  </p>
                  <p className="text-[#01155E] text-[14px] font-semibold truncate">
                    {user.email || "—"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-4 bg-[#F4F7FC] rounded-[10px]">
                <div className="w-9 h-9 rounded-full bg-white border border-[#D9E1F2] flex items-center justify-center flex-shrink-0">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-[#67739E] text-[11px] font-medium uppercase tracking-wide">
                    Phone
                  </p>
                  {editMode ? (
                    <input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="text-[#01155E] text-[14px] font-semibold border-b border-[#2F6BFF] outline-none bg-transparent w-full"
                    />
                  ) : (
                    <p className="text-[#01155E] text-[14px] font-semibold">
                      {user.phone || "—"}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="flex items-center gap-3 p-4 bg-[#F4F7FC] rounded-[10px]">
                <div className="w-9 h-9 rounded-full bg-white border border-[#D9E1F2] flex items-center justify-center flex-shrink-0">
                  <LockIcon />
                </div>
                <div className="flex-1">
                  <p className="text-[#67739E] text-[11px] font-medium uppercase tracking-wide">
                    Password
                  </p>
                  <p className="text-[#01155E] text-[14px] font-semibold tracking-widest">
                    ••••••••
                  </p>
                </div>
                {editMode && (
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="text-[13px] text-[#2F6BFF] font-semibold underline underline-offset-2 hover:text-[#01155E] transition-colors flex-shrink-0"
                  >
                    Change
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1 bg-white border border-[#D9E1F2] rounded-[10px] p-1 mb-6 w-fit shadow-sm">
          {[
            { id: "favorites", label: `Favourite Listings (${favoriteListings.length})` },
            { id: "compare", label: "Compare" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "compare") {
                  navigate("/compare");
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`px-6 py-2.5 rounded-[8px] text-[14px] font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#01155E] text-white shadow-sm"
                  : "text-[#67739E] hover:text-[#01155E] hover:bg-[#F4F7FC]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        {activeTab === "favorites" && (
          <div className="space-y-4 max-w-[1200px]">
            {/* Loading spinner */}
            {favLoading && (
              <div className="flex justify-center py-16">
                <div
                  className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderColor: "#D9E1F260", borderTopColor: "#01155E" }}
                />
              </div>
            )}

            {/* Empty state */}
            {!favLoading && favoriteListings.length === 0 && (
              <div className="bg-white rounded-[16px] border border-[#D9E1F2] p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-[#E9EEF6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon filled={false} />
                </div>
                <p className="text-[#01155E] text-[18px] font-semibold mb-1">
                  No Favourites Yet
                </p>
                <p className="text-[#67739E] text-[14px]">
                  Like listings from the properties page to save them here.
                </p>
              </div>
            )}

            {/* Listing Cards */}
            {!favLoading &&
              favoriteListings.map((listing, index) => (
                <ListingCard
                  key={listing._id || listing.id || index}
                  listing={listing}
                  onRequireLogin={() => setShowLoginPrompt(true)}
                />
              ))}
          </div>
        )}
      </div>

      {/* ── PASSWORD MODAL ── */}
      {showPasswordModal && <PasswordModal onClose={() => setShowPasswordModal(false)} />}

      {/* ── LOGIN PROMPT ── */}
      {showLoginPrompt && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center font-['General_Sans']"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 bg-[#E9EEF6] rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon filled={false} />
            </div>
            <h3 className="text-[20px] font-bold text-[#01155E] mb-2">Login Required</h3>
            <p className="text-[#67739E] text-[14px] mb-6">
              Please login to save your favourite listings.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 py-3 border border-[#D9E1F2] text-[#67739E] rounded-[10px] font-semibold text-[14px] hover:bg-[#E9EEF6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex-1 py-3 bg-[#01155E] text-white rounded-[10px] font-semibold text-[14px] hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}