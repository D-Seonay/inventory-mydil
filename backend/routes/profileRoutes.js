const express = require('express');
const { getProfile, updateProfile, getAllProfiles } = require('../controllers/profileController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

// Route pour récupérer les informations du profil
router.get('/profile', authenticateJWT, getProfile);

// Route pour mettre à jour le profil
router.put('/profile', authenticateJWT, updateProfile);

// Route pour récupérer tous les profils
router.get('/profiles', authenticateJWT, getAllProfiles);

module.exports = router;