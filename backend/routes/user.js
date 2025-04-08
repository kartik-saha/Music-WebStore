const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticate = require("../middleware/authenticate");
const bcrypt = require("bcrypt");

// GET /api/users/me - Fetch user info
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("username email");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/users/update - Update username, email, and password
router.patch("/update", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const { username, email, password } = req.body;

    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    res.json({
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
