import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How does the idea generator work?",
            answer: "Our AI-powered generator analyzes your input parameters like theme, tech stack, and team size to create customized project ideas perfect for hackathons."
        },
        {
            question: "Is this service free to use?",
            answer: "Yes, the basic idea generation service is completely free to use. We may introduce premium features in the future."
        },
        {
            question: "Can I get multiple ideas for the same parameters?",
            answer: "Absolutely! You can generate multiple different ideas with the same parameters to explore various possibilities."
        },
        {
            question: "How detailed are the project ideas?",
            answer: "Each idea includes a project title, description, key features, technical architecture, and implementation timeline breakdown."
        },
        {
            question: "Can I modify the generated ideas?",
            answer: "Yes, the generated ideas are starting points. You're encouraged to modify and adapt them to better suit your team's needs."
        }
    ];

    return (
        <section className="py-20 bg-black">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#01FF00]">
                    Frequently Asked Questions
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
