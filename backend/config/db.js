const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("🟡 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology: true,
    }); 
    console.log("✅ MongoDB Connected!")
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);;
  }
};


module.exports = connectDB;

// jpbe6IbXtTGMU3Zy

// mongodb+srv://<db_username>:<db_password>@music-app.lvd3zng.mongodb.net/?retryWrites=true&w=majority&appName=music-app

