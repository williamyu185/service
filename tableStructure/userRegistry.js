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
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'userName'
        },
        nick: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'nick',
            defaultValue: ''
        },
        // 备注
        remarks: {
            type: Sequelize.STRING(10000),
            allowNull: true,
            field: 'remarks',
            defaultValue: ''
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        level: {
            type: Sequelize.STRING(10000),
            allowNull: true,
            field: 'level',
            defaultValue: '{role: {}}'
        },
        isEnable: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'isEnable',
            defaultValue: '1'
        },
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'utf8mb4', 
        collate: 'utf8mb4_general_ci',
    });
}