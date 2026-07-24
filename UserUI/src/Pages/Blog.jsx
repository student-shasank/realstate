import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBlogs,
  setCurrentPage,
  setSearchTerm,
  selectPaginatedBlogs,
  selectTotalPages,
} from "../features/dashboard/Blogslice.jsx";
import Seo from "../Components/Seo.jsx";

const PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 300; // typing rukne ke kitni der baad search trigger ho

function Blog() {
  const dispatch = useDispatch();
  const {
    allLoading: loading,

    allError: error,
    currentPage,
    searchTerm,
  } = useSelector((state) => state.blogs);

  // Ab ye dono client-side derive hote hain "all" cache se — koi network call nahi
  const posts = useSelector(selectPaginatedBlogs(PER_PAGE));
  const totalPages = useSelector(selectTotalPages(PER_PAGE));

  const [searchInput, setSearchInput] = useState("");

  // Sirf EK BAAR fetch hota hai. `fetchAllBlogs` ke andar condition guard hai —
  // agar FeaturedBlogs (ya kisi aur component) ne pehle se fetch kar diya hai ya
  // fetch in-progress hai, to ye dispatch koi extra API call nahi karega.
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  // LIVE SEARCH: jaise hi searchInput change hota hai, debounce ke baad
  // Redux searchTerm update ho jata hai. Chunki poora data already "all" cache
  // mein client-side maujood hai, isse koi extra API call nahi hoti — sirf
  // filtering re-run hoti hai. Redux ke andar setSearchTerm currentPage ko
  // 1 par reset karta hai.
  useEffect(() => {
    const trimmed = searchInput.trim();

    // Agar already same term set hai to dobara dispatch mat karo (avoids
    // unnecessary page reset loops)
    if (trimmed === searchTerm) return;

    const timer = setTimeout(() => {
      dispatch(setSearchTerm(trimmed));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const handleSearch = (e) => {
    // Enter dabane par ya button click par turant search (bina debounce wait ke)
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

  // Pagination number list banata hai (max 5 numbers dikhte hain, current ke around)
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

      {/* Page Heading */}
      <h1 className="text-4xl text-[#01155E] font-bold mb-8 text-center">Market Insights</h1>

      {/* Live Search Bar */}
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
          {/* Chhota loading indicator jab tak typing ke baad search apply nahi hoti */}
          {searchInput.trim() !== searchTerm && (
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

      {/* Loading State */}
      {loading && posts.length === 0 && (
        <div className="text-center py-20 text-xl">Loading...</div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-20 text-xl text-red-500">{error}</div>
      )}

      {/* No Results */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-20 text-xl">
          {searchTerm
            ? `"${searchTerm}" ke liye koi blog nahi mila.`
            : "Koi blog available nahi hai."}
        </div>
      )}

      {/* Blog Grid */}
      {!loading && !error && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/MarketInsigts/${post.slug}`}
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
                  <h2 className="text-xl font-semibold   text-[#01155E] mb-2 line-clamp-2">
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

          {/* Number Pagination */}
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
  );
}

export default Blog;