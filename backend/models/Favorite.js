
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Favorite = sequelize.define('Favorite', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    recipe_id: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Favorite;
