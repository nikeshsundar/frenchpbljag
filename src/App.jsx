import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UniversitySearch from './pages/UniversitySearch';
import Jobs from './pages/Jobs';
import Community from './pages/Community';
import Guides from './pages/Guides';
import CareerHelp from './pages/CareerHelp';
import FindFriends from './pages/FindFriends';
import CultureGuide from './pages/CultureGuide';
import DaySimulator from './pages/DaySimulator';
import AIChat from './components/AIChat';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universities" element={<UniversitySearch />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/community" element={<Community />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/career-help" element={<CareerHelp />} />
          <Route path="/find-friends" element={<FindFriends />} />
          <Route path="/culture-guide" element={<CultureGuide />} />
          <Route path="/day-simulator" element={<DaySimulator />} />
        </Routes>
        <AIChat />
      </div>
    </Router>
  );
}

export default App;
