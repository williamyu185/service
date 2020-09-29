const redisClient = require('../creatRedis/index.js');
const md5 = require('md5');
const redisConfig = require('../config/redis.js');

class redis {
    static md5Encode(key) {
        return md5(key);
    }
    static hmset(key = '', value = {}, isUUID = true) {
        return new Promise((reslove, reject) => {
            let md5key = isUUID ? redis.md5Encode(key) : key;
            redisClient.hmset(md5key, value, (err, data) => {
                if(!err) {
                    reslove();
                }else {
                    reslove(err);
                }
            });
            redisClient.expire(md5key, redisConfig.expire);
        })
    }
    static hgetall(key = '', isUUID = true) {
        return new Promise((reslove, reject) => {
            redisClient.hgetall((isUUID ? redis.md5Encode(key) : key), (err, data) => {
                console.log(data)
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