// backend/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: null }, // Optional profile picture URL
});

module.exports = mongoose.model('User', userSchema);
