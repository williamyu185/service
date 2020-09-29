const UserRegistryModel = require('../tableCRUD/userRegistry.js');
const validator = require('validator');
const redisUtil = require('../utils/redis.js');

class userRegistry {
    static responseData(ctx, msg = '', code = 416, data, status = 200) {
        ctx.response.status = status;
        ctx.body = {
            code,
            msg,
            data
        }
    }
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
                userRegistry.fail(ctx, '注册失败');
            }
        }else {

        }
    }
    static async modify(ctx) {
        let requestParams = ctx.request.body;
        let userName = requestParams.userName;
        let newPassword = requestParams.newPassword;
        if(!validator.isEmpty(userName) && !validator.isEmpty(newPassword)) {
            UserRegistryModel.modify(userName, newPassword);
        }else {
            userRegistry.fail(ctx, '用户名和新密码必传');
        }
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
                userRegistry.fail(ctx, '查询失败');
            }
        }else {
            userRegistry.fail(ctx, '用户名必须传');
        }
    }
}

module.exports = userRegistry;