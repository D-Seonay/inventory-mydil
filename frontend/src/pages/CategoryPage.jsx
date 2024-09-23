import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5001/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  // Ajouter une nouvelle catégorie
  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:5001/category', { name: newCategory });
      setNewCategory('');
      fetchCategories(); // Rafraîchir la liste après ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
    }
  };

  // Modifier une catégorie
  const handleEditCategory = async (id) => {
    try {
      await axios.put(`http://localhost:5001/category/${id}`, { name: editCategoryName });
      setEditCategoryId(null); // Sortir du mode d'édition
      setEditCategoryName('');
      fetchCategories(); // Rafraîchir la liste après modification
    } catch (error) {
      console.error('Erreur lors de la modification de la catégorie:', error);
    }
  };

  // Supprimer une catégorie
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/category/${id}`);
      fetchCategories(); // Rafraîchir la liste après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Gestion des Catégories</h1>

      {/* Liste des catégories */}
      <ul className="mb-6">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center py-2">
            {editCategoryId === category.id ? (
              <>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  onClick={() => handleEditCategory(category.id)}
                  className="ml-4 p-2 bg-blue-500 text-white rounded"
                >
                  Modifier
                </button>
              </>
            ) : (
              <>
                <span>{category.nom}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditCategoryId(category.id);
                      setEditCategoryName(category.nom);
                    }}
                    className="mr-4 p-2 bg-yellow-500 text-white rounded"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
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

      {/* Ajouter une nouvelle catégorie */}
      <div className="mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Nouvelle catégorie"
        />
        <button
          onClick={handleAddCategory}
          className="mt-2 w-full p-2 bg-green-500 text-white rounded"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;