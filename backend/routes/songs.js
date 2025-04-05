// songs.js

const express = require("express");
const mongoose = require("mongoose");
const Song = require("../models/Song");

const router = express.Router();

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
