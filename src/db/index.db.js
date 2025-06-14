require("dotenv").config();

const mongoose = require("mongoose");
const MONGO_URI  = process.env.dbPORT;
const connectDB = async () => {
  try {
    //  console.log(MONGO_URI);
  await mongoose.connect(MONGO_URI);
 
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports =connectDB;