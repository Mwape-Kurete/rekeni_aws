const mongoose = require("mongoose");

// Album Schema
const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String },
  releaseDate: { type: String },
  artworkUrl: { type: String },
  spotifyId: { type: String, unique: true }, // Store Spotify album ID
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Link reviews to albums
});

module.exports = mongoose.model("Album", albumSchema);
