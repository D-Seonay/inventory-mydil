import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EquipmentPage = () => {
  const [equipments, setEquipments] = useState([]);
  const [newEquipment, setNewEquipment] = useState({ name: '', category_id: '', stock_quantity: '', available_quantity: '', description: '' });
  const [editEquipmentId, setEditEquipmentId] = useState(null);
  const [editEquipmentData, setEditEquipmentData] = useState({ name: '', category_id: '', stock_quantity: '', available_quantity: '', description: '' });
  const [categories, setCategories] = useState([]);

  // Récupérer les équipements et les catégories depuis l'API
  useEffect(() => {
    fetchEquipments();
    fetchCategories();
  }, []);

  const fetchEquipments = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token
    try {
      const response = await axios.get('http://localhost:5001/equipment', {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token
        },
      });
      setEquipments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des équipements:', error);
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token
    try {
      const response = await axios.get('http://localhost:5001/category', {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  // Ajouter un nouvel équipement
  const handleAddEquipment = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token
    try {
      await axios.post(
        'http://localhost:5001/equipment',
        newEquipment,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token
          },
        }
      );
      setNewEquipment({ name: '', category_id: '', stock_quantity: '', available_quantity: '', description: '' });
      fetchEquipments(); // Rafraîchir la liste après ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'équipement:', error);
    }
  };

  // Modifier un équipement
  const handleEditEquipment = async (id) => {
    const token = localStorage.getItem('token'); // Récupérer le token
    try {
      await axios.put(
        `http://localhost:5001/equipment/${id}`,
        editEquipmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token
          },
        }
      );
      setEditEquipmentId(null); // Sortir du mode d'édition
      setEditEquipmentData({ name: '', category_id: '', stock_quantity: '', available_quantity: '', description: '' });
      fetchEquipments(); // Rafraîchir la liste après modification
    } catch (error) {
      console.error('Erreur lors de la modification de l\'équipement:', error);
    }
  };

  // Supprimer un équipement
  const handleDeleteEquipment = async (id) => {
    const token = localStorage.getItem('token'); // Récupérer le token
    try {
      await axios.delete(`http://localhost:5001/equipment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token
        },
      });
      fetchEquipments(); // Rafraîchir la liste après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'équipement:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Gestion des Équipements</h1>

      {/* Liste des équipements */}
      <ul className="mb-6">
        {equipments.map((equipment) => (
          <li key={equipment.id} className="flex justify-between items-center py-2">
            {editEquipmentId === equipment.id ? (
              <>
                <input
                  type="text"
                  value={editEquipmentData.name}
                  onChange={(e) => setEditEquipmentData({ ...editEquipmentData, name: e.target.value })}
                  className="border p-2 rounded"
                />
                <select
                  value={editEquipmentData.category_id}
                  onChange={(e) => setEditEquipmentData({ ...editEquipmentData, category_id: e.target.value })}
                  className="border p-2 rounded ml-2"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleEditEquipment(equipment.id)}
                  className="ml-4 p-2 bg-blue-500 text-white rounded"
                >
                  Modifier
                </button>
              </>
            ) : (
              <>
                <span>{equipment.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditEquipmentId(equipment.id);
                      setEditEquipmentData({ name: equipment.name, category_id: equipment.category_id, stock_quantity: equipment.stock_quantity, available_quantity: equipment.available_quantity, description: equipment.description });
                    }}
                    className="mr-4 p-2 bg-yellow-500 text-white rounded"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => handleDeleteEquipment(equipment.id)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Ajouter un nouvel équipement */}
      <div className="mb-6">
        <input
          type="text"
          value={newEquipment.name}
          onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
          className="border p-2 rounded w-full"
          placeholder="Nom de l'équipement"
        />
        <select
          value={newEquipment.category_id}
          onChange={(e) => setNewEquipment({ ...newEquipment, category_id: e.target.value })}
          className="border p-2 rounded w-full mt-2"
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={newEquipment.stock_quantity}
          onChange={(e) => setNewEquipment({ ...newEquipment, stock_quantity: e.target.value })}
          className="border p-2 rounded w-full mt-2"
          placeholder="Quantité en stock"
        />
        <input
          type="number"
          value={newEquipment.available_quantity}
          onChange={(e) => setNewEquipment({ ...newEquipment, available_quantity: e.target.value })}
          className="border p-2 rounded w-full mt-2"
          placeholder="Quantité disponible"
        />
        <textarea
          value={newEquipment.description}
          onChange={(e) => setNewEquipment({ ...newEquipment, description: e.target.value })}
          className="border p-2 rounded w-full mt-2"
          placeholder="Description"
        />
        <button
          onClick={handleAddEquipment}
          className="mt-2 w-full p-2 bg-green-500 text-white rounded"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default EquipmentPage;