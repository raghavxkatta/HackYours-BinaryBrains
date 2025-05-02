import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ideaImage from '../assets/Compute12.gif/Computer.gif';

const Hero = () => {
    return (
        <section className="bg-black min-h-[90vh]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Text Section with Animations */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center md:text-left"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl lg:text-6xl font-bold"
                        >
                            <span className="text-white">Generate Your Next</span>
                            <span
                                className="block animate-pulse text-[#01FF00] mt-2 font-bold"
                                style={{
                                    textShadow: '0 0 8px #01FF00',
                                }}
                            >
                                Hackathon Idea
                            </span>

                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-6 text-lg text-white/80"
                        >
                            HackYours is an AI-powered hackathon idea generator built for developers. Whether you're prepping for a student hackathon, company sprint, or solo project, HackYours delivers theme-based prompts to spark original, winning ideas — instantly.



                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        >
                            <Link
                                to="/ideaGenerator"
                                className="px-8 py-4 bg-[#01FF00] text-black font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-[#01FF00]/20"
                            >
                                <span className=" tracking-wide">Generate Ideas →</span>
                            </Link>
                            <button className="px-8 py-4 bg-transparent text-[#01FF00] font-semibold text-lg border-2 border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#01FF00]/20">
                                <span className=" tracking-wide">Learn More</span>
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Image Section with Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 rounded-xl blur-xl"></div>
                        <div className="relative">
                            <img
                                src={ideaImage}
                                alt="AI Project Generator"
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;