import { Navigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const AuthGuard = ({ children }) => {
    const { user, loading } = useFirebase();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#01FF00] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] hover:border-[#01FF00]/80 transition-colors"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;