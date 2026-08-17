import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    enquiry: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form:", formData);
  };

  return (
    <div className="min-h-screen bg-white font-['General_Sans'] text-[#01155E]">

      {/* HERO SECTION */}
      <section className="bg-white px-5">
        <div className="max-w-[1000px] mx-auto text-center pt-[65px] sm:pt-[80px] lg:pt-[92px] pb-[48px]">
          <span className="inline-block text-[#01155E] text-[14px] font-semibold tracking-[1.5px] uppercase mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-[#01155E] text-[32px] sm:text-[40px] lg:text-[48px] font-semibold tracking-[-2.5px] leading-[1.08]">
          Let ’s  plan 
            <br />
            <span>Your Next Move.</span>
          </h1>
          <p className="max-w-[650px] mx-auto mt-5 text-[#67739E] text-[15px] sm:text-[17px] leading-[160%]">
           Whether you’re exploring properties, assessing an investment, or seeking clarity on the Dubai property market,
            Yupland is here to help you make informed decisions.
          </p>
        </div>
      </section>

      {/* MAP & FLOATING FORM WRAPPER */}
      <div className="relative w-full">
        {/* MAP SECTION */}
        <section className="relative h-[450px] sm:h-[500px] lg:h-[520px] w-full overflow-hidden">
          <iframe
            title="Yupland Dubai Office"
            src="https://www.google.com/maps?q=Dubai%20Design%20District&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-white/5 pointer-events-none" />

          {/* Office Location Card */}
          <div className="absolute top-7 left-5 sm:left-8 lg:left-10 z-10">
            <div className="bg-white rounded-[14px] px-5 sm:px-6 py-4 shadow-[0_12px_35px_rgba(1,21,94,0.14)] flex items-center gap-4 min-w-[250px]">
              <div className="w-[48px] h-[48px] rounded-full bg-[#01155E] flex items-center justify-center flex-shrink-0">
                <MapPin size={22} strokeWidth={2} className="text-white" />
              </div>
              <div>
                <p className="text-[#67739E] text-[14px] mb-1">Visit Our Office</p>
                <p className="text-[#01155E] text-[16px] font-semibold">Dubai Design District</p>
                <p className="text-[#67739E] text-[14px] mt-0.5">Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>
        </section>

        {/* FLOATING CONTACT FORM */}
        <div className="relative z-20 max-w-[640px] mx-auto px-5 -mt-[200px] sm:-mt-[220px] lg:-mt-[240px]">
          <div className="bg-white rounded-[18px] border border-[#E7EBF3] shadow-[0_20px_60px_rgba(1,21,94,0.16)] px-6 sm:px-8 lg:px-9 py-7 sm:py-8">

            <div className="mb-6">
              <span className="text-[#01155E] text-[14px] font-semibold uppercase tracking-[1px]">
                SEND US A MESSAGE
              </span>
              <h2 className="text-[#01155E] text-[27px] sm:text-[30px] font-semibold leading-[120%] mt-1.5">
                How can we help?
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#01155E] text-[14px] font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full h-[48px] px-4 rounded-[6px] border border-[#D9E1F2] bg-white text-[#01155E] placeholder:text-[#67739E]/60 text-[14px] outline-none focus:border-[#01155E] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#01155E] text-[14px] font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 577 3767"
                    className="w-full h-[48px] px-4 rounded-[6px] border border-[#D9E1F2] bg-white text-[#01155E] placeholder:text-[#67739E]/60 text-[14px] outline-none focus:border-[#01155E] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#01155E] text-[14px] font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full h-[48px] px-4 rounded-[6px] border border-[#D9E1F2] bg-white text-[#01155E] placeholder:text-[#67739E]/60 text-[14px] outline-none focus:border-[#01155E] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#01155E] text-[14px] font-medium mb-2">
                 What can we help you with?
                </label>
                <div className="relative">
                  <select
                    name="enquiry"
                    value={formData.enquiry}
                    onChange={handleChange}
                    className="appearance-none w-full h-[48px] px-4 pr-10 rounded-[6px] border border-[#D9E1F2] bg-white text-[#67739E] text-[14px] outline-none focus:border-[#01155E] transition-all"
                  >
                    <option value="">Select an option</option>
                    <option value="buy">I'm looking to buy</option>
                    <option value="sell">I'm looking to sell</option>
                    <option value="offplan">I'm interested in off-plan</option>
                    <option value="investment">Investment enquiry</option>
                    <option value="general">General enquiry</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#67739E] pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#01155E] text-[14px] font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share the details of your enquiry"
                  className="w-full px-4 py-3 rounded-[6px] border border-[#D9E1F2] bg-white text-[#01155E] placeholder:text-[#67739E]/60 text-[14px] outline-none resize-none focus:border-[#01155E] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full h-[49px] rounded-[6px] bg-[#01155E] text-white flex items-center justify-center gap-2 text-[14px] font-semibold hover:bg-[#67739E] transition-all duration-300"
              >
                <Send size={15} />
                Send Message
              </button>

             <div className="flex justify-center items-center gap-2 pt-1">
  <span className="text-[14px] text-[#67739E] text-center">
    Your privacy matters to us. Your information will be handled securely
    and in accordance with our{" "}
    <Link
      to="/privacy"
      className="text-[#01155E] font-medium hover:underline transition-all"
    >
      Privacy Policy
    </Link>
    .
  </span>
</div>
            </form>

          </div>
        </div>
      </div>

      {/* CONTACT INFORMATION */}
      <section className="px-5 pt-[60px] lg:pt-[80px] pb-[70px]">
  <div className="max-w-[1200px] mx-auto">
    <div className="text-center mb-10 sm:mb-12">
      <span className="text-[#01155E] text-[14px] font-semibold tracking-[1.2px] uppercase">
        CONTACT INFORMATION
      </span>
      <h2 className="text-[#01155E] text-[30px] sm:text-[38px] font-semibold leading-[120%] mt-2">
        We’re here when you need us
      </h2>
      <div className="w-[34px] h-[2px] bg-[#01155E] mx-auto mt-4" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 max-w-[800px] mx-auto">
      
      {/* Phone Card */}
      <ContactCard
        icon={<Phone size={21} />}
        title="Call Us"
        description={
          <div className="space-y-1.5 mt-2">
            <p className="text-[14px] text-[#01155E] font-medium">
              <span className="text-[#67739E]">UAE:</span>{" "}
              <a href="tel:+971505773767" className="hover:underline">
                +971 50 577 3767
              </a>
            </p>
            <p className="text-[14px] text-[#01155E] font-medium">
              <span className="text-[#67739E]">Canada:</span>{" "}
              <a href="tel:+14373288508" className="hover:underline">
                +1 437 328 8508
              </a>
            </p>
            <p className="text-[14px] text-[#01155E] font-medium">
              <span className="text-[#67739E]">India:</span>{" "}
              <a href="tel:+919999995871" className="hover:underline">
                +91 999 999 5871
              </a>
            </p>
          </div>
        }
      />

      {/* Email Card */}
      <ContactCard
        icon={<Mail size={21} />}
        title="Email Us"
        description={
          <div className="space-y-1.5 mt-2">
            <p className="text-[14px] text-[#01155E] font-medium break-all">
              <a href="mailto:info@yupland.ae" className="hover:underline">
                info@yupland.ae
              </a>
            </p>
            <p className="text-[14px] text-[#01155E] font-medium break-all">
              <a href="mailto:divyansh@aquaproperties.com" className="hover:underline">
                divyansh@aquaproperties.com
              </a>
            </p>
            <p className="text-[#67739E] text-[14px] pt-1">
              We usually respond within 24 hours.
            </p>
          </div>
        }
      />
    </div>
  </div>
</section>

      {/* CTA SECTION */}
      <section className="px-5 pb-[70px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="relative overflow-hidden rounded-[18px] bg-[#01155E] px-7 sm:px-10 lg:px-14 py-9 sm:py-11">
            <div className="absolute -right-[100px] -top-[130px] w-[350px] h-[350px] rounded-full border border-white/10" />
            <div className="absolute right-[30px] -bottom-[200px] w-[400px] h-[400px] rounded-full border border-white/10" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="hidden sm:flex w-[72px] h-[72px] rounded-full bg-white/10 items-center justify-center flex-shrink-0">
                  <MapPin size={30} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white text-[26px] sm:text-[32px] font-semibold leading-[120%]">
                    Ready to find your
                    <br />
                    perfect property?
                  </h2>
                  <p className="text-white/70 text-[14px] sm:text-[15px] mt-2">
                    Explore thousands of premium properties
                    <br className="hidden sm:block" />
                    across Dubai with Yupland.
                  </p>
                </div>
              </div>

              <a
                href="/listings"
                className="w-full lg:w-auto h-[50px] px-7 bg-white rounded-[7px] flex items-center justify-center gap-3 text-[#01155E] text-[14px] font-semibold hover:bg-[#67739E] hover:text-white transition-all duration-300"
              >
                Explore Properties
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const ContactCard = ({ icon, title, value, description }) => {
  return (
    <div className="group rounded-[14px] border border-[#E1E6F0] bg-white p-6 sm:p-7 hover:border-[#01155E] hover:shadow-[0_12px_35px_rgba(1,21,94,0.08)] transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-[48px] h-[48px] rounded-full bg-[#01155E] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#67739E] transition-all">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[#67739E] text-[14px] mb-1">{title}</p>
          <div className="text-[#01155E] text-[17px] sm:text-[18px] font-semibold break-words">
            {value}
          </div>
          <div className="text-[#67739E] text-[14px] leading-[170%] mt-3">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;