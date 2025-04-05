const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🟡 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};


module.exports = connectDB;


