
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Placeholder Routes
app.get('/', (req, res) => {
  res.send('Recipe Manager Backend');
});

// Routes for future CRUD operations
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const ingredientRoutes = require('./routes/ingredients');
const favoriteRoutes = require('./routes/favorites');
const mealPlanRoutes = require('./routes/mealPlans');

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/mealPlans', mealPlanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
