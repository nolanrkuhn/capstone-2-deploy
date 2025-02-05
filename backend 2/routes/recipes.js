
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Get a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, instructions, prep_time, category } = req.body;
    const newRecipe = await Recipe.create({ title, instructions, prep_time, category });
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// Update an existing recipe
router.put('/:id', async (req, res) => {
  try {
    const { title, instructions, prep_time, category } = req.body;
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      await recipe.update({ title, instructions, prep_time, category });
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      await recipe.destroy();
      res.json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

module.exports = router;
