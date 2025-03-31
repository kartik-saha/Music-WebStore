const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const connectDB = require("./config/db");


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const songRoutes = require("./routes/songs"); // NEW

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
console.log("MongoDB URI:", process.env.MONGO_URI);

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello from Express Backend!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
