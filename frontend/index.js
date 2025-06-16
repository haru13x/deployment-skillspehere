const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const key = `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`;
// ✅ Setup OpenAI via OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: key, // move your key to .env
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // optional: your site domain
    "X-Title": "My AI React App", // optional: title for openrouter rankings
  },
});

app.post("/api/ask-ai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // You can also use 'mistralai/mistral-7b-instruct' or others
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong with AI response." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
