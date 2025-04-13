import { Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import Logo from '../assets/Logos/Logo-Green-Darkmode.png';
import { FiFolder } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useFirebase();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="bg-black/90 backdrop-blur-md border-b border-[#01FF00]/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl flex font-bold text-[#01FF00]">
                            <img src={Logo} alt="HackYours Logo" className="h-10 mr-2" />
                            HackYours
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/ideaGenerator" 
                                    className="text-[#01FF00] hover:text-[#01FF00]/80 transition-all duration-300 cursor-pointer hover:scale-105">
                                    Generate Ideas
                                </Link>
                                <Link to="/my-ideas"
                                    className="text-[#01FF00] hover:text-[#01FF00]/80 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-105">
                                    <FiFolder className="w-4 h-4" />
                                    My Ideas
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-[#01FF00] border-2 border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" 
                                    className="px-4 py-2 text-[#01FF00] border-2 border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300 cursor-pointer hover:scale-105">
                                    Login
                                </Link>
                                <Link to="/signup" 
                                    className="px-4 py-2 bg-[#01FF00] text-black font-medium rounded-lg hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-[#01FF00]/20">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;