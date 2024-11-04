const express = require("express");
const router = express.Router();

const {
  getArtistRecommendationsSpotify,
  getArtistRecommendationsLastFM,
  getSimilarArtistsTasteDive,
} = require("../services/recommendationService");

router.get("/", async (req, res) => {
  const { artistQuery } = req.query;
  console.log("Received artist: ", artistQuery);

  if (!artistQuery) {
    return res
      .status(400)
      .json({ error: "Artist query is required for discovery" });
  }

  try {
    const [spotifyResults, lastFMResults, tasteDiveResults] = await Promise.all(
      [
        getArtistRecommendationsSpotify(artistQuery),
        getArtistRecommendationsLastFM(artistQuery),
        getSimilarArtistsTasteDive(artistQuery),
      ]
    );

    // Combine and filter out results with empty topAlbums
    let allRecommendations = [
      ...spotifyResults,
      ...lastFMResults,
      ...tasteDiveResults,
    ].filter((artist) => artist.topAlbums && artist.topAlbums.length > 0);

    // Create a Set to keep track of unique artists (case-insensitive)
    const uniqueArtists = new Set();
    allRecommendations = allRecommendations.filter((artist) => {
      const artistName = artist.artist.toLowerCase();
      if (uniqueArtists.has(artistName)) {
        return false; // Skip if artist is already added
      }
      uniqueArtists.add(artistName);
      return true; // Include if artist is unique
    });

    // Cap the number of top albums for each artist to 5
    allRecommendations = allRecommendations.map((artist) => ({
      ...artist,
      topAlbums: artist.topAlbums.slice(0, 5),
    }));

    // Limit the total number of artists to 25
    const limitedRecommendations = allRecommendations.slice(0, 25);

    res.status(200).json(limitedRecommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

module.exports = router;
