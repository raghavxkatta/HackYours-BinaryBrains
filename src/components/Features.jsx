import { FiCommand, FiZap, FiTarget, FiCpu, FiClock, FiMessageSquare, FiAlertTriangle, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <FiCommand className="w-6 h-6 md:w-8 md:h-8" />,
        title: "Smart AI Assistant",
        description: "AI-powered ideas tailored to your needs",
    },
    {
        icon: <FiCommand className="w-6 h-6 md:w-8 md:h-8" />,
        title: "Prompt Generator",
        description: "Generate precise LLM prompts to recreate the AI-powered project idea accurately",
    },
    {
        icon: <FiMessageSquare className="w-6 h-6 md:w-8 md:h-8 hidden lg:block" />,
        title: "Pitch Generator",
        description: "AI-assisted presentation creation",
    },
    {
        icon: <FiCpu className="w-6 h-6 md:w-8 md:h-8" />,
        title: "Tech Stack Focus",
        description: "Projects optimized for your preferred stack",
    },
    {
        icon: <FiTarget className="w-6 h-6 md:w-8 md:h-8" />,
        title: "Success Strategy",
        description: "Winning approach optimization",
    },
    {
        icon: <FiClock className="w-6 h-6 md:w-8 md:h-8 hidden lg:block" />,
        title: "Time Management",
        description: "Efficient project timeline planning",
    },
    {
        icon: <FiAlertTriangle className="w-6 h-6 md:w-8 md:h-8 hidden lg:block" />,
        title: "Risk Assessment",
        description: "Identify and mitigate challenges",
    },
    {
        icon: <FiAward className="w-6 h-6 md:w-8 md:h-8 hidden lg:block" />,
        title: "Team Alignment",
        description: "Optimize for team size and skills",
    }
];

// Framer Motion animation variants
const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const card = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

const Features = () => {
    return (
        <section className="bg-black py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#01FF00]">Key Features</h2>
                    <p className="mt-3 md:mt-4 text-base md:text-lg text-white/80">
                        Powerful tools to enhance your hackathon experience
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={card}
                            className={`p-4 md:p-6 bg-black border-2 border-[#01FF00]/20 rounded-lg cursor-pointer hover:border-[#01FF00] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#01FF00]/20 ${index >= 4 ? 'hidden lg:block' : ''}`}
                            whileHover={{ 
                                scale: 1.05, 
                                rotate: [0, 1, -1, 0], 
                                transition: { duration: 0.4 } 
                            }}
                        >
                            <div className="flex items-center gap-3 group">
                                <div className="text-[#01FF00] group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#01FF00] transition-colors">{feature.title}</h3>
                            </div>
                            <p className="text-sm md:text-base text-white/70 mt-2 group-hover:text-white/90 transition-colors">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
