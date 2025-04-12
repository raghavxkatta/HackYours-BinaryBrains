import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const IdeaGenerator = () => {
    const [input, setInput] = useState({
        theme: "",
        techStack: "",
        teamSize: "",
        difficulty: "Beginner",
        duration: "24 Hours"
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
            setError("Please fill in all required fields");
            return;
        }

        setLoading(true);
        setError("");
        setIdea("");

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



            const prompt = `Generate an innovative hackathon project idea with:
                Theme: ${input.theme}
                Tech Stack: ${input.techStack}
                Team Size: ${input.teamSize}
                Difficulty: ${input.difficulty}
                Duration: ${input.duration}
                
                Please provide the response in the following format:
                
                🚀 PROJECT TITLE
                [A catchy, relevant title]

                📝 PROJECT OVERVIEW
                [2-3 sentences describing the core concept]

                🎯 KEY FEATURES
                - [Feature 1]
                - [Feature 2]
                - [Feature 3]
                - [Feature 4]

                🛠️ TECHNICAL ARCHITECTURE
                - Frontend: [Specific technologies]
                - Backend: [Specific technologies]
                - Database: [Specific choice]
                - Additional Tools: [Any other required tools]

                ⏱️ IMPLEMENTATION TIMELINE
                Hour 1-4: [Initial setup tasks]
                Hour 5-12: [Core feature development]
                Hour 13-20: [Additional features]
                Hour 21-24: [Final touches and testing]

                💡 INNOVATION FACTORS
                [What makes this project unique and impactful]

                ⚠️ POTENTIAL CHALLENGES
                - [Challenge 1]
                - [Challenge 2]

                🌟 WINNING POTENTIAL
                [Why this idea stands out in a hackathon]`;

            const result = await model.generateContent({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            });

            const response = await result.response;
            setIdea(response.text());
        } catch (err) {
            console.error("Gemini API Error:", err);
            setError(err.message || "Failed to generate idea. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-black border-2 border-[#01FF00]/20 rounded-xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-center mb-8 text-[#01FF00]">
                        🎯 Generate Your Hackathon Project
                    </h2>

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div>
                            <label className="block text-[#01FF00] text-sm font-medium mb-2">Theme/Domain*</label>
                            <input
                                type="text"
                                name="theme"
                                value={input.theme}
                                onChange={handleChange}
                                placeholder="e.g., Healthcare, FinTech"
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white placeholder-[#01FF00]/50"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-[#01FF00] text-sm font-medium mb-2">Tech Stack*</label>
                            <input
                                type="text"
                                name="techStack"
                                value={input.techStack}
                                onChange={handleChange}
                                placeholder="e.g., React, Node.js"
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white placeholder-[#01FF00]/50"
                            />
                        </div>

                        <div>
                            <label className="block text-[#01FF00] text-sm font-medium mb-2">Team Size*</label>
                            <input
                                type="number"
                                name="teamSize"
                                value={input.teamSize}
                                onChange={handleChange}
                                placeholder="Number of members"
                                min="1"
                                max="6"
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white placeholder-[#01FF00]/50"
                            />
                        </div>

                        <div>
                            <label className="block text-[#01FF00] text-sm font-medium mb-2">Experience Level</label>
                            <select
                                name="difficulty"
                                value={input.difficulty}
                                onChange={handleChange}
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white"
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[#01FF00] text-sm font-medium mb-2">Hackathon Duration</label>
                            <select
                                name="duration"
                                value={input.duration}
                                onChange={handleChange}
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white"
                            >
                                <option>24 Hours</option>
                                <option>36 Hours</option>
                                <option>48 Hours</option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-900/20 border border-red-500 text-red-500 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={generateIdea}
                        disabled={loading}
                        className="w-full mt-8 py-4 bg-[#01FF00] text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Generating Your Project Idea..." : "Generate Project Idea 🚀"}
                    </button>

                    {loading && (
                        <div className="mt-8 text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#01FF00] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-[#01FF00]">Crafting your perfect hackathon idea...</p>
                        </div>
                    )}

                    {idea && !loading && (
                        <div className="mt-8 p-6 bg-black border-2 border-[#01FF00]/40 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4 text-[#01FF00]">Your Generated Project Idea:</h3>
                            <div className="prose prose-invert max-w-none">
                                <div className="whitespace-pre-wrap text-white">
                                    {idea}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(idea);
                                    }}
                                    className="px-4 py-2 text-sm text-[#01FF00] border border-[#01FF00] rounded hover:bg-[#01FF00]/10"
                                >
                                    Copy to Clipboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IdeaGenerator;
