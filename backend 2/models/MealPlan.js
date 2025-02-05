
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const MealPlan = sequelize.define('MealPlan', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    recipe_id: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
});

module.exports = MealPlan;
