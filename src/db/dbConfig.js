import mongoose from "mongoose";

export async function connect() {
  try {
    const dbUri = process.env.MONGO_URL;
    if (!dbUri) {
      throw new Error("Database URI is not defined in environment variables.");
    }
    await mongoose.connect(dbUri);
    console.log("MongoDB connected successfully");
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
    // Handle the error according to your application's needs
    // process.exit() is avoided in production code
  }
}
