const mongoose = require("mongoose");
require("dotenv").config();

// ONLINE - CONNECTION;
const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL);
    console.log("connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = dbConnect;
