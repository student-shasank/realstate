import React from 'react';
import blog1 from '../../assets/Blog1.jpg';
import blog2 from '../../assets/Blog2.jpg';

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
    <section className="bg-white flex justify-center py-[120px]">
      <div className="w-[1200px]">

        {/* TITLE */}
        <h2 className="text-[#01155E] text-[48px] font-semibold mb-[64px]">
          Blogs
        </h2>

        {/* MAIN GRID */}
        <div className="flex gap-[24px]">

          {/* LEFT BIG CARD */}
          <div className="pt-[22px] pb-[22px] pr-[24px] pl-[24px] w-[578px] h-[616px] bg-white rounded-[32px] border border-[#E2E8F0] gap-y-[24px]
             shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden
             flex flex-col">
            
            <img
              src={blogs[0].image}
              alt={blogs[0].title}
              className=" w-[530px] h-[360px] object-cover rounded-[32px]"
            />

            <div className="p-0">
              <span className="text-sm font-semibold mb-2 block">
                {blogs[0].author}
              </span>

              <h3 className="text-[28px] font-bold mb-2">
                {blogs[0].title}
              </h3>

              <p className="text-[16px] mb-6">
                {blogs[0].description}
              </p>

              <div className="flex gap-x-[156px] items-center">
                <div>
                  {/* <p className="text-sm font-bold">Full name</p> */}
                  <p className="text-xs text-[#64748B]">
                    {blogs[0].date} • {blogs[0].readTime}
                  </p>
                </div>

                <button className="bg-[#01155E] text-white px-8 py-3 rounded-xl text-sm">
                  Read More..
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT STACKED CARDS */}
          <div className="flex flex-col gap-[20px] flex-1">
            {blogs.slice(1).map((blog) => (
              <div
                key={blog.id}
                className="flex bg-white rounded-[20px] border border-[#E2E8F0]
                           shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4 gap-4"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-[120px] h-[120px] rounded-xl object-cover"
                />

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-xs font-semibold block mb-1">
                      {blog.author}
                    </span>

                    <h4 className="text-[18px] font-bold leading-snug mb-1">
                      {blog.title}
                    </h4>

                    <p className="text-sm text-[#475569] line-clamp-2">
                      {blog.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-[#64748B]">
                      {blog.date}
                    </p>

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