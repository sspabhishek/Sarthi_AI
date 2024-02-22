const { GoogleGenerativeAI } = require("@google/generative-ai");
API_KEY = "AIzaSyCOObpkas_YlD1zxclGAwA2070JYWfqlA4";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "what is 23+(2232*323)+23 explain its step by step";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();