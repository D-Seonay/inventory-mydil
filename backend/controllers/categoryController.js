const db = require('../config/database');

// Créer une nouvelle catégorie
const createCategory = (req, res) => {
  const { name } = req.body;

  db.query('INSERT INTO category (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de la catégorie:', err);
      return res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
    }
    res.status(201).json({ message: 'Catégorie créée avec succès', categoryId: result.insertId });
  });
};

// Récupérer toutes les catégories
const getCategories = (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des catégories:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
    }
    res.json(results);
  });
};

// Mettre à jour une catégorie
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.query('UPDATE category SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la catégorie:', err);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie' });
    }
    res.json({ message: 'Catégorie mise à jour avec succès' });
  });
};

// Supprimer une catégorie
const deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM category WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de la catégorie:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
    }
    res.json({ message: 'Catégorie supprimée avec succès' });
  });
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};