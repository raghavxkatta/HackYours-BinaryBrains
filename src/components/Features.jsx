import { FiCommand, FiCpu, FiClock, FiUsers } from 'react-icons/fi';

const Features = () => {
    const features = [
        {
            icon: <FiCommand className="w-8 h-8" />,
            title: "Smart Suggestions",
            description: "AI-powered project ideas tailored to your requirements"
        },
        {
            icon: <FiCpu className="w-8 h-8" />,
            title: "Tech Stack Focused",
            description: "Ideas optimized for your preferred technologies"
        },
        {
            icon: <FiClock className="w-8 h-8" />,
            title: "Time Management",
            description: "Detailed timeline breakdowns for hackathon success"
        },
        {
            icon: <FiUsers className="w-8 h-8" />,
            title: "Team Oriented",
            description: "Projects scaled to your team size and expertise"
        }
    ];

    return (
        <section className="bg-black py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#01FF00]">
                        Key Features
                    </h2>
                    <p className="mt-4 text-lg text-white/80">
                        Powerful tools to enhance your hackathon experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="p-6 bg-black border-2 border-[#01FF00]/20 rounded-lg hover:border-[#01FF00] transition-all duration-300"
                        >
                            <div className="text-[#01FF00] mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-white/70">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;