const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Song = require("../models/Song");
const { Readable } = require("stream");
require("dotenv").config();

const router = express.Router();

// Use Multer to buffer files into memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create GridFSBucket
let gridFSBucket;
mongoose.connection.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  console.log("✅ GridFSBucket initialized");
});

// ✅ Upload route (manual upload to GridFS)
router.post(
  "/upload-song",
  upload.fields([
    { name: "songFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { songTitle, songArtist, genre, album } = req.body;
      const songFileBuffer = req.files?.songFile?.[0];
      const coverImageBuffer = req.files?.coverImage?.[0];

      if (!songTitle || !songArtist || !songFileBuffer) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      // Upload song file to GridFS
      const songFileStream = Readable.from(songFileBuffer.buffer);
      const songFileName = `${Date.now()}-${songFileBuffer.originalname}`;
      const songUploadStream = gridFSBucket.openUploadStream(songFileName, {
        metadata: { originalname: songFileBuffer.originalname },
      });

      songFileStream.pipe(songUploadStream);

      songUploadStream.on("error", (err) => {
        console.error("❌ Song file upload failed:", err);
        return res.status(500).json({ message: "Song file upload failed" });
      });

      songUploadStream.on("finish", async (songFileData) => {
        let coverImageFileName = null;

        if (coverImageBuffer) {
          // Upload cover image too
          const coverStream = Readable.from(coverImageBuffer.buffer);
          coverImageFileName = `${Date.now()}-${coverImageBuffer.originalname}`;
          const coverUploadStream = gridFSBucket.openUploadStream(coverImageFileName, {
            metadata: { originalname: coverImageBuffer.originalname },
          });

          coverStream.pipe(coverUploadStream);

          coverUploadStream.on("error", (err) => {
            console.error("❌ Cover image upload failed:", err);
          });

          coverUploadStream.on("finish", async () => {
            await saveSongRecord(songTitle, songArtist, genre, album, songFileName, coverImageFileName, res);
          });
        } else {
          await saveSongRecord(songTitle, songArtist, genre, album, songFileName, null, res);
        }
      });
    } catch (err) {
      console.error("❌ Upload route error:", err);
      res.status(500).json({ message: "Unexpected error", error: err.message });
    }
  }
);

// ✅ Save metadata to MongoDB
async function saveSongRecord(title, artist, genre, album, songFile, coverImage, res) {
  try {
    const newSong = new Song({
      songTitle: title,
      songArtist: artist,
      genre,
      album,
      songFile,
      coverImage,
    });

    await newSong.save();
    console.log("✅ Song metadata saved:", newSong);
    res.status(201).json({ message: "Song uploaded successfully!", song: newSong });
  } catch (err) {
    console.error("❌ Failed to save song metadata:", err);
    res.status(500).json({ message: "Metadata save failed", error: err.message });
  }
}

// ✅ Download route
router.get("/files/:filename", async (req, res) => {
  try {
    const file = await mongoose.connection.db
      .collection("uploads.files")
      .findOne({ filename: req.params.filename });

    if (!file) return res.status(404).json({ message: "File not found" });

    gridFSBucket.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving file", error: err.message });
  }
});

// ✅ Test route
router.get("/test", (req, res) => {
  res.send("✅ Upload route working!");
});

module.exports = router;
