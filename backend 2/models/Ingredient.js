
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ingredient = sequelize.define('Ingredient', {
    name: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Ingredient;
