const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const axios = require('axios');
require('dotenv').config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Search recipes from Spoonacular
router.get('/search', async (req, res) => {
    try {
        const { query, cuisine, diet, intolerances } = req.query;
        const response = await axios.get(`${SPOONACULAR_BASE_URL}/complexSearch`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                query,
                cuisine,
                diet,
                intolerances,
                addRecipeInformation: true,
                number: 12
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipes from Spoonacular' });
    }
});

// Get recipe details from Spoonacular
router.get('/spoonacular/:id', async (req, res) => {
    try {
        const response = await axios.get(`${SPOONACULAR_BASE_URL}/${req.params.id}/information`, {
            params: {
                apiKey: SPOONACULAR_API_KEY
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipe details from Spoonacular' });
    }
});

// Get random recipes from Spoonacular
router.get('/random', async (req, res) => {
    try {
        const response = await axios.get(`${SPOONACULAR_BASE_URL}/random`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                number: 6
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch random recipes from Spoonacular' });
    }
});

// Your existing routes for database operations
// Get all saved recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.findAll();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch saved recipes' });
    }
});

// Get a single saved recipe by ID
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

// Save a recipe to database
router.post('/', async (req, res) => {
    try {
        const { title, instructions, prep_time, category, spoonacular_id } = req.body;
        const newRecipe = await Recipe.create({ 
            title, 
            instructions, 
            prep_time, 
            category,
            spoonacular_id 
        });
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save recipe' });
    }
});

// Update an existing saved recipe
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

// Delete a saved recipe
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
