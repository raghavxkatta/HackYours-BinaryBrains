import { Link } from 'react-router-dom';
// import { theme } from '../utils/theme';
import ideaImage from '../assets/Compute12.gif/Computer.gif'
;

const Hero = () => {
    return (
        <section className="bg-black min-h-[90vh]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl lg:text-6xl font-bold">
                            <span className="text-white">Generate Your Next</span>
                            <span className="block text-[#01FF00] mt-2">
                                Hackathon Idea
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-white/80">
                            Transform your hackathon experience with AI-powered project ideas. Get detailed suggestions tailored to your team and tech stack.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/ideaGenerator" 
                                className="px-8 py-4 bg-[#01FF00] text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300">
                                Generate Ideas →
                            </Link>
                            <button className="px-8 py-4 bg-transparent text-[#01FF00] border-2 border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-1 rounded-xl blur-xl"></div>
                        <div className="relative">
                            <img
                                src={ideaImage}
                                alt="AI Project Generator"
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
