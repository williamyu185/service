const UserRegistryModel = require('../tableCRUD/userRegistry.js');
const validator = require('validator');
const redisUtil = require('../utils/redis.js');
const servletUtil = require('../utils/servlet.js');
const md5 = require('md5');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
let private_key = fs.readFileSync(path.join(__dirname,'../ras/private_key.pem'));
let public_key = fs.readFileSync(path.join(__dirname,'../ras/public_key.pem'));

class LoginAuthorityVerification {

    static async creatprivateAndPublishKey() {
        return {
            privateKey: private_key,
            publicKey: public_key
        };
    }

    static async privateKey(userName) {
        let token = jsonwebtoken.sign(userName, private_key, {algorithm: 'RS256'});
        return token;
    }

    static async decode(token) {
        return jsonwebtoken.verify(token, public_key);
    }

}

module.exports = LoginAuthorityVerification;