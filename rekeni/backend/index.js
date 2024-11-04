require("dotenv").config(); // Load environment variables

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const timeout = require("connect-timeout");
const path = require("path");

console.log("Server is starting...");

// Importing routes
const authRoutes = require("./routes/auth");
const favoriteRoutes = require("./routes/favourites");
const historyRoutes = require("./routes/history");
const recommendationRoutes = require("./routes/recommendations");
const reviewRoute = require("./routes/reviews");
const searchRoutes = require("./routes/search");
const searchSpotifyRoute = require("./routes/searchSpotifyAlbums");
const discoverRoute = require("./routes/discover");
const newReleasesRoute = require("./routes/newReleases");
const fetchAlbumRoute = require("./routes/fetchAlbum");

// Initialize the Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Apply timeout middleware globally
app.use(timeout("60s"));

// CORS middleware with default settings (allow all origins)
app.use(cors());

// Static file serving for the frontend (adjust the path as needed)
app.use(express.static(path.resolve(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Custom timeout handler middleware
app.use((req, res, next) => {
  res.setTimeout(60000, () => {
    console.error("Request timed out.");
    res.status(503).json({ error: "Service unavailable: request timed out" });
  });
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Simple test route
app.get("/", (req, res) => {
  res.send("Rekeni backend is running");
});

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/favourites", favoriteRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/review", reviewRoute);
app.use("/api/search", searchRoutes);
app.use("/api/searchAlbums", searchSpotifyRoute);
app.use("/api/discover", discoverRoute);
app.use("/api/newReleases", newReleasesRoute);
app.use("/api/fetchAlbum", fetchAlbumRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
