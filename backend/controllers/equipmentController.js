const db = require('../config/database');

// Créer un nouvel équipement
exports.createEquipment = (req, res) => {
  const { name, category_id, stock_quantity, available_quantity, description } = req.body;

  db.query(
    'INSERT INTO equipment (name, category_id, stock_quantity, available_quantity, description) VALUES (?, ?, ?, ?, ?)',
    [name, category_id, stock_quantity, available_quantity, description],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la création de l\'équipement:', err);
        return res.status(500).json({ error: 'Erreur lors de la création de l\'équipement' });
      }
      res.status(201).json({ message: 'Équipement créé avec succès', equipmentId: result.insertId });
    }
  );
};

// Récupérer tous les équipements
exports.getEquipments = (req, res) => {
  db.query('SELECT * FROM equipment', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des équipements:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des équipements' });
    }
    res.json(results);
  });
};

// Mettre à jour un équipement
exports.updateEquipment = (req, res) => {
  const { id } = req.params;
  const { name, category_id, stock_quantity, available_quantity, description } = req.body;

  db.query(
    'UPDATE equipment SET name = ?, category_id = ?, stock_quantity = ?, available_quantity = ?, description = ? WHERE id = ?',
    [name, category_id, stock_quantity, available_quantity, description, id],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de l\'équipement:', err);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'équipement' });
      }
      res.json({ message: 'Équipement mis à jour avec succès' });
    }
  );
};

// Supprimer un équipement
exports.deleteEquipment = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM equipment WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'équipement:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression de l\'équipement' });
    }
    res.json({ message: 'Équipement supprimé avec succès' });
  });
};