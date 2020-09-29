const redisClient = require('../creatRedis/index.js');
const uuid = require('uuid');
const uuidv5 = uuid.v5;

class redis {
    static UUIDUrl(key) {
        return uuidv5(key, uuidv5.URL);
    }
    static hmset(key = '', value = '', isUUID = true) {
        return new Promise((reslove, reject) => {
            redisClient.hmset(isUUID ? redis.UUIDUrl(key) : key, value, (err, data) => {
                if(!err) {
                    reslove(data);
                }else {
                    reject(err);
                }
            });
        });
    }
    static hgetall(key = '', value = '', isUUID = true) {
        return new Promise((reslove, reject) => {
            redisClient.hgetall(isUUID ? redis.UUIDUrl(key) : key, (err, data) => {
                if(!err) {
                    reslove(data);
                }else {
                    reject(err);
                }
            });
        });
    }
}
export default redis;