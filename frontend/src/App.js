// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import ProtectedPage from './pages/auth/ProtectedPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />


        <Route path="/protected" element={<ProtectedPage />} /> {/* Page protégée */}

        {/* Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;