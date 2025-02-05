
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// Get all favorites for a user
router.get('/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.findAll({ where: { user_id: req.params.userId } });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add a recipe to favorites
router.post('/', async (req, res) => {
  try {
    const { user_id, recipe_id } = req.body;
    const newFavorite = await Favorite.create({ user_id, recipe_id });
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// Remove a recipe from favorites
router.delete('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    if (favorite) {
      await favorite.destroy();
      res.json({ message: 'Favorite removed' });
    } else {
      res.status(404).json({ error: 'Favorite not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

module.exports = router;
