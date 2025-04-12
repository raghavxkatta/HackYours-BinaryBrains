import Hero from '../components/Hero';
import Features from '../components/Features';
import FAQ from '../components/Faq';
import UserReview from '../components/UserReview';
import SmoothScroll from '../components/LensisScroll';
import GetStarted from '../components/GetStarted';

const Separator = () => (
    <div className="w-full max-w-7xl mx-auto px-6">
        <div className="h-px bg-[#01FF00]/20"></div>
    </div>
);

const Home = () => {
    return (
        <main className="bg-black min-h-screen">
            <SmoothScroll>
            <Hero />
            <Separator />
            <Features />
            <Separator />
            {/* <UserReview /> */}
            <Separator />
            <FAQ />
            {/* <GetStarted /> */}
            </SmoothScroll>
        </main>
    );
};

export default Home;