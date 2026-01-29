import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

const API_KEY = "secret123";

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET item by id
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ message: "Name is required" });

  const item = await Item.create({ name: req.body.name });
  res.status(201).json(item);
});

// PUT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!item)
      return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch {
    res.status(400).json({ message: "Invalid data" });
  }
});

// PATCH
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!item)
      return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch {
    res.status(400).json({ message: "Invalid data" });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Item not found" });

    res.status(204).send();
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

export default router;
