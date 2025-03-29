
const express=require("express");
const connectDB =require("./config/db");
require("dotenv").config();
const app= express();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

connectDB();

app.get ("/",(req,res)=>{
    res.send("API is running...")
});
connectDB();
console.log("MongoDB URI:", process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello from Express Backend!" });
});

app.listen (PORT,()=>{
console.log(`Server is running on port ${PORT}`); g
})