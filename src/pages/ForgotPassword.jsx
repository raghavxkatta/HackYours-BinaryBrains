import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import Toast from '../components/Toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const { resetPassword } = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        try {
            await resetPassword(email);
            setStatus({
                type: 'success',
                message: 'Password reset link sent to your email'
            });
            setEmail('');
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to send reset link. Please check your email.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-bold text-[#01FF00]">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-white/60">
                        Remember your password?{' '}
                        <Link to="/login" className="text-[#01FF00] hover:text-[#01FF00]/80 cursor-pointer">
                            Sign in
                        </Link>
                    </p>
                </div>

                {status.message && (
                    <Toast
                        message={status.message}
                        type={status.type}
                        onClose={() => setStatus({ type: '', message: '' })}
                    />
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-[#01FF00]/40 bg-black text-white placeholder-[#01FF00]/50 focus:outline-none focus:border-[#01FF00] focus:ring-1 focus:ring-[#01FF00] hover:border-[#01FF00]/60 transition-all duration-300 cursor-text"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border-2 border-transparent rounded-lg text-black bg-[#01FF00] hover:bg-[#01FF00]/90 focus:outline-none transition-all duration-300 hover:shadow-lg hover:shadow-[#01FF00]/20 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;