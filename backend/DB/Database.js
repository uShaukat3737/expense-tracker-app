import mongoose from "mongoose";
console.log("Mongo URL:", process.env.MONGO_URL);
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
