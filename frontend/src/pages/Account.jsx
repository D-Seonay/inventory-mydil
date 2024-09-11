// src/pages/Account.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les informations de l'utilisateur
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/account', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFormData(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des informations utilisateur:', err);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.put('http://localhost:5001/account', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccess('Informations mises à jour avec succès !');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour des informations.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6">Mon Compte</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>

        {/* Informations principales */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-xl font-semibold mb-4">Informations Principales</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              disabled
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
        </div>

        {/* Informations secondaires */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-xl font-semibold mb-4">Informations Secondaires</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nom de famille</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Âge</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Poids (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Taille (m)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Sexe</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Sélectionner</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Objectif</label>
            <textarea
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
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