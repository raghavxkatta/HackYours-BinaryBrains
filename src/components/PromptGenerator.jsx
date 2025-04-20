import React, { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

const PromptGenerator = ({ idea }) => {
    const [copied, setCopied] = useState(false);

    const buildPrompt = () => {
        return `You are a senior full-stack developer. Based on the following project idea, build the exact same application with all key features, tech stack, and implementation details:

${idea}

Generate:
- File structure
- Components and code for frontend/backend
- API routes if needed
- Database schema
- Proper comments

The output should be accurate enough to recreate the project completely.`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(buildPrompt());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-8">
            <div className="p-6 bg-black border-2 border-[#01FF00]/40 rounded-lg hover:border-[#01FF00]/60 hover:shadow-[0_0_15px_#01FF00] transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-[#01FF00] cursor-default">
                        🧠 Build Prompt for LLMs
                    </h3>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#01FF00] border cursor-pointer border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300"
                    >
                        {copied ? (
                            <>
                                <FiCheck className="w-4 h-4" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <FiCopy className="w-4 h-4" />
                                Copy Prompt
                            </>
                        )}
                    </button>
                </div>
                <div className="bg-[#01FF00]/5 p-4 rounded-lg border border-[#01FF00]/20 text-white text-sm whitespace-pre-wrap">
                    {buildPrompt()}
                </div>
            </div>
        </div>
    );
};

export default PromptGenerator;
