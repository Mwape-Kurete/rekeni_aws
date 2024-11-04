const express = require("express");
const Album = require("../models/Album");
const { getSearchedAlbum } = require("../services/lastfm");
const router = express.Router();

router.get("/search", async (req, res) => {
  console.log("Search route accessed");
  console.log("Inside search route handler"); // Log added here
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Search for albums on Last.fm
    const searchResults = await getSearchedAlbum(query);

    // Save albums to MongoDB if they don't already exist
    for (const result of searchResults) {
      const existingAlbum = await Album.findOne({ lastfmId: result.mbid });

      if (!existingAlbum) {
        const newAlbum = new Album({
          title: result.name,
          artist: result.artist,
          artworkUrl: result.image[2]["#text"], // Use medium-sized image from Last.fm
          lastfmId: result.mbid, // Unique Last.fm MusicBrainz ID
        });
        await newAlbum.save();
      }
    }

    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to search albums" });
  }
});

module.exports = router;
