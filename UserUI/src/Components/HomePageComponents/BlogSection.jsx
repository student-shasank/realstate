import React from 'react';
import blog1 from '../../assets/Blog1.jpg';
import blog2 from '../../assets/Blog2.jpg';
import imageurl from "../../assets/underline.png";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      author: 'Architect',
      date: '11 Jan 2022',
      readTime: '5 min read',
      title: 'Benefits of Ocean Breeze Villa',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: blog1,
    },
    {
      id: 2,
      author: 'Architect',
      date: '11 Jan 2022',
      readTime: '5 min read',
      title: 'Benefits of Ocean Breeze Villa',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: blog2,
    },
    {
      id: 3,
      author: 'Architect',
      date: '11 Jan 2022',
      readTime: '5 min read',
      title: 'Benefits of Ocean Breeze Villa',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: blog2,
    },
    {
      id: 4,
      author: 'Architect',
      date: '11 Jan 2022',
      readTime: '5 min read',
      title: 'Benefits of Ocean Breeze Villa',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: blog2,
    },
  ];

  return (
    <section className="bg-white flex justify-center py-16 pb-[67px]">
      <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-0">

        {/* TITLE */}
        {/* <h2 className="text-[#01155E] text-[48px] font-semibold mb-[64px]">
          Blogs
        </h2> */}

        {/* TITLE */}
        <div className="w-full max-w-[1200px] px-5 lg:px-0 mb-8 lg:mb-10">
               <h2
                 className="text-[#001A54] text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-3 inline-block pb-2 leading-tight"
                 style={{
                   fontFamily: "Archivo, sans-serif",
                   backgroundImage: `url(${imageurl})`,
                   backgroundRepeat: "no-repeat",
                   backgroundPosition: "left 90%",
                   backgroundSize: "457px 6px",
                 }}
               >
                 Market Updates
               </h2>
       
               <p className="text-[#67739E] text-[16px] md:text-[18px] leading-relaxed max-w-[1200px]">
                 Discover Dubai’s newest launches with expert guidance to secure the
                 best prices and the most desirable units.
               </p>
             </div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:flex-row gap-[24px]">

          {/* LEFT BIG CARD */}
          <div className="pt-[21px] pb-[21px] pr-[23px] pl-[23px] w-full lg:w-[578px] h-auto lg:h-[616px] bg-white rounded-[32px] border border-[#E2E8F0] gap-y-[24px]
             shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden
             flex flex-col">

            <img
              src={blogs[0].image}
              alt={blogs[0].title}
              className="w-full lg:w-[530px] h-[220px] sm:h-[280px] lg:h-[360px] object-cover rounded-[32px]"
            />

            <div className="p-0">
              <span className="text-sm font-semibold mb-2 block text-[#01155E99]">
                {blogs[0].author}
              </span>

              <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-medium mb-2">
                {blogs[0].title}
              </h3>

              <p className="text-[12px] sm:text-[14px] lg:text-[18px] mb-6 text-[#01155E99]">
                {blogs[0].description}
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 items-start sm:items-center">
                <div>
                  {/* <p className="text-sm font-bold">Full name</p> */}
                  <p className="text-xs text-[#64748B]">
                    {blogs[0].date} • {blogs[0].readTime}
                  </p>
                </div>

                <button className="bg-[#01155E] text-white px-8 py-3 rounded-xl text-sm w-full sm:w-auto">
                  Read More..
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT STACKED CARDS */}
          <div className="flex flex-col gap-[24px] lg:gap-0 lg:justify-between flex-1">
            {blogs.slice(1).map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col sm:flex-row bg-white rounded-[20px] border border-[#E2E8F0]
                           shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-[15px] gap-4"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full sm:w-[149px] h-[180px] sm:h-[148px] rounded-xl object-cover"
                />

                <div className="relative flex flex-col flex-1">
                  <div>
                    {/* TOP ROW: Architect + Date */}
                    <div className="flex justify-between items-start sm:items-center mb-2 ">
                      <span className="text-sm font-semibold text-[#01155E99]">
                        {blog.author}
                      </span>

                      <span className="text-xs text-[#01155E99] sm:absolute sm:right-0">
                        {blog.date}
                      </span>
                    </div>

                    <h4 className="text-[18px] font-medium text-[#01155E] leading-snug mb-2">
                      {blog.title}
                    </h4>

                    <p className="text-sm text-[#01155E99] line-clamp-2">
                      {blog.description}
                    </p>
                  </div>

                  <div className="flex justify-end mt-3">
                    <button className="bg-[#01155E] text-white px-4 py-2 rounded-lg text-xs">
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

export default BlogSection;