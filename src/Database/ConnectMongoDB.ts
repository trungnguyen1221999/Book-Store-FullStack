import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectMongoDB;
