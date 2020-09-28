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
        let userName = ctx.params.userName;
        if(id) {
            try {
                // 查询文章详情模型
                let data = await UserRegistryModel.userRegistryMsg(userName);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
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