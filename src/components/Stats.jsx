{/* Stats Section */}
import { FiUsers, FiBarChart2, FiTarget, FiShield } from 'react-icons/fi';
const Stats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-0 mx-auto w-7xl mb-8">
            {[
                { label: "Active Users", value: "25K+", icon: FiUsers },
                { label: "Assets Managed", value: "320M+", icon: FiBarChart2 },
                { label: "Success Rate", value: "94%", icon: FiTarget },
                { label: "Client Satisfaction", value: "4.9/5", icon: FiShield },
            ].map((stat, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center gap-2 text-center rounded-xl bg-white p-6 shadow-md hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 hover:scale-105 cursor-pointer border border-blue-100"
                >
                    <stat.icon className="w-6 h-6 text-blue-600 transition-transform hover:scale-110" />
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}
export default Stats