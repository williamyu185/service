let NodeRSA = require('node-rsa');
let fs = require('fs');
let key = new NodeRSA({ b: 512 });
key.setOptions({encryptionScheme: 'pkcs1'});
let privatePem = key.exportKey('pkcs1-private-pem');
let publicPem = key.exportKey('pkcs1-public-pem');
fs.writeFile('./pem/public.pem', publicPem, (err) => {
    if(err) {
        throw err
    }
    console.log('公钥已保存!');
});
fs.writeFile('./pem/private.pem', privatePem, (err) => {
    if(err) {
        throw err
    }
    console.log('私钥已保存!');
});