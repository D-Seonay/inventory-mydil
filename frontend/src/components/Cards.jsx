import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Cards = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Liste des Équipements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipments.map((equipment) => (
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
            reference={equipment.reference}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;