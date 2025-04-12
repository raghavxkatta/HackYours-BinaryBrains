import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-blue-50 border-t border-blue-100">
      <div className="max-w-[2000px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-6">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-all duration-300">
              Binary Brains
            </span>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/raghavxkatta/Hackstreet-BinaryBrains" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">About</a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Features</a>
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;