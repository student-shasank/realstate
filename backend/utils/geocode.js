import axios from "axios";

export const geocodeAddress = async ({ location, city, country }) => {
  try {
    // 👉 Full readable address
    const query = `${location}, ${city}, ${country}`;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json`;

    const response = await axios.get(url, {
      params: {
        access_token: process.env.MAP_TOKEN,
        limit: 1,
      },
    });

    if (!response.data.features.length) {
      throw new Error("Location not found");
    }

    const [lng, lat] = response.data.features[0].center;

    return {
      lat,
      lng,
    };
  } catch (error) {
    console.error("GEOCODING ERROR:", error.message);
    throw new Error("Failed to convert location to coordinates");
  }
};
