const Router = require('koa-router');
const Artile = require('../tableBusinessOperateLogic/article.js');

const router = new Router({
    prefix: '/bbs/article'
});

// 创建文章
router.post('/create', Artile.create);

module.exports = router;