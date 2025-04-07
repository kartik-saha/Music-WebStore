// Song.js

const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  songTitle: { type: String, required: true },
  songArtist: { type: String, required: true },
  genre: { type: String },
  album: { type: String },
  songFile: { type: String, required: true }, // Path or URL
  coverImage: { type: String }, // Path or URL
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Song", SongSchema);
