let config  = {
    development: {
        port: '3000'
    },
    production: {
        port: '3000'
    }
};

module.exports = config[process.env.NODE_ENV];
