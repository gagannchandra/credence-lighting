import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Dynamically import the handler so process.env is populated first
const { default: contactHandler } = await import("./api/contact.js");

const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies (what Vercel Serverless Functions expect)
app.use(express.json());

// Proxy the /api/contact route to our Vercel function handler
app.post("/api/contact", async (req, res) => {
  try {
    await contactHandler(req, res);
  } catch (error) {
    console.error("Local API Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Local API Server running on http://localhost:${PORT}`);
});
