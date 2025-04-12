import calcu from '../assets/calcu.png';
import { FiUsers, FiBarChart2, FiTarget, FiShield } from 'react-icons/fi';

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-[90vh] w-full">
            <div className="w-full mx-auto px-6 lg:px-12 py-12">
                <div className="flex flex-col md:flex-row gap-12 items-center max-w-[2000px] mx-auto">
                    <div className="flex-1 flex flex-col space-y-8">
                        <div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                                Simple Solution for
                                <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mt-2">Complex Tasks</span>
                            </h1>
                            <p className="mt-6 text-lg text-gray-600">
                                Experience the power of simplicity with our intuitive calculator app. Make complex calculations effortless.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 cursor-pointer">
                                Get Started
                            </button>
                            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg border-2 border-blue-500 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 cursor-pointer">
                                Learn More
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
                            {[
                                { label: "Active Users", value: "25K+", icon: FiUsers },
                                { label: "Assets Managed", value: "320M+", icon: FiBarChart2 },
                                { label: "Success Rate", value: "94%", icon: FiTarget },
                                { label: "Client Satisfaction", value: "4.9/5", icon: FiShield },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 text-center p-4 rounded-xl bg-gradient-to-br from-white to-blue-50 hover:to-blue-100 shadow-lg shadow-blue-100/20 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-blue-100"
                                >
                                    <stat.icon className="w-6 h-6 text-blue-600 transition-transform hover:scale-110" />
                                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                        <img
                            src={calcu}
                            alt="Calculator Interface"
                            className="relative w-full h-auto object-contain rounded-xl shadow-2xl transition-all duration-300 hover:shadow-blue-500/25 hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
