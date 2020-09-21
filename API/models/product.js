const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('T_Products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false  
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;

