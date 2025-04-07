const express = require("express");
const authenticate = require("../middleware/authenticate");
const User = require("../models/User");

const router = express.Router();

// ✅ Route to get logged-in user's data
router.get("/me", authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password -refreshToken");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
