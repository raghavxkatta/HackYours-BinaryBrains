import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: "AIzaSyDfssm8H0Rpt7aYNX_irQczgDB0a_DXZGY",
    authDomain: "hackyours-73415.firebaseapp.com",
    projectId: "hackyours-73415",
    storageBucket: "hackyours-73415.firebasestorage.app",
    messagingSenderId: "353198376452",
    appId: "1:353198376452:web:b35638e55eb0d4599f1751",
    measurementId: "G-F92V300G5Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);

            if (!snapshot.exists()) {
                // Only write user data if it's not already present
                await set(userRef, {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    provider: 'google',
                    role: 'user',
                    createdAt: new Date().toISOString()
                });
            }

            return user;
        } catch (error) {
            throw error;
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    const putData = async (key, data) => {
        try {
            await set(ref(database, key), data);
        } catch (error) {
            throw error;
        }
    };

    const loginWithEmailAndPassword = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            throw error;
        }
    };

    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword,
            loginWithGoogle,
            loginWithEmailAndPassword,
            putData,
            logout,
            resetPassword,
            user,
            loading
        }}>
            {children}
        </FirebaseContext.Provider>
    );
};