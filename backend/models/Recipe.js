
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Recipe = sequelize.define('Recipe', {
    title: { type: DataTypes.STRING, allowNull: false },
    instructions: { type: DataTypes.TEXT, allowNull: false },
    prep_time: { type: DataTypes.INTEGER },
    category: { type: DataTypes.STRING }
});

module.exports = Recipe;
