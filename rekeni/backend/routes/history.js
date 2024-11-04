const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/history/:albumId", async (req, res) => {
  const { userId } = req.body;
  const { albumId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Add album to play history
    user.playHistory.push({ albumId, timestamp: new Date() });
    await user.save();
    res.status(200).json({ message: "Added to listening history" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add to history" });
  }
});

module.exports = router;
