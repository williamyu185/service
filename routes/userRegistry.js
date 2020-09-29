const Router = require('koa-router');
const userRegistry = require('../tableBusinessOperateLogic/userRegistry.js');

const router = new Router({
    prefix: '/bbs/userRegistry'
});

router.post('/create', userRegistry.create);
router.post('/search', userRegistry.search);
router.post('/modify', userRegistry.modify);
router.post('/del', userRegistry.del);

module.exports = router;