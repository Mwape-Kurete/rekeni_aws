const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  const { username, email, bio, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create and save new user
    const newUser = new User({ username, email, bio, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { username, email },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

//Handle Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare entered password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { userId: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user data" });
  }
});

module.exports = router;
