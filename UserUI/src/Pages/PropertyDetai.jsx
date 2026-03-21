import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Hash, 
  CheckCircle, 
  ChevronDown, 
  Play, 
  Star, 
  Phone, 
  Mail, 
  Heart,
  Share2,
  Maximize2
} from 'lucide-react';

// --- Sample Data ---
const PROPERTY_DATA = {
  title: "High-Rise Townhouse In Califorlia",
  location: "Southwestern Ontario, Canada",
  price: "AED 10,00,239",
  pricePerSqFt: "1,200/Sq Ft",
  status: "Off-Plan | Resale",
  id: "HZ24",
  description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim...",
  info: [
    { label: "Price", value: "$425,000" },
    { label: "Area Size", value: "1435 Sq Ft" },
    { label: "Rooms", value: "5" },
    { label: "Year Built", value: "2022" },
    { label: "Land Area Size", value: "3766 Sq Ft" },
    { label: "Property ID", value: "HZ24" },
    { label: "Bedrooms", value: "6" },
  ],
  amenities: ["HVAC", "Barbeque", "Laundry", "Laundry", "Dryer"],
  agent: {
    name: "Rachel Dan",
    phone: "0485.526.258",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
  }
};

const SIMILAR_PROPERTIES = [1, 2, 3].map((i) => ({
  id: i,
  title: "High-Rise Townhouse",
  location: "Southwestern Ontario, Canada",
  price: "AED 10,00,239",
  sqft: "122,280 sqft",
  beds: 41,
  baths: 32,
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
}));

// --- Reusable Components ---

