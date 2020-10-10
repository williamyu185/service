let config = {
    development: {
        host: '127.0.0.1',
        database: 'bbs',
        account: 'root',
        password: '123456789'
    },
    production: {
        host: '127.0.0.1',
        database: 'bbs',
        account: 'root',
        password: '*Mz1Nj:N_BM?'
    }
};

module.exports = config[process.env.NODE_ENV];
