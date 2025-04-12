import React, { useState } from "react";

const faqs = [
  {
    question: "What does this tool do?",
    answer:
      "This tool generates unique and innovative hackathon project ideas based on your selected theme, tech stack, team size, and difficulty level using AI.",
  },
  {
    question: "Is the AI free to use?",
    answer:
      "Yes, this tool uses the free-tier Gemini API by Google. Just make sure your API key is active and not rate-limited.",
  },
  {
    question: "How are ideas generated?",
    answer:
      "We use AI (Gemini/text-bison model) to process your input and craft ideas using prompt engineering techniques.",
  },
  {
    question: "Can I save or export ideas?",
    answer:
      "In this version, you can copy the ideas. Export and save features will be added soon!",
  },
  {
    question: "Can I regenerate a different idea with the same input?",
    answer:
      "Yes! Just click 'Generate Project Idea' again — you'll get a fresh idea each time.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        🤔 Frequently Asked Questions
      </h2>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-200 py-4 cursor-pointer"
          onClick={() => toggle(index)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
            <span className="text-blue-600 text-2xl">
              {openIndex === index ? "−" : "+"}
            </span>
          </div>
          {openIndex === index && (
            <p className="mt-2 text-gray-600 transition duration-300">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqSection;
