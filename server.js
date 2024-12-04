const express = require("express");
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const app = express();
const port = 3000;

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(express.json());

app.use(express.static('public'));

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send({ text });
  } catch (error) {
    res.status(500).send({ error: "Failed to generate content" });
  }
});

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./index.html'));
});
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./style.css'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
