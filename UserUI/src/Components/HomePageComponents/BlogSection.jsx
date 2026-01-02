import React from 'react';

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      date: '23 Dec 2025',
      title: 'Benefits of Ocean Breeze Villa',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo',
      image: '/src/assets/Blog1.jpg',
    },
    {
      id: 2,
      date: '23 Dec 2025',
      title: 'Benefits of Ocean Breeze Villa',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo',
      image: '/src/assets/Blog2.jpg',
    },
  ];

  return (
    <section className="w-full bg-white">
      {/* Blog Container – Figma styles */}
      <div className="mx-auto max-w-[1727px] px-[120px] py-[100px]">
        {/* Heading */}
        <h2 className="text-[#01155E] text-[64px] md:text-[48px] font-semibold text-center mb-16">
          Blogs
        </h2>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-[20px] shadow-md overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-[276px]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-[#6C757D] mb-2">{blog.date}</p>

                <h3 className="text-[#01155E] text-[24px] font-bold mb-3">
                  {blog.title}
                </h3>

                <p className="text-[#01155E] text-[24px] leading-relaxed mb-6">
                  {blog.description}
                </p>

                <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                  Read More..
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
