import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 cursor-pointer">GAIDE</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-8">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Home</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Features</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">About</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Contact</a>
                        </div>
                    </div>

                    {/* Login/Signup Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                            Login
                        </Link>
                        <Link to="/signup" className="px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-md">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#" className="block text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer py-2">Home</a>
                            <a href="#" className="block text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer py-2">Features</a>
                            <a href="#" className="block text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer py-2">About</a>
                            <a href="#" className="block text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer py-2">Contact</a>
                            <div className="flex space-x-4 pt-2">
                                <Link to="/login" className="flex-1 px-4 py-2 text-center text-blue-600 border border-blue-500 rounded-lg hover:bg-blue-50 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                                    Login
                                </Link>
                                <Link to="/signup" className="flex-1 px-4 py-2 text-center text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar