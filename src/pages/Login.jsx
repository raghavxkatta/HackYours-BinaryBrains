import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { loginWithEmailAndPassword } = useFirebase();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            await loginWithEmailAndPassword(formData.email, formData.password);
            navigate('/ideaGenerator');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-bold text-[#01FF00]">
                        Login to HackYours
                    </h2>
                    <p className="mt-2 text-center text-sm text-white/60">
                        Or{' '}
                        <Link to="/signup" className="text-[#01FF00] hover:text-[#01FF00]/80">
                            create a new account
                        </Link>
                    </p>
                </div>
                
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-[#01FF00]/40 bg-black text-white placeholder-[#01FF00]/50 focus:outline-none focus:border-[#01FF00]"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-[#01FF00]/40 bg-black text-white placeholder-[#01FF00]/50 focus:outline-none focus:border-[#01FF00]"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 border-[#01FF00] bg-black focus:ring-[#01FF00]"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="text-[#01FF00] hover:text-[#01FF00]/80">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-lg text-black bg-[#01FF00] hover:opacity-90 focus:outline-none transition-all duration-300"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;