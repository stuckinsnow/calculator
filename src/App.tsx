import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

// Page
import HomePage from './pages/HomePage/HomePage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;