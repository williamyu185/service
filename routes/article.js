const Router = require('koa-router');
const Artile = require('../tableBusinessOperateLogic/article.js');

const router = new Router({
    prefix: ''
});

//创建文章
router.post('/bbs/article/create', Artile.create);

module.exports = router;