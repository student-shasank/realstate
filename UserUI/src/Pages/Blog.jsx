import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogsPage,
  setCurrentPage,
  setSearchTerm,
} from "../features/dashboard/Blogslice.jsx";
import Seo from "../Components/Seo.jsx";

const PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 300;

function Blog() {
  const dispatch = useDispatch();
  const {
    items: posts,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
  } = useSelector((state) => state.blogs);

  const [searchInput, setSearchInput] = useState("");

  // Debounce: typing rukne ke 300ms baad Redux searchTerm update hota hai
  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === searchTerm) return;

    const timer = setTimeout(() => {
      dispatch(setSearchTerm(trimmed));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // Page ya searchTerm badalte hi server se sirf usi page ka data aata hai
  useEffect(() => {
    dispatch(
      fetchBlogsPage({ page: currentPage, perPage: PER_PAGE, search: searchTerm })
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

  const canonicalPath =
    currentPage > 1 ? `/contact?page=${currentPage}` : "/contact";
  const isSearchActive = Boolean(searchTerm);

  return (
    <div className="max-w-6xl mx-auto py-16 px-5 mt-20">
      <Seo
        title="Blogs | Yupland"
        description="Discover Dubai's newest launches with expert guidance to secure the best prices and the most desirable units."
        canonicalPath={canonicalPath}
        noindex={isSearchActive}
      />

      <h1 className="text-4xl text-[#01155E] font-bold mb-8 text-center">
        Market Insights
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex items-center gap-3 mb-12 max-w-xl mx-auto"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search blogs..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black transition"
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

      {loading && posts.length === 0 && (
        <div className="text-center py-20 text-xl">Loading...</div>
      )}

      {!loading && error && (
        <div className="text-center py-20 text-xl text-red-500">{error}</div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-20 text-xl">
          {searchTerm
            ? `"${searchTerm}" ke liye koi blog nahi mila.`
            : "Koi blog available nahi hai."}
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/market-insights/${post.slug}`}
                className="block rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[220px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[220px] bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-[#01155E] mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    {post.author && <span>{post.author}</span>}
                    <span>{post.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
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
                  {getPageNumbers()[0] > 2 && (
                    <span className="text-gray-400">...</span>
                  )}
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
                  {getPageNumbers()[getPageNumbers().length - 1] <
                    totalPages - 1 && <span className="text-gray-400">...</span>}
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
  );
}

export default Blog;