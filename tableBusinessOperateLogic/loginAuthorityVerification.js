// const NodeRSA = require('node-rsa');
// const key = new NodeRSA({b: 512});
// let publicDer = key.exportKey('pkcs8-public'); //公钥
// let privateDer = key.exportKey('pkcs8-private');//私钥
// console.log('公钥:=========>', publicDer);
// console.log('私钥:======<lllll', privateDer);





// generator();

let NodeRSA = require('node-rsa');
let fs = require('fs');
// let key = new NodeRSA({ b: 512 });

function encrypt() {
    fs.readFile('./pem/private.pem', function (err, data) {
        let key = new NodeRSA(data);
        let cipherText = key.encryptPrivate('hello world', 'base64');
    });
}
   //generator();
//    encrypt();


   function decrypt() {
    fs.readFile('./pem/public.pem', function (err, data) {
    let key = new NodeRSA(data);
    let rawText = key.decryptPublic('gT48EtC2pKRXDG1AlHrClfGWGKV7Jhaj7waCXJf3NSUPUVU5SuwbOaZ8AXO20R4w0fM6zKgBNGMBE/K18uKtDQ==', 'utf8');
    console.log(rawText, 'q423423432=========>>>');
    });
   }
   //generator();
   //encrypt();
//    decrypt();




class LoginAuthorityVerification {

    static async privateKey(email) {
        return new Promise((resolve, reject) => {
            fs.readFile('./pem/private.pem', function (err, data) {
                let key = new NodeRSA(data);
                let token = key.encryptPrivate(email, 'base64');
                resolve(token);
            });
        });
        // return key.encrypt(email, 'base64');
    }

    static async decode(token) {
        return new Promise((resolve, reject) => {
            fs.readFile('./pem/public.pem', function (err, data) {
                let key = new NodeRSA(data);
                let plainText = key.decryptPublic(token, 'utf8');
                resolve(plainText);
            });
        });
        // return key.decrypt(token, 'utf8');
    }

}

module.exports = LoginAuthorityVerification;