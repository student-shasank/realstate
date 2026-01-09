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
        {/* <h2 className="text-[#01155E] text-[48px] font-semibold mb-[64px]">
          Blogs
        </h2> */}
        

        {/* TITLE */}
        <div className="mb-[50px]">
          <h2 className="text-[#01155E] text-[48px] font-semibold mb-[10px]">
            Blogs
          </h2>

          {/* UNDERLINE */}
          <div className="flex w-[291px]">
            {/* Thick left line */}
            <div className="w-[135px] h-[6px] bg-[#01155E]" />

            {/* Thin right line */}
            <div className="flex-1 h-[2px] bg-[#01155E]" />
          </div>
        </div>



        {/* MAIN GRID */}
        <div className="flex gap-[24px]">

          {/* LEFT BIG CARD */}
          <div className="pt-[21px] pb-[21px] pr-[23px] pl-[23px] w-[578px] h-[616px] bg-white rounded-[32px] border border-[#E2E8F0] gap-y-[24px]
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
          <div className="flex flex-col justify-between flex-1">
            {blogs.slice(1).map((blog) => (
              <div
                key={blog.id}
                className="flex bg-white rounded-[20px] border border-[#E2E8F0]
                           shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-[15px] gap-4"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-[149px] h-[148px] rounded-xl object-cover"
                />

                <div className="relative flex flex-col flex-1">
                  <div>
                    {/* TOP ROW: Architect + Date */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-[#0F172A]">
                        {blog.author}
                      </span>

                      <span className="absolute right-0 text-xs text-[#64748B]">
                        {blog.date}
                      </span>
                    </div>

                    <h4 className="text-[18px] font-bold leading-snug mb-2">
                      {blog.title}
                    </h4>

                    <p className="text-sm text-[#475569] line-clamp-2">
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