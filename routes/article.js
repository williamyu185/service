const Router = require('koa-router');
const Artile = require('../tableBusinessOperateLogic/article');

const router = new Router({
    prefix: ''
});

//创建文章
router.post('/article/create', Artile.create);

//获取文章详情
router.get('/article/:id', Artile.detail)

module.exports = router;