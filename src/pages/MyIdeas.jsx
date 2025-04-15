import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiTrash2, FiCopy, FiCheck } from 'react-icons/fi';
import { getSavedIdeas, deleteIdea } from '../services/storageService';
import Toast from '../components/Toast';

const MyIdeas = () => {
    const [savedIdeas, setSavedIdeas] = useState([]);
    const [openIdea, setOpenIdea] = useState(null);
    const [toast, setToast] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        const ideas = getSavedIdeas();
        setSavedIdeas(ideas);
    }, []);

    const handleDeleteIdea = (ideaId) => {
        try {
            deleteIdea(ideaId);
            setSavedIdeas(ideas => ideas.filter(idea => idea.id !== ideaId));
            setToast({ message: 'Idea deleted successfully', type: 'success' });
        } catch (error) {
            console.error('Error deleting idea:', error);
            setToast({ message: 'Failed to delete idea', type: 'error' });
        }
    };

    const handleCopyContent = (id, content) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setToast({ message: 'Copied to clipboard!', type: 'success' });
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-black py-12">
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#01FF00] mb-8 cursor-default">My Saved Ideas</h2>
                
                {savedIdeas.length === 0 ? (
                    <div className="text-center text-white/70 py-12 cursor-default">
                        <p>No saved ideas yet. Generate some ideas to see them here!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {savedIdeas.map((item) => (
                            <div key={item.id} className="border-2 border-[#01FF00]/20 rounded-lg overflow-hidden hover:border-[#01FF00]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#01FF00]/10">
                                <div className="p-6 bg-black">
                                    <div className="flex justify-between items-start group">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-bold text-[#01FF00] mb-2  transition-transform duration-300 cursor-default">
                                                    {item.idea.split('\n')[1] || 'Untitled Project'}
                                                </h3>
                                                {item.pitch && (
                                                    <span className="px-2 py-1 text-xs font-medium bg-[#01FF00]/10 text-[#01FF00] rounded-full border border-[#01FF00]/20 group-hover:bg-[#01FF00]/20 transition-all duration-300 cursor-default">
                                                        with pitch
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors cursor-default">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleCopyContent(item.id, item.idea)}
                                                className="p-2 text-[#01FF00] hover:bg-[#01FF00]/10 rounded-lg transition-colors cursor-pointer group"
                                            >
                                                {copiedId === item.id ? (
                                                    <FiCheck className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                                ) : (
                                                    <FiCopy className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteIdea(item.id)}
                                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer group"
                                            >
                                                <FiTrash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => setOpenIdea(openIdea === item.id ? null : item.id)}
                                        className="w-full mt-4 flex items-center justify-between p-3 bg-[#01FF00]/5 rounded-lg hover:bg-[#01FF00]/10 transition-colors cursor-pointer group"
                                    >
                                        <span className="text-[#01FF00] group-hover:translate-x-1 transition-transform duration-300">View Details</span>
                                        {openIdea === item.id ? 
                                            <FiChevronUp className="w-5 h-5 text-[#01FF00] transform transition-transform duration-300 group-hover:-translate-y-1" /> : 
                                            <FiChevronDown className="w-5 h-5 text-[#01FF00] transform transition-transform duration-300 group-hover:translate-y-1" />
                                        }
                                    </button>
                                    
                                    {openIdea === item.id && (
                                        <div className="mt-4 space-y-6">
                                            <div className="p-4 bg-black/50 border border-[#01FF00]/20 rounded-lg group">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="text-lg font-semibold text-[#01FF00] cursor-default">Project Idea</h4>
                                                    <button
                                                        onClick={() => handleCopyContent(item.id, item.idea)}
                                                        className="p-1 text-[#01FF00] hover:bg-[#01FF00]/10 rounded-lg transition-colors cursor-pointer"
                                                    >
                                                        {copiedId === item.id ? (
                                                            <FiCheck className="w-4 h-4" />
                                                        ) : (
                                                            <FiCopy className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>
                                                <pre className="whitespace-pre-wrap text-white/90 font-mono text-sm cursor-text select-all">
                                                    {item.idea}
                                                </pre>
                                            </div>
                                            
                                            {item.pitch && (
                                                <div className="p-4 bg-black/50 border border-[#01FF00]/20 rounded-lg group">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className="text-lg font-semibold text-[#01FF00] cursor-default">Project Pitch</h4>
                                                        <button
                                                            onClick={() => handleCopyContent(item.id, item.pitch)}
                                                            className="p-1 text-[#01FF00] hover:bg-[#01FF00]/10 rounded-lg transition-colors cursor-pointer"
                                                        >
                                                            {copiedId === item.id ? (
                                                                <FiCheck className="w-4 h-4" />
                                                            ) : (
                                                                <FiCopy className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    <pre className="whitespace-pre-wrap text-white/90 font-mono text-sm cursor-text select-all">
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