// src/pages/Account.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour récupérer les informations de l'utilisateur
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFormData(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des informations utilisateur:', err);
        console.log(err.response); // Ajoute ceci pour voir la réponse d'erreur
        setMessage('Erreur lors de la récupération des informations.');
      }
    };

    fetchUserData(); // Appelle la fonction pour récupérer les données
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // Met à jour le champ correspondant dans le state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    setMessage('');

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.put('http://localhost:5001/account', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Informations mises à jour avec succès !');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la mise à jour des informations.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6">Mon Compte</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            disabled // Champ désactivé pour éviter les modifications
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default Account; 