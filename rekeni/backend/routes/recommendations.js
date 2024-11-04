const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  getArtistRecommendationsSpotify,
  getArtistRecommendationsLastFM,
  getSimilarArtistsTasteDive,
} = require("../services/recommendationService");

const fetchWithTimeout = (fetchPromise, timeout = 60000) => {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );
  return Promise.race([fetchPromise, timeoutPromise]);
};

const safeFetch = async (fetchFunction, ...args) => {
  try {
    return await fetchFunction(...args);
  } catch (error) {
    console.error(
      `Error during API call in ${fetchFunction.name}:`,
      error.message
    );
    return []; // Return an empty array if the API call fails
  }
};

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate("favorites")
      .populate("reviews");

    if (!user) return res.status(404).json({ error: "User not found" });

    const excludedArtists = new Set([
      ...user.favorites.map((album) => album.artist.toLowerCase()),
      ...user.reviews.map((review) => review.artist.toLowerCase()),
    ]);

    const recommendations = [];

    for (const album of user.favorites) {
      try {
        const [spotifyResults, lastFMResults, tasteDiveResults] =
          await Promise.all([
            safeFetch(getArtistRecommendationsSpotify, album.artist),
            safeFetch(getArtistRecommendationsLastFM, album.artist),
            safeFetch(getSimilarArtistsTasteDive, album.artist),
          ]);

        const filteredResults = [
          ...spotifyResults,
          ...lastFMResults,
          ...tasteDiveResults,
        ].filter(
          (rec) => rec.artist && !excludedArtists.has(rec.artist.toLowerCase())
        );

        recommendations.push(...filteredResults);
      } catch (err) {
        console.error(`Error processing artist ${album.artist}:`, err.message);
        // Log the error and continue processing other artists
      }
    }

    const uniqueRecommendations = recommendations
      .filter(
        (rec, index, self) =>
          index ===
          self.findIndex(
            (r) => r.artist.toLowerCase() === rec.artist.toLowerCase()
          )
      )
      .slice(0, 25); // Limit the number of unique recommendations

    if (!res.headersSent) {
      return res.status(200).json(uniqueRecommendations);
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to fetch recommendations" });
    }
  }
});

module.exports = router;
