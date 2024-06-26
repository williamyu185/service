const redisClient = require('../createRedis/index.js');
const md5 = require('md5');
const redisConfig = require('../config/redis.js');

class redis {

    static md5Encode(key) {
        return md5(key);
    }

    static hmset(params) {
        return new Promise((reslove, reject) => {
            let md5key = (params.isMD5 === undefined ? true : params.isMD5) ? redis.md5Encode(params.key) : params.key;
            redisClient.hmset(params.namespace + md5key, params.value, (err, data) => {
                if(!err) {
                    reslove(data);
                }else {
                    reslove(err);
                }
            });
            redisClient.expire(md5key, params.expire || redisConfig.expire);
        })
    }

    static hgetall(params) {
        return new Promise((reslove, reject) => {
            redisClient.hgetall(((params.isMD5 === undefined ? true : params.isMD5) ? (params.namespace + redis.md5Encode(params.key)) : params.key), (err, data) => {
                if(!err) {
                    reslove(data);
                }else {
                    reslove(null);
                }
            });
        });
    }
    
}
module.exports = redis;