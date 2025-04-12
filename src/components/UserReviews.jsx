import { FiStar } from 'react-icons/fi';

const UserReviews = () => {
    const reviews = [
        {
            name: "Alex Johnson",
            role: "Student Developer",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            review: "Generated an amazing project idea for our college hackathon. We ended up winning first place!",
            rating: 5
        },
        {
            name: "Sarah Chen",
            role: "Software Engineer",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            review: "The timeline breakdown really helped our team stay organized during the hackathon.",
            rating: 5
        },
        {
            name: "Mike Peters",
            role: "Tech Lead",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            review: "Perfect for when you're stuck brainstorming. The ideas are innovative and implementable.",
            rating: 4
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        What Our Users Say
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Trusted by developers and teams worldwide
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div 
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center mb-4">
                                <img 
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <p className="text-gray-600 text-sm">{review.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600">{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserReviews;