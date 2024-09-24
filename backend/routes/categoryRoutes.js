const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/category', authenticateJWT, createCategory);
router.get('/category', authenticateJWT, getCategories);
router.put('/category/:id', authenticateJWT, updateCategory);
router.delete('/category/:id', authenticateJWT, deleteCategory);

module.exports = router;