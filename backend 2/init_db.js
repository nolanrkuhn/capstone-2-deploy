
const sequelize = require('./db');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const Ingredient = require('./models/Ingredient');
const Favorite = require('./models/Favorite');
const MealPlan = require('./models/MealPlan');

// Associations
Recipe.belongsToMany(Ingredient, { through: 'Recipe_Ingredients' });
Ingredient.belongsToMany(Recipe, { through: 'Recipe_Ingredients' });
User.hasMany(Favorite);
Favorite.belongsTo(User);
Favorite.belongsTo(Recipe);
User.hasMany(MealPlan);
MealPlan.belongsTo(User);
MealPlan.belongsTo(Recipe);

const initializeDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await sequelize.close();
    }
};

initializeDatabase();
