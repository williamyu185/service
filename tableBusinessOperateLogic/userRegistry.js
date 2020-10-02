const UserRegistryModel = require('../tableCRUD/userRegistry.js');
const validator = require('validator');
const redisUtil = require('../utils/redis.js');
const servletUtil = require('../utils/servlet.js');
const md5 = require('md5');
const loginAuthorityVerification = require('./loginAuthorityVerification.js');
const tokenRedisNamespace = '/bbs/userRegistry/login:POST:';
const { v5: UUID_V5 } = require('uuid');
const checkTokenWhiteList = require('../asset/checkTokenWhiteList.js');

class userRegistry {

    static async create(ctx) {
        
        //接收客服端
        let requestParams = ctx.request.body;
        let password = requestParams.password;
        let email = requestParams.email;
        if(!validator.isEmpty(email) && !validator.isEmpty(password) && !validator.isEmpty(requestParams.userName)) {
            try {
                requestParams.password = md5(password);
                const UUID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
                requestParams.memberId = UUID_V5(email, UUID_NAMESPACE);
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
                let namespace = ctx.url + ':' + ctx.method + ':';
                let key = JSON.stringify(requestParams);
                hitData = await redisUtil.hgetall(key, namespace);
                if(!hitData) {
                    data = await UserRegistryModel.userRegistryMsg(requestParams.userName);
                    (data !== null) && redisUtil.hmset({
                        key, 
                        value: data.dataValues,
                        namespace
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

    static async login(ctx) {
        let requestParams = ctx.request.body;
        let email = requestParams.email;
        let password = requestParams.password;
        if(!validator.isEmpty(email) && !validator.isEmpty(password)) {
            try {
                let userMsg = await UserRegistryModel.login(email);
                userMsg = userMsg.dataValues;
                if(userMsg.password == md5(password)) {
                    let token = await loginAuthorityVerification.privateKey(email);
                    redisUtil.hmset({
                        key: token,
                        value: {
                            email: userMsg.email
                        },
                        namespace: tokenRedisNamespace
                    });
                    servletUtil.responseData({
                        ctx,
                        msg: '登录成功',
                        code: 0,
                        data: {
                            token
                        }
                    });
                }else {
                    servletUtil.responseData({
                        ctx,
                        msg: '验证失败',
                        code: 416
                    });
                }
            }catch(err) {
                servletUtil.responseData({
                    ctx,
                    msg: '验证失败',
                    code: 416
                });
            }
        }else {
            servletUtil.responseData({
                ctx,
                msg: '用户名、密码必传',
                code: 416
            });
        }
    }

    static async tokenVerification(ctx, next) {
        let requestParams = ctx.request.body;
        let token = requestParams.token;
        if(checkTokenWhiteList.indexOf(ctx.url) !== -1) {
            await next();
            return;
        }
        if(token) {
            try {
                let decodeEmail = await loginAuthorityVerification.decode(token);
                let hitData = await redisUtil.hgetall({
                    key: token,
                    namespace: tokenRedisNamespace
                });
                if(hitData !== null) {
                    if(hitData.email == decodeEmail) {
                        await next();
                        return;
                    }
                }
            }catch(err) {
                servletUtil.responseData({
                    ctx,
                    msg: 'token验证失败',
                    code: 412,
                    data: err
                });
            }
        }else {
            servletUtil.responseData({
                ctx,
                msg: 'token必传',
                code: 416
            });
        }
    }

}

module.exports = userRegistry;