import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Init Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDTkuJ2Rt8OSira0NCJNrbNn2Q7qU6Xyv8");

const IdeaGenerator = () => {
    const [input, setInput] = useState({
        theme: "",
        techStack: "",
        teamSize: "",
        difficulty: "Beginner",
    });

    const [idea, setIdea] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const generateIdea = async () => {
        setLoading(true);

        const prompt = `
Generate a unique, innovative hackathon project idea based on the following details:
- Theme: ${input.theme}
- Team Size: ${input.teamSize}
- Tech Stack: ${input.techStack}
- Difficulty: ${input.difficulty}

The idea should include:
1. Project Title
2. Short Description
3. Key Features
4. Why it’s innovative
5. Timeline breakdown (if possible)
Keep it fresh, realistic, and exciting for a hackathon.`;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            setIdea(response.text());
        } catch (err) {
            setIdea("❌ Error generating idea. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold text-center mb-4">🎯 Hackathon Idea Generator</h2>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <input type="text" name="theme" value={input.theme} onChange={handleChange} placeholder="Hackathon Theme (e.g., Fintech)" className="p-3 border rounded" />
                <input type="text" name="techStack" value={input.techStack} onChange={handleChange} placeholder="Tech Stack (e.g., React, Firebase)" className="p-3 border rounded" />
                <input type="number" name="teamSize" value={input.teamSize} onChange={handleChange} placeholder="Team Size" className="p-3 border rounded" />
                <select name="difficulty" value={input.difficulty} onChange={handleChange} className="p-3 border rounded">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
            </div>

            <button
                onClick={generateIdea}
                disabled={loading}
                className="w-full mt-5 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
                {loading ? "Generating Idea..." : "Generate Project Idea 🚀"}
            </button>

            {idea && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
                    <h3 className="text-xl font-semibold mb-2">✨ AI-Generated Project Idea:</h3>
                    <p>{idea}</p>
                </div>
            )}
        </div>
    );
};

export default IdeaGenerator;
