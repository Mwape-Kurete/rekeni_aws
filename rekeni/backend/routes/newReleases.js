const express = require("express");
const { getNewReleases } = require("../services/spotify");
const router = express.Router();

console.log("newReleases file loaded");

router.get("/", async (req, res) => {
  console.log("inside /api/newReleases endpoint");

  try {
    const newAlbums = await getNewReleases();

    console.log("New Relaeses found:", newAlbums); // logging the API request

    res.status(200).json(newAlbums);
  } catch (error) {
    console.error("Failed to retrieve new releases", error);
    res.status(500).json({ error: "Failed to retrieve new releases" });
  }
});

module.exports = router;
