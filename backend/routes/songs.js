const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Song = require("../models/Song");
const router = express.Router();
const Grid = require("gridfs-stream");

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads"); 
});

// Configure Multer for GridFS Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Song API (with GridFS)
router.post("/upload-song", upload.single("songFile"), async (req, res) => {
    try {
        const { songTitle, songArtist, genre, album } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Song file is required" });
        }

        const writeStream = gfs.createWriteStream({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        writeStream.write(req.file.buffer);
        writeStream.end();

        writeStream.on("close", async (file) => {
            const newSong = new Song({
                songTitle,
                songArtist,
                genre,
                album,
                songFile: file._id,  // Store GridFS file ID
                coverImage: req.body.coverImage || "",
            });

            await newSong.save();
            res.json({ message: "Song uploaded successfully!", song: newSong });
        });

    } catch (err) {
        res.status(500).json({ error: "Failed to upload song" });
    }
});

// Fetch All Songs API
router.get("/songs", async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch songs." });
    }
});

module.exports = router;
