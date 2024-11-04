const axios = require("axios");

// Function to search for albums using iTunes Search API
const searchiTunes = async (query) => {
  try {
    const response = await axios.get("https://itunes.apple.com/search", {
      params: {
        term: query, // Search term (album or artist name)
        media: "music", // Media type (music)
        entity: "album", // Limit the search to albums
        limit: 10, // Number of results to return
        country: "US", // Optional: restrict to a specific country
      },
    });

    return response.data.results; // Return the search results
  } catch (error) {
    console.error("Error searching iTunes:", error);
    throw new Error("Failed to search iTunes");
  }
};

module.exports = { searchiTunes };
