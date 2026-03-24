import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatTraductor from './components/AITranslator'; 
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translator" element={<ChatTraductor />} />
          {/* Aquí irán las futuras rutas como /nutrition o /biomarkers */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;