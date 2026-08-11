import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock3,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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

    console.log("Contact Form Data:", formData);

    // =====================================================
    // Add your API here
    // =====================================================
  };

  return (
    <section className="w-full bg-white font-['General_Sans']">

      {/* =========================================================
          PAGE INTRO
      ========================================================= */}
      <div className="w-full px-5 sm:px-8 lg:px-10 pt-12 sm:pt-16 lg:pt-20 pb-8">

        <div className="max-w-[1280px] mx-auto">

          <div className="text-center">

            <p className="text-[#67739E] text-[12px] sm:text-[13px] font-medium tracking-[1px] uppercase mb-2">
              GET IN TOUCH
            </p>

            <h1
              className="
                text-[#01155E]
                text-[36px]
                sm:text-[44px]
                lg:text-[52px]
                font-semibold
                leading-[115%]
                tracking-[-1.5px]
              "
            >
              Contact Us
            </h1>

            <p
              className="
                max-w-[650px]
                mx-auto
                mt-4
                text-[#67739E]
                text-[14px]
                sm:text-[15px]
                lg:text-[16px]
                leading-[160%]
              "
            >
              Have a question about a property, an investment opportunity,
              or the Dubai real estate market? Our team is here to help.
            </p>

          </div>

        </div>

      </div>


      {/* =========================================================
          MAP SECTION
      ========================================================= */}
      <div className="relative w-full">

        {/* ---------------------------------------------------------
            LARGE MAP
        --------------------------------------------------------- */}
        <div
          className="
            relative
            w-full
            h-[500px]
            sm:h-[560px]
            lg:h-[620px]
            overflow-hidden
          "
        >

          <iframe
            title="Yupland Dubai Office Location"
            src="https://www.google.com/maps?q=Dubai%20Design%20District%20Dubai%20UAE&z=14&output=embed"
            className="
              absolute
              inset-0
              w-full
              h-full
              border-0
            "
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>


        {/* =========================================================
            OFFICE LOCATION LABEL
        ========================================================= */}
        <div
          className="
            absolute
            top-5
            left-5
            sm:top-7
            sm:left-7
            lg:top-8
            lg:left-10
            z-10
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              bg-white
              rounded-[8px]
              border
              border-[#D9E1F2]
              px-4
              py-3
              shadow-[0_6px_20px_rgba(1,21,94,0.10)]
            "
          >

            <div
              className="
                w-[42px]
                h-[42px]
                rounded-full
                bg-[#01155E]
                flex
                items-center
                justify-center
                flex-shrink-0
              "
            >
              <MapPin
                size={19}
                strokeWidth={1.8}
                className="text-white"
              />
            </div>

            <div>

              <p className="text-[#67739E] text-[10px] sm:text-[11px] mb-0.5">
                OUR OFFICE
              </p>

              <p className="text-[#01155E] text-[13px] sm:text-[14px] font-semibold">
                Dubai Design District
              </p>

            </div>

          </div>

        </div>


        {/* =========================================================
            CONTACT FORM
        ========================================================= */}
        <div
          className="
            relative
            lg:absolute
            lg:left-1/2
            lg:-translate-x-1/2
            lg:bottom-[-145px]
            w-full
            px-5
            z-20
          "
        >

          <div
            className="
              w-full
              max-w-[625px]
              mx-auto
              bg-white
              border
              border-[#D9E1F2]
              rounded-[10px]
              shadow-[0_12px_35px_rgba(1,21,94,0.12)]
              p-6
              sm:p-8
              lg:p-9
            "
          >

            {/* FORM HEADING */}
            <div className="text-center mb-6">

              <p className="text-[#67739E] text-[11px] sm:text-[12px] font-medium tracking-[0.8px] uppercase mb-1">
                SEND US A MESSAGE
              </p>

              <h2
                className="
                  text-[#01155E]
                  text-[24px]
                  sm:text-[28px]
                  font-semibold
                  leading-[125%]
                "
              >
                Get in touch with us
              </h2>

              <p className="text-[#67739E] text-[13px] mt-2">
                Fill in your details and our team will get back to you.
              </p>

            </div>


            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* =================================================
                  NAME + EMAIL
              ================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* NAME */}
                <div>

                  <label
                    htmlFor="name"
                    className="
                      block
                      text-[#01155E]
                      text-[12px]
                      sm:text-[13px]
                      font-medium
                      mb-1.5
                    "
                  >
                    Name*
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="
                      w-full
                      h-[48px]
                      px-4
                      rounded-[6px]
                      border
                      border-[#D9E1F2]
                      bg-white
                      text-[#01155E]
                      placeholder:text-[#67739E]
                      placeholder:opacity-60
                      text-[13px]
                      sm:text-[14px]
                      outline-none
                      transition-all
                      duration-200
                      focus:border-[#01155E]
                      focus:shadow-[0_0_0_2px_rgba(1,21,94,0.05)]
                    "
                  />

                </div>


                {/* EMAIL */}
                <div>

                  <label
                    htmlFor="email"
                    className="
                      block
                      text-[#01155E]
                      text-[12px]
                      sm:text-[13px]
                      font-medium
                      mb-1.5
                    "
                  >
                    Email*
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="
                      w-full
                      h-[48px]
                      px-4
                      rounded-[6px]
                      border
                      border-[#D9E1F2]
                      bg-white
                      text-[#01155E]
                      placeholder:text-[#67739E]
                      placeholder:opacity-60
                      text-[13px]
                      sm:text-[14px]
                      outline-none
                      transition-all
                      duration-200
                      focus:border-[#01155E]
                      focus:shadow-[0_0_0_2px_rgba(1,21,94,0.05)]
                    "
                  />

                </div>

              </div>


              {/* =================================================
                  PHONE
              ================================================= */}
              <div>

                <label
                  htmlFor="phone"
                  className="
                    block
                    text-[#01155E]
                    text-[12px]
                    sm:text-[13px]
                    font-medium
                    mb-1.5
                  "
                >
                  Phone*
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+971"
                  required
                  className="
                    w-full
                    h-[48px]
                    px-4
                    rounded-[6px]
                    border
                    border-[#D9E1F2]
                    bg-white
                    text-[#01155E]
                    placeholder:text-[#67739E]
                    placeholder:opacity-60
                    text-[13px]
                    sm:text-[14px]
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#01155E]
                    focus:shadow-[0_0_0_2px_rgba(1,21,94,0.05)]
                  "
                />

              </div>


              {/* =================================================
                  SUBJECT
              ================================================= */}
              <div>

                <label
                  htmlFor="subject"
                  className="
                    block
                    text-[#01155E]
                    text-[12px]
                    sm:text-[13px]
                    font-medium
                    mb-1.5
                  "
                >
                  Subject*
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="
                    w-full
                    h-[48px]
                    px-4
                    rounded-[6px]
                    border
                    border-[#D9E1F2]
                    bg-white
                    text-[#01155E]
                    placeholder:text-[#67739E]
                    placeholder:opacity-60
                    text-[13px]
                    sm:text-[14px]
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#01155E]
                    focus:shadow-[0_0_0_2px_rgba(1,21,94,0.05)]
                  "
                />

              </div>


              {/* =================================================
                  MESSAGE
              ================================================= */}
              <div>

                <label
                  htmlFor="message"
                  className="
                    block
                    text-[#01155E]
                    text-[12px]
                    sm:text-[13px]
                    font-medium
                    mb-1.5
                  "
                >
                  Message*
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  required
                  rows={4}
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-[6px]
                    border
                    border-[#D9E1F2]
                    bg-white
                    text-[#01155E]
                    placeholder:text-[#67739E]
                    placeholder:opacity-60
                    text-[13px]
                    sm:text-[14px]
                    outline-none
                    resize-none
                    transition-all
                    duration-200
                    focus:border-[#01155E]
                    focus:shadow-[0_0_0_2px_rgba(1,21,94,0.05)]
                  "
                />

              </div>


              {/* =================================================
                  SUBMIT
              ================================================= */}
              <button
                type="submit"
                className="
                  w-full
                  h-[49px]
                  rounded-[6px]
                  bg-[#01155E]
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[12px]
                  sm:text-[13px]
                  font-semibold
                  tracking-[0.3px]
                  transition-all
                  duration-300
                  hover:bg-[#67739E]
                  active:scale-[0.99]
                "
              >

                <Send
                  size={15}
                  strokeWidth={1.8}
                />

                SEND MESSAGE

              </button>

            </form>

          </div>

        </div>

      </div>


      {/* =========================================================
          CONTACT INFORMATION
      ========================================================= */}
      <div
        className="
          w-full
          px-5
          sm:px-8
          lg:px-10
          pt-[80px]
          sm:pt-[100px]
          lg:pt-[175px]
          pb-14
        "
      >

        <div className="max-w-[1120px] mx-auto">

          {/* SECTION TITLE */}
          <div className="text-center mb-10 sm:mb-12">

            <p className="text-[#67739E] text-[11px] sm:text-[12px] font-medium tracking-[1px] uppercase">
              CONTACT INFORMATION
            </p>

            <h2
              className="
                text-[#01155E]
                text-[28px]
                sm:text-[34px]
                lg:text-[38px]
                font-semibold
                leading-[120%]
                mt-2
              "
            >
              We're here when you need us
            </h2>

          </div>


          {/* =====================================================
              CONTACT INFO GRID
          ===================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3">

            {/* =================================================
                PHONE
            ================================================= */}
            <div
              className="
                flex
                flex-col
                items-center
                text-center
                px-6
                py-8
              "
            >

              <div
                className="
                  w-[76px]
                  h-[76px]
                  rounded-full
                  bg-[#F2F5FA]
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >

                <Phone
                  size={29}
                  strokeWidth={1.7}
                  className="text-[#01155E]"
                />

              </div>

              <h3
                className="
                  text-[#01155E]
                  text-[22px]
                  sm:text-[25px]
                  font-medium
                  leading-[125%]
                "
              >
                Telephone
              </h3>

              <p className="text-[#67739E] text-[14px] mt-3">
                +971 4 123 4567
              </p>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}
            <div
              className="
                flex
                flex-col
                items-center
                text-center
                px-6
                py-8
                border-y
                md:border-y-0
                md:border-x
                border-[#D9E1F2]
              "
            >

              <div
                className="
                  w-[76px]
                  h-[76px]
                  rounded-full
                  bg-[#F2F5FA]
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >

                <Mail
                  size={29}
                  strokeWidth={1.7}
                  className="text-[#01155E]"
                />

              </div>

              <h3
                className="
                  text-[#01155E]
                  text-[22px]
                  sm:text-[25px]
                  font-medium
                  leading-[125%]
                "
              >
                Email
              </h3>

              <p className="text-[#67739E] text-[14px] mt-3 break-all">
                hello@yupland.com
              </p>

            </div>


            {/* =================================================
                ADDRESS
            ================================================= */}
            <div
              className="
                flex
                flex-col
                items-center
                text-center
                px-6
                py-8
              "
            >

              <div
                className="
                  w-[76px]
                  h-[76px]
                  rounded-full
                  bg-[#F2F5FA]
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >

                <MapPin
                  size={29}
                  strokeWidth={1.7}
                  className="text-[#01155E]"
                />

              </div>

              <h3
                className="
                  text-[#01155E]
                  text-[22px]
                  sm:text-[25px]
                  font-medium
                  leading-[125%]
                "
              >
                Address
              </h3>

              <p
                className="
                  max-w-[300px]
                  text-[#67739E]
                  text-[14px]
                  leading-[155%]
                  mt-3
                "
              >
                Office 511, Building 03,
                <br />
                Dubai Design District (D3),
                <br />
                Dubai, United Arab Emirates
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================================
          OFFICE HOURS
      ========================================================= */}
      <div className="w-full px-5 sm:px-8 lg:px-10 pb-14">

        <div className="max-w-[1120px] mx-auto">

          <div
            className="
              border-t
              border-[#D9E1F2]
              pt-7
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-2.5
            "
          >

            <Clock3
              size={17}
              strokeWidth={1.7}
              className="text-[#01155E]"
            />

            <p className="text-[#67739E] text-[13px] text-center">
              Our office is open Monday – Friday, 9:00 AM – 6:00 PM
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Contact;