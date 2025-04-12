import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import IdeaGenerator from './pages/IdeaGenerator';
import SmoothScroll from './components/LensisScroll';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ideaGenerator" element={<IdeaGenerator />} />
          </Routes>
        
      </SmoothScroll>
    </Router>
  );
}

export default App;
