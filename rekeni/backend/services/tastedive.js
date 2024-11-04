const axios = require("axios");
const TASTEDIVE_API_KEY = process.env.TASTEDIVE_API_KEY;

const getSimilarMusic = async (albumQuery) => {
  console.log("TasteDive API Key: ", TASTEDIVE_API_KEY);

  try {
    const response = await axios.get("https://tastedive.com/api/similar", {
      params: {
        q: encodeURIComponent(albumQuery),
        type: "music",
        k: TASTEDIVE_API_KEY,
      },
      timeout: 50000, // Set a 5-second timeout
    });

    if (response.status !== 200) {
      console.error("Unexpected response status:", response.status);
      return [];
    }

    const artistNames = response.data.Similar.Results.map(
      (result) => result.Name
    );
    return artistNames || [];
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.error("Request to TasteDive timed out");
    } else if (error.response) {
      console.error("TasteDive API error response:", error.response.data);
    } else {
      console.error("TasteDive API error:", error.message);
    }

    // Return a fallback response or empty array
    return ["Fallback Artist 1", "Fallback Artist 2"];
  }
};

module.exports = { getSimilarMusic };
