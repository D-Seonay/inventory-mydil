import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Cards = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // État pour le terme de recherche

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/equipment', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEquipments(response.data);
        console.log('Équipements récupérés:', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des équipements:', error.response ? error.response.data : error.message);
        setError('Erreur lors de la récupération des équipements');
      } finally {
        setLoading(false);
      }
    };
  
    fetchEquipments();
  }, []);

  const filteredEquipments = equipments.filter((equipment) =>
    (equipment.name && equipment.name.toLowerCase().includes(searchTerm.toLowerCase())) || // Filtre par nom
    (equipment.description && equipment.description.toLowerCase().includes(searchTerm.toLowerCase())) || // Filtre par description
    (equipment.tags && equipment.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))) // Filtre par tags
);

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        {error}
        {error.response && error.response.data && <p>{error.response.data.error}</p>}
      </div>
    );
  }

  return (
    <div className="container mx-auto relative">
        <div className="flex justify-center my-8">
            <input
            type="text"
            placeholder="Rechercher un équipement..."
            className="w-full p-2 border border-gray-300 rounded-full shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipments.map((equipment) => (
          <Card 
            key={equipment.id}
            photo={equipment.photo} 
            name={equipment.name}
            description={equipment.description}
            category_id={equipment.category_id}
            stock_quantity={equipment.stock_quantity}
            available_quantity={equipment.available_quantity}
            location={equipment.location}
            purchase_date={equipment.purchase_date}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;