
const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// Get all meal plans for a user
router.get('/:userId', async (req, res) => {
  try {
    const mealPlans = await MealPlan.findAll({ where: { user_id: req.params.userId } });
    res.json(mealPlans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch meal plans' });
  }
});

// Add a recipe to a meal plan
router.post('/', async (req, res) => {
  try {
    const { user_id, recipe_id, date } = req.body;
    const newMealPlan = await MealPlan.create({ user_id, recipe_id, date });
    res.status(201).json(newMealPlan);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add meal plan' });
  }
});

// Remove a recipe from a meal plan
router.delete('/:id', async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByPk(req.params.id);
    if (mealPlan) {
      await mealPlan.destroy();
      res.json({ message: 'Meal plan entry removed' });
    } else {
      res.status(404).json({ error: 'Meal plan entry not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove meal plan entry' });
  }
});

module.exports = router;
