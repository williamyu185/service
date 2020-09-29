const Router = require('koa-router');
const Artile = require('../tableBusinessOperateLogic/article.js');

const router = new Router({
    prefix: '/bbs/article'
});

// 创建文章
router.post('/create', Artile.create);
// 查询文章
router.post('/search', Artile.search);

module.exports = router;