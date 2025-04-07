const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🟡 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useUnifiedTopology: true // Uncomment if needed
    });
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message || error);
    process.exit(1);
  }
};

module.exports = connectDB;
