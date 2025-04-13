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
        <div className="mt-10">
            <h3 className="text-xl font-bold text-white mb-4">🎛 Customize Your Pitch</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black mb-6">
                <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="p-3 rounded-lg bg-white font-semibold"
                >
                    <option>Storytelling</option>
                    <option>Formal</option>
                    <option>Funny</option>
                    <option>Investor Style</option>
                </select>

                <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="p-3 rounded-lg bg-white font-semibold"
                >
                    <option>30 Seconds</option>
                    <option>1 Minute</option>
                    <option>2 Minutes</option>
                </select>

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-3 rounded-lg bg-white font-semibold"
                >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Hinglish</option>
                </select>
            </div>

            <button
                onClick={generatePitch}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
                {loading ? "Generating Pitch..." : "🎤 Generate Custom Pitch"}
            </button>

            {pitch && (
                <div className="mt-6 p-4 border border-blue-400 rounded-lg bg-black text-white">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">🎯 Your Pitch:</h4>
                    <div className="whitespace-pre-wrap">{pitch}</div>
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
