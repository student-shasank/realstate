import React from 'react';

import upcommingproject1 from '../../assets/upcommingproject1.jpg';
import upcommingproject2 from '../../assets/upcommingproject2.jpg';
import upcommingproject3 from '../../assets/upcomming project3.jpg';

const UpcomingProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Ocean Breeze Villa',
      price: '$ 323,324',
      location: '123 any city any where',
      image: upcommingproject1,
    },
    {
      id: 2,
      title: 'Ocean Breeze Villa',
      price: '$ 323,324',
      location: '123 any city any where',
      image: upcommingproject2,
    },
    {
      id: 3,
      title: 'Ocean Breeze Villa',
      price: '$ 323,324',
      location: '123 any city any where',
      image: upcommingproject3,
    },
  ];

  return (
    /* Outer Container: Max width 1440px */
    <section className="w-full max-w-[1440px] mx-auto bg-white py-16 flex justify-center">
      
      {/* Inner Container: 1248px content area with box-content fix */}
      <div className="w-full max-w-[1248px] box-content px-4 md:px-6">
        
        {/* Section Title */}
       <h2 
  className="text-[#01155E] text-[48px] font-semibold text-center mb-12"
  style={{ 
    fontFamily: 'Archivo, sans-serif', 
    fontWeight: '600',
    lineHeight: '100%', 
    letterSpacing: '0%' 
  }}
>
  Upcoming projects
</h2>

        {/* Project Grid - Gap calculated to fill 1248px exactly with 381px cards */}
        <div className="flex flex-wrap justify-between gap-y-8 w-full">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#F8F9FA] rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
              style={{ 
                width: '381px', 
                height: '505px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Project Image - Height adjusted for 505px card */}
              <div className="w-[328px] h-[365px] rounded-[24px] mb-6 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Location and Labels */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#6C757D] text-[16px]">{project.location}</p>
                <div className="flex gap-2">
                  <span className="text-[#01155E] text-[20px] font-medium">Text</span>
                  <span className="text-[#01155E] text-[20px] font-medium">Text</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#01155E] text-2xl font-bold mb-auto">
                {project.title}
              </h3>

              {/* Footer: Price and Button */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#01155E] text-[20px] font-semibold">
                  {project.price}
                </span>
                <button className="bg-[#01155E] w-[144] h-[43px] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#0a2380] transition-all active:scale-95">
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