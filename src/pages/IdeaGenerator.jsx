import React, { useState } from "react";
import { generateFromGemini } from "../utils/generateFromGemini"; // ✅ Make sure file name matches

const IdeaGenerator = () => {
    const [input, setInput] = useState({
        theme: "",
        techStack: "",
        teamSize: "",
        difficulty: "Beginner",
    });

    const [idea, setIdea] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setError("");
    };

    const generateIdea = async () => {
        if (!input.theme || !input.techStack || !input.teamSize) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");
        setIdea("");

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
4. Why it's innovative
5. Timeline breakdown (if possible)
Keep it fresh, realistic, and exciting for a hackathon.`;

        try {
            const result = await generateFromGemini(prompt);
            setIdea(result);
        } catch (err) {
            console.error("Generation error:", err);
            setError(err.message || "Failed to generate idea. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white rounded-xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        🎯 Hackathon Idea Generator
                    </h2>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <input
                            type="text"
                            name="theme"
                            value={input.theme}
                            onChange={handleChange}
                            placeholder="Hackathon Theme (e.g., Fintech)"
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                        <input
                            type="text"
                            name="techStack"
                            value={input.techStack}
                            onChange={handleChange}
                            placeholder="Tech Stack (e.g., React, Firebase)"
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                        <input
                            type="number"
                            name="teamSize"
                            value={input.teamSize}
                            onChange={handleChange}
                            placeholder="Team Size"
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                        <select
                            name="difficulty"
                            value={input.difficulty}
                            onChange={handleChange}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={generateIdea}
                        disabled={loading}
                        className="w-full mt-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                    >
                        {loading ? "Generating Idea..." : "Generate Project Idea 🚀"}
                    </button>

                    {idea && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg whitespace-pre-wrap">
                            <h3 className="text-xl font-semibold mb-2 text-blue-700">
                                ✨ Your AI-Generated Project Idea:
                            </h3>
                            <p className="text-gray-700">{idea}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IdeaGenerator;
