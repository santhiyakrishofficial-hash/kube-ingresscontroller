import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Activities from './pages/Activities';
import Leaderboard from './pages/Leaderboard';
import AddChild from './pages/AddChild';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add-child" element={<AddChild />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
