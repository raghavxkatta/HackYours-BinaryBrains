import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateContentFromGemini = async (prompt) => {
    try {
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            throw new Error("API key not found");
        }
        const model = genAI.getGenerativeModel({ model: "models/text-bison-001" });


        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error in Gemini API:", error);
        throw new Error(error.message || "Failed to generate content");
    }
};
