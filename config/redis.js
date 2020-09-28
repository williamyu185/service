let config  = {
    development: {
        host: '127.0.0.1',
        password: '123456789',
        port: '6379'
    },
    production: {

    }
};

module.exports = config[process.env.NODE_ENV];
