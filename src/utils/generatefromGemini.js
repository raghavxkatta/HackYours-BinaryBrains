import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const generateFromGemini = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-3.5-flash-lite"
        });

        const result = await model.generateContent(prompt);

        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini SDK Error:", error);
        return "❌ Error generating content from Gemini.";
    }
};