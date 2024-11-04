const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Route to get all favourites for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Return the user's favorites, including artworkUrl
    res.status(200).json(user.favorites);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch favourites", details: error.message });
  }
});

// Route to add album to favourites
router.post("/:albumId", async (req, res) => {
  const { userId, title, artist, artworkUrl } = req.body; // Include artworkUrl
  const { albumId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.favorites.some((fav) => fav.albumId === albumId)) {
      return res.status(400).json({ error: "Album is already in favourites" });
    }

    if (user.favorites.length >= 5) {
      return res
        .status(400)
        .json({ error: "Maximum of 5 albums allowed in favourites" });
    }

    user.favorites.push({
      albumId: String(albumId),
      title,
      artist,
      artworkUrl,
    });
    await user.save();
    res.status(200).json({
      message: "Album added to favourites",
      favourites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add album to favourites",
      details: error.message,
    });
  }
});

// Route to delete album from favourites
router.delete("/:albumId", async (req, res) => {
  const { userId } = req.body;
  const { albumId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const albumIndex = user.favorites.findIndex(
      (fav) => fav.albumId === albumId
    );
    if (albumIndex === -1) {
      return res.status(400).json({ error: "Album not found in favourites" });
    }

    user.favorites.splice(albumIndex, 1);
    await user.save();
    res.status(200).json({
      message: "Album removed from favourites",
      favourites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete album from favourites",
      details: error.message,
    });
  }
});

module.exports = router;
