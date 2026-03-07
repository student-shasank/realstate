import React from 'react';
import "./DeveloperSlider.css"

const DeveloperSlider = () => {
  // Aapke developers ki list
  const developers = [
    { name: "Damac", img: "https://d3h330vgpwpjr8.cloudfront.net/x/296x/Damac_c63829f7d0.webp" },
    { name: "Emaar", img: "https://d3h330vgpwpjr8.cloudfront.net/x/296x/Emaar_f229e25788.webp" },
    { name: "Meraas", img: "https://d3h330vgpwpjr8.cloudfront.net/x/296x/Meraas_logo_58aa6236ab.webp" },
    { name: "Sobha", img: "https://d3h330vgpwpjr8.cloudfront.net/x/296x/logo_01_4fd8dc607d.webp" },
    { name: "Nakheel", img: "https://d3h330vgpwpjr8.cloudfront.net/x/296x/logo_02_1_666ef04015.webp" },
    { name: "Binghatti", img: "https://d3h330vgpwpjr8.cloudfront.net/x/296x/binghatti_7c9b5b6084.webp" },
    { name: "Select Group", img: "https://d3h330vgpwpjr8.cloudfront.net/x/296x/Select_Group_be8d857695.webp" },
  ];

  // Infinity effect ke liye array ko double kar rahe hain
  const doubleDevelopers = [...developers, ...developers];

  return (
    <section className="slider-wrapper">
      <div className="slider-container">
        
        {/* Left Heading Section */}
        <div className="heading-section">
          Featuring<br /> Dubai’s leading <br /> Developers
        </div>

        {/* Right Slider Section */}
        <div className="slider-content">
          <div className="logo-track">
            {doubleDevelopers.map((dev, index) => (
              <div className="logo-slide" key={index}>
                <img src={dev.img} alt={dev.name} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DeveloperSlider;