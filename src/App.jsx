import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './context/firebase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import IdeaGenerator from './pages/IdeaGenerator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyIdeas from './pages/MyIdeas';
import AuthGuard from './components/Auth.guard';
import Footer from './components/Footer';
import PitchGenerator from './pages/PitchGenerator';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <div className="min-h-screen bg-black flex flex-col">
          <Navbar />
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
            <Route path="/my-ideas" element={
              <AuthGuard>
                <MyIdeas />
              </AuthGuard>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
