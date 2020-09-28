const Router = require('koa-router');
const userRegistry = require('../tableBusinessOperateLogic/userRegistry.js');

const router = new Router({
    prefix: ''
});

//创建文章
router.post('/userRegistry/create', userRegistry.create);

//获取文章详情
// router.get('/article?id=:id', Artile.detail);

module.exports = router;