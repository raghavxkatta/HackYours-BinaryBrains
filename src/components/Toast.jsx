import { useState, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
                type === 'success' 
                    ? 'bg-[#01FF00]/20 border border-[#01FF00] text-[#01FF00]' 
                    : 'bg-red-500/20 border border-red-500 text-red-500'
            } animate-slideIn`}>
                {type === 'success' ? (
                    <FiCheck className="w-5 h-5" />
                ) : (
                    <FiX className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    );
};

export default Toast;