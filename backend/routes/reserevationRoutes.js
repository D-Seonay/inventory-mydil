const express = require('express');
const {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservationController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/reservation', authenticateJWT, createReservation);
router.get('/reservations', authenticateJWT, getReservations);
router.put('/reservation/:id', authenticateJWT, updateReservation);
router.delete('/reservation/:id', authenticateJWT, deleteReservation);

module.exports = router;
