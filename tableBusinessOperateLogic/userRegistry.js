const UserRegistryModel = require('../tableCRUD/userRegistry.js');
const validator = require('validator');

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
        let request = ctx.request;
        let requestParams = request.body;
        if(!validator.isEmpty(requestParams.userName)) {
            try {
                let data = {};
                let key = ctx.url + '-' + request.method + '-' + JSON.stringify(requestParams);
                let hitData = await redisUtil.hgetall(key);
                console.log(hitData, '=====45454//////');
                if(!hitData) {
                    data = await UserRegistryModel.userRegistryMsg(requestParams.userName);
                    redisUtil.hmset(key, data);
                }
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data: hitData || data
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