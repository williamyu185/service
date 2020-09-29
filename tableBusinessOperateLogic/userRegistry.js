const UserRegistryModel = require('../tableCRUD/userRegistry.js');
const validator = require('validator');
const redisUtil = require('../utils/redis.js');
const servletUtil = require('../utils/servlet.js');

class userRegistry {

    static async create(ctx) {
        //接收客服端
        let requestParams = ctx.request.body;
        if(!validator.isEmpty(requestParams.email) && !validator.isEmpty(requestParams.password) && !validator.isEmpty(requestParams.userName)) {
            try {
                const ret = await UserRegistryModel.createUser(requestParams);
                const data = await UserRegistryModel.userRegistryMsg(ret.id);
                servletUtil.responseData({
                    ctx,
                    msg: '注册成功',
                    data
                });
            }catch(err) {
                servletUtil.responseData({
                    ctx,
                    msg: '注册失败',
                    code: 416
                });
            }
        }else {

        }
    }

    static async del(ctx) {
        let requestParams = ctx.request.body;
        let id = requestParams.id;
        if(!validator.isEmpty(id)) {
            try {
                await UserRegistryModel.del(id);
                servletUtil.responseData({
                    ctx,
                    msg: '删除成功',
                    code: 0
                });
            }catch(err) {
                servletUtil.responseData({
                    ctx,
                    msg: '删除失败',
                    code: 416
                });
            }
            
        }else {
            servletUtil.responseData({
                ctx,
                msg: '用户名和新密码必传',
                code: 416
            });
        }
    }

    static async modify(ctx) {
        let requestParams = ctx.request.body;
        let id = requestParams.id;
        let newPassword = requestParams.newPassword;
        if(!validator.isEmpty(id) && !validator.isEmpty(newPassword)) {
            try {
                await UserRegistryModel.modify(id, newPassword);
                servletUtil.responseData({
                    ctx,
                    msg: '修改成功',
                    code: 0
                });
            }catch(err) {
                servletUtil.responseData({
                    ctx,
                    msg: '修改失败',
                    code: 416
                });
            }
            
        }else {
            servletUtil.responseData({
                ctx,
                msg: '用户名和新密码必传',
                code: 416
            });
        }
    }

    static async search(ctx) {
        let request = ctx.request;
        let requestParams = request.body;
        if(!validator.isEmpty(requestParams.userName)) {
            try {
                let data = [];
                let hitData = null;
                let key = ctx.url + '-' + request.method + '-' + JSON.stringify(requestParams);
                hitData = await redisUtil.hgetall(key);
                if(!hitData) {
                    data = await UserRegistryModel.userRegistryMsg(requestParams.userName);
                    (data !== null) && redisUtil.hmset({
                        key, 
                        value: data.dataValues
                    });
                }
                servletUtil.responseData({
                    ctx,
                    msg: '',
                    data: {
                        userMsg: (hitData || data || {})
                    }
                });
            }catch(err) {
                servletUtil.responseData({
                    ctx,
                    msg: '查询失败',
                    code: 412
                });
            }
        }else {
            servletUtil.responseData({
                ctx,
                msg: '用户名必须传',
                code: 416
            });
        }
    }

}

module.exports = userRegistry;