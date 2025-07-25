const mongoose = require("mongoose");

const connectDB = async () => {
  MONGODB_URI = process.env.DB_CONNECTION_SECRET;
  await mongoose.connect(MONGODB_URI);
};

module.exports = connectDB;
