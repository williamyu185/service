let config  = {
    development: {
        dataBaseConfig: {
            host: '127.0.0.1',
            password: '123456789',
            port: '6379'
        }
    },
    production: {
        dataBaseConfig: {

        }
    }
};

module.exports = config[process.env.NODE_ENV];
