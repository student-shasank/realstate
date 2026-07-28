import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageurl from "../../assets/underline.png";
import { fetchFeaturedBlogs, selectFeaturedBlogs } from "../../features/dashboard/Blogslice.jsx";
import { useNavigate } from "react-router-dom";



const DESIGN = {
  colors: {
    primary: "#01155E",
    secondary: "#001A54",
    text: "#67739E",
    lightText: "#01155E99",
    border: "#E2E8F0",
    gray: "#64748B",
    white: "#ffffff",
    bg: "#f8f9fa",
  },
  fonts: {
    heading: "Archivo, sans-serif",
    body: "system-ui, -apple-system, sans-serif",
  },
};

const SectionHeading = () => (
  <div className="w-full max-w-[1200px] px-5 lg:px-0 mb-8 lg:mb-10">
    <h2
      className="text-[#001A54] text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-3 inline-block pb-2 leading-tight"
      style={{
        fontFamily: DESIGN.fonts.heading,
        backgroundImage: `url(${imageurl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left 90%",
        backgroundSize: "457px 6px",
      }}
    >
      Market  Insights
    </h2>
    <p className="text-[#67739E] text-[16px] md:text-[18px] leading-relaxed max-w-[1200px]">
      Discover Dubai's newest launches with expert guidance to secure the
      best prices and the most desirable units.
    </p>
  </div>
);

const FeaturedBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ab apne alag chhote "featured" cache se derive hota hai (sirf 4 latest posts)
  const featured = useSelector(selectFeaturedBlogs);
  const { featuredLoading, featuredError } = useSelector(
    (state) => state.blogs
  );

  useEffect(() => {
    // fetchFeaturedBlogs ke andar `condition` guard hai — agar ye component
    // dobara mount ho ya kahin aur se pehle hi fetch ho chuka ho, to duplicate
    // API call nahi hogi.
    dispatch(fetchFeaturedBlogs());
  }, [dispatch]);

  if (featuredLoading && featured.length === 0) {
    return (
      <section className="bg-white flex justify-center py-16 pb-[67px]">
        <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-0">
          <SectionHeading />
          <p className="text-[#67739E] text-[16px]">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (featuredError) {
    return (
      <section className="bg-white flex justify-center py-16 pb-[67px]">
        <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-0">
          <SectionHeading />
          <p className="text-red-500 text-[16px]">
            Failed to load blogs. Please try again later. ({featuredError})
          </p>
        </div>
      </section>
    );
  }

  if (!featured || featured.length === 0) {
    return (
      <section className="bg-white flex justify-center py-16 pb-[67px]">
        <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-0">
          <SectionHeading />
          <p className="text-[#67739E] text-[16px]">No blogs found.</p>
        </div>
      </section>
    );
  }

  const [mainBlog, ...sideBlogs] = featured; // featured[0] = big card, baaki 3 = stacked

  return (
    <section className="bg-white flex justify-center py-16 pb-[67px]">
      <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-0">
        <SectionHeading />

        <div className="flex flex-col lg:flex-row gap-[24px]">
          {/* LEFT BIG CARD */}
          <div
            className="pt-[21px] pb-[21px] pr-[23px] pl-[23px] w-full lg:w-[578px] h-auto lg:h-[616px] bg-white rounded-[32px] border-2 border-[#E2E8F0] gap-y-[24px]
               shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden
               flex flex-col hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)] transition-shadow duration-300"
            style={{ backgroundColor: DESIGN.colors.white }}
          >
            {mainBlog.image ? (
              <img
                src={mainBlog.image}
                alt={mainBlog.title}
                className="w-full lg:w-[530px] h-[220px] sm:h-[280px] lg:h-[338px] object-cover rounded-[32px]"
              />
            ) : (
              <div
                className="w-full lg:w-[530px] h-[220px] sm:h-[280px] lg:h-[338px] rounded-[32px] flex items-center justify-center"
                style={{ backgroundColor: DESIGN.colors.bg }}
              >
                <span style={{ color: DESIGN.colors.text }}>
                  No image available
                </span>
              </div>
            )}

            <div className="p-0 flex flex-col flex-1 justify-between">
              <div>
                <span
                  className="text-sm font-semibold mb-2 block"
                  style={{ color: DESIGN.colors.lightText, fontFamily: DESIGN.fonts.body }}
                >
                  {mainBlog.author}
                </span>

                <h3
                  className="text-[20px] sm:text-[22px] lg:text-[24px] font-medium mb-2 line-clamp-2 leading-snug"
                  style={{ color: DESIGN.colors.secondary, fontFamily: DESIGN.fonts.heading }}
                >
                  {mainBlog.title}
                </h3>

                <p
                  className="text-[12px] sm:text-[14px] lg:text-[16px] line-clamp-2 leading-relaxed"
                  style={{ color: DESIGN.colors.lightText, fontFamily: DESIGN.fonts.body }}
                >
                  {mainBlog.description}
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 items-start sm:items-center">
                <p
                  className="text-xs"
                  style={{ color: DESIGN.colors.gray, fontFamily: DESIGN.fonts.body }}
                >
                  {mainBlog.date} • {mainBlog.readTime}
                </p>

                <button
                 onClick={() => navigate(`/market-insights/${mainBlog.slug}`)}
                  className="px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: DESIGN.colors.primary,
                    color: DESIGN.colors.white,
                    fontFamily: DESIGN.fonts.body,
                    width: "50%",
                  }}
                >
                  Read More..
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT STACKED CARDS - baaki 3 latest blogs */}
          <div className="flex flex-col gap-[24px] flex-1">
            {sideBlogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col sm:flex-row bg-white rounded-[20px] border-2 border-[#E2E8F0]
                           shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-[15px] gap-4
                           hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition-shadow duration-300
                           min-h-[160px]"
                style={{ backgroundColor: DESIGN.colors.white }}
              >
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full sm:w-[149px] h-[180px] sm:h-[148px] rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-full sm:w-[149px] h-[180px] sm:h-[148px] rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: DESIGN.colors.bg }}
                  >
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: DESIGN.colors.lightText, fontFamily: DESIGN.fonts.body }}
                      >
                        {blog.author}
                      </span>

                      <span
                        className="text-xs flex-shrink-0"
                        style={{ color: DESIGN.colors.lightText, fontFamily: DESIGN.fonts.body }}
                      >
                        {blog.date}
                      </span>
                    </div>

                    <h4
                      className="text-[16px] sm:text-[17px] font-medium leading-snug mb-2 line-clamp-2"
                      style={{ color: DESIGN.colors.primary, fontFamily: DESIGN.fonts.heading }}
                    >
                      {blog.title}
                    </h4>

                    <p
                      className="text-sm line-clamp-2 leading-relaxed"
                      style={{ color: DESIGN.colors.text, fontFamily: DESIGN.fonts.body }}
                    >
                      {blog.description}
                    </p>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                 onClick={() => navigate(`/market-insights/${blog.slug}`)}
                      className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 hover:opacity-90 active:scale-95 flex-shrink-0"
                      style={{
                        backgroundColor: DESIGN.colors.primary,
                        color: DESIGN.colors.white,
                        fontFamily: DESIGN.fonts.body,
                      }}
                    >
                      Read More..
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;