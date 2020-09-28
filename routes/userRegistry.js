const Router = require('koa-router');
const userRegistry = require('../tableBusinessOperateLogic/userRegistry.js');

const router = new Router({
    prefix: ''
});

router.post('/bbs/userRegistry/create', userRegistry.create);

module.exports = router;