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
            privateKey: fs.readFileSync(path.join(__dirname,'../ras/private_key.pem')),
            publicKey: fs.readFileSync(path.join(__dirname,'../ras/private_key.pem'))
        };
    }

    static async privateKey(unique) {
        let token = jsonwebtoken.sign(unique, private_key, {algorithm: 'RS256'});
        return token;
    }

    static async publicKey(private_key) {
        return jsonwebtoken.verify(private_key, public_key)
    }

}

module.exports = LoginAuthorityVerification;