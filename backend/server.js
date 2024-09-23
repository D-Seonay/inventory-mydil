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
  const { firstName, lastName, username, password, email, age, weight, height, gender, goal } = req.body;

  // Vérifier si le pseudo existe déjà
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
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
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email],
        (err, result) => {
          if (err) {
            console.error('Erreur lors de l\'inscription de l\'utilisateur:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
          }
        }
      );
    });
  });
});


// Route pour la connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
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


app.get('/profile', authenticateJWT, (req, res) => {
  const userId = req.user.id;
  
  db.query('SELECT * FROM user_profile WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    if (results.length === 0) return res.status(404).json({ error: 'Profil non trouvé' });
    
    res.json(results[0]);
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));