const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://hemanthbotjapan0AC43_db_user:Zenora%40123@cluster0.3g4sjt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ✅ Define schemas
const JournalSchema = new mongoose.Schema({
  text: String,
  timestamp: String,
});

const ChatSchema = new mongoose.Schema({
  message: String,
  timestamp: String,
});

const JournalModel = mongoose.model("Journal", JournalSchema);
const ChatModel = mongoose.model("Chat", ChatSchema);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// ✅ Save journal entry
app.post("/api/journal", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const entry = await JournalModel.create({
    text,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, entry });
});

// ✅ Get journal entries
app.get("/api/journal", async (req, res) => {
  const entries = await JournalModel.find().sort({ timestamp: -1 }).limit(50);
  res.json({ entries });
});

// ✅ Save chat message
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const chat = await ChatModel.create({
    message,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, chat });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
