import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNavList, resetNavList } from "../../features/communities/communitySlice.js";

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dqj4vs1la/image/upload/v1771046752/communities/img-1771046744365-c0bcc33cd3e42269d6dcff16f6d0170e5acdaca9.jpg";

function AllCommunities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { navList: allCommunities, loading, hasMore } = useSelector(
    (state) => state.community
  );

  useEffect(() => {
    // ✅ fresh load (optional but recommended)
    dispatch(resetNavList());
    setPage(1);
    dispatch(fetchNavList(1));
  }, [dispatch]);

  const handleViewMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchNavList(nextPage));
  };

  // ✅ First load spinner ONLY when nothing loaded yet
  if (loading && (!allCommunities || allCommunities.length === 0)) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#01155E]"></div>
        <p className="mt-4 font-archivo text-[#01155E] animate-pulse uppercase tracking-widest text-sm">
          Fetching Communities...
        </p>
      </div>
    );
  }

  if (!allCommunities || allCommunities.length === 0) {
    return (
      <div className="text-center py-24 bg-white">
        <h2 className="text-gray-400 font-archivo text-xl">
          No communities found.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white py-30 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-[#01155E] font-archivo font-bold text-[32px] md:text-[40px] uppercase">
            Our Communities
          </h1>
          <div className="h-1.5 w-20 bg-[#01155E] mt-2"></div>
        </div>

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
                <h3 className="text-[#01155E] font-bold text-[22px] font-archivo uppercase leading-tight">
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
                  <span className="text-xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ View More Button */}
        {hasMore && (
          <div className="flex justify-center mt-14">
            <button
              onClick={handleViewMore}
              disabled={loading}
              className="px-8 py-3 rounded-md border-2 border-[#01155E] text-[#01155E] font-archivo font-bold uppercase tracking-widest text-sm transition-all
                         hover:bg-[#01155E] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "View More"}
            </button>
          </div>
        )}

        {/* ✅ Optional: end message */}
        {!hasMore && (
          <p className="text-center mt-10 text-gray-400 font-archivo uppercase tracking-wider text-xs">
            You’ve reached the end.
          </p>
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
