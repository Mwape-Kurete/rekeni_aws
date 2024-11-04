const express = require("express");
const Album = require("../models/Album"); // Import Album model
const { searchSpotifyAlbums } = require("../services/spotify");
const router = express.Router();

console.log("searchSpotifyAlbums.js file loaded");

router.get("/", async (req, res) => {
  console.log("Inside /api/searchAlbums endpoint");
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const albums = await searchSpotifyAlbums(query);
    console.log("Albums found:", albums); // Logging API result

    // Save each album to MongoDB if it doesn’t already exist
    for (const album of albums) {
      const existingAlbum = await Album.findOne({ spotifyId: album.id });

      if (!existingAlbum) {
        const newAlbum = new Album({
          title: album.name,
          artist: album.artists[0].name,
          genre: album.genres ? album.genres[0] : undefined, // Spotify genres if available
          releaseDate: album.release_date,
          artworkUrl: album.images[0]?.url, // Use largest available image
          spotifyId: album.id, // Unique Spotify album ID
        });
        await newAlbum.save();
      }
    }

    res.status(200).json(albums);
  } catch (error) {
    console.error("Failed to search Spotify albums:", error);
    res.status(500).json({ error: "Failed to search Spotify albums" });
  }
});

module.exports = router;
