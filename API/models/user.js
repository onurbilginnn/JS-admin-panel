const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('T_Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false  
    },  
    email: {
        type: Sequelize.STRING,
        allowNull: false  
    },  
    password: {
        type: Sequelize.STRING,
        allowNull: false  
    },  
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue:'images/avatars/default.jpg',
        allowNull: false
    }
});

module.exports = User;