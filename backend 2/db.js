
const { Sequelize } = require('sequelize');

// Update these credentials as needed
const sequelize = new Sequelize('recipe_manager', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
