import React, { useEffect, useMemo } from "react";
import "./DeveloperSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevelopers } from "../../../features/dashboard/developerSlice";

// Only these developers should appear in the slider
const ALLOWED_DEVELOPERS = [
  "Emaar",
  "Nakheel Properties",
  "Meraas developer",
  "Dubai Properties",
  "DAMAC Properties",
  "Sobha Realty",
  "Ellington Properties",
  "Binghatti Developers",
  "Danube Properties",
  "Majid Al Futtaim",
  "Beyond Developments",
  // "Beyond by Omniyat",
  "Omniyat properties",
  "Arada properties",
  "Aldar",
  "MAG Property Development",
  "Select Group",
  "Imtiaz Developments",
  "Object One Real Estate Development",
  "Prescott",
  "Tiger group",
  "Deyaar Development",
  "Azizi Developments",
  "Samana Developers",
  "Union Properties",
  "Bnw Developments",
  "BT Properties",
  "Citi Developers",
  "DHG Properties",
  "Dar Global",
  "IMAN Developers",
  "Modon",
  "Mira developments",
];

const normalize = (str = "") => str.trim().toLowerCase();
const ALLOWED_SET = new Set(ALLOWED_DEVELOPERS.map(normalize));

const DeveloperSlider = () => {
  const dispatch = useDispatch();

  const { developers = [], loading } = useSelector(
    (state) => state.developer
  );

  useEffect(() => {
    dispatch(fetchDevelopers());
  }, [dispatch]);

  // Filter to only allowed developers
  const filteredDevelopers = useMemo(() => {
    const matched = developers.filter((dev) =>
      ALLOWED_SET.has(normalize(dev?.name))
    );

    // ---- DEBUG LOGS ----
    console.log("📦 Total developers from API:", developers.length);
    console.log("✅ Matched developers:", matched.length);
    console.log(
      "✅ Matched names:",
      matched.map((d) => d?.name)
    );

    const apiNamesNormalized = developers.map((d) => normalize(d?.name));
    const notMatchedFromApi = developers.filter(
      (dev) => !ALLOWED_SET.has(normalize(dev?.name))
    );
    console.log(
      "❌ From API but NOT in allowed list (name mismatch or not wanted):",
      notMatchedFromApi.map((d) => d?.name)
    );

    const missingFromApi = ALLOWED_DEVELOPERS.filter(
      (name) => !apiNamesNormalized.includes(normalize(name))
    );
    console.log(
      "⚠️ In allowed list but NOT found in API response at all:",
      missingFromApi
    );
    // ---- END DEBUG LOGS ----

    return matched;
  }, [developers]);

  // Infinity effect
  const doubleDevelopers = [...filteredDevelopers, ...filteredDevelopers];

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