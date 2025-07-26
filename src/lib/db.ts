import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGOOSE_URL;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGOOSE_URL environment variable");
}

// Connection function
async function dbConnect() {
  try {
    const conn = await mongoose.connect(MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
