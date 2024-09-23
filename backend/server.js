const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express(); // Initialisation de l'application Express

// Middleware pour CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json()); // Remplace bodyParser.json()

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected!');
});

// Middleware pour vérifier le token JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assure-toi que le token est extrait correctement
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Route pour l'inscription d'un utilisateur
app.post('/register', (req, res) => {
  const { firstName, lastName, username, password, email, promotion, role } = req.body;

  // Vérifier si le pseudo existe déjà
  db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification du pseudo:', err);
      return res.status(500).json({ error: 'Erreur interne' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Ce pseudo est déjà pris' });
    }

    // Hasher le mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erreur lors du hashage du mot de passe:', err);
        return res.status(500).json({ error: 'Erreur de hashage du mot de passe' });
      }

      // Insérer les informations dans la table des utilisateurs
      db.query(
        'INSERT INTO user (first_name, last_name, username, password, email, promotion, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, username, hashedPassword, email, promotion, role],
        (err, result) => {
          if (err) {
            console.error('Erreur lors de l\'inscription de l\'utilisateur:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
          }
          res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
        }
      );
    });
  });
});


// Route pour la connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!match) return res.status(400).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Route de déconnexion
app.post('/logout', authenticateJWT, (req, res) => {
  // En pratique, la déconnexion nécessite généralement la suppression du token côté client
  res.status(200).json({ message: 'Logged out successfully' });
});

// Route protégée
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route' });
});


/// Route pour créer une nouvelle catégorie
app.post('/category', authenticateJWT, (req, res) => {
  const { name } = req.body;

  db.query('INSERT INTO category (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de la catégorie:', err);
      return res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
    }
    res.status(201).json({ message: 'Catégorie créée avec succès', categoryId: result.insertId });
  });
});

// Route pour récupérer toutes les catégories
app.get('/category', authenticateJWT, (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des catégories:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
    }
    res.json(results);
  });
});

// Route pour mettre à jour une catégorie
app.put('/category/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.query('UPDATE category SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la catégorie:', err);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie' });
    }
    res.json({ message: 'Catégorie mise à jour avec succès' });
  });
});

// Route pour supprimer une catégorie
app.delete('/category/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM category WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la catégorie:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
    }
    res.json({ message: 'Catégorie supprimée avec succès' });
  });
});

// Route pour créer un nouveau matériel
app.post('/equipment', authenticateJWT, (req, res) => {
  const { name, category_id, stock_quantity, available_quantity, description } = req.body;

  db.query(
    'INSERT INTO equipment (name, category_id, stock_quantity, available_quantity, description) VALUES (?, ?, ?, ?, ?)',
    [name, category_id, stock_quantity, available_quantity, description],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la création du matériel:', err);
        return res.status(500).json({ error: 'Erreur lors de la création du matériel' });
      }
      res.status(201).json({ message: 'Matériel créé avec succès', equipmentId: result.insertId });
    }
  );
});

// Route pour récupérer tout le matériel
app.get('/equipment', authenticateJWT, (req, res) => {
  db.query('SELECT * FROM equipment', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du matériel:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération du matériel' });
    }
    res.json(results);
  });
});

// Route pour mettre à jour un matériel
app.put('/equipment/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const { name, category_id, stock_quantity, available_quantity, description } = req.body;

  db.query(
    'UPDATE equipment SET name = ?, category_id = ?, stock_quantity = ?, available_quantity = ?, description = ? WHERE id = ?',
    [name, category_id, stock_quantity, available_quantity, description, id],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du matériel:', err);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du matériel' });
      }
      res.json({ message: 'Matériel mis à jour avec succès' });
    }
  );
});

// Route pour supprimer un matériel
app.delete('/equipment/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM equipment WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du matériel:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression du matériel' });
    }
    res.json({ message: 'Matériel supprimé avec succès' });
  });
});

// Route pour créer une nouvelle réservation
app.post('/reservation', authenticateJWT, (req, res) => {
  const { equipment_id, start_date, end_date } = req.body;
  const user_id = req.user.id;

  db.query(
    'INSERT INTO reservation (user_id, equipment_id, start_date, end_date) VALUES (?, ?, ?, ?)',
    [user_id, equipment_id, start_date, end_date],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la création de la réservation:', err);
        return res.status(500).json({ error: 'Erreur lors de la création de la réservation' });
      }
      res.status(201).json({ message: 'Réservation créée avec succès', reservationId: result.insertId });
    }
  );
});

// Route pour récupérer les réservations d'un utilisateur
app.get('/reservations', authenticateJWT, (req, res) => {
  const user_id = req.user.id;

  db.query('SELECT * FROM reservation WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
    }
    res.json(results);
  });
});

// Route pour mettre à jour le statut d'une réservation
app.put('/reservation/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query('UPDATE reservation SET status = ? WHERE id = ?', [status, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la réservation:', err);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation' });
    }
    res.json({ message: 'Réservation mise à jour avec succès' });
  });
});

// Route pour supprimer une réservation
app.delete('/reservation/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM reservation WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la réservation:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression de la réservation' });
    }
    res.json({ message: 'Réservation supprimée avec succès' });
  });
});

// Route pour mettre à jour le profil utilisateur
app.put('/profile', authenticateJWT, (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name, email, password } = req.body;

  // Optionnel : Hasher le nouveau mot de passe si fourni
  const updateUserQuery = password
    ? 'UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?'
    : 'UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE id = ?';

  const queryParams = password
    ? [first_name, last_name, email, bcrypt.hashSync(password, 10), userId]
    : [first_name, last_name, email, userId];

  db.query(updateUserQuery, queryParams, (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
    }
    res.json({ message: 'Profil mis à jour avec succès' });
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));