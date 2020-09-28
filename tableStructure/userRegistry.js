const Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('userRegistry', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'email'
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'password'
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name'
        },
        nick: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'nick'
        },
        // 备注
        remarks: {
            type: Sequelize.STRING(10000),
            allowNull: true,
            field: 'remarks'
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        level: {
            type: Sequelize.STRING(10000),
            allowNull: true,
            field: 'level',
            defaultValue: '{role: {}}'
        },
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'utf8mb4', 
        collate: 'utf8mb4_general_ci',
    });
}