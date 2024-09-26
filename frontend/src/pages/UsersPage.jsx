import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les utilisateurs lors du montage du composant
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    // Configuration d'Axios pour inclure le token dans les en-têtes
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/profiles', {
          headers: {
            Authorization: `Bearer ${token}`,  // Ajout du token dans l'en-tête Authorization
          },
        });
        setUsers(response.data);  // Mettre à jour l'état avec les données récupérées
        setLoading(false);  // Arrêter l'affichage du chargement
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        setError('Erreur lors de la récupération des utilisateurs');
        setLoading(false);  // Arrêter l'affichage du chargement
      }
    };

    fetchUsers();
  }, []);  // Le tableau vide signifie que l'effet se déclenche une seule fois après le premier rendu

  // Affichage en fonction de l'état de chargement ou d'erreur
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto my-10 overflow-auto h-[70vh] mt-10">
      <h2 className="text-2xl font-bold mb-6">Liste des utilisateurs</h2>
      <table className="table-auto w-full text-left bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Prénom</th>
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Promotion</th>    
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.first_name}</td>
              <td className="px-4 py-2">{user.last_name}</td>
              <td className="px-4 py-2">{user.promotion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;