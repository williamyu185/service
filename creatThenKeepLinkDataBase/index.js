const Sequelize = require('sequelize');
const config = require('../config/mysql.js');
const envConfig = config.dataBaseConfig;

const creatBaseInstance = function(database = '') {
    return new Sequelize(database, envConfig.account, envConfig.password, {
        host: envConfig.host,
        dialect: 'mysql',
        operatorsAliases: false,
        dialectOptions: {
            //字符集
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            supportBigNumbers: true,
            bigNumberStrings: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        //东八时区
        timezone: '+08:00'
    });
};

module.exports = {
    creatBaseInstance,
    defaultBaseInstance: creatBaseInstance(envConfig.database)
};