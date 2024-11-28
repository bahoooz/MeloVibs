import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  const options = {
    dbName: "music-rank", // Forcer la base
    bufferCommands: false,
  };
  console.log("Connecting to MongoDB with options:", options); // Log pour debug
  await mongoose.connect(MONGODB_URI, options);
  console.log("Connected to MongoDB");
  return mongoose;
}

export default connectDb;
