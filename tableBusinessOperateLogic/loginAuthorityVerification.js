const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

const text = '123@qq.com';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);


class LoginAuthorityVerification {

    static async privateKey(email) {
        return key.encrypt(email, 'base64');
    }

    static async decode(token) {
        // console.log(key.decrypt(token, 'utf8'), '//56746846469----')
        return key.decrypt(token, 'utf8');
    }

}

module.exports = LoginAuthorityVerification;