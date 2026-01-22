import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// test route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// model
const ItemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", ItemSchema);

// CRUD
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.get("/api/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

app.post("/api/items", async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

app.put("/api/items/:id", async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
});

app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on ${PORT}`)
    );
  })
  .catch(err => console.error(err));
