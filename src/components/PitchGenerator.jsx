import React, { useState } from 'react';
import { generateFromGemini } from '../utils/generatefromGemini';
import { FiCopy, FiCheck, FiSave } from 'react-icons/fi';
import Toast from './Toast';
import { saveIdea } from '../services/storageService';
import { useFirebase } from '../context/firebase';

const PitchGenerator = ({ idea }) => {
    const { user } = useFirebase();
    const [pitch, setPitch] = useState('');
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState('1 Minute');
    const [tone, setTone] = useState('Storytelling');
    const [language, setLanguage] = useState('English');
    const [toast, setToast] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const generatePitch = async () => {
        if (!idea) {
            setToast({ message: 'No idea provided to generate pitch', type: 'error' });
            return;
        }

        setLoading(true);
        setPitch('');

        try {
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

            const generatedPitch = await generateFromGemini(prompt);
            setPitch(generatedPitch);
        } catch (error) {
            console.error('Pitch generation failed:', error);
            setToast({ message: 'Failed to generate pitch. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSavePitch = () => {
        try {
            if (!user || !user.uid) {
                setToast({ message: 'User not authenticated', type: 'error' });
                return;
            }
            saveIdea(user.uid, idea, pitch);
            setIsSaved(true);
            setToast({ message: 'Pitch saved successfully! 🎉', type: 'success' });
            setTimeout(() => setIsSaved(false), 2000);
        } catch (error) {
            console.error('Error saving pitch:', error);
            setToast({ message: 'Failed to save pitch', type: 'error' });
        }
    };
    

    const handleCopyPitch = () => {
        navigator.clipboard.writeText(pitch);
        setIsCopied(true);
        setToast({ message: 'Copied to clipboard! 📋', type: 'success' });
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="border-2 border-[#01FF00]/20 rounded-xl p-6 hover:border-[#01FF00]/40 transition-all duration-300">
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}

            <h2 className="text-2xl font-bold text-[#01FF00] mb-8"> Generate Project Pitch</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-[#01FF00] text-sm font-medium mb-2">Tone</label>
                    <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg text-white focus:border-[#01FF00] hover:border-[#01FF00]/60 transition-all duration-300 cursor-pointer"
                    >
                        <option>Storytelling</option>
                        <option>Formal</option>
                        <option>Funny</option>
                        <option>Investor Style</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[#01FF00] text-sm font-medium mb-2">Duration</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg text-white focus:border-[#01FF00] hover:border-[#01FF00]/60 transition-all duration-300 cursor-pointer"
                    >
                        <option>30 Seconds</option>
                        <option>1 Minute</option>
                        <option>2 Minutes</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[#01FF00] text-sm font-medium mb-2">Language</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full p-3 bg-black border-2 border-[#01FF00]/40 rounded-lg text-white focus:border-[#01FF00] hover:border-[#01FF00]/60 transition-all duration-300 cursor-pointer"
                    >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Hinglish</option>
                    </select>
                </div>
            </div>

            <button
                onClick={generatePitch}
                disabled={loading}
                className="w-full py-4 bg-[#01FF00] text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#01FF00]/20 transform hover:scale-[1.02] active:scale-[0.98]"
            >
                {loading ? "Crafting Your Pitch..." : "Generate Custom Pitch "}
            </button>

            {loading && (
                <div className="mt-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#01FF00] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-2 text-[#01FF00]">Crafting your perfect pitch...</p>
                </div>
            )}

            {pitch && (
                <div className="mt-8 border-2 border-[#01FF00]/40 rounded-lg p-6 hover:border-[#01FF00]/60 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-[#01FF00] mb-4">Your Generated Pitch:</h3>
                    <div className="whitespace-pre-wrap text-white/90">{pitch}</div>
                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={handleSavePitch}
                            className={`px-4 py-2 text-sm border rounded-lg transition-all duration-300 flex items-center gap-2 ${
                                isSaved 
                                    ? 'bg-[#01FF00] text-black border-transparent' 
                                    : 'text-[#01FF00] border-[#01FF00] hover:bg-[#01FF00]/10'
                            }`}
                        >
                            <FiSave className="w-4 h-4" />
                            {isSaved ? 'Saved!' : 'Save Pitch'}
                        </button>
                        <button
                            onClick={handleCopyPitch}
                            className="px-4 py-2 text-sm text-[#01FF00] border border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300 flex items-center gap-2"
                        >
                            {isCopied ? (
                                <>
                                    <FiCheck className="w-4 h-4" />
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <FiCopy className="w-4 h-4" />
                                    <span>Copy Pitch</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PitchGenerator;
