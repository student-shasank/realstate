import React from 'react';


import upcommingproject1 from '../../assets/upcommingproject1.jpg';
import upcommingproject2 from '../../assets/upcommingproject2.jpg';
import upcommingproject3 from '../../assets/upcomming project3.jpg';

const UpcomingProjects = () => {
  // Data array with images
  const projects = [
    {
      id: 1,
      title: 'Ocean Breeze Villa',
      price: '$ 323324',
      location: '123 any city any where',
      image: upcommingproject1,
    },
    {
      id: 2,
      title: 'Ocean Breeze Villa',
      price: '$ 323324',
      location: '123 any city any where',
      image: upcommingproject2,
    },
    {
      id: 3,
      title: 'Ocean Breeze Villa',
      price: '$ 323324',
      location: '123 any city any where',
      image: upcommingproject3,
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 flex justify-center">
      <div className="w-full max-w-[1440px]">
        {/* Section Title */}
        <h2 className="text-[#01155E] text-[40px] md:text-[56px] font-bold text-center mb-12">
          Upcoming projects
        </h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#F8F9FA] rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Project Image */}
              <div className="w-full aspect-[4/3] rounded-[24px] mb-6 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Location and Labels */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#6C757D] text-sm">{project.location}</p>
                <div className="flex gap-2">
                  <span className="text-[#01155E] text-sm font-medium">Text</span>
                  <span className="text-[#01155E] text-sm font-medium">Text</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#01155E] text-xl font-bold mb-4">
                {project.title}
              </h3>

              {/* Footer: Price and Button */}
              <div className="flex justify-between items-center">
                <span className="text-[#01155E] text-xl font-bold">
                  {project.price}
                </span>
                <button className="bg-[#01155E] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-[#0a2380] transition-colors">
                  Discover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjects;
