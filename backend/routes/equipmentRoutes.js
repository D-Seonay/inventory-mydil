const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const router = express.Router();

// Routes pour les équipements
router.post('/equipment', equipmentController.createEquipment);
router.get('/equipment', equipmentController.getEquipments);
router.put('/equipment/:id', equipmentController.updateEquipment);
router.delete('/equipment/:id', equipmentController.deleteEquipment);

module.exports = router;