import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./.env") }); // relative to current working dir
//dotenv.config(); // loads .env in the same folder
import mongoose from "mongoose";

console.log("Mongo URL:", process.env.MONGO_URL); // now correct


export const connectDB = async () => {
  try {
    const db = process.env.MONGO_URL;
    const { connection } = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected to ${connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};