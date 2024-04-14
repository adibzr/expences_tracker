import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./configuration/db";
import app from "./configuration/serverConfig";
dotenv.config();

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(config.mongo.uri, {
  retryWrites: true,
  w: "majority",
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Start server
app.listen(config.server.port, () => {
  console.log(`Server running on port: ${config.server.port}`);
});
