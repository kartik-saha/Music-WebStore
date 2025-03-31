const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const Song = require("../models/Song");
require("dotenv").config();

const router = express.Router();

// Use existing MongoDB connection
const conn = mongoose.connection;
let gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("GridFS initialized in upload.js");
});

// Storage Configuration
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      bucketName: "uploads",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

// Upload Song Route
router.post("/upload-song", upload.fields([{ name: "songFile" }, { name: "coverImage" }]), async (req, res) => {
  try {
    console.log("Upload request received:", req.body);
    console.log("Uploaded files:", req.files);

    const songFile = req.files["songFile"] ? req.files["songFile"][0].filename : null;
    const coverImage = req.files["coverImage"] ? req.files["coverImage"][0].filename : null;
    const { songTitle, songArtist, genre, album } = req.body;

    if (!songFile || !songTitle || !songArtist) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newSong = new Song({
      songTitle,
      songArtist,
      genre,
      album,
      songFile,
      coverImage,
    });

    console.log("Saving song metadata:", newSong);
    await newSong.save();

    res.status(201).json({ message: "Song uploaded successfully!", song: newSong });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
});

// Fetch Song or Cover Image
router.get("/files/:filename", async (req, res) => {
  try {
    const file = await conn.db.collection("uploads.files").findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    gridFSBucket.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Error fetching file", error: error.message });
  }
});

module.exports = router;
