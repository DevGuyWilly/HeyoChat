import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()

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

export default dbConnect;
