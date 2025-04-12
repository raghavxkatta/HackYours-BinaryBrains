import { FiTarget, FiBrain, FiClock, FiUsers } from 'react-icons/fi';

const KeyFeatures = () => {
    const features = [
        {
            icon: <FiTarget className="w-8 h-8" />,
            title: "Custom Theme-Based",
            description: "Get project ideas tailored to specific hackathon themes and requirements"
        },
        {
            icon: <FiBrain className="w-8 h-8" />,
            title: "AI-Powered Insights",
            description: "Leverage advanced AI to generate unique and innovative project concepts"
        },
        {
            icon: <FiClock className="w-8 h-8" />,
            title: "Time-Optimized",
            description: "Detailed timeline suggestions for efficient project completion"
        },
        {
            icon: <FiUsers className="w-8 h-8" />,
            title: "Team-Focused",
            description: "Ideas scaled to your team size and experience level"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        Key Features
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Discover what makes our idea generator unique
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                        >
                            <div className="text-blue-600 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;