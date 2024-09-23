// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CiLogin } from "react-icons/ci";




const Navbar = () => {
  const { username, isLoggedIn, logout } = useUser();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl">Accueil</Link>
          <Link to="/protected" className="ml-4">Page Protégée</Link>
          {isLoggedIn && <Link to="/account" className="ml-4">Mon Compte</Link>}
          <Link to="/category" className="ml-4">Catégories</Link>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <span>Bonjour, {username}</span>
              <button 
                onClick={logout} 
                className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
              >
                <CiLogin className="inline-block rounded-full" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Se connecter</Link>
              <Link to="/register">S'inscrire</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;