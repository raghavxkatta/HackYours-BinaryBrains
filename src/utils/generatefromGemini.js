// src/utils/generateFromGemini.js

export const generateFromGemini = async (prompt) => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: { text: prompt },
            temperature: 0.7,
            candidateCount: 1,
          }),
        }
      );
  
      const data = await res.json();
      return data?.candidates?.[0]?.output ?? "❌ No output received.";
    } catch (error) {
      console.error("[Gemini fetch error]", error);
      return "❌ Failed to fetch from Gemini API.";
    }
  };
  