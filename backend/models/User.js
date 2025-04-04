const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: null },
    refreshToken: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
