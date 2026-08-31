import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCommunitiesPage,
  setCurrentPage,
  setSearchTerm,
} from "../../features/communities/communitySlice.js";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dqj4vs1la/image/upload/v1771046752/communities/img-1771046744365-c0bcc33cd3e42269d6dcff16f6d0170e5acdaca9.jpg";

const PER_PAGE = 9;
const SEARCH_DEBOUNCE_MS = 300;

function AllCommunities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: allCommunities,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
  } = useSelector((state) => state.community);

  const [searchInput, setSearchInput] = useState("");

  // ✅ Debounce: typing rukne ke 300ms baad Redux searchTerm update hota hai
  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === searchTerm) return;

    const timer = setTimeout(() => {
      dispatch(setSearchTerm(trimmed));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // ✅ Page ya searchTerm badalte hi server se sirf usi page ka data aata hai
  useEffect(() => {
    dispatch(
      fetchCommunitiesPage({ page: currentPage, perPage: PER_PAGE, search: searchTerm })
    );
  }, [dispatch, currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput.trim()));
  };

  const handleClear = () => {
    setSearchInput("");
    dispatch(setSearchTerm(""));
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="bg-white py-30 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[#01155E] font-archivo font-semibold text-[32px] md:text-[48px] uppercase">
            Our Communities
          </h1>
          <div className="flex w-full max-w-[400px]">
            <div className="w-[120px] md:w-[162px] h-[6px] md:h-[8px] bg-[#01155E]" />
            <div className="flex-1 h-[2px] bg-[#01155E] self-end mb-[2px]" />
          </div>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 mb-12 max-w-xl"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search communities..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#01155E] font-archivo text-[#01155E] transition"
            />
            {(searchInput.trim() !== searchTerm || loading) && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ...
              </span>
            )}
          </div>

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="w-[120px] h-[48px] bg-[#01155E] text-white rounded-[8px] font-bold text-[16px] flex items-center justify-center hover:bg-opacity-90 transition-all active:scale-95"
            >
              Clear
            </button>
          )}
        </form>

        {/* First load */}
        {loading && allCommunities.length === 0 && (
          <div className="flex flex-col h-[40vh] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#01155E]"></div>
            <p className="mt-4 font-archivo text-[#01155E] animate-pulse uppercase tracking-widest text-sm">
              {searchTerm ? `Searching "${searchTerm}"...` : "Fetching Communities..."}
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20 text-xl text-red-500 font-archivo">
            {error}
          </div>
        )}

        {!loading && !error && allCommunities.length === 0 && (
          <div className="text-center py-24">
            <h2 className="text-gray-400 font-archivo text-xl">
              {searchTerm
                ? `No communities found for "${searchTerm}".`
                : "No communities found."}
            </h2>
          </div>
        )}

        {!loading && !error && allCommunities.length > 0 && (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {allCommunities.map((item) => (
                <div
                  key={item._id?.$oid || item._id}
                  className="flex flex-col max-w-[390px] w-full group cursor-pointer"
                >
                  <div className="relative h-[267px] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${item.marketSupply?.image || DEFAULT_IMAGE})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/75" />
                    <div className="absolute inset-0 p-8 flex opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-white">
                      <div className="w-1 bg-white rounded-full mr-5 shrink-0 h-14" />
                      <div className="overflow-hidden">
                        <p className="font-bold text-[16px] mb-3 font-archivo uppercase tracking-wider text-white">
                          Location & Connectivity
                        </p>
                        <div
                          className="text-[13px] leading-relaxed line-clamp-6 opacity-90 connectivity-content font-archivo"
                          dangerouslySetInnerHTML={{
                            __html: item.overview?.locationConnectivityHtml,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col border-l-4 border-[#01155E] pl-5 mt-5 min-h-[90px] justify-center transition-all group-hover:border-l-8">
                    <h3 className="text-[#01155E] font-bold text-[22px] sm:text-[24px] font-archivo uppercase leading-tight">
                      {item.title?.replace(/^Community \d+-\s*/i, "")}
                    </h3>
                    <button
                      onClick={() => navigate(`/communities/${item.slug}`)}
                      className="mt-3 flex items-center gap-2 text-[#01155E] font-bold text-[13px] uppercase tracking-[0.15em] transition-all hover:gap-4 w-fit group/btn"
                    >
                      <span className="relative">
                        Learn More
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#01155E] transition-all group-hover/btn:w-full"></span>
                      </span>
                      <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Numbered pagination — Blog.jsx jaisa */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-[#01155E] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Prev
                </button>

                {getPageNumbers()[0] > 1 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 text-[#01155E] font-medium hover:bg-gray-50 transition"
                    >
                      1
                    </button>
                    {getPageNumbers()[0] > 2 && <span className="text-gray-400">...</span>}
                  </>
                )}

                {getPageNumbers().map((num) => (
                  <button
                    key={num}
                    onClick={() => goToPage(num)}
                    className={`w-10 h-10 rounded-lg border font-medium transition ${
                      num === currentPage
                        ? "bg-[#01155E] text-white border-[#01155E]"
                        : "border-gray-300 text-[#01155E] hover:bg-gray-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                  <>
                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                      <span className="text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="w-10 h-10 rounded-lg border border-gray-300 text-[#01155E] font-medium hover:bg-gray-50 transition"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-[#01155E] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .connectivity-content h3 { font-size: 15px; font-weight: bold; margin-bottom: 5px; color: white; }
        .connectivity-content ul { list-style: disc; padding-left: 15px; }
        .connectivity-content li { margin-bottom: 6px; font-size: 12.5px; }
        .connectivity-content strong { color: #fff; font-weight: 700; }
      `}</style>
    </div>
  );
}

export default AllCommunities;