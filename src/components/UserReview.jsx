import { FiStar } from 'react-icons/fi';

const UserReview = () => {
    const reviews = [
        {
            name: "Alex Chen",
            role: "Student Developer",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            review: "Generated an amazing project idea for our college hackathon. We ended up winning first place!",
            rating: 5
        },
        {
            name: "Sarah Smith",
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
        <section className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#01FF00] text-center mb-12">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-black border border-[#01FF00]/30 p-6 rounded-lg hover:border-[#01FF00] transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h3 className="text-white font-semibold">{review.name}</h3>
                                    <p className="text-[#01FF00]/70 text-sm">{review.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FiStar key={i} className="w-5 h-5 text-[#01FF00] fill-current" />
                                ))}
                            </div>
                            <p className="text-white/80">{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserReview;