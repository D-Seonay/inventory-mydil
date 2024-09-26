const db = require('../config/database');

// Créer une nouvelle réservation
const createReservation = (req, res) => {
  const { user_id, equipment_id, start_date, end_date, status } = req.body;

  db.query(
    'INSERT INTO reservation (user_id, equipment_id, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)',
    [user_id, equipment_id, start_date, end_date, status],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la création de la réservation:', err);
        return res.status(500).json({ error: 'Erreur lors de la création de la réservation', details: err.message });
      }
      res.status(201).json({ message: 'Réservation créée avec succès', reservationId: result.insertId });
    }
  );
};

// Récupérer toutes les réservations
const getReservations = (req, res) => {
  const query = `
    SELECT reservation.id, equipment.name AS object, user.email, reservation.start_date, reservation.end_date, reservation.status
    FROM reservation
    JOIN user ON reservation.user_id = user.id
    JOIN equipment ON reservation.equipment_id = equipment.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations:', err);
      console.log('Erreur lors de la récupération des réservations:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des réservations', details: err.message });
    }

    // Ajoute cette ligne pour voir ce que la base de données renvoie
    console.log('Données des réservations:', results);
    res.json(results);
  });
};

const getUserReservations = (req, res) => {
  const { userId } = req.query; // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête

  const query = `
    SELECT *
    FROM reservation
    WHERE reservation.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations de l\'utilisateur:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des réservations', details: err.message });
    }

    res.json(results); // Renvoyer les réservations de l'utilisateur
  });
};

// Mettre à jour une réservation
const updateReservation = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query('UPDATE reservation SET status = ? WHERE id = ?', [status, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la réservation:', err);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation', details: err.message });
    }
    res.json({ message: 'Réservation mise à jour avec succès' });
  });
};

// Supprimer une réservation
const deleteReservation = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM reservation WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la réservation:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression de la réservation', details: err.message });
    }
    res.json({ message: 'Réservation supprimée avec succès' });
  });
};

module.exports = {
  createReservation,
  getReservations,
  getUserReservations,
  updateReservation,
  deleteReservation,
};