
const axios = require('axios');
const Recipe = require('./models/Recipe');
const Ingredient = require('./models/Ingredient');
const sequelize = require('./db');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

const fetchAndStoreRecipes = async () => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=10&addRecipeInformation=true`
        );
        const recipes = response.data.results;

        for (const recipe of recipes) {
            const createdRecipe = await Recipe.create({
                title: recipe.title,
                instructions: recipe.instructions,
                prep_time: recipe.readyInMinutes,
                category: recipe.dishTypes[0] || 'General'
            });

            for (const ingredient of recipe.extendedIngredients) {
                let [dbIngredient] = await Ingredient.findOrCreate({
                    where: { name: ingredient.name }
                });
                await createdRecipe.addIngredient(dbIngredient, {
                    through: { quantity: ingredient.amount + ' ' + ingredient.unit }
                });
            }
        }

        console.log('Recipes and ingredients fetched and stored successfully.');
    } catch (error) {
        console.error('Error fetching or storing data:', error);
    } finally {
        await sequelize.close();
    }
};

fetchAndStoreRecipes();
