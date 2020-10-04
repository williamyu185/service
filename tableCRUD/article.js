// 引入sequelize对象
const baseInstance = require('../creatMysql/index.js');
const Sequelize = baseInstance.defaultBaseInstance;
const Op = Sequelize.Op;
// 引入数据表模型
const Article = (require('../tableStructure/article'))(Sequelize);
//自动创建表
Article.sync({force: false});

class ArticleModel {
    /**
     * 创建文章模型
     */
    static async createArticle(data) {
        return await Article.create({
            title: data.title, //标题
            author: data.author, //作者
            content: data.content, //文章内容
            category: data.category //文章分类
        });
    }

    /**
     * 查询文章的详情
     * @param id 文章ID
     */
    static async getArticleDetail(id) {
        return await Article.findOne({
            where: {
                id
            }
        });
    }
}

module.exports = ArticleModel;