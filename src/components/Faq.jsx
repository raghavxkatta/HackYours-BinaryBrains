import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How does the idea generation process work?",
            answer: "Our AI analyzes your input parameters (theme, tech stack, team size) and uses the Gemini API to generate unique project ideas tailored to hackathons. Each idea comes with detailed features, architecture, and timeline."
        },
        {
            question: "What makes the pitch generator special?",
            answer: "The pitch generator creates compelling presentations by understanding your project's core features. You can customize the tone (storytelling, formal, funny), duration, and language to match your presentation needs."
        },
        {
            question: "Can I save and manage multiple ideas?",
            answer: "Yes! You can save both ideas and pitches to your account. Access them anytime from the My Ideas section, where you can view, copy, or delete them as needed."
        },
        {
            question: "What is Build Prompt?",
            answer: "Build Prompt is a feature that generates precise prompts for Large Language Models (LLMs). These prompts are designed to recreate the AI-powered project idea accurately, including file structures, components, API routes, and database schemas. You can use the generated prompt to guide your development process or share it with your team for implementation."
        },
         {
    
            question: "What kind of project details are included?",
            answer: "Each generated idea includes: project title, overview, key features, technical architecture, implementation timeline, innovation factors, potential challenges, and winning potential analysis."
        },
        {
            question: "How customizable are the pitches?",
            answer: "Highly customizable! Choose between different presentation styles, durations (30 seconds to 2 minutes), and languages. The pitch adapts to highlight your project's unique value proposition."
        },
        {
            question: "Is there a limit to generating ideas or pitches?",
            answer: "No limits! Generate as many ideas and pitches as you need. Each generation provides unique results, helping you explore different possibilities for your hackathon project."
        },
        {
            question: "How does the implementation timeline work?",
            answer: "We break down the project into practical phases, considering your team size and hackathon duration. This helps you stay organized and ensures efficient project completion within the deadline."
        }
    ];

    return (
        <section className="py-20 bg-black">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#01FF00]">
                    Common Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-2 border-[#01FF00]/20 rounded-lg overflow-hidden hover:border-[#01FF00]/40 transition-all duration-300">
                            <button
                                className="w-full p-4 text-left bg-black hover:bg-[#01FF00]/10 transition-all duration-300 flex justify-between items-center cursor-pointer group"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-medium text-white group-hover:text-[#01FF00] transition-colors">{faq.question}</span>
                                {openIndex === index ? (
                                    <FiChevronUp className="w-5 h-5 text-[#01FF00] transform transition-transform duration-300" />
                                ) : (
                                    <FiChevronDown className="w-5 h-5 text-[#01FF00] transform transition-transform duration-300" />
                                )}
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="bg-black border-t border-[#01FF00]/20 overflow-hidden"
                                    >
                                        <div className="p-4 text-white/70">{faq.answer}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
