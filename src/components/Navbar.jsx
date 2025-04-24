import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import Logo from '../assets/Logos/Logo-Green-Darkmode.png';
import { FiMenu, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

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
                        <img src={Logo} alt="HackYours Logo" className="h-10 mr-2 transition-all duration-300" />
                        <span className="text-2xl font-bold text-[#01FF00] hidden sm:inline">HackYours</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {user ? (
                            <>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Link
                                        to="/ideaGenerator"
                                        className="text-lg font-semibold text-[#01FF00] hover:text-white transition-all duration-300"
                                    >
                                        Generate Ideas
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Link
                                        to="/pitchGenerator"
                                        className="text-lg font-semibold text-[#01FF00] hover:text-white transition-all duration-300"
                                    >
                                        Generate Pitch
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Link
                                        to="/my-ideas"
                                        className="text-lg font-semibold text-[#01FF00] hover:text-white transition-all duration-300"
                                    >
                                        My Ideas
                                    </Link>
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 border-2 border-[#01FF00] text-[#01FF00] rounded-lg hover:bg-[#01FF00]/40 cursor-pointer hover:text-white transition-all"
                                >
                                    Logout
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 border-2 border-[#01FF00] text-[#01FF00] rounded-lg hover:bg-[#01FF00]/10 transition-all duration-300 hover:scale-105"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-[#01FF00] text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Icon */}
                    {user && (
                        <motion.button
                            className="lg:hidden cursor-pointer text-[#01FF00] text-2xl"
                            onClick={toggleMobileMenu}
                            initial={{ rotate: 0 }}
                            animate={{ rotate: mobileMenuOpen ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {mobileMenuOpen ? <FiX /> : <FiMenu />}
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && user && (
                    <motion.div
                        key="mobileMenu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden px-4 pt-4 pb-6 space-y-5 bg-black border-t border-[#01FF00]/20 shadow-lg z-40"
                    >
                        <Link
                            to="/ideaGenerator"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-center text-2xl font-semibold text-[#01FF00] py-2 rounded-lg border border-[#01FF00]/20 bg-[#01FF00]/5 hover:bg-[#01FF00]/10 hover:shadow-[0_0_10px_#01FF00] transition-all"
                        >
                            Generate Ideas
                        </Link>

                        <Link
                            to="/pitchGenerator"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-center text-2xl font-semibold text-[#01FF00] py-2 rounded-lg border border-[#01FF00]/20 bg-[#01FF00]/5 hover:bg-[#01FF00]/10 hover:shadow-[0_0_10px_#01FF00] transition-all"
                        >
                            Generate Pitch
                        </Link>

                        <Link
                            to="/my-ideas"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-center text-2xl font-semibold text-[#01FF00] py-2 rounded-lg border border-[#01FF00]/20 bg-[#01FF00]/5 hover:bg-[#01FF00]/10 hover:shadow-[0_0_10px_#01FF00] transition-all"
                        >
                            My Ideas
                        </Link>

                        <button
                            onClick={() => {
                                handleLogout();
                                setMobileMenuOpen(false);
                            }}
                            className="w-full text-center text-xl font-semibold text-[#01FF00] py-2 rounded-lg border border-[#01FF00]/30 bg-[#01FF00]/10 hover:bg-[#01FF00]/20 transition-all  hover:shadow-[0_0_10px_#01FF00]"
                        >
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
