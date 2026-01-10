import React from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

import upcommingproject1 from '../../assets/upcommingproject1.jpg';
import upcommingproject2 from '../../assets/upcommingproject2.jpg';
import upcommingproject3 from '../../assets/upcomming project3.jpg';
import imageurl from '../../assets/underline.png';
const UpcomingProjects = () => {
  const projects = [
    {
      id: 1,
      title: 'Ocean Breeze Villa',
      price: '$ 323324',
      location: '123 any city any where',
      type: 'Apartment',
      image: upcommingproject1,
    },
    {
      id: 2,
      title: 'Ocean Breeze Villa',
      price: '$ 323324',
      location: '123 any city any where',
      type: 'Apartment',
      image: upcommingproject2,
    },
    {
      id: 3,
      title: 'Ocean Breeze Villa',
      price: '$ 323324',
      location: '123 any city any where',
      type: 'Apartment',
      image: upcommingproject3,
    },
  ];

  return (
    <section className="w-full bg-white py-16 flex flex-col items-center">
      {/* Section Header */}
      <div className="w-full max-w-[1200px]  mb-10">
     <h2
  className="text-[#001A54] text-[48px] font-bold mb-2 inline-block pb-6"
  style={{
    fontFamily: "Archivo, sans-serif",
    backgroundImage: `url(${imageurl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left 90%",
    backgroundSize: "457px 6px", // 👈 exact width & height
  }}
>
  Upcoming Launches
</h2>

  
        <p className="text-[#6C757D] text-[18px] mt-6 max-w-[1200px]">
        Are you looking for the perfect neighborhood in Dubai? Discover the unique characteristics of diverse communities, catering to various preferences from luxury to family-friendly environments.
        </p>
      </div>

      {/* 1200px Content Wrapper */}
      <div className="relative flex items-center justify-between w-full max-w-[1440px] px-12">
        
        {/* Navigation Arrows */}
        <button className="p-2 rounded-full border border-gray-300 text-[#001A54]"><ChevronLeft size={20} /></button>

        {/* 1200px Grid Container */}
        <div className="flex gap-[16px] justify-center w-[1200px]">
        
          {projects.map((project) => (
            /* Main Card Container: 346.4px x 508px */
            <div
              key={project.id}
              className="bg-[#F8F9FA] rounded-[24px] flex flex-col border border-gray-100 shadow-sm overflow-hidden"
              style={{ 
                width: '346.4px', 
                height: '508px', 
                padding: '8px', /* Spec Padding */
                gap: '16px'     /* Spec Gap */
              }}
            >
              {/* Image Container */}
              <div className="w-full h-[280px] rounded-[20px] overflow-hidden shrink-0">
                <img
                  src={ project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content Area */}
              <div className="flex flex-col px-3 h-full justify-between pb-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[#9BA1A7] text-[14px]">
                    <MapPin size={14} />
                    <span>{project.location}</span>
                  </div>
                  <p className="text-[#001A54] text-[16px] font-medium">{project.type}</p>
                  <h3 className="text-[#001A54] text-[22px] font-bold leading-tight">
                    {project.title}
                  </h3>
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-[#001A54] text-[20px] font-bold">
                    {project.price}
                  </span>
                  <button className="bg-[#001A54] text-white px-6 py-2 rounded-[8px] font-bold text-sm">
                    Discover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="p-2 rounded-full border border-gray-300 text-[#001A54]"><ChevronRight size={20} /></button>
      </div>
    </section>
  );
};

export default UpcomingProjects;