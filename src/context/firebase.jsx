import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { getDatabase, set, ref, get } from 'firebase/database';

// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBorJMls3dr1_mupbEiy8AJd0mdcGKDnmI",
    authDomain: "hackyours-9a1eb.firebaseapp.com",
    projectId: "hackyours-9a1eb",
    storageBucket: "hackyours-9a1eb.firebasestorage.app",
    messagingSenderId: "469917558251",
    appId: "1:469917558251:web:fa5470ce69d8fadb57e5ae",
    measurementId: "G-JFXKJ4Z06X"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
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
      return true;
    } catch (error) {
      throw error;
    }
  };

  const putData = async (path, data) => {
    try {
      await set(ref(database, path), data);
      return true;
    } catch (error) {
      throw error;
    }
  };
  
  const getData = async (path) => {
    try {
      const snapshot = await get(ref(database, path));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signupUserWithEmailAndPassword,
    loginWithEmailAndPassword,
    logout,
    putData,
    getData,
    auth,
    database
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === null) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};