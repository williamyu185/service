let config = {
    development: {
        host: 'localhost',
        database: 'userRegistry',
        account: 'root',
        password: '123456789'
    },
    production: {

    }
};

module.exports = config[process.env.NODE_ENV];
