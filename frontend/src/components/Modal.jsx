import React, { useState } from 'react';

const ReservationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Confirmer la réservation</h2>
        <p className="mb-6">Voulez-vous vraiment réserver cet équipement ?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

const ReservationComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleReservationConfirm = () => {
    setIsReserved(true);
    setIsModalOpen(false);
    // Appeler votre fonction pour la réservation ici
    console.log('Réservation confirmée');
    // Vous pouvez appeler une API pour enregistrer la réservation ici
  };

  return (
    <div className="text-center space-y-4 mt-10">
      <button
        onClick={handleOpenModal}
        className="m-auto mb-10 mr-10 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 h-fit disabled:bg-gray-400"
        disabled={isReserved}  // Désactiver le bouton si déjà réservé
      >
        {isReserved ? 'Réservé' : 'Réserver'}
      </button>

      {/* Modal de réservation */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleReservationConfirm}
      />
    </div>
  );
};

export default ReservationComponent;