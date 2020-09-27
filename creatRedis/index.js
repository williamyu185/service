let redis = require('redis');
let bluebird = require('bluebird');
let config = require('../config/redis.js');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
let client = redis.createClient(config.port, config.host, {auth_pass: config.password});
client.on('error', function (err) {
    console.log('redis error: ', err);
});
client.on('connect', function(){
    console.log('redis connect success!');
});

module.exports = client;