let config  = {
    development: {
        host: '127.0.0.1',
        password: '123456789',
        port: '6379',
        // 缓存时间10天
        expire: 60*60*24*10
    },
    production: {
        host: '127.0.0.1',
        password: 'foobared',
        port: '6379',
        // 缓存时间10天
        expire: 60*60*24*10
    }
};

module.exports = config[process.env.NODE_ENV];
