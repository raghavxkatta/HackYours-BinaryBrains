import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiTrash2 } from 'react-icons/fi';
import { getSavedIdeas, deleteIdea } from '../services/storageService';

const MyIdeas = () => {
    const [savedIdeas, setSavedIdeas] = useState([]);
    const [openIdea, setOpenIdea] = useState(null);

    useEffect(() => {
        const ideas = getSavedIdeas();
        setSavedIdeas(ideas);
    }, []);

    const handleDeleteIdea = (ideaId) => {
        try {
            deleteIdea(ideaId);
            setSavedIdeas(ideas => ideas.filter(idea => idea.id !== ideaId));
        } catch (error) {
            console.error('Error deleting idea:', error);
        }
    };

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#01FF00] mb-8">My Saved Ideas</h2>
                
                {savedIdeas.length === 0 ? (
                    <div className="text-center text-white/70 py-12">
                        <p>No saved ideas yet. Generate some ideas to see them here!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {savedIdeas.map((item) => (
                            <div key={item.id} className="border-2 border-[#01FF00]/20 rounded-lg overflow-hidden">
                                <div className="p-6 bg-black">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#01FF00] mb-2">
                                                {item.idea.split('\n')[1] || 'Untitled Project'}
                                            </h3>
                                            <p className="text-white/50 text-sm">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteIdea(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    
                                    <button
                                        onClick={() => setOpenIdea(openIdea === item.id ? null : item.id)}
                                        className="w-full mt-4 flex items-center justify-between p-3 bg-[#01FF00]/5 rounded-lg hover:bg-[#01FF00]/10 transition-colors"
                                    >
                                        <span className="text-[#01FF00]">View Details</span>
                                        {openIdea === item.id ? 
                                            <FiChevronUp className="w-5 h-5 text-[#01FF00]" /> : 
                                            <FiChevronDown className="w-5 h-5 text-[#01FF00]" />
                                        }
                                    </button>
                                    
                                    {openIdea === item.id && (
                                        <div className="mt-4 space-y-6">
                                            <div className="p-4 bg-black/50 border border-[#01FF00]/20 rounded-lg">
                                                <h4 className="text-lg font-semibold text-[#01FF00] mb-3">Project Idea</h4>
                                                <pre className="whitespace-pre-wrap text-white/90 font-mono text-sm">
                                                    {item.idea}
                                                </pre>
                                            </div>
                                            
                                            {item.pitch && (
                                                <div className="p-4 bg-black/50 border border-[#01FF00]/20 rounded-lg">
                                                    <h4 className="text-lg font-semibold text-[#01FF00] mb-3">Project Pitch</h4>
                                                    <pre className="whitespace-pre-wrap text-white/90 font-mono text-sm">
                                                        {item.pitch}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyIdeas;