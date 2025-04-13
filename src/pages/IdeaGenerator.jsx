import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PitchGenerator from "../components/PitchGenerator";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FiCommand, FiCpu, FiClock, FiUsers, FiMessageSquare, FiZap, FiAlertTriangle, FiAward, FiClipboard, FiLayers } from 'react-icons/fi';
import { saveIdea } from '../services/storageService';

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
    const [openSection, setOpenSection] = useState('');

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setError("");
    };

    const toggleSection = (sectionId) => {
        setOpenSection(openSection === sectionId ? '' : sectionId);
    };

    const Section = ({ id, title, content }) => {
        const icons = {
            'overview': <FiClipboard className="w-5 h-5" />,
            'features': <FiLayers className="w-5 h-5" />,
            'tech': <FiCpu className="w-5 h-5" />,
            'timeline': <FiClock className="w-5 h-5" />,
            'innovation': <FiZap className="w-5 h-5" />,
            'challenges': <FiAlertTriangle className="w-5 h-5" />,
            'winning': <FiAward className="w-5 h-5" />
        };

        const sectionTitles = {
            'overview': 'Project Overview',
            'features': 'Key Features',
            'tech': 'Technical Architecture',
            'timeline': 'Implementation Timeline',
            'innovation': 'Innovation Factors',
            'challenges': 'Potential Challenges',
            'winning': 'Winning Potential'
        };

        return (
            <div className="mb-4">
                <div className="bg-[#01FF00]/5 p-4 rounded-t-lg border border-[#01FF00]/20">
                    <div className="flex items-center gap-3">
                        <span className="text-[#01FF00]">{icons[id]}</span>
                        <h3 className="text-xl font-semibold text-[#01FF00]">{sectionTitles[id]}</h3>
                    </div>
                </div>
                <button
                    onClick={() => toggleSection(id)}
                    className="w-full flex items-center justify-between p-4 bg-black/50 border-x border-b border-[#01FF00]/20 hover:bg-[#01FF00]/5 transition-all duration-300"
                >
                    <span className="text-[#01FF00]/80">View Details</span>
                    {openSection === id ? 
                        <FiChevronUp className="w-5 h-5 text-[#01FF00]" /> : 
                        <FiChevronDown className="w-5 h-5 text-[#01FF00]" />
                    }
                </button>
                {openSection === id && (
                    <div className="mt-2 p-4 bg-black/30 border border-[#01FF00]/20 rounded-lg">
                        <div className="prose prose-invert max-w-none">
                            {Array.isArray(content) ? (
                                <div className="space-y-2">
                                    {content.map((item, i) => (
                                        <div key={i} className="flex items-start">
                                            <span className="text-[#01FF00] mr-2">•</span>
                                            <span className="text-white/90">{item.trim().startsWith('-') ? item.substring(1) : item}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white/90">{content}</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
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

            const prompt = `Generate an innovative hackathon project idea with the following specifications. Make sure to include ALL sections in the exact format specified:

Theme: ${input.theme}
Tech Stack: ${input.techStack}
Team Size: ${input.teamSize}
Difficulty: ${input.difficulty}
Duration: ${input.duration}

Format your response EXACTLY as follows with all sections:

🚀 PROJECT TITLE
[Project Name]

📝 PROJECT OVERVIEW
[Overview text]

🎯 KEY FEATURES
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]

🛠️ TECHNICAL ARCHITECTURE
- Frontend: [Technologies]
- Backend: [Technologies]
- Database: [Choice]
- Additional Tools: [Tools]

⏱️ IMPLEMENTATION TIMELINE
- Hour 1-4: [Tasks]
- Hour 5-12: [Tasks]
- Hour 13-20: [Tasks]
- Hour 21-24: [Tasks]

💡 INNOVATION FACTORS
- [Factor 1]
- [Factor 2]
- [Factor 3]

⚠️ POTENTIAL CHALLENGES
- [Challenge 1]
- [Challenge 2]
- [Challenge 3]

🌟 WINNING POTENTIAL
- [Point 1]
- [Point 2]
- [Point 3]`;

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

    const handleSaveIdea = () => {
        try {
            saveIdea(idea);
            alert('Idea saved successfully!');
        } catch (error) {
            console.error('Error saving idea:', error);
            alert('Failed to save idea');
        }
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-black border-2 border-[#01FF00]/20 rounded-xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-center mb-8 text-[#01FF00] cursor-default">
                        🎯 Generate Your Hackathon Project
                    </h2>

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div className="group">
                            <label className="block text-[#01FF00] text-sm font-medium mb-2 cursor-default group-hover:translate-x-1 transition-transform duration-300">Theme/Domain*</label>
                            <input
                                type="text"
                                name="theme"
                                value={input.theme}
                                onChange={handleChange}
                                placeholder="e.g., Healthcare, FinTech"
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white placeholder-[#01FF00]/50 hover:border-[#01FF00]/60 focus:ring-1 focus:ring-[#01FF00] transition-all duration-300 cursor-text"
                            />
                        </div>
                        
                        <div className="group">
                            <label className="block text-[#01FF00] text-sm font-medium mb-2 cursor-default group-hover:translate-x-1 transition-transform duration-300">Tech Stack*</label>
                            <input
                                type="text"
                                name="techStack"
                                value={input.techStack}
                                onChange={handleChange}
                                placeholder="e.g., React, Node.js"
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white placeholder-[#01FF00]/50 hover:border-[#01FF00]/60 focus:ring-1 focus:ring-[#01FF00] transition-all duration-300 cursor-text"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[#01FF00] text-sm font-medium mb-2 cursor-default group-hover:translate-x-1 transition-transform duration-300">Team Size*</label>
                            <input
                                type="number"
                                name="teamSize"
                                value={input.teamSize}
                                onChange={handleChange}
                                placeholder="Number of members"
                                min="1"
                                max="6"
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white placeholder-[#01FF00]/50 hover:border-[#01FF00]/60 focus:ring-1 focus:ring-[#01FF00] transition-all duration-300 cursor-pointer"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-[#01FF00] text-sm font-medium mb-2 cursor-default group-hover:translate-x-1 transition-transform duration-300">Experience Level</label>
                            <select
                                name="difficulty"
                                value={input.difficulty}
                                onChange={handleChange}
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white cursor-pointer hover:border-[#01FF00]/60 focus:ring-1 focus:ring-[#01FF00] transition-all duration-300"
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[#01FF00] text-sm font-medium mb-2 cursor-default">Hackathon Duration</label>
                            <select
                                name="duration"
                                value={input.duration}
                                onChange={handleChange}
                                className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg focus:border-[#01FF00] text-white cursor-pointer hover:border-[#01FF00]/60 focus:ring-1 focus:ring-[#01FF00] transition-all duration-300"
                            >
                                <option>24 Hours</option>
                                <option>36 Hours</option>
                                <option>48 Hours</option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-900/20 border border-red-500 text-red-500 rounded-lg cursor-default">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={generateIdea}
                        disabled={loading}
                        className="w-full mt-8 py-4 bg-[#01FF00] text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#01FF00]/20 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center cursor-wait">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating Your Project Idea...
                            </span>
                        ) : "Generate Project Idea 🚀"}
                    </button>

                    {loading && (
                        <div className="mt-8 text-center cursor-wait">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#01FF00] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            <p className="mt-2 text-[#01FF00] cursor-default">Crafting your perfect hackathon idea...</p>
                        </div>
                    )}

                    {idea && !loading && (
                        <div className="mt-8">
                            <div className="p-6 bg-black border-2 border-[#01FF00]/40 rounded-lg hover:border-[#01FF00]/60 transition-all duration-300">
                                <h3 className="text-xl font-semibold mb-6 text-[#01FF00] cursor-default">Your Generated Project Idea:</h3>
                                <div className="space-y-4">
                                    {idea.split('\n\n').map((section, index) => {
                                        if (section.startsWith('🚀 PROJECT TITLE')) {
                                            const title = section.split('\n')[1];
                                            return (
                                                <div key="title" className="bg-[#01FF00]/5 p-4 rounded-lg border border-[#01FF00]/20">
                                                    <h2 className="text-2xl font-bold text-[#01FF00]">{title}</h2>
                                                </div>
                                            );
                                        }

                                        const sections = {
                                            'overview': '📝 PROJECT OVERVIEW',
                                            'features': '🎯 KEY FEATURES',
                                            'tech': '🛠️ TECHNICAL ARCHITECTURE',
                                            'timeline': '⏱️ IMPLEMENTATION TIMELINE',
                                            'innovation': '💡 INNOVATION FACTORS',
                                            'challenges': '⚠️ POTENTIAL CHALLENGES',
                                            'winning': '🌟 WINNING POTENTIAL'
                                        };

                                        for (const [key, header] of Object.entries(sections)) {
                                            if (section.includes(header)) {
                                                const [_, ...content] = section.split('\n');
                                                return (
                                                    <Section
                                                        key={key}
                                                        id={key}
                                                        content={content}
                                                    />
                                                );
                                            }
                                        }
                                        return null;
                                    })}
                                </div>
                                <div className="mt-6 flex justify-end gap-4">
                                    <button
                                        onClick={handleSaveIdea}
                                        className="px-4 py-2 text-sm text-[#01FF00] border border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300 cursor-pointer"
                                    >
                                        Save Idea
                                    </button>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(idea)}
                                        className="px-4 py-2 text-sm text-[#01FF00] border border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300 cursor-pointer"
                                    >
                                        Copy Idea
                                    </button>
                                </div>
                            </div>
                            
                            <PitchGenerator idea={idea} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IdeaGenerator;
