const UserReview = () => {
    return (
        <div className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-12">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Sarah Johnson",
                            title: "Data Analyst",
                            review: "This calculator app has saved me hours every week. It's fast, accurate, and so simple to use.",
                            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                        },
                        {
                            name: "Michael Lee",
                            title: "Finance Manager",
                            review: "Finally, a tool that gets out of the way and lets me focus on the numbers. Highly recommended!",
                            avatar: "https://randomuser.me/api/portraits/men/46.jpg",
                        },
                        {
                            name: "Emily Carter",
                            title: "Software Engineer",
                            review: "I love how intuitive the UI is. The features are exactly what I need — no fluff, just function.",
                            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                        },
                    ].map((user, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                            <div className="relative p-6 bg-white rounded-3xl flex flex-col items-start space-y-4 hover:shadow-xl transition-all duration-300 hover:scale-105">
                                <div className="flex items-center space-x-4">
                                    <div className="transform transition-transform duration-300 group-hover:scale-110">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{user.name}</p>
                                        <p className="text-sm text-blue-600">{user.title}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{user.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserReview;
