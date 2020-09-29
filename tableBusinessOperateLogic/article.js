const ArticleModel = require('../tableCRUD/article');
const validator = require('validator');
const redisClient = require('../creatRedis/index.js');
const servletUtil = require('../utils/servlet.js');

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
                servletUtil.responseData({
                    ctx,
                    msg: '创建文章成功',
                    code: 0
                });
            }catch(err) {
                servletUtil.responseData({
                    ctx,
                    msg: '创建文章失败',
                    code: 412
                });
            }
        }else {
            servletUtil.responseData({
                ctx,
                msg: '参数不齐全',
                code: 416
            });
        }
    }
    
}

module.exports = article;