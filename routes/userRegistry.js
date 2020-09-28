const Router = require('koa-router');
const userRegistry = require('../tableBusinessOperateLogic/userRegistry.js');

const router = new Router({
    prefix: ''
});

router.post('/bbs/userRegistry/create', userRegistry.create);
router.post('/bbs/userRegistry/search', userRegistry.search);

module.exports = router;