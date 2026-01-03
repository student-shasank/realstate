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
  ];

  return (
    /* BLOG SECTION FLOATING OVER FOOTER */
    <section className="relative z-20 bg-white flex justify-center pt-[100px] -mb-[320px]">

      {/* MAIN BLOG CONTAINER */}
      <div className="w-[1200px] h-[869px] flex flex-col items-center  mb-[-197px]">

        {/* TITLE */}
        <h2 
          className="text-[#01155E] text-[48px] font-semibold mb-[90px] text-center"
          style={{ 
            fontFamily: 'Archivo, sans-serif', 
            lineHeight: '100%', 
            letterSpacing: '0%' 
          }}
        >
          Blogs
        </h2>

        {/* BLOG CARDS */}
        <div className="w-full h-[617px] flex gap-[20px]">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex-1 bg-white rounded-[32px] border border-[#E2E8F0]
                         overflow-hidden flex flex-col
                         shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            >
              {/* IMAGE */}
              <div className="h-[320px] w-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[#000000] text-sm font-semibold mb-2">
                  {blog.author}
                </span>

                <h3 className="text-[#000000] text-[24px] font-bold mb-3">
                  {blog.title}
                </h3>

                <p className="text-[#000000] text-[16px] mb-6  line-clamp-2">
                  {blog.description}
                </p>

                {/* FOOTER */}
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">
                        Full name
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {blog.date} • {blog.readTime}
                      </p>
                    </div>
                  </div>

                  <button className="bg-black w-[234px]  h-[52px] text-white rounded-xl f text-[24px] hover:opacity-90 active:scale-95 transition">
                    Read More..
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
