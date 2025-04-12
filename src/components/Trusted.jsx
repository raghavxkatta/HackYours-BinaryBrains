import { useRef } from 'react';

const Trusted = () => {
    const socialRef = useRef(null);

    return (
        <div ref={socialRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
                        Trusted by Leading Companies
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of companies that rely on our advanced calculator for their computational needs.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
                    {[
                        {
                            name: "Google",
                            logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                        },
                        {
                            name: "Microsoft",
                            logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
                        },
                        {
                            name: "Amazon",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
                        },
                        {
                            name: "Meta",
                            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png"
                        }
                    ].map((company, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-10 group-hover:opacity-25 transition duration-300"></div>
                            <div className="relative w-40 h-20 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center p-6 hover:scale-105">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trusted;
