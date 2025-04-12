import { Navigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const AuthGuard = ({ children }) => {
    const { user, loading } = useFirebase();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;