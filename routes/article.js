const Router = require('koa-router');
const Artile = require('../tableBusinessOperateLogic/article.js');

const router = new Router({
    prefix: ''
});

// 创建文章
router.post('/bbs/article/create', Artile.create);
// 查询文章
router.post('/bbs/article/search', Artile.search);

module.exports = router;