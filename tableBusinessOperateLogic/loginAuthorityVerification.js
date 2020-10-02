let NodeRSA = require('node-rsa');
let fs = require('fs');

class LoginAuthorityVerification {

    static async privateKey(email) {
        return new Promise((resolve, reject) => {
            fs.readFile('./pem/private.pem', function (err, data) {
                let key = new NodeRSA(data);
                let token = key.encryptPrivate(email, 'base64');
                resolve(token);
            });
        });
    }

    static async decode(token) {
        return new Promise((resolve, reject) => {
            fs.readFile('./pem/public.pem', function (err, data) {
                let key = new NodeRSA(data);
                let plainText = key.decryptPublic(token, 'utf8');
                resolve(plainText);
            });
        });
    }

}

module.exports = LoginAuthorityVerification;