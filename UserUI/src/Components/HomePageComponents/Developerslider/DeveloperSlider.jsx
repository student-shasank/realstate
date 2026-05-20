import React, { useEffect } from "react";
import "./DeveloperSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevelopers } from "../../../features/dashboard/developerSlice";

const DeveloperSlider = () => {
  const dispatch = useDispatch();

  const { developers = [], loading } = useSelector(
    (state) => state.developer
  );

  useEffect(() => {
    dispatch(fetchDevelopers());
  }, [dispatch]);

  // Infinity effect
  const doubleDevelopers = [...developers, ...developers];

  return (
    <section className="slider-wrapper">
      <div className="slider-container">

        {/* Left Heading Section */}
        <div className="heading-section">
          Featuring
          <br />
          Dubai’s leading
          <br />
          Developers
        </div>

        {/* Right Slider Section */}
        <div className="slider-content">
          <div className="logo-track">
            {loading ? (
              <p>Loading...</p>
            ) : (
              doubleDevelopers.map((dev, index) => (
                <div className="logo-slide" key={index}>
                  <img
                    src={dev?.image}
                    alt={dev?.name}
                  />
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DeveloperSlider;