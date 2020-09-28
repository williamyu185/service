let config = {
    development: {
        dataBaseConfig: {
            host: 'localhost',
            database: 'userRegistry',
            account: 'root',
            password: '123456789'
        }
    },
    production: {
        dataBaseConfig: {

        }
    }
};

module.exports = config[process.env.NODE_ENV];
