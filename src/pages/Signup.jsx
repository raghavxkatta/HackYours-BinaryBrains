import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signupUserWithEmailAndPassword, putData } = useFirebase();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userCredential = await signupUserWithEmailAndPassword(formData.email, formData.password);
            await putData(`users/${userCredential.user.uid}`, {
                name: formData.name,
                email: formData.email,
                createdAt: new Date().toISOString()
            });
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
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-white/60">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#01FF00] hover:text-[#01FF00]/80">
                            Sign in
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
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-[#01FF00]/40 bg-black text-white placeholder-[#01FF00]/50 focus:outline-none focus:border-[#01FF00]"
                                placeholder="Full Name"
                            />
                        </div>
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
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-[#01FF00]/40 bg-black text-white placeholder-[#01FF00]/50 focus:outline-none focus:border-[#01FF00]"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border-2 border-transparent rounded-lg text-black bg-[#01FF00] hover:opacity-90 focus:outline-none transition-all duration-300"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="text-center text-sm text-white/60">
                        By signing up, you agree to our{' '}
                        <a href="#" className="text-[#01FF00] hover:text-[#01FF00]/80">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="text-[#01FF00] hover:text-[#01FF00]/80">Privacy Policy</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;