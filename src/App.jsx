import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider, useFirebase } from './context/firebase';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import IdeaGenerator from './pages/IdeaGenerator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyIdeas from './pages/MyIdeas';
import AuthGuard from './components/Auth.guard';
import Footer from './components/Footer';
import PitchGenerator from './pages/PitchGenerator';
import ForgotPassword from './pages/ForgotPassword';
import Welcome from './components/Welcome';

function AppContent() {
  const { user } = useFirebase();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      {showWelcome && <Welcome onClose={() => setShowWelcome(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ideaGenerator" element={
          <AuthGuard>
            <IdeaGenerator />
          </AuthGuard>
        } />
        <Route path="/pitchGenerator" element={
          <AuthGuard>
            <PitchGenerator />
          </AuthGuard>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/my-ideas" element={
          <AuthGuard>
            <MyIdeas />
          </AuthGuard>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <AppContent />
      </Router>
    </FirebaseProvider>
  );
}

export default App;
