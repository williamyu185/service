let NodeRSA = require('node-rsa');
let fs = require('fs');
let path = require('path');
let isExist = fs.existsSync(path.resolve(__dirname, '../pem/public.pem'));
if(!isExist) {
    let key = new NodeRSA({ b: 512 });
    key.setOptions({encryptionScheme: 'pkcs1'});
    let privatePem = key.exportKey('pkcs1-private-pem');
    let publicPem = key.exportKey('pkcs1-public-pem');
    fs.writeFile(path.resolve(__dirname, '../pem/public.pem'), publicPem, (err) => {
        if(err) {
            throw err;
        }
        console.log('公钥已保存!');
    });
    fs.writeFile(path.resolve(__dirname, '../pem/private.pem'), privatePem, (err) => {
        if(err) {
            throw err;
        }
        console.log('私钥已保存!');
    });
}
