const ArticleModel = require('../tableCRUD/article');
const validator = require('validator');
const redisClient = require('../creatRedis/index.js');

class article {
    static async create(ctx) {
        //接收客服端
        let request = ctx.request.body;
        if(!validator.isEmpty(request.title) && !validator.isEmpty(request.author) && !validator.isEmpty(request.content) && !validator.isEmpty(request.category)) {
            try {
                //创建文章模型
                const ret = await ArticleModel.createArticle(request);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                const data = await ArticleModel.getArticleDetail(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建文章成功',
                    data
                }
            }catch(err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建文章失败',
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
}

module.exports = article;