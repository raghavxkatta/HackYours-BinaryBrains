const GetStarted = () => {
    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform group-hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-white/5"></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block hover:scale-105 transition-transform duration-300">Ready to dive in?</span>
                        <span className="block text-blue-100 mt-1 hover:scale-105 transition-transform duration-300">Start your calculation journey today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
                        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transform hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-white/20">
                            Get started
                        </button>
                        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-800/50 backdrop-blur-sm hover:bg-blue-700/50 transform hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
                            Learn more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStarted