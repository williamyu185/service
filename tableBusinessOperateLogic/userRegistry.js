const UserRegistryModel = require('../tableCRUD/userRegistry.js');
const validator = require('validator');
const redisUtil = require('../utils/redis.js');

class article {
    static async create(ctx) {
        //接收客服端
        let requestParams = ctx.request.body;
        if(!validator.isEmpty(requestParams.email) && !validator.isEmpty(requestParams.password) && !validator.isEmpty(requestParams.userName)) {
            try {
                const ret = await UserRegistryModel.createUser(requestParams);
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
    static async modify(ctx) {

    }
    static async search(ctx) {
        let request = ctx.request;
        let requestParams = request.body;
        if(!validator.isEmpty(requestParams.userName)) {
            try {
                let data = {};
                let hitData = null;
                let key = ctx.url + '-' + request.method + '-' + JSON.stringify(requestParams);
                hitData = await redisUtil.hgetall(key);
                if(!hitData) {
                    data = await UserRegistryModel.userRegistryMsg(requestParams.userName);
                    (data !== null) && redisUtil.hmset(key, data.dataValues);
                }
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '',
                    data: {
                        userMsg: (hitData || data || {})
                    }
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