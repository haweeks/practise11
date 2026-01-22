import express from "express";
import mongoose from "mongoose";

const app = express();

// middleware
app.use(express.json());

// constants
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ===== ROUTES =====

// health check (обязателен для Render)
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

// example API route (CRUD-заглушка)
app.get("/api/items", (req, res) => {
  res.json([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ]);
});

// ===== DATABASE =====

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// ===== SERVER =====

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