const SectionHeading = ({ children, rightElement }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-[28px] font-semibold text-[#01155E] font-['Archivo'] capitalize">
      {children}
    </h2>
    {rightElement}
  </div>
);

const InfoCard = ({ children, className = "" }) => (
  <div className={`bg-white border border-[#D9E1F2] rounded-[10px] p-[30px] mb-8 ${className}`}>
    {children}
  </div>
);

const ReviewCard = () => (
  <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-6 flex-1">
    <div className="flex items-center gap-3 mb-4">
      <img src={PROPERTY_DATA.agent.avatar} alt="User" className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="flex justify-between w-full items-center">
            <h4 className="font-semibold text-[#01155E] mr-4">Rachel Dan</h4>
            <div className="flex text-yellow-400 scale-75 origin-left">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
        </div>
        <p className="text-[12px] text-[#67739E] flex items-center gap-1">
            <Calendar size={12} /> Today 09:36 AM
        </p>
      </div>
    </div>
    <p className="text-[#67739E] text-[14px] leading-relaxed">
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.......
    </p>
  </div>
);

// --- Main Page Component ---

export default function PropertyDetail() {
  const [floorPlanOpen, setFloorPlanOpen] = useState(true);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-['General_Sans'] pb-20 pt-20">
      
      {/* Top Header Section */}
      <div className="max-w-[1290px] mx-auto pt-10 px-4">
        <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-[30px] flex justify-between items-start mb-[30px]">
          <div>
            <div className="bg-[#01155E] text-white text-[14px] font-medium px-4 py-1 rounded-full inline-block mb-4">
              {PROPERTY_DATA.status}
            </div>
            <h1 className="text-[48px] font-semibold text-[#01155E] font-['Archivo'] leading-[1.25] capitalize mb-2">
              {PROPERTY_DATA.title}
            </h1>
            <div className="flex items-center text-[#67739E] text-[18px]">
              <MapPin size={20} className="mr-2" />
              {PROPERTY_DATA.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[32px] font-semibold text-[#01155E]">{PROPERTY_DATA.price}</div>
            <div className="text-[#67739E] text-[18px]">{PROPERTY_DATA.pricePerSqFt}</div>
            <div className="flex gap-3 mt-6 justify-end">
                <button className="p-3 border border-[#D9E1F2] rounded-lg text-[#01155E]"><Share2 size={20}/></button>
                <button className="p-3 border border-[#D9E1F2] rounded-lg text-[#01155E]"><Heart size={20}/></button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-12 gap-[10px] h-[536px] mb-12">
          <div className="col-span-7 h-full">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover rounded-[4px]" 
              alt="Main"
            />
          </div>
          <div className="col-span-5 grid grid-cols-2 gap-[10px] h-full">
            <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=400" className="w-full h-[263px] object-cover rounded-[4px]" alt="Sub 1" />
            <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=400" className="w-full h-[263px] object-cover rounded-[4px]" alt="Sub 2" />
            <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=400" className="w-full h-[263px] object-cover rounded-[4px]" alt="Sub 3" />
            <div className="relative h-[263px]">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover rounded-[4px]" alt="Sub 4" />
              <div className="absolute inset-0 bg-[#254B8680] backdrop-blur-[10px] flex items-center justify-center rounded-[4px]">
                <span className="text-white text-3xl font-semibold">+1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-[30px]">
          {/* Main Left Column */}
          <div className="w-[850px] flex-shrink-0">
            
            {/* Information */}
            <SectionHeading>Information</SectionHeading>
            <InfoCard>
              <div className="grid grid-cols-5 gap-y-8 mb-8">
                {PROPERTY_DATA.info.slice(0, 5).map((item, idx) => (
                  <div key={idx}>
                    <p className="text-[#67739E] text-[16px] mb-1">{item.label}</p>
                    <p className="text-[#01155E] font-semibold text-[18px]">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#D9E1F2] pt-8 grid grid-cols-5 gap-y-8">
                {PROPERTY_DATA.info.slice(5).map((item, idx) => (
                  <div key={idx}>
                    <p className="text-[#67739E] text-[16px] mb-1">{item.label}</p>
                    <p className="text-[#01155E] font-semibold text-[18px]">{item.value}</p>
                  </div>
                ))}
              </div>
            </InfoCard>

            {/* Amenities */}
            <InfoCard className="flex flex-wrap gap-12">
              {PROPERTY_DATA.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-[#01155E]" />
                  <span className="text-[#67739E] text-[18px]">{item}</span>
                </div>
              ))}
            </InfoCard>

            {/* Description */}
            <InfoCard>
              <p className="text-[#67739E] text-[18px] leading-[1.6] mb-2">
                {PROPERTY_DATA.description}
                <span className="text-[#01155E] font-semibold cursor-pointer ml-1">Read More</span>
              </p>
            </InfoCard>

            {/* Map Location */}
            <SectionHeading 
              rightElement={<button className="bg-[#01155E] text-white px-6 py-2 rounded-lg text-[14px]">Open Map</button>}
            >
              Map Location
            </SectionHeading>
            <div className="rounded-[10px] overflow-hidden border border-[#D9E1F2] h-[400px] mb-12">
                <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=43.6532,-79.3832&zoom=12&size=850x400&sensor=false&key=YOUR_API_KEY" 
                    className="w-full h-full object-cover grayscale opacity-80" 
                    alt="Map Placeholder"
                />
            </div>

            {/* Floor Plans */}
            <SectionHeading>Floor Plans</SectionHeading>
            <div className="bg-[#F3F6FF] border border-[#D9E1F2] rounded-[10px] overflow-hidden mb-12">
                <div 
                    className="p-6 flex justify-between items-center cursor-pointer"
                    onClick={() => setFloorPlanOpen(!floorPlanOpen)}
                >
                    <div className="flex items-center gap-6">
                        <ChevronDown className={`text-[#01155E] transition-transform ${floorPlanOpen ? '' : '-rotate-90'}`} />
                        <span className="text-[#01155E] font-semibold text-[18px]">New Plan Title</span>
                    </div>
                    <div className="flex gap-8 text-[#67739E] text-[14px]">
                        <span className="flex items-center gap-2"><Square size={16}/> 1435 Sq Ft</span>
                        <span className="flex items-center gap-2"><Bed size={16}/> 41</span>
                        <span className="flex items-center gap-2"><Bath size={16}/> 2</span>
                        <span className="flex items-center gap-2"><Hash size={16}/> AED 1,345</span>
                    </div>
                </div>
                {floorPlanOpen && (
                    <div className="p-8 pt-0 bg-white">
                        <div className="flex justify-center p-10">
                            <img src="https://wcs.smartdraw.com/floor-plan/img/floorplan.png?bn=15153520265" alt="Floor Plan" className="max-h-[400px] grayscale" />
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-[#01155E] mb-2">Description:</h4>
                            <p className="text-[#67739E] text-[14px] leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Video Section */}
            <SectionHeading>Video</SectionHeading>
            <div className="relative rounded-[10px] overflow-hidden mb-12 h-[480px]">
                <img src="https://images.unsplash.com/photo-1600607687940-c52af096999c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Video thumb"/>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform">
                        <Play fill="white" size={32} className="ml-1" />
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <SectionHeading 
              rightElement={<button className="bg-[#01155E] text-white px-6 py-3 rounded-lg text-[14px] font-semibold">Write A Review</button>}
            >
              What Our Customers Say
            </SectionHeading>
            <div className="flex items-center gap-2 mb-8">
                <span className="text-[24px] font-bold text-[#01155E]">5.0</span>
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="text-[#67739E] ml-2">1,540 reviews</span>
            </div>
            <div className="flex gap-6 mb-6">
                <ReviewCard />
                <ReviewCard />
            </div>
            <div className="text-center mb-12">
                <button className="text-[#01155E] font-bold underline">View More</button>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="w-[410px]">
            <div className="sticky top-8 space-y-8">
              
              {/* Contact Card */}
              <div className="bg-white border border-[#D9E1F2] rounded-[10px] p-[30px]">
                <div className="flex gap-4 mb-6">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=100" className="w-20 h-20 rounded-lg object-cover" alt="mini"/>
                    <div>
                        <h3 className="text-[22px] font-semibold text-[#01155E] leading-tight">High-Rise Townhouse</h3>
                        <div className="text-[14px] text-white bg-[#01155E] px-3 py-0.5 rounded-full inline-block mt-2">Off-plan | Resale</div>
                    </div>
                </div>
                
                <div className="mb-6">
                    <div className="text-[28px] font-bold text-[#01155E]">{PROPERTY_DATA.price}</div>
                    <div className="text-[#67739E] text-[16px]">{PROPERTY_DATA.pricePerSqFt}</div>
                </div>

                <hr className="border-[#D9E1F2] mb-6" />

                <h4 className="text-[#01155E] font-bold text-[18px] mb-4">Contact With Us Now !</h4>
                <div className="flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-xl mb-6">
                    <img src={PROPERTY_DATA.agent.avatar} className="w-14 h-14 rounded-full" alt="Agent"/>
                    <div>
                        <div className="font-bold text-[#01155E]">{PROPERTY_DATA.agent.name}</div>
                        <div className="text-[#67739E] flex items-center gap-1 text-[14px]">
                            <Phone size={14}/> {PROPERTY_DATA.agent.phone}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full border-2 border-[#01155E] text-[#01155E] py-4 rounded-xl font-bold hover:bg-[#01155E]/5 transition-colors">Call Now</button>
                    <button className="w-full bg-[#01155E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                        <Mail size={20}/> Send A Message
                    </button>
                </div>
              </div>

              {/* Promotional Card */}
              <div className="relative rounded-[10px] overflow-hidden bg-gradient-to-b from-[#01155E] to-[#1e3a8a] p-8 text-center text-white h-[600px] flex flex-col justify-between">
                <div className="relative z-10">
                    <h2 className="text-[32px] font-bold mb-4">New Template</h2>
                    <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                        Advertise your real estate to a wider audience with our landing page.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg">Try It Now</button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-8">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200" className="rounded-lg h-40 object-cover border-2 border-white/20" alt="p1"/>
                    <img src="https://images.unsplash.com/photo-1600607687940-c52af096999c?auto=format&fit=crop&q=80&w=200" className="rounded-lg h-48 object-cover -translate-y-4 border-2 border-white/20 shadow-2xl" alt="p2"/>
                    <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=200" className="rounded-lg h-40 object-cover border-2 border-white/20" alt="p3"/>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-20">
            <h2 className="text-[32px] font-bold text-[#01155E] text-center mb-12">Similar Properties</h2>
            <div className="grid grid-cols-3 gap-[30px]">
                {SIMILAR_PROPERTIES.map(item => (
                    <div key={item.id} className="bg-white border border-[#D9E1F2] rounded-[10px] overflow-hidden group">
                        <div className="relative h-[250px]">
                            <img src={item.image} className="w-full h-full object-cover" alt="similar"/>
                            <div className="absolute top-4 left-4 bg-[#01155E]/80 backdrop-blur-md text-white text-[12px] px-3 py-1 rounded">Off-Plan | Resale</div>
                            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg">
                                <Heart size={18} className="text-[#01155E]"/>
                            </button>
                        </div>
                        <div className="p-6">
                            <h3 className="text-[20px] font-bold text-[#01155E] mb-2">{item.title}</h3>
                            <div className="flex items-center text-[#67739E] text-[14px] mb-4">
                                <MapPin size={16} className="mr-1"/> {item.location}
                            </div>
                            <div className="flex justify-between border-y border-[#D9E1F2] py-4 mb-6">
                                <div className="flex items-center gap-2 text-[#01155E] font-semibold"><Bed size={18}/> {item.beds}</div>
                                <div className="flex items-center gap-2 text-[#01155E] font-semibold"><Bath size={18}/> {item.baths}</div>
                                <div className="flex items-center gap-2 text-[#01155E] font-semibold"><Square size={18}/> {item.sqft}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-[20px] font-bold text-[#01155E]">{item.price}</div>
                                <button className="border border-[#D9E1F2] px-4 py-2 rounded-lg font-bold text-[#01155E] text-[14px] hover:bg-[#01155E] hover:text-white transition-all">View Detail</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}