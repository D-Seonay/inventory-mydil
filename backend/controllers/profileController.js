const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Récupérer les informations du profil de l'utilisateur connecté
const getProfile = (req, res) => {
  const userId = req.user.id;

  db.query('SELECT id, first_name, last_name, email, username, promotion FROM user WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du profil:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
    }
    res.json(results[0]); // Retourne les infos de l'utilisateur connecté
  });
};

// Mettre à jour le profil utilisateur
const updateProfile = (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name, email, password } = req.body;

  // Optionnel : Hasher le nouveau mot de passe si fourni
  const updateUserQuery = password
    ? 'UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?'
    : 'UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE id = ?';

  const queryParams = password
    ? [first_name, last_name, email, bcrypt.hashSync(password, 10), userId]
    : [first_name, last_name, email, userId];

  db.query(updateUserQuery, queryParams, (err) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
    }
    res.json({ message: 'Profil mis à jour avec succès' });
  });
};

//Afficher tous les profils

const getAllProfiles = (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
      if (err) {
      console.error('Erreur lors de la récupération des profils:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des profils' });
      }
      res.json(results);
  });
  };


module.exports = { getProfile, updateProfile, getAllProfiles };