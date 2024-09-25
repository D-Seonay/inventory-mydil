const db = require('../config/database');

// Créer un nouvel équipement
const createEquipment = async (req, res) => {
  const { name, category_id, stock_quantity, available_quantity, description } = req.body;

  // Vérifiez si toutes les données requises sont présentes
  if (!name || !category_id || stock_quantity === undefined || available_quantity === undefined || !description) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO equipment (name, category_id, stock_quantity, available_quantity, description) VALUES (?, ?, ?, ?, ?)',
      [name, category_id, stock_quantity, available_quantity, description]
    );
    res.status(201).json({ message: 'Équipement créé avec succès', equipmentId: result.insertId });
  } catch (err) {
    console.error('Erreur lors de la création de l\'équipement:', err);
    return res.status(500).json({ error: 'Erreur lors de la création de l\'équipement' });
  }
};

// Récupérer tous les équipements
const getEquipments = (req, res) => {
  db.query('SELECT * FROM equipment', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des équipements:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des équipements' });
    }
    res.json(results);
  });
};


// Mettre à jour un équipement
const updateEquipment = async (req, res) => {
  const { id } = req.params;
  const { name, category_id, stock_quantity, available_quantity, description } = req.body;

  // Vérifiez si l'équipement existe
  try {
    const results = await db.query('SELECT * FROM equipment WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Équipement non trouvé' });
    }

    // Mettre à jour l'équipement
    await db.query(
      'UPDATE equipment SET name = ?, category_id = ?, stock_quantity = ?, available_quantity = ?, description = ? WHERE id = ?',
      [name, category_id, stock_quantity, available_quantity, description, id]
    );
    res.json({ message: 'Équipement mis à jour avec succès' });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'équipement:', err);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'équipement' });
  }
};

// Supprimer un équipement
const deleteEquipment = async (req, res) => {
  const { id } = req.params;

  // Vérifiez si l'équipement existe
  try {
    const results = await db.query('SELECT * FROM equipment WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Équipement non trouvé' });
    }

    // Supprimer l'équipement
    await db.query('DELETE FROM equipment WHERE id = ?', [id]);
    res.json({ message: 'Équipement supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'équipement:', err);
    return res.status(500).json({ error: 'Erreur lors de la suppression de l\'équipement' });
  }
};

// Exportez les fonctions de contrôleur
module.exports = {
  createEquipment,
  getEquipments,
  updateEquipment,
  deleteEquipment,
};