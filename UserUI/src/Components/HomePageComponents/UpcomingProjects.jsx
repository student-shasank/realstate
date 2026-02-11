import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { fetchProjects } from '../../features/dashboard/searchSlice.jsx'; 



import upcommingproject1 from '../../assets/upcommingproject1.jpg';



import upcommingproject2 from '../../assets/upcommingproject2.jpg';

import imageurl from '../../assets/underline.png';

const UpcomingProjects = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null); 
  
  const { projects, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchProjects({ 
      completion: "Off-Plan", 
      propertyType: "", 
      beds: "", 
      baths: "", 
      location: "" 
    }));
  }, [dispatch]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      // Exact calculation: Ek card (346.4) + Gap (16) = 362.4px
      const scrollAmount = 362.4; 
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full bg-white py-16 flex flex-col items-center">
      <div className="w-full max-w-[1200px] mb-10">
        <h2
          className="text-[#001A54] text-[48px] font-bold mb-2 inline-block pb-6"
          style={{
            fontFamily: "Archivo, sans-serif",
            backgroundImage: `url(${imageurl})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 90%",
            backgroundSize: "457px 6px",
          }}
        >
          Upcoming Off-Plan Projects
        </h2>
        <p className="text-[#6C757D] text-[18px] mt-6 max-w-[1200px]">
          Explore the latest off-plan investment opportunities in Dubai's most sought-after communities.
        </p>
      </div>

      <div className="relative flex items-center justify-between w-full max-w-[1440px] px-12">
        <button 
          onClick={() => scroll('left')} 
          className="p-2 rounded-full border border-gray-300 text-[#001A54] hover:bg-gray-100 z-10"
        >
          <ChevronLeft size={20} />
        </button>

        {/* 🔽 FIXED: Width calculation for exactly 3 cards (1071.2px) */}
        <div 
          ref={scrollRef}
          className="flex gap-[16px] overflow-hidden scroll-smooth"
          style={{ width: '1071.2px', minHeight: '508px' }} 
        >
          {loading ? (
            <div className="flex items-center justify-center w-full">
               <p className="text-[#001A54] font-medium">Loading Off-Plan Projects...</p>
            </div>
          ) : (
            projects?.map((project) => (
              <div
                key={project._id}
                className="bg-[#F8F9FA] rounded-[24px] flex flex-col border border-gray-100 shadow-sm overflow-hidden shrink-0"
                style={{ width: '346.4px', height: '508px', padding: '8px', gap: '16px' }}
              >
                <div className="w-full h-[280px] rounded-[20px] overflow-hidden shrink-0">
                  <img
                    src={upcommingproject1} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col px-3 h-full justify-between pb-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-[#9BA1A7] text-[14px]">
                      <MapPin size={14} />
                      <span className="truncate">
                        {project.location?.community || project.location?.city || 'Dubai'}
                      </span>
                    </div>
                    <p className="text-[#001A54] text-[16px] font-medium">{project.type}</p>
                    <h3 className="text-[#001A54] text-[20px] font-medium leading-tight line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[#001A54] text-[20px] font-bold">
                      {project.price ? `${project.currency || 'AED'} ${project.price.toLocaleString()}` : 'Price on Request'}
                    </span>
                    <button className="bg-[#001A54] text-white px-6 py-2 rounded-[8px] font-bold text-sm">
                      Discover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          onClick={() => scroll('right')} 
          className="p-2 rounded-full border border-gray-300 text-[#001A54] hover:bg-gray-100 z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default UpcomingProjects;