import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Logout from './pages/auth/Logout';
import ProtectedPage from './pages/auth/ProtectedPage';
import Account from './pages/Account';  // Ajout de la page de compte
import CategoryPage from './pages/CategoryPage';  // Ajout de la page de catégories

const App = () => {
  const isAuthenticated = localStorage.getItem('token') || sessionStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/protected" element={<ProtectedPage />} />
        <Route path="/category" element={<CategoryPage />} />  {/* Ajout de la route pour la page de catégories */}

        {/* Page de compte accessible seulement si connecté */}
        <Route path="/account" element={isAuthenticated ? <Account /> : <Login />} />

        {/* Rediriger toutes les autres pages vers login si non connecté */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;