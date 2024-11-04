const express = require("express");
const Album = require("../models/Album");
const Review = require("../models/Review");
const router = express.Router();

// Endpoint to fetch albums with the most number of reviews
router.get("/most-reviewed", async (req, res) => {
  try {
    const albums = await Album.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "album",
          as: "reviewData",
        },
      },
      {
        $addFields: {
          reviewCount: { $size: "$reviewData" },
        },
      },
      {
        $sort: { reviewCount: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json(albums);
  } catch (error) {
    console.error("Failed to fetch most-reviewed albums: ", error);
    res
      .status(500)
      .json({
        error: "Failed to fetch most-reviewed albums",
        details: error.message,
      });
  }
});

// Endpoint to fetch albums with the highest average rating
router.get("/highest-rated", async (req, res) => {
  try {
    const albums = await Album.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "album",
          as: "reviewData",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviewData.rating" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json(albums);
  } catch (error) {
    console.error("Failed to fetch highest-rated albums: ", error);
    res
      .status(500)
      .json({
        error: "Failed to fetch highest-rated albums",
        details: error.message,
      });
  }
});

// Dynamic route for fetching a single album by ID
router.get("/:albumId", async (req, res) => {
  const { albumId } = req.params;

  if (!albumId) {
    return res.status(400).json({ error: "An Album ID is required" });
  }

  try {
    const singleAlbum = await Album.findOne({ spotifyId: albumId }).populate(
      "reviews"
    );

    if (!singleAlbum) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.json(singleAlbum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve album data" });
  }
});

module.exports = router;
