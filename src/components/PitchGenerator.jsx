import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { saveIdea } from '../services/storageService';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const PitchGenerator = ({ idea }) => {
    const [pitch, setPitch] = useState("");
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState("1 Minute");
    const [tone, setTone] = useState("Storytelling");
    const [language, setLanguage] = useState("English");

    const generatePitch = async () => {
        if (!idea) return;

        setLoading(true);
        setPitch("");

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `
Generate a startup pitch for the following hackathon project:

Project Description:
${idea}

Requirements:
- Tone: ${tone}
- Duration: ${duration}
- Language: ${language}
- Start with a strong hook
- Mention the pain point
- Describe the solution briefly
- End with a compelling call to action
`;

            const result = await model.generateContent({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
            });

            const response = await result.response;
            setPitch(response.text());
        } catch (error) {
            console.error("Pitch generation failed:", error);
            setPitch("❌ Failed to generate pitch. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSavePitch = () => {
        try {
            saveIdea(idea, pitch);
            alert('Pitch saved successfully!');
        } catch (error) {
            console.error('Error saving pitch:', error);
            alert('Failed to save pitch');
        }
    };

    if (!idea) return null;

    return (
        <div className="border-2 border-[#01FF00]/20 rounded-xl p-6 hover:border-[#01FF00]/40 transition-all duration-300">
            <h3 className="text-xl font-bold text-[#01FF00] mb-6">🎤 Generate Project Pitch</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="p-3 rounded-lg bg-black border-2 border-[#01FF00]/40 text-white font-medium focus:border-[#01FF00] hover:border-[#01FF00]/60 transition-all duration-300 cursor-pointer"
                >
                    <option>Storytelling</option>
                    <option>Formal</option>
                    <option>Funny</option>
                    <option>Investor Style</option>
                </select>

                <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="p-3 rounded-lg bg-black border-2 border-[#01FF00]/40 text-white font-medium focus:border-[#01FF00] hover:border-[#01FF00]/60 transition-all duration-300 cursor-pointer"
                >
                    <option>30 Seconds</option>
                    <option>1 Minute</option>
                    <option>2 Minutes</option>
                </select>

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-3 rounded-lg bg-black border-2 border-[#01FF00]/40 text-white font-medium focus:border-[#01FF00] hover:border-[#01FF00]/60 transition-all duration-300 cursor-pointer"
                >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Hinglish</option>
                </select>
            </div>

            <button
                onClick={generatePitch}
                disabled={loading}
                className="w-full bg-[#01FF00] text-black font-bold py-4 rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#01FF00]/20 transform hover:scale-[1.02] active:scale-[0.98]"
            >
                {loading ? "Creating Your Pitch..." : "Generate Custom Pitch 🎯"}
            </button>

            {loading && (
                <div className="mt-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#01FF00] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-2 text-[#01FF00]">Crafting your perfect pitch...</p>
                </div>
            )}

            {pitch && (
                <div className="mt-8 border-2 border-[#01FF00]/40 rounded-lg p-6 hover:border-[#01FF00]/60 transition-all duration-300">
                    <h4 className="text-xl font-semibold text-[#01FF00] mb-4">Your Pitch:</h4>
                    <div className="whitespace-pre-wrap text-white/90">{pitch}</div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={handleSavePitch}
                            className="px-4 py-2 text-sm text-[#01FF00] border border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300"
                        >
                            Save Pitch
                        </button>
                        <button
                            onClick={() => navigator.clipboard.writeText(pitch)}
                            className="px-4 py-2 text-sm text-[#01FF00] border border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300"
                        >
                            Copy Pitch
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PitchGenerator;
