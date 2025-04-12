// src/utils/generateFromGemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY, {
  apiUrl: "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
});

export const generateFromGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return "❌ Error generating content from Gemini.";
  }
};
