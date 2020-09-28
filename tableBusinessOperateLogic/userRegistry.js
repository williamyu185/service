const UserRegistryModel = require('../tableCRUD/userRegistry.js');
const validator = require('validator');
const redisClient = require('../creatRedis/index.js');
const uuid = require('uuid');
const uuidv5 = uuid.v5;

class article {
    static async create(ctx) {
        //接收客服端
        let request = ctx.request.body;
        if(!validator.isEmpty(request.email) && !validator.isEmpty(request.password) && !validator.isEmpty(request.userName)) {
            try {
                const ret = await UserRegistryModel.createUser(request);
                const data = await UserRegistryModel.userRegistryMsg(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '注册成功',
                    data
                }
            }catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '注册失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
    static async search(ctx) {
        let request = ctx.request.body;
        if(!validator.isEmpty(request.userName)) {
            try {
                let uuidUrl = uuidv5(ctx.url, uuidv5.URL);
                redisClient.hmset(uuidUrl, obj, function(err, obj) {
                    redisClient.hgetall(uuidUrl, (err, obj) => {
                        console.log(`hgetall:${JSON.stringify(obj)}`);
                        console.log(obj.age);
                    })
                });




                // redisClient.set(ctx.url, JSON.stringify({aa: '454---'}), (err, data) => {
                //     console.log(data, '++++888==')
                // });
                // let hitData = redisClient.get(ctx.url, (err, data) => {
                //     console.log(data, '4646464======')
                // });
                let data = {};
                // if(!hitData) {
                //     data = await UserRegistryModel.userRegistryMsg(request.userName);
                //     redisClient.setAsync(ctx.url, data);
                // }



                // data = await UserRegistryModel.userRegistryMsg(request.userName);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data: data
                }
            }catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data: {}
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '用户名必须传'
            }
        }
    }
}

module.exports = article;