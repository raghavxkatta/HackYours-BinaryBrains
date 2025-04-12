import { Link } from 'react-router-dom';

const GetStarted = () => {
    return (
        <section className="bg-black py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-[#01FF00] mb-6">
                    Ready to Create Your Next Project?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                    Join our community of innovators and start generating amazing hackathon ideas today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/signup"
                        className="px-8 py-4 bg-[#01FF00] text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300"
                    >
                        Get Started Now
                    </Link>
                    <Link
                        to="/ideaGenerator"
                        className="px-8 py-4 border-2 border-[#01FF00] text-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300"
                    >
                        Try Generator
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GetStarted;