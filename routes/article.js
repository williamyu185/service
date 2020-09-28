const Router = require('koa-router');
const Artile = require('../tableBusinessOperateLogic/article.js');

const router = new Router({
    prefix: ''
});

//创建文章
router.post('/bbs/article/create', Artile.create);

//获取文章详情
// router.get('/article?id=:id', Artile.detail);

module.exports = router;