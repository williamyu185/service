let redis = require('redis');
let config = require('../config/redis.js');
let client = redis.createClient(config.port, config.host, {auth_pass: config.password});
client.on('error', function (err) {
    console.error('redis error: ', err);
});
client.on('connect', function(){
    console.log('redis connect success!');
});

module.exports = client;