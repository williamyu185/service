let redis = require('redis');
let config = require('../config/redis.js');
let client = redis.createClient(config.port, config.host, {auth_pass: config.password});

module.exports = client;