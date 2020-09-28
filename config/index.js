let config  = {
    development: {
        port: '3000'
    },
    production: {

    }
};

module.exports = config[process.env.NODE_ENV];
