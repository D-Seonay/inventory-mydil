const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController'); // Assurez-vous que le chemin est correct

// Définissez vos routes ici
router.post('/', equipmentController.createEquipment); // Assurez-vous que createEquipment est défini
router.get('/', equipmentController.getEquipments);
router.put('/:id', equipmentController.updateEquipment);
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;