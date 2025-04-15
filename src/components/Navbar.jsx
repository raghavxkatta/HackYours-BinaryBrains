import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import Logo from '../assets/Logos/Logo-Green-Darkmode.png';
import { FiFolder, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useFirebase();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

    return (
        <nav className="bg-black/90 backdrop-blur-md border-b border-[#01FF00]/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={Logo}
                            alt="HackYours Logo"
                            className={`h-10 mr-2 transition-all duration-300 ${user ? 'sm:h-10 h-8' : 'h-10'}`}
                        />
                        <span className="text-2xl font-bold text-[#01FF00] hidden sm:inline">HackYours</span>
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden sm:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    to="/ideaGenerator"
                                    className="text-[#01FF00] hover:text-[#01FF00]/80 transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                                    Generate Ideas
                                </Link>
                                <Link
                                    to="/pitchGenerator"
                                    className="text-[#01FF00] hover:text-[#01FF00]/80 transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                                    Generate Pitch
                                </Link>
                                <Link
                                    to="/my-ideas"
                                    className="text-[#01FF00] hover:text-[#01FF00]/80 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-105"
                                >
                                    
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
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-[#01FF00] border-2 border-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300 cursor-pointer hover:scale-105"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-[#01FF00] text-black font-medium rounded-lg hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-[#01FF00]/20"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile toggle button */}
                    {user && (
                        <button
                            className="sm:hidden text-[#01FF00] text-2xl focus:outline-none transition-all duration-500 ease-in-out"
                            onClick={toggleMobileMenu}
                        >
                            {mobileMenuOpen ? 
                                <FiX className="transform rotate-90 transition-all duration-500 ease-in-out" /> : 
                                <FiMenu className="transform transition-all duration-500 ease-in-out hover:rotate-180" />
                            }
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {user && (
                <div className={`sm:hidden bg-black border-t border-[#01FF00]/20 px-4 py-4 space-y-3 shadow-md rounded-b-lg transition-all duration-500 ease-in-out transform ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                    <Link
                        to="/ideaGenerator"
                        onClick={toggleMobileMenu}
                        className="block w-full px-4 py-2 rounded-md text-[#01FF00] bg-[#01FF00]/5 border border-[#01FF00]/10 hover:bg-[#01FF00]/10 hover:border-[#01FF00]/20 transition-all duration-200 font-medium"
                    >
                        🚀 Generate Ideas
                    </Link>

                    <Link
                        to="/pitchGenerator"
                        onClick={toggleMobileMenu}
                        className="block w-full px-4 py-2 rounded-md text-[#01FF00] bg-[#01FF00]/5 border border-[#01FF00]/10 hover:bg-[#01FF00]/10 hover:border-[#01FF00]/20 transition-all duration-200 font-medium"
                    >
                        🎤 Generate Pitch
                    </Link>

                    <Link
                        to="/my-ideas"
                        onClick={toggleMobileMenu}
                        className="block w-full px-4 py-2 rounded-md text-[#01FF00] bg-[#01FF00]/5 border border-[#01FF00]/10 hover:bg-[#01FF00]/10 hover:border-[#01FF00]/20 transition-all duration-200 font-medium"
                    >
                        📁 My Ideas
                    </Link>

                    <button
                        onClick={() => {
                            toggleMobileMenu();
                            handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 rounded-md border border-[#01FF00]/30 text-[#01FF00] bg-[#01FF00]/5 hover:bg-[#01FF00]/10 transition-all duration-200 font-medium"
                    >
                        🔒 Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
