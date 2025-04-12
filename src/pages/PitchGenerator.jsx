import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const PitchGenerator = ({ idea }) => {
    const [pitch, setPitch] = useState("");
    const [loading, setLoading] = useState(false);

    const generatePitch = async () => {
        if (!idea) return;

        setLoading(true);
        setPitch("");

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent({
                contents: [
                    {
                        parts: [
                            {
                                text: `Take the following hackathon project description and generate a 1-minute startup pitch in a storytelling tone. Start with a strong hook, mention the pain point, describe the solution briefly, and end with an inspiring call to action:\n\n${idea}`,
                            },
                        ],
                    },
                ],
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

    return (
        <div className="mt-10">
            <button
                onClick={generatePitch}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
                {loading ? "Generating Pitch..." : "🎤 Generate 1-Minute Pitch"}
            </button>

            {pitch && (
                <div className="mt-6 p-4 border border-blue-400 rounded-lg bg-black text-white">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">🎯 Your Pitch:</h4>
                    <div className="whitespace-pre-wrap">{pitch}</div>
                    <div className="mt-2 flex justify-end">
                        <button
                            onClick={() => navigator.clipboard.writeText(pitch)}
                            className="px-4 py-2 text-sm text-blue-400 border border-blue-400 rounded hover:bg-blue-500/10"
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
