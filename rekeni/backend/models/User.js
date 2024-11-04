const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const favoriteSchema = new mongoose.Schema({
  albumId: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  artworkUrl: { type: String }, // Ensure this is included
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  password: { type: String, required: true }, // Store hashed password
  favorites: [favoriteSchema], // Replacing 'favourites' with 'favorites'
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }], // Stores Users general liked albums
  playHistory: [{ albumId: String, timestamp: Date }], // User's listening history
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt with cost factor 10
    user.password = await bcrypt.hash(user.password, salt); // Hash the password with the salt
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare user-entered password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
