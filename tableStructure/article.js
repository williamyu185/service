const Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('article', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        //文章标题
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'title'
        },
        //作者
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'author'
        },
        //内容
        content: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'content'
        },
        //文章分类
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'category'
        },
        // 创建时间
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        // 更新时间
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        timestamps: true,
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true,
        charset: 'utf8mb4', 
        collate: 'utf8mb4_general_ci',
    });
}