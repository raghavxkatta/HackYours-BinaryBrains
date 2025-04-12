import computerImg from '../assets/Computer.png';
import codingGif from '../assets/Coding.gif';

const HeroImage = () => {
    return (
        <div className="relative">
            <div className="absolute -inset-1 bg-[#01FF00]/20 rounded-xl blur-xl"></div>
            <div className="relative">
                <img
                    src={computerImg}
                    alt="Computer"
                    className="w-full h-auto rounded-xl"
                />
                <img
                    src={codingGif}
                    alt="Coding Animation"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] object-contain mix-blend-screen"
                />
            </div>
        </div>
    );
};

export default HeroImage;