const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Inscription
const register = (req, res) => {
  const { firstName, lastName, username, password, email, promotion } = req.body;
  db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur interne' });
    if (results.length > 0) return res.status(400).json({ message: 'Ce pseudo est déjà pris' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Erreur de hashage du mot de passe' });
      db.query(
        'INSERT INTO user (first_name, last_name, username, password, email, promotion, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, username, hashedPassword, email, promotion, 'user'],
        (err) => {
          if (err) return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
          res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
        }
      );
    });
  });
};

// Connexion
const login = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};

module.exports = { register, login };