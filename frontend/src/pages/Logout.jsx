// src/pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    
    // Rediriger vers la page de connexion ou d'accueil
    navigate('/login');
  }, [navigate]);

  return <div>Déconnexion en cours...</div>;
};

export default Logout;