import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Card = ({ 
  id,
  name, 
  category_id, 
  stock_quantity, 
  available_quantity, 
  description, 
  location, 
  purchase_date, 
  photo 
}) => {

  const [isReserved, setIsReserved] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleReservation = async () => {
    try {
      const token = localStorage.getItem('token'); // Assurez-vous que l'utilisateur est authentifié
      const userId = localStorage.getItem('userId'); // Obtenir l'ID utilisateur

      await axios.post('http://localhost:5001/reservations', {
        user_id: userId,
        equipment_id: id,
        start_date: startDate,
        end_date: endDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Équipement réservé avec succès');
      setIsReserved(true); // Marquer comme réservé
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert('Erreur lors de la réservation de l\'équipement');
    }
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg h-fit transition-transform transform hover:scale-105">
      {photo ? (
        <img className="w-full h-48 object-cover" src={photo} alt={`${name} - Image`} />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )}
      <div className='flex col-span-2 justify-between items-end'>
      
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
          <p className="text-gray-600 text-sm">Catégorie ID: {category_id}</p>
          <p className="text-gray-600 text-sm">Quantité en stock: {stock_quantity}</p>
          <p className="text-gray-600 text-sm">Quantité disponible: {available_quantity}</p>
          <p className="text-gray-600 text-sm">Emplacement: {location}</p>
          <p className="text-gray-600 text-sm">Date d'achat: {new Date(purchase_date).toLocaleDateString()}</p>
        </div>
        <Modal/>
      </div>
    </div>
  );
};

// PropTypes pour validation des props
Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Permettre une chaîne ou un nombre
  stock_quantity: PropTypes.number.isRequired,
  available_quantity: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  purchase_date: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  photo: PropTypes.string,
};

export default Card;