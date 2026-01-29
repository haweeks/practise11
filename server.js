import express from "express";
import mongoose from "mongoose";
import itemsRouter from "./routes/items.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// routes
app.use("/api/items", itemsRouter);

// test route
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("Server running");
  });
});
